const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user's cart
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

// Add item to cart
router.post('/', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check product stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Check if product is already in cart
        const existingCartItem = await Cart.findOne({
            where: {
                userId: req.user.id,
                productId
            }
        });

        if (existingCartItem) {
            // Update quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.json(existingCartItem);
        }

        // Create new cart item
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

// Update cart item quantity
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
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Check product stock
        if (cartItem.Product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove item from cart
router.delete('/:id', auth, async (req, res) => {
    try {
        const cartItem = await Cart.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartItem.destroy();
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 