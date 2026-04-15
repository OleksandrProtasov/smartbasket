const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { validateProductQuery } = require('../middleware/validate');
const { getProducts, getProductById, getCategories } = require('../services/productService');
const { sendError, sendSuccess } = require('../utils/apiResponse');
const multer = require('multer');
const path = require('path');

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// Получить все продукты c пагинацией/фильтрами/сортировкой
router.get('/', validateProductQuery, async (req, res) => {
    try {
        const result = await getProducts(req.validatedQuery);
        return sendSuccess(res, result.items, result.meta);
    } catch (error) {
        return sendError(res, 500, error.message);
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await getCategories();
        return sendSuccess(res, categories);
    } catch (error) {
        return sendError(res, 500, error.message);
    }
});

// Получить один продукт
router.get('/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return sendError(res, 404, 'Продукт не найден');
        }
        return sendSuccess(res, product);
    } catch (error) {
        return sendError(res, 500, error.message);
    }
});

// Создать новый продукт (только для админа)
router.post('/', [auth, admin, upload.single('image')], async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        return res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        return sendError(res, 400, error.message);
    }
});

// Обновить продукт (только для админа)
router.put('/:id', [auth, admin, upload.single('image')], async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return sendError(res, 404, 'Продукт не найден');
        }

        const { name, description, price, category, stock } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : product.image;

        await product.update({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        return res.json({
            success: true,
            data: product
        });
    } catch (error) {
        return sendError(res, 400, error.message);
    }
});

// Удалить продукт (только для админа)
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return sendError(res, 404, 'Продукт не найден');
        }

        await product.destroy();
        return res.json({ success: true, data: { message: 'Продукт удален' } });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
});

module.exports = router; 