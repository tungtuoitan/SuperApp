# Frontend Best Practices Guide

This guide outlines comprehensive best practices for developing and maintaining a React frontend application using TypeScript, Material-UI (MUI), and @mui/x-data-grid. It covers code structure, naming conventions, coding styles, performance optimizations, testing, documentation, and more. The goal is to ensure scalability (up to 1000 users), maintainability, developer experience, and readability for both developers and AI tools (e.g., Claude, GitHub Copilot). Use this as a reference to review and refactor your source code.

## 1. Project Structure

A well-organized folder structure promotes modularity, makes navigation easier, and supports scalability. For a React app with features like a CRUD grid and detail dialog, follow this structure:

```
src/
├── assets/               # Static files like images, fonts
│   └── images/
├── components/           # Reusable UI components
│   ├── common/           # Shared across the app (e.g., Button, Loader)
│   ├── NotesGrid/        # Feature-specific (e.g., grid with pagination, filtering)
│   └── NoteDetailDialog/ # Feature-specific (e.g., CRUD dialog)
├── hooks/                # Custom React hooks (e.g., useNotesQuery)
├── pages/                # Top-level pages or routes (e.g., NotesPage.tsx)
├── services/             # API services or utilities (e.g., api.ts for RTK Query)
├── store/                # State management (e.g., Redux slices)
│   ├── slices/           # Redux Toolkit slices
│   └── api/              # API endpoints if using RTK Query
├── types/                # TypeScript interfaces and types (e.g., INote.ts)
├── utils/                # Helper functions (e.g., dateFormat.ts, validators.ts)
├── styles/               # Global styles or themes (e.g., theme.ts for MUI)
├── App.tsx               # Main app entry
├── index.tsx             # Root render
├── vite.config.ts        # Build config (if using Vite)
└── tsconfig.json         # TypeScript config
```

- **Best Practices**:
  - Group by feature (e.g., `NotesGrid/` contains its component, styles, and tests) to keep related files together.
  - Avoid deep nesting; aim for 2-3 levels max.
  - Use index exports (e.g., `index.ts` in folders) for cleaner imports: `import { NotesGrid } from '@/components/NotesGrid';`.
  - Separate concerns: UI in `components/`, logic in `hooks/` or `utils/`, data in `store/`.

## 2. Naming Conventions

Consistent naming improves readability and reduces cognitive load. Use these rules:

- **Files and Folders**:
  - Kebab-case for folders (e.g., `note-detail-dialog/`).
  - PascalCase for component files (e.g., `NotesGrid.tsx`).
  - CamelCase for utility files (e.g., `dateUtils.ts`).

- **Components and Variables**:
  - PascalCase for React components (e.g., `NotesGrid`, `NoteDetailDialog`).
  - CamelCase for variables, functions, and hooks (e.g., `fetchNotes`, `useNotesQuery`).
  - Uppercase snake_case for constants (e.g., `API_BASE_URL`).

- **TypeScript Types**:
  - Prefix interfaces with `I` (e.g., `INote`, `ITag`).
  - Use descriptive names (e.g., `NoteProps` for component props).

- **CSS/MUI Styles**:
  - CamelCase for class names in `makeStyles` or `sx` props (e.g., `gridContainer`).
  - Use meaningful names avoiding abbreviations unless common (e.g., `btn` for button).

- **Best Practices**:
  - Be descriptive: Prefer `handleNoteSubmit` over `handleSubmit`.
  - Avoid single-letter variables except in loops (e.g., `i` for index).
  - Use plural for arrays (e.g., `notes: INote[]`).
  - For MUI, follow their naming (e.g., `dataGrid` for @mui/x-data-grid classes).

## 3. Coding Style and Patterns

- **Component Design**:
  - Favor functional components with hooks over classes.
  - Keep components small (<200 lines); extract sub-components if needed.
  - Use composition: Build complex UIs from simple components (e.g., `NoteForm` inside `NoteDetailDialog`).
  - For @mui/x-data-grid: Customize with `components` prop for slots like toolbar, and use `processRowUpdate` for editing.

- **State Management**:
  - Use local state (`useState`) for simple components.
  - Adopt Redux Toolkit or Zustand for global state; prefer RTK Query for API data to handle caching, loading, and optimistic updates.
  - Avoid prop drilling; use context for themes or auth.

- **Data Fetching and Flow**:
  - Use RTK Query or React Query for API calls: Define endpoints in `apiSlice.ts` (e.g., `getNotes: builder.query({ query: (params) => `/notes?...` })`.
  - Implement optimistic updates for CRUD to improve UX.
  - For grid: Server-side pagination/filtering/sorting via API params to handle large datasets efficiently.

- **Error Handling and Validation**:
  - Use `try-catch` for async operations; display errors with MUI Snackbar.
  - Client-side validation with libraries like Yup or react-hook-form (e.g., integrate with MUI TextField).
  - Handle API errors globally in RTK Query middleware.

- **Performance Optimizations**:
  - Memoize components with `React.memo` if props are stable.
  - Use `useCallback`/`useMemo` for functions/values in dependencies.
  - For @mui/x-data-grid: Enable virtualization, lazy loading, and debounce filters.
  - Code-split routes with `React.lazy` and Suspense.
  - Minimize re-renders: Use Redux selectors wisely.

- **Accessibility (a11y)**:
  - Use semantic HTML where possible (e.g., `aria-label` on MUI components).
  - Ensure keyboard navigation in grid and dialog.
  - Follow WCAG: Contrast ratios, alt text for images.

- **Internationalization (i18n)**:
  - Use react-i18next if needed; prepare strings for translation.

## 4. TypeScript Usage

- **Strict Mode**: Enable in `tsconfig.json` (`strict: true`).
- **Types**:
  - Type all props, state, and functions (e.g., `interface NotesGridProps { page: number; }`).
  - Use generics for reusable components (e.g., `DataGrid<INote>`).
  - Avoid `any`; use `unknown` when unsure.
- **Best Practices**:
  - Create shared types in `types/` (e.g., `INote { id: string; title: string; content: string; }`).
  - Type API responses to match backend DTOs.
  - Use utility types like `Partial<INote>` for forms.

## 5. MUI and Styling

- **Theme**: Define a custom theme in `styles/theme.ts` (e.g., `createTheme({ palette: { primary: { main: '#1976d2' } } })`).
- **Styling Methods**:
  - Prefer `sx` prop for inline styles.
  - Use `styled` from `@mui/material` for custom components.
  - Avoid global CSS; scope styles to components.
- **@mui/x-data-grid**:
  - Customize columns with `GridColDef` (e.g., `{ field: 'title', headerName: 'Title', sortable: true }`).
  - Enable features: `paginationMode='server'`, `filterMode='server'`.
- **Best Practices**:
  - Responsive design: Use MUI's breakpoints (e.g., `xs`, `sm` in Grid).
  - Consistent spacing: Use theme's `spacing` function.

## 6. Testing

- **Tools**: Jest + React Testing Library for unit/integration; Playwright for e2e.
- **Coverage**:
  - Unit test components (e.g., render `NotesGrid` and assert rows).
  - Integration test data flow (e.g., mock API in RTK Query).
  - e2e test user flows (e.g., open dialog, submit form).
- **Best Practices**:
  - Test behavior, not implementation (e.g., query by role/text).
  - Aim for 80%+ coverage; mock external deps.
  - Run tests in CI/CD.

## 7. Documentation and Readability

- **Comments**:
  - Use JSDoc for all components/hooks (e.g., `/** Renders a notes grid with pagination. @param {number} page - Current page */`).
  - Explain why, not what (e.g., "Optimizes re-renders by memoizing callback").
- **README**: Include setup, architecture overview, conventions.
- **Best Practices**:
  - Keep code self-documenting with good names.
  - Use tools like TypeDoc for generating docs.
  - Ensure AI-friendly: Descriptive JSDoc aids Copilot suggestions.

## 8. Automation and Tools

- **Linting/Formatting**: ESLint with react-hooks plugin; Prettier for formatting.
- **CI/CD**: GitHub Actions – lint, test, build on push.
- **Build Tool**: Vite for faster development.
- **Best Practices**:
  - Husky + lint-staged for pre-commit hooks.
  - Dependabot for dependency updates.

## 9. Security and Best Practices

- Sanitize inputs to prevent XSS (e.g., use DOMPurify for user content).
- Use HTTPS for APIs.
- Handle auth tokens securely (e.g., HttpOnly cookies if needed).
- Follow OWASP guidelines for web apps.

## 10. Refactoring Tips

- Start with structure: Move files to folders.
- Enforce conventions: Update names, add types.
- Optimize: Profile with React DevTools, fix bottlenecks.
- Document incrementally: Add JSDoc as you go.
- Test changes: Ensure no regressions.

This guide ensures your frontend is professional, scalable, and interview-ready. Compare your code against these practices and refactor step-by-step.