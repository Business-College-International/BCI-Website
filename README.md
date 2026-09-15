# bci-website

Public marketing site for Business College International (BCI): about the
school, programmes (KG–JHS–SHS, with the four SHS courses — Agric, General
Arts, Business, Home Economics — and their electives), admissions info,
news/announcements, and contact details.

The "Apply Now" flow submits to the same `bci-backend-api` application
endpoint used by the mobile app, so applications are unified regardless of
where they come from.

## Stack
Vite + React + TypeScript. Intentionally separate from `bci-web-portal` —
different audience, mostly no auth required.

## Getting started
```bash
npm install
npm run dev
```
