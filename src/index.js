const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Импорт моделей
require('./models/User');
require('./models/Product');
require('./models/Cart');

// Импорт маршрутов
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Базовый маршрут
app.get('/', (req, res) => {
    res.json({ message: 'API работает' });
});

const PORT = process.env.PORT || 5000;

// Синхронизация базы данных и запуск сервера
sequelize.sync({ alter: true })
    .then(() => {
        console.log('База данных синхронизирована');
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Ошибка синхронизации базы данных:', err);
    }); 