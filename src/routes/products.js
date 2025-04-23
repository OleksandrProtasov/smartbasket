const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
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

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new product (admin only)
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

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update product (admin only)
router.put('/:id', [auth, admin, upload.single('image')], async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
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

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete product (admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 