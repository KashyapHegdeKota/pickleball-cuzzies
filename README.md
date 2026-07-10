# Pickleball Cuzzies

A mobile-first React companion for fair pickleball rotations, live scoring,
bench management, and session standings. The interface is built with Tailwind
CSS and is designed for quick, one-handed use courtside.

## Included features

- Tournament-style multi-court rounds and one-match rotation mode.
- Manual roster entry plus comma/newline-separated group-chat imports.
- Good, Mid, and Ass skill tiers with numeric balancing weights.
- Fair matchup generation that minimizes opposing team skill deltas.
- Strict priority for low-match-count and longest-waiting players.
- Large touch-friendly live score controls and idempotent match completion.
- A longest-wait-first bench queue and real-time leaderboard bottom sheet.
- Device-local session persistence and a safe full-session reset flow.
- iOS/Android safe areas, reduced-motion support, and accessible focus states.

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm ci
npm run dev
npm run build
```

The app is available at `http://localhost:3000` during development.

## Project structure

- `app/` contains the application entry point, metadata, and global styles.
- `components/` contains welcome, onboarding, dashboard, and shared UI.
- `hooks/useLocalStorage.ts` owns resilient browser persistence.
- `lib/` contains pure parsing, queueing, scoring, and matchmaking logic.
- `types/game.ts` is the shared state contract.
- `tailwind.config.mjs` defines the reusable court-dark design tokens.

All roster, round, score, history, and leaderboard state remains on the current
device under the `pickleball-cuzzies:session` local-storage key.

## Quality checks

```bash
npm run lint
npm test
```

`npm test` runs a production build, server-render verification, and deterministic
tests for parsing, skill weights, wait priority, fair teams, round generation,
and result transactions.
