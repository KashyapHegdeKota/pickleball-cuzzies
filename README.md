# Pickleball Cuzzies

A mobile-first React companion for fair pickleball rotations, live scoring,
bench management, and session standings. The interface is built with Tailwind
CSS and is designed for quick, one-handed use courtside.

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm ci
npm run dev
npm run build
```

## Project structure

- `app/` contains the application entry point, metadata, and global styles.
- `components/layout/` contains shared mobile-safe layout primitives.
- `tailwind.config.mjs` defines the reusable court-dark design tokens.
- Application behavior will remain client-side and persist locally in the
  browser.

## Quality checks

```bash
npm run lint
npm test
```
