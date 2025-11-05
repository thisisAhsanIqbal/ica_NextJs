# ICA Next.js

This is a Next.js 16 + React 19 project using the App Router and TypeScript.

## Tech stack
- Next.js 16
- React 19
- TypeScript 5

## Local development
1) Install dependencies:
```bash
npm install
```
2) Start dev server:
```bash
npm run dev
```
3) Build and run production locally:
```bash
npm run build
npm start
```

## NPM scripts
- `dev`: Start Next dev server
- `build`: Production build
- `start`: Run built app
- `lint`: Run Next lint

## Branching model
- `main`: active development
- `production`: live release branch (deploys to Vercel production when configured)

To create/update `production` from the latest `main`:
```bash
git checkout main
git pull
git checkout -B production
git push -u origin production
```

## Deployment (Vercel)
This repo is intended to deploy on Vercel via Git integration.

- Connect repo: Import `thisisAhsanIqbal/ica_NextJs` in Vercel.
- Set Project Settings → Git → Production Branch to `production` (or keep `main` if preferred).
- Each push to the production branch will trigger a production deployment. Other branches create Preview deployments.

If using CLI locally (optional):
```bash
# Deploy interactively (preview)
npx vercel
# Promote to production
yarn vercel --prod # or: npx vercel --prod
```

## Environment variables
Add secrets in Vercel → Project Settings → Environment Variables. Re-deploy after changes.

## Repository
- GitHub: https://github.com/thisisAhsanIqbal/ica_NextJs

