const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Получить корзину пользователя
router.get('/', auth, async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            where: { userId: req.user.id },
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'image']
            }]
        });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Добавить товар в корзину
router.post('/', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Проверка существования товара
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        // Проверка наличия товара
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Недостаточно товара на складе' });
        }

        // Проверка существования товара в корзине
        const existingCartItem = await Cart.findOne({
            where: {
                userId: req.user.id,
                productId
            }
        });

        if (existingCartItem) {
            // Обновляем количество
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.json(existingCartItem);
        }

        // Создаем новую запись в корзине
        const cartItem = await Cart.create({
            userId: req.user.id,
            productId,
            quantity
        });

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Обновить количество товара в корзине
router.put('/:id', auth, async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Cart.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            },
            include: [Product]
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Товар в корзине не найден' });
        }

        // Проверка наличия товара
        if (cartItem.Product.stock < quantity) {
            return res.status(400).json({ message: 'Недостаточно товара на складе' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Удалить товар из корзины
router.delete('/:id', auth, async (req, res) => {
    try {
        const cartItem = await Cart.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Товар в корзине не найден' });
        }

        await cartItem.destroy();
        res.json({ message: 'Товар удален из корзины' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 