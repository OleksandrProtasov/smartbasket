# SmartBasket - Интернет-магазин

Веб-приложение интернет-магазина с функционалом для пользователей и администраторов.

## Технологии

- Backend: Node.js, Express, PostgreSQL, Sequelize
- Frontend: React, TypeScript, Material-UI
- Аутентификация: JWT

## Функционал

### Для пользователей:
- Просмотр каталога товаров
- Добавление товаров в корзину
- Управление количеством товаров в корзине
- Удаление товаров из корзины

### Для администраторов:
- Управление товарами (добавление, редактирование, удаление)
- Загрузка изображений товаров
- Управление库存 (количеством товаров)

## Установка и запуск

### Предварительные требования
- Node.js (v14 или выше)
- PostgreSQL
- npm или yarn

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/smartbasket-app.git
cd smartbasket-app
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env в корневой директории и добавьте необходимые переменные окружения:
```
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=smartbasket
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

4. Создайте базу данных PostgreSQL:
```sql
CREATE DATABASE smartbasket;
```

### Запуск

1. Запустите сервер:
```bash
npm run dev
```

2. Откройте браузер и перейдите по адресу:
```
http://localhost:5000
```

## API Endpoints

### Аутентификация
- POST /api/auth/register - Регистрация нового пользователя
- POST /api/auth/login - Вход в систему
- GET /api/auth/me - Получение информации о текущем пользователе

### Товары
- GET /api/products - Получение списка всех товаров
- GET /api/products/:id - Получение информации о конкретном товаре
- POST /api/products - Создание нового товара (только для админа)
- PUT /api/products/:id - Обновление товара (только для админа)
- DELETE /api/products/:id - Удаление товара (только для админа)

### Корзина
- GET /api/cart - Получение содержимого корзины
- POST /api/cart - Добавление товара в корзину
- PUT /api/cart/:id - Обновление количества товара в корзине
- DELETE /api/cart/:id - Удаление товара из корзины

## Лицензия

MIT 