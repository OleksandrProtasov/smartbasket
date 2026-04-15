# SmartBasket Mini Shop
Modern e-commerce app with a Next.js storefront, Express API, product aggregation, and GitHub Pages + Render deployment flow.

Live demo: https://oleksandrprotasov.github.io/smartbasket/

## What is inside
- Product catalog with search, category filters, sorting, and pagination.
- Product details page with recommendations.
- Cart with quantity editing, coupons, and shipping threshold logic.
- Wishlist, recent views, and product comparison mode.
- Auth flows (register/login) and demo checkout.
- Unified API response format with backend validation.
- Responsive UI with orange-accent design and EUR pricing.

## Stack
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS.
- State/Data: Zustand, React Query.
- Backend: Node.js, Express, Sequelize, PostgreSQL.
- External catalog source: DummyJSON API with local DB fallback.
- Deployment: GitHub Pages (frontend static export) + Render (backend + PostgreSQL).

## Local setup
Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Create environment files:
- Root: copy `.env.example` to `.env`
- Frontend: copy `frontend/.env.example` to `frontend/.env.local`

Run backend:

```bash
npm run dev
```

Run frontend:

```bash
cd frontend
npm run dev
```

Local URLs:
- API: `http://localhost:5000`
- Web: `http://localhost:3000`

## Scripts
Backend:
- `npm run dev` - run backend in development mode
- `npm start` - run backend in production mode
- `npm test` - run backend tests

Frontend:
- `cd frontend && npm run dev` - run Next.js dev server
- `cd frontend && npm run build` - create static production build (`frontend/out`)
- `cd frontend && npm run smoke` - run production build smoke check

## Deployment notes
- Frontend is configured for GitHub Pages via `.github/workflows/deploy-frontend-gh-pages.yml`.
- In GitHub repo settings, set **Pages -> Source = GitHub Actions**.
- Set repository variable:
  - `NEXT_PUBLIC_API_URL=https://smartbasket-api.onrender.com/api`
- Backend is configured for Render via `render.yaml` (Blueprint deploy).
- Project data for wishlist/cart/recent views is persisted in browser local storage.