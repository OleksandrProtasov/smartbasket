const Product = require('../models/Product');

const products = [
  {
    name: 'Яблоки',
    description: 'Свежие яблоки из местного сада',
    price: 2.99,
    image: 'https://via.placeholder.com/300',
    category: 'Фрукты',
    stock: 100
  },
  {
    name: 'Бананы',
    description: 'Спелые бананы из тропиков',
    price: 1.99,
    image: 'https://via.placeholder.com/300',
    category: 'Фрукты',
    stock: 150
  },
  {
    name: 'Морковь',
    description: 'Свежая морковь с фермы',
    price: 0.99,
    image: 'https://via.placeholder.com/300',
    category: 'Овощи',
    stock: 200
  },
  {
    name: 'Картофель',
    description: 'Свежий картофель',
    price: 1.49,
    image: 'https://via.placeholder.com/300',
    category: 'Овощи',
    stock: 300
  },
  {
    name: 'Молоко',
    description: 'Свежее молоко',
    price: 3.99,
    image: 'https://via.placeholder.com/300',
    category: 'Молочные продукты',
    stock: 50
  },
  {
    name: 'Хлеб',
    description: 'Свежий хлеб из пекарни',
    price: 2.49,
    image: 'https://via.placeholder.com/300',
    category: 'Хлебобулочные изделия',
    stock: 30
  }
];

const seedProducts = async () => {
  try {
    await Product.bulkCreate(products);
    console.log('Продукты успешно добавлены в базу данных');
  } catch (error) {
    console.error('Ошибка при добавлении продуктов:', error);
  }
};

module.exports = seedProducts; 