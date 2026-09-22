# bci-website

Public marketing site for Business College International (BCI): about the
school, programmes (KG-JHS-SHS, with the four SHS courses - Agric, General
Arts, Business, Home Economics - and their electives), admissions info,
news/announcements, and contact details.

The "Apply Now" flow submits to the same `bci-backend-api` application
endpoint used by the mobile app, so applications are unified regardless of
where they come from.

## Stack

Vite + React + TypeScript. Intentionally separate from `bci-web-portal` -
different audience, mostly no auth required.

## Getting started

```bash
npm install
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
```

The GitHub Actions workflow runs both checks for pull requests.

## Vercel deployment

The repository is designed for a Vercel Git deployment with:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Production environment variable: `VITE_API_BASE_URL`

Set `VITE_API_BASE_URL` to the public `bci-backend-api` base URL, including
the `/api/v1` path. Do not commit secrets or environment-specific credentials.
