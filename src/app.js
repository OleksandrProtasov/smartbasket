const express = require('express');
const cors = require('cors');
const path = require('path');
const { sendError } = require('./utils/apiResponse');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, data: { message: 'SmartBasket API работает' } });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

app.use((req, res) => sendError(res, 404, 'Маршрут не найден'));

module.exports = app;
