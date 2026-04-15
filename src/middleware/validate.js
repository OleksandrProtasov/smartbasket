const { sendError } = require('../utils/apiResponse');

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const validateProductQuery = (req, res, next) => {
  const {
    page = '1',
    limit = '12',
    minPrice,
    maxPrice,
    sortBy = 'newest',
    order = 'desc',
  } = req.query;

  const parsedPage = parseNumber(page, 1);
  const parsedLimit = parseNumber(limit, 12);
  const parsedMin = minPrice !== undefined ? parseNumber(minPrice, NaN) : undefined;
  const parsedMax = maxPrice !== undefined ? parseNumber(maxPrice, NaN) : undefined;

  const validSortBy = ['newest', 'price', 'rating', 'title'];
  const validOrder = ['asc', 'desc'];

  if (parsedPage < 1 || parsedLimit < 1 || parsedLimit > 100) {
    return sendError(res, 400, 'Некорректные параметры пагинации');
  }

  if ((parsedMin !== undefined && Number.isNaN(parsedMin)) || (parsedMax !== undefined && Number.isNaN(parsedMax))) {
    return sendError(res, 400, 'minPrice и maxPrice должны быть числами');
  }

  if (parsedMin !== undefined && parsedMax !== undefined && parsedMin > parsedMax) {
    return sendError(res, 400, 'minPrice не может быть больше maxPrice');
  }

  if (!validSortBy.includes(sortBy)) {
    return sendError(res, 400, `sortBy должен быть одним из: ${validSortBy.join(', ')}`);
  }

  if (!validOrder.includes(order)) {
    return sendError(res, 400, `order должен быть одним из: ${validOrder.join(', ')}`);
  }

  req.validatedQuery = {
    page: parsedPage,
    limit: parsedLimit,
    minPrice: parsedMin,
    maxPrice: parsedMax,
    sortBy,
    order,
    q: req.query.q || '',
    category: req.query.category || '',
  };

  next();
};

const validateAuthBody = (req, res, next) => {
  const { email, password, name } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Некорректный email');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Пароль должен содержать минимум 6 символов');
  }

  if (req.path === '/register' && (!name || typeof name !== 'string' || name.trim().length < 2)) {
    errors.push('Имя должно содержать минимум 2 символа');
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Ошибка валидации', errors);
  }

  next();
};

module.exports = {
  validateProductQuery,
  validateAuthBody,
};
