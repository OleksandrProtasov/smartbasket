# SmartBasket - Online Store

Web application for an online store with functionality for users and administrators.

## Technologies

- Backend: Node.js, Express, PostgreSQL, Sequelize
- Frontend: React, TypeScript, Material-UI
- Authentication: JWT

## Features

### For Users:
- Browse product catalog
- Add products to cart
- Manage product quantities in cart
- Remove products from cart

### For Administrators:
- Product management (add, edit, delete)
- Upload product images
- Manage inventory (product quantities)

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/smartbasket-app.git
cd smartbasket-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add the necessary environment variables:
```
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=smartbasket
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

4. Create a PostgreSQL database:
```sql
CREATE DATABASE smartbasket;
```

### Running the Application

1. Start the server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login to the system
- GET /api/auth/me - Get current user information

### Products
- GET /api/products - Get list of all products
- GET /api/products/:id - Get information about a specific product
- POST /api/products - Create a new product (admin only)
- PUT /api/products/:id - Update a product (admin only)
- DELETE /api/products/:id - Delete a product (admin only)

### Cart
- GET /api/cart - Get cart contents
- POST /api/cart - Add a product to cart
- PUT /api/cart/:id - Update product quantity in cart
- DELETE /api/cart/:id - Remove a product from cart

## License

MIT 