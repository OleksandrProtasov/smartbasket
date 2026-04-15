const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { validateAuthBody } = require('../middleware/validate');
const { sendError, sendSuccess } = require('../utils/apiResponse');

// Регистрация
router.post('/register', validateAuthBody, async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Проверка существования пользователя
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return sendError(res, 400, 'Пользователь с таким email уже существует');
        }

        // Создание нового пользователя
        const user = await User.create({
            email,
            password,
            name
        });

        // Создание токена
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
});

// Вход
router.post('/login', validateAuthBody, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Поиск пользователя
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return sendError(res, 401, 'Неверный email или пароль');
        }

        // Проверка пароля
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return sendError(res, 401, 'Неверный email или пароль');
        }

        // Создание токена
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return sendSuccess(res, {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
});

// Получение информации о текущем пользователе
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'email', 'name', 'role']
        });
        return sendSuccess(res, user);
    } catch (error) {
        return sendError(res, 500, error.message);
    }
});

module.exports = router; 