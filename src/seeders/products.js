const Product = require('../models/Product');

const products = [
  {
    name: 'Smartphone',
    description: 'Latest model with high performance',
    price: 999.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 50
  },
  {
    name: 'Laptop',
    description: 'Powerful laptop for work and entertainment',
    price: 1499.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 30
  },
  {
    name: 'Headphones',
    description: 'Wireless headphones with noise cancellation',
    price: 299.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 100
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker and smart notifications',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 75
  },
  {
    name: 'Tablet',
    description: 'Portable device for work and entertainment',
    price: 499.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 40
  }
];

const seedProducts = async () => {
  try {
    await Product.bulkCreate(products);
    console.log('Products successfully added to the database');
  } catch (error) {
    console.error('Error adding products:', error);
  }
};

module.exports = seedProducts; 