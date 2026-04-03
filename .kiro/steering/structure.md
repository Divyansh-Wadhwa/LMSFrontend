# Project Structure

```
src/
├── app/              # App entry: App.tsx (BrowserRouter), routes.tsx, providers.tsx
├── layouts/          # AppLayout, AuthLayout, WorkspaceLayout
├── features/         # Feature modules (primary code location)
│   ├── auth/         # Login, auth service, useAuthMutation hook
│   ├── dashboard/    # Multiple dashboard variants (SaasDashboard is active)
│   ├── problems/     # Problem explorer, problem solve, hooks, filter components
│   ├── labs/         # Labs hub, lab detail, lab exercise
│   ├── learn/        # Course page, my courses
│   ├── ide/          # Standalone IDE (Monaco-based)
│   ├── assessments/
│   ├── leaderboard/
│   ├── discussion/
│   ├── profile/
│   └── resources/
├── components/
│   ├── ui/           # Reusable primitives: Button, Card, Input, Modal, Select, Badge, Table, Spinner
│   └── shared/       # Layout-level shared components (Sidebar variants, Topbar, PageHeader, EmptyState, ErrorState)
├── hooks/            # Global hooks: useAuth.ts, useDebounce.ts
├── services/         # api.ts (Axios instance + ApiService class + mock data), interceptors.ts
├── store/            # Zustand stores: useAuthStore.ts, useUIStore.ts
├── types/            # common.types.ts (User, Problem, Submission, etc.), api.types.ts
├── utils/            # cn.ts (Tailwind class merge), constants.ts, formatDate.ts
└── styles/           # globals.css, and theme variants (professional, saas, simple)
```

## Key Conventions

- **Feature-first organization**: All feature code lives under `src/features/<feature>/`. Each feature can have its own `components/`, `hooks/`, `services/`, and `pages/` subdirectories.
- **UI primitives**: Generic, reusable UI components go in `src/components/ui/`. They use Tailwind + `cn()` and follow a `variant`/`size` prop pattern (see `Button.tsx`).
- **Hooks**: Feature-specific hooks live inside the feature folder. Global/shared hooks go in `src/hooks/`.
- **Data fetching**: Use TanStack Query (`useQuery`, `useMutation`) for server state. Wrap in a `use<Feature>` hook inside the feature's `hooks/` folder.
- **Global state**: Use Zustand stores in `src/store/`. Keep stores focused — one per domain.
- **Styling approach**: Prefer Tailwind classes. Use `cn()` from `@/utils/cn` to merge conditional classes. Some older/prototype components use inline styles — prefer Tailwind for new work.
- **Multiple design variants**: Several components have multiple visual variants (e.g., `SaasDashboard`, `ProfessionalDashboard`). The active/production variant is wired in `routes.tsx`.
- **Types**: Shared types in `src/types/`. API request/response shapes in `api.types.ts`, domain models in `common.types.ts`.
