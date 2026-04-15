const { Op } = require('sequelize');
const Product = require('../models/Product');
const { fetchAllExternalProducts } = require('./externalProductsService');

const normalizeLocalProduct = (item) => ({
  id: `loc-${item.id}`,
  localId: item.id,
  title: item.name,
  description: item.description || '',
  price: Number(item.price) || 0,
  rating: 0,
  image: item.image || '',
  images: item.image ? [item.image] : [],
  category: item.category || 'other',
  stock: Number(item.stock) || 0,
  source: 'local',
});

const sortProducts = (products, sortBy, order) => {
  const direction = order === 'asc' ? 1 : -1;
  return products.sort((a, b) => {
    if (sortBy === 'price') return (a.price - b.price) * direction;
    if (sortBy === 'rating') return (a.rating - b.rating) * direction;
    if (sortBy === 'title') return a.title.localeCompare(b.title) * direction;
    return 0;
  });
};

const filterProducts = (products, filters) => {
  const q = filters.q.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery =
      !q ||
      product.title.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q);
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesMinPrice = filters.minPrice === undefined || product.price >= filters.minPrice;
    const matchesMaxPrice = filters.maxPrice === undefined || product.price <= filters.maxPrice;

    return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });
};

const loadLocalProducts = async () => {
  const rows = await Product.findAll();
  return rows.map(normalizeLocalProduct);
};

const getProducts = async (filters) => {
  let source = 'external';
  let products = [];

  try {
    const external = await fetchAllExternalProducts();
    products = external.products;
  } catch (error) {
    source = 'local-fallback';
    products = await loadLocalProducts();
  }

  let filtered = filterProducts(products, filters);
  filtered = sortProducts(filtered, filters.sortBy, filters.order);

  const total = filtered.length;
  const offset = (filters.page - 1) * filters.limit;
  const paginated = filtered.slice(offset, offset + filters.limit);

  return {
    items: paginated,
    meta: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / filters.limit)),
      source,
    },
  };
};

const getProductById = async (id) => {
  if (id.startsWith('ext-')) {
    const externalId = Number(id.replace('ext-', ''));
    const { products } = await fetchAllExternalProducts();
    return products.find((product) => product.externalId === externalId) || null;
  }

  if (id.startsWith('loc-')) {
    const localId = Number(id.replace('loc-', ''));
    const product = await Product.findByPk(localId);
    return product ? normalizeLocalProduct(product) : null;
  }

  const asNumber = Number(id);
  if (!Number.isNaN(asNumber)) {
    try {
      const { products } = await fetchAllExternalProducts();
      const externalItem = products.find((product) => product.externalId === asNumber);
      if (externalItem) return externalItem;
    } catch (error) {
      // ignore and fallback to local
    }

    const local = await Product.findByPk(asNumber);
    return local ? normalizeLocalProduct(local) : null;
  }

  return null;
};

const getCategories = async () => {
  try {
    const { categories } = await fetchAllExternalProducts();
    return categories;
  } catch (error) {
    const categories = await Product.findAll({
      attributes: ['category'],
      group: ['category'],
      where: {
        category: {
          [Op.ne]: null,
        },
      },
    });

    return categories.map((category) => category.category).filter(Boolean);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  normalizeLocalProduct,
};
