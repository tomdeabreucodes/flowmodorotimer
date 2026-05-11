Flowmodoro Timer — a single-page React app (Vite + TypeScript + Tailwind v4 + shadcn/ui) that implements the flowtime technique (flexible Pomodoro variant).

Architecture at a glance:

- Feature-based folders under src/features/: Stopwatch/ (core timer), Break/ (break display), Tasks/ (todo list with dnd-kit), SettingsEditor/ (config modal)
- No router — single view, all in App.tsx
- No global state lib — useSettings hook + useReducer for tasks, both persisted to localStorage
- Theme is the only React Context (theme-provider.tsx)
- Components under src/components/ui/ are shadcn wrappers around Radix primitives

Key scripts: npm run dev (dev server), npm run build (typecheck + build), npm run lint

The entry point is src/main.tsx → App.tsx, which orchestrates the nav, timer, and tasks. Settings flow down via props from useSettings().
