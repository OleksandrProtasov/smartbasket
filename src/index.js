const dotenv = require('dotenv');
const sequelize = require('./config/database');
const app = require('./app');

// Импорт моделей
require('./models/User');
require('./models/Product');
require('./models/Cart');

dotenv.config();

const PORT = process.env.PORT || 5000;
const SKIP_DB = process.env.SKIP_DB === 'true';

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
};

// Синхронизация базы данных и запуск сервера
if (SKIP_DB) {
    console.warn('Запуск в demo-режиме без подключения к базе данных (SKIP_DB=true)');
    startServer();
} else {
    sequelize.sync({ alter: true })
        .then(() => {
            console.log('База данных синхронизирована');
            startServer();
        })
        .catch(err => {
            console.error('Ошибка синхронизации базы данных:', err);
            console.warn('Переключение на demo-режим без базы данных');
            startServer();
        });
}