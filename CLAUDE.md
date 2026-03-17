# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start Next.js development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Check Prettier formatting
npm run format:fix   # Auto-fix formatting
```

## Tech Stack

- **Framework:** Next.js 13.5 with App Router, React 18.3, TypeScript path aliases (@/*)
- **UI:** NextUI + Tailwind CSS + Material Tailwind + Framer Motion
- **State:** Zustand with localStorage persistence
- **HTTP:** Axios with OAuth interceptor + custom fetch wrapper with token refresh
- **Hardware:** SerialPort for thermal printers, Quagga2/QR scanner for barcodes

## Architecture

### Route Structure
App Router uses layout groups: `app/(layout-app)/` contains authenticated routes (inventory, modules, reports, sales). Auth guard at `app/auth.js` protects routes. Dynamic module routes live under `app/(layout-app)/modules/[module]/`.

### State Management
Zustand stores in `/stores/` are domain-separated (user.js, payment.js, category.js, scanner.js, etc.). Most persist to localStorage via Zustand's persist middleware. Access state outside React via `useStore.getState()`. `stores/common/manage.js` exports a factory for reusable CRUD store slices (error, loading, data, getData, triggerAction).

### API Layer
- All API endpoints are defined in `settings/constants.js`
- **Dual HTTP system:** `services/http.js` provides Axios-based constants (GET/POST/PUT/DELETE/PATCH) used by service files; `utils/http.js` provides a native fetch wrapper with automatic token refresh on 401 and request queuing
- Services in `/services/` use `getData()`/`getDataMultiple()` from `services/http.js`
- Base API: `https://marina-market-api-prod-693121331853.us-central1.run.app`
- Local printer service: `http://localhost:8090/escpos/`

### Module-Local Patterns
Feature modules (sales, inventory, etc.) often contain their own `store.js` and `services.js` colocated alongside components rather than in the top-level `/stores/` and `/services/` directories.

### Component Organization
- `/components/ui/` - Generic UI (charts, tables, loading)
- `/components/Scanner*/` - Barcode/QR scanning components
- `/components/navigation/` - Nav components
- Client components require `'use client'` directive

## Code Style

**Prettier:** Semicolons, single quotes, tabs, no trailing commas

**ESLint:** Extends standard + react/recommended. Disabled: prop-types, react-in-jsx-scope, react-hooks rules.

## Agents

Use the `nextjs-stack-expert` agent proactively for any task involving components, stores, API integration, UI styling, charts, scanning, or printing.

## Key Patterns

1. **Auth Flow:** Token in localStorage → Bearer header → 401 triggers refresh → retry request. Token is set via `setToken()` in `services/account.js`, which also broadcasts a `postMessage('refreshToken')` for cross-context sync.
2. **Navigation Loading:** Route transitions dispatch a `navigation-start` custom event; `app/(layout-app)/layout.js` listens to show a loading overlay with Framer Motion.
3. **Number Formatting:** Chilean peso (CLP) formatting utilities in `utils/number.js` — use `formatterNumber()` / `roundPrice()` for all currency display.
4. **Theming:** NextUI + next-themes for dark mode, custom Tailwind palette (primary, secondary, custom colors)
5. **Hardware:** ScannerDetection component in providers.js detects barcode scanners at app level; sales are disabled on mobile devices
6. **No test suite** — there are no automated tests in this project.
