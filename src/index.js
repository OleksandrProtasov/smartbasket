const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Import models
require('./models/User');
require('./models/Product');
require('./models/Cart');

// Import routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});

const PORT = process.env.PORT || 5001;

// Database synchronization and server start
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');
        
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
                setTimeout(() => {
                    server.close();
                    app.listen(PORT + 1);
                }, 1000);
            }
        });
    } catch (err) {
        console.error('Database synchronization error:', err);
    }
};

startServer(); 