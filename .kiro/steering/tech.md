# Tech Stack

## Core
- **Framework**: React 18 with TypeScript (strict mode)
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v3 with `clsx` + `tailwind-merge` via `cn()` utility
- **Routing**: React Router v7
- **State Management**: Zustand v5 (with `persist` middleware for auth)
- **Server State / Data Fetching**: TanStack React Query v5
- **HTTP Client**: Axios (instance at `src/services/api.ts`, base URL `http://localhost:5000`)
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)

## TypeScript Config
- Strict mode enabled (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- Path aliases configured — always use them:
  - `@/components/*`, `@/features/*`, `@/hooks/*`, `@/services/*`
  - `@/store/*`, `@/types/*`, `@/utils/*`, `@/layouts/*`

## Auth
- JWT-based with access + refresh tokens
- Stored in Zustand (`useAuthStore`) with `localStorage` persistence via `persist` middleware
- Axios interceptor auto-attaches `Authorization: Bearer <token>` and handles 401 refresh

## Common Commands
```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build (uses npx vite build)
npm run preview   # Preview production build
```

No test runner is configured yet.
