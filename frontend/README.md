# SmartBasket Frontend

Next.js App Router client configured for static export and GitHub Pages deployment.

## Local Development

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Environment Variables

Create `frontend/.env.local` from `.env.example`.

- `NEXT_PUBLIC_API_URL` - backend API base URL
- `NEXT_PUBLIC_BASE_PATH` - optional base path for static hosting (empty for local)

## Build

```bash
npm run build
```

The static website output is generated in `frontend/out`.

## GitHub Pages Deployment

Automatic deployment is configured via `.github/workflows/deploy-frontend-gh-pages.yml`.

Required repo settings:

1. In **Settings -> Pages**, set source to **GitHub Actions**.
2. In **Settings -> Secrets and variables -> Actions -> Variables**, create:
   - `NEXT_PUBLIC_API_URL` = your public backend URL (for example `https://your-backend.onrender.com/api`)

On every push to `master`, the frontend is built and published to GitHub Pages.
