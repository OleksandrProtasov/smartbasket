# SmartBasket Mini Shop

Современный мини интернет-магазин с backend на Express/PostgreSQL и frontend на Next.js.

## Стек

- Backend: Node.js, Express, Sequelize, PostgreSQL, JWT
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS
- Данные каталога: DummyJSON Products API + локальный fallback
- Состояние клиента: React Query + Zustand

## Основные возможности

- Каталог товаров с поиском, фильтрацией, сортировкой и пагинацией
- Карточка товара с рекомендациями
- Корзина с купонами и расчетом доставки
- Wishlist и недавние просмотры
- Регистрация/вход и demo checkout
- Единый формат API-ответов и валидация query/body

## Установка

1) Установить зависимости backend:

```bash
npm install
```

2) Установить зависимости frontend:

```bash
cd frontend
npm install
```

3) Создать `.env` из `.env.example` в корне проекта.

4) Создать БД:

```sql
CREATE DATABASE smartbasket;
```

## Запуск

Backend:

```bash
npm run dev
```

Frontend (в отдельном терминале):

```bash
cd frontend
npm run dev
```

Доступ:

- API: `http://localhost:5000`
- Web: `http://localhost:3000`

## Deploy

### GitHub Pages (frontend)

Frontend настроен на статический экспорт и автодеплой через GitHub Actions:

- Workflow: `.github/workflows/deploy-frontend-gh-pages.yml`
- В `Settings -> Pages` выберите `GitHub Actions`
- В `Settings -> Secrets and variables -> Actions -> Variables` добавьте:
  - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>/api`

После push в `master` сайт публикуется на GitHub Pages.

### Backend (обязательно отдельно)

GitHub Pages не запускает Node.js API, поэтому backend нужно деплоить на отдельный хост (Render/Railway/Fly.io).
После деплоя backend укажите его URL в `NEXT_PUBLIC_API_URL` для frontend workflow.

### Render (рекомендуемый для backend)

В репозитории добавлен `render.yaml`, поэтому можно сделать deploy как Blueprint:

1. Откройте [Render Dashboard](https://dashboard.render.com/) -> `New` -> `Blueprint`.
2. Выберите репозиторий `smartbasket`.
3. Render автоматически создаст:
   - PostgreSQL: `smartbasket-db`
   - Web Service: `smartbasket-api`
4. Дождитесь статуса `Live`.
5. Возьмите URL сервиса вида `https://smartbasket-api.onrender.com`.
6. В GitHub Variables установите:
   - `NEXT_PUBLIC_API_URL=https://smartbasket-api.onrender.com/api`

После следующего push в `master` GitHub Pages frontend будет работать с Render backend.

## Тесты

Backend API:

```bash
npm test
```

Frontend smoke:

```bash
cd frontend
npm run smoke
```

## Основные API маршруты

- `GET /api/products` — каталог с query: `page`, `limit`, `q`, `category`, `sortBy`, `order`
- `GET /api/products/categories` — категории
- `GET /api/products/:id` — детальная карточка товара
- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — вход
- `GET /api/cart` — корзина пользователя