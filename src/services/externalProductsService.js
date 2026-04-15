const DUMMY_PRODUCTS_URL = 'https://dummyjson.com/products';
const CACHE_TTL_MS = 5 * 60 * 1000;

let cache = {
  products: [],
  categories: [],
  expiresAt: 0,
};

const normalizeExternalProduct = (item) => ({
  id: `ext-${item.id}`,
  externalId: item.id,
  title: item.title,
  description: item.description || '',
  price: Number(item.price) || 0,
  rating: Number(item.rating) || 0,
  image: item.thumbnail || item.images?.[0] || '',
  images: item.images || [],
  category: item.category || 'other',
  stock: Number(item.stock) || 0,
  source: 'external',
});

const fetchAllExternalProducts = async () => {
  if (cache.expiresAt > Date.now() && cache.products.length > 0) {
    return cache;
  }

  const response = await fetch(`${DUMMY_PRODUCTS_URL}?limit=0`);
  if (!response.ok) {
    throw new Error('Не удалось получить товары из внешнего API');
  }

  const data = await response.json();
  const products = (data.products || []).map(normalizeExternalProduct);
  const categories = [...new Set(products.map((product) => product.category))];

  cache = {
    products,
    categories,
    expiresAt: Date.now() + CACHE_TTL_MS,
  };

  return cache;
};

module.exports = {
  fetchAllExternalProducts,
  normalizeExternalProduct,
};
