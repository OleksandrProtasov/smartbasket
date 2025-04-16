const seedProducts = require('./products');

const runSeeders = async () => {
  try {
    await seedProducts();
    console.log('Все сиды успешно выполнены');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при выполнении сидов:', error);
    process.exit(1);
  }
};

runSeeders(); 