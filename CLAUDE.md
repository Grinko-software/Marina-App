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
App Router uses layout groups: `app/(layout-app)/` contains authenticated routes (inventory, modules, reports, sales). Auth guard at `app/auth.js` protects routes.

### State Management
Zustand stores in `/stores/` are domain-separated (user.js, payment.js, category.js, scanner.js, etc.). User store persists to localStorage. Access state outside React via `useStore.getState()`.

### API Layer
- Services in `/services/` wrap API calls
- HTTP utilities in `/utils/http.js` handle token refresh on 401
- Base API: `https://marina-market-api-prod-693121331853.us-central1.run.app`
- Local printer service: `http://localhost:8090/escpos/`

### Component Organization
- `/components/ui/` - Generic UI (charts, tables, loading)
- `/components/Scanner*/` - Barcode/QR scanning components
- `/components/navigation/` - Nav components
- Client components require `'use client'` directive

## Code Style

**Prettier:** Semicolons, single quotes, tabs, no trailing commas

**ESLint:** Extends standard + react/recommended. Disabled: prop-types, react-in-jsx-scope, react-hooks rules.

## Key Patterns

1. **Auth Flow:** Token in localStorage → Bearer header → 401 triggers refresh → retry request
2. **Theming:** NextUI + next-themes for dark mode, custom Tailwind palette (primary, secondary, custom colors)
3. **Hardware:** ScannerDetection component in providers.js detects barcode scanners at app level
