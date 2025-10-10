# 🏗️ ARCHITECTURE - System Design & Structure

> **Philosophy**: Feature-first, domain-driven architecture with clear boundaries

---

## 📐 System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Components  │  │    Pages     │  │   Layouts    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT LAYER                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ React Query  │  │   Context    │  │  useState    │      │
│  │ (Server)     │  │ (Global UI)  │  │  (Local)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       BUSINESS LOGIC LAYER                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Services   │  │    Hooks     │  │    Utils     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                        DATA ACCESS LAYER                     │
│  ┌──────────────────────────────────────────────────┐       │
│  │              API Client (Axios/Fetch)            │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
                      Backend API
```

---

## 📁 Complete Folder Structure

```
src/
├── features/                          # Feature modules (domain-driven)
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   └── index.ts
│   │   │   └── AuthGuard/
│   │   ├── hooks/
│   │   │   ├── useAuth.ts             # React Query hooks
│   │   │   └── useAuthActions.ts      # Mutation hooks
│   │   ├── services/
│   │   │   └── authService.ts         # Business logic + API
│   │   ├── store/
│   │   │   └── AuthContext.tsx        # Global auth state
│   │   ├── types/
│   │   │   └── auth.types.ts          # Auth domain types
│   │   └── index.ts                   # Public exports
│   │
│   └── notes/
│       ├── components/
│       │   ├── NoteGrid/
│       │   │   ├── NoteGrid.tsx
│       │   │   ├── NoteGrid.hooks.ts  # Component-specific hooks
│       │   │   ├── NoteGrid.utils.ts  # Component-specific utils
│       │   │   ├── NoteGrid.types.ts
│       │   │   └── index.ts
│       │   ├── NoteCard/
│       │   ├── NoteDialog/
│       │   └── NoteForm/
│       ├── hooks/
│       │   ├── useNotes.ts            # Query hook
│       │   ├── useNote.ts             # Single item query
│       │   ├── useCreateNote.ts       # Mutation hooks
│       │   ├── useUpdateNote.ts
│       │   └── useDeleteNote.ts
│       ├── services/
│       │   └── noteService.ts         # Business logic layer
│       ├── store/
│       │   └── NoteUIContext.tsx      # Feature UI state
│       ├── types/
│       │   ├── note.types.ts          # Domain models
│       │   └── note.dto.ts            # API DTOs
│       └── index.ts                   # Feature public API
│
├── shared/                            # Shared across features
│   ├── components/
│   │   ├── ui/                        # Pure UI components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Spinner/
│   │   ├── data-display/              # Data components
│   │   │   ├── DataGrid/
│   │   │   ├── Table/
│   │   │   └── Card/
│   │   └── feedback/                  # Feedback components
│   │       ├── Alert/
│   │       ├── Toast/
│   │       └── ErrorBoundary/
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── useDisclosure.ts           # Generic open/close state
│   │
│   ├── services/
│   │   └── storageService.ts          # localStorage wrapper
│   │
│   ├── types/
│   │   ├── common.types.ts            # Shared types
│   │   └── api.types.ts               # Generic API types
│   │
│   └── utils/
│       ├── format.ts                  # Date, currency formatting
│       ├── validation.ts              # Validators
│       └── helpers.ts                 # Generic helpers
│
├── lib/                               # Third-party library setup
│   ├── react-query.ts                 # QueryClient config
│   ├── api-client.ts                  # Axios/Fetch instance
│   ├── theme.ts                       # MUI theme
│   └── router.ts                      # React Router setup
│
├── config/                            # Application configuration
│   ├── env.ts                         # Environment variables
│   ├── constants.ts                   # App-wide constants
│   └── routes.ts                      # Route definitions
│
├── layouts/                           # Layout components
│   ├── AppLayout/
│   ├── AuthLayout/
│   └── DashboardLayout/
│
├── pages/                             # Route pages (thin layer)
│   ├── HomePage.tsx
│   ├── NotesPage.tsx
│   └── LoginPage.tsx
│
├── App.tsx                            # Root component
├── main.tsx                           # Entry point
└── vite-env.d.ts                      # Vite types
```

---

## 🎯 Feature Module Structure

### Anatomy of a Feature

```
features/notes/
│
├── components/              # UI Components
│   ├── NoteGrid/           # Complex component (folder)
│   │   ├── NoteGrid.tsx
│   │   ├── NoteGrid.hooks.ts
│   │   ├── NoteGrid.utils.ts
│   │   ├── NoteGrid.types.ts
│   │   └── index.ts
│   │
│   └── NoteCard.tsx        # Simple component (file)
│
├── hooks/                  # React Query hooks
│   ├── useNotes.ts         # GET /notes (list)
│   ├── useNote.ts          # GET /notes/:id (single)
│   ├── useCreateNote.ts    # POST /notes
│   ├── useUpdateNote.ts    # PUT /notes/:id
│   └── useDeleteNote.ts    # DELETE /notes/:id
│
├── services/               # Business logic
│   └── noteService.ts      # All API calls + transformations
│
├── store/                  # Feature state (UI only)
│   └── NoteUIContext.tsx   # Dialogs, filters, pagination
│
├── types/                  # Type definitions
│   ├── note.types.ts       # Domain model: Note interface
│   └── note.dto.ts         # API DTOs: CreateNoteDTO, etc.
│
└── index.ts                # Public API
    export * from './components'
    export * from './hooks'
    export { noteService } from './services/noteService'
    export * from './types'
```

---

## 📊 Layer Responsibilities

### 1. Presentation Layer (Components)

**Responsibilities:**
- Render UI
- Handle user interactions
- Display loading/error states
- NO business logic
- NO API calls

**Example:**
```typescript
// features/notes/components/NoteCard.tsx
interface NoteCardProps {
    note: Note
    onClick?: (note: Note) => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
    return (
        <Card onClick={() => onClick?.(note)}>
            <Typography>{note.name}</Typography>
            <Typography variant="body2">{note.description}</Typography>
        </Card>
    )
}
```

---

### 2. State Management Layer

**Responsibilities:**
- Manage server state (React Query)
- Manage global UI state (Context)
- Cache invalidation
- Optimistic updates
- NO rendering logic

**Example:**
```typescript
// features/notes/hooks/useNotes.ts
export function useNotes(params?: GetNotesParams) {
    return useQuery({
        queryKey: ['notes', params],
        queryFn: () => noteService.getNotes(params),
        staleTime: 5 * 60 * 1000,
    })
}
```

---

### 3. Business Logic Layer (Services)

**Responsibilities:**
- API communication
- Data transformation
- Business rules
- NO React hooks
- NO UI logic

**Example:**
```typescript
// features/notes/services/noteService.ts
class NoteService {
    async getNotes(params?: GetNotesParams): Promise<Note[]> {
        const response = await apiClient.get<ApiResponse<NoteDTO[]>>('/notes', { params })
        return response.data.map(this.transformNote)
    }
    
    private transformNote(dto: NoteDTO): Note {
        return {
            ...dto,
            createdAt: new Date(dto.createdAt),
        }
    }
}

export const noteService = new NoteService()
```

---

### 4. Data Access Layer (API Client)

**Responsibilities:**
- HTTP requests
- Request/response interceptors
- Authentication headers
- Error transformation
- NO business logic

**Example:**
```typescript
// lib/api-client.ts
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
```

---

## 🔄 Data Flow Examples

### Example 1: Fetching Data

```
User clicks "Notes" page
         ↓
Component renders
         ↓
useNotes() hook called
         ↓
React Query checks cache
         ↓
If stale, calls noteService.getNotes()
         ↓
Service calls apiClient.get('/notes')
         ↓
API Client adds auth header, sends request
         ↓
Backend returns data
         ↓
Service transforms DTO → Domain Model
         ↓
React Query caches result
         ↓
Component receives data and renders
```

### Example 2: Creating Data

```
User fills form and clicks "Save"
         ↓
Component calls createNote.mutateAsync()
         ↓
Mutation hook calls noteService.createNote()
         ↓
Service calls apiClient.post('/notes', data)
         ↓
Backend creates note and returns it
         ↓
Service transforms response
         ↓
onSuccess callback invalidates cache
         ↓
React Query refetches notes list
         ↓
Component shows updated list
```

---

## 🎨 Component Organization

### Simple vs Complex Components

#### Simple Component (Single File)
```typescript
// shared/components/ui/Button/Button.tsx
interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
    return (
        <MuiButton 
            onClick={onClick}
            variant={variant === 'primary' ? 'contained' : 'outlined'}
        >
            {children}
        </MuiButton>
    )
}
```

#### Complex Component (Folder)
```typescript
// features/notes/components/NoteGrid/
NoteGrid/
  ├── NoteGrid.tsx           # Main component
  ├── NoteGrid.hooks.ts      # Local hooks
  ├── NoteGrid.utils.ts      # Helper functions
  ├── NoteGrid.types.ts      # Type definitions
  └── index.ts               # Public exports

// NoteGrid.tsx
import { useNoteGridData } from './NoteGrid.hooks'
import { formatNoteDate } from './NoteGrid.utils'
import type { NoteGridProps } from './NoteGrid.types'

export function NoteGrid(props: NoteGridProps) {
    const { notes, isLoading } = useNoteGridData(props.filters)
    // ... component logic
}

// NoteGrid.hooks.ts (component-specific hooks)
export function useNoteGridData(filters: NoteFilters) {
    const { data: notes, isLoading } = useNotes(filters)
    const { deleteNote } = useDeleteNote()
    
    return { notes, isLoading, deleteNote }
}

// NoteGrid.utils.ts (component-specific utilities)
export function formatNoteDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US').format(date)
}
```

---

## 🗂️ File Naming Rules

### Components
```typescript
// PascalCase for component files
NoteCard.tsx
LoginForm.tsx
UserProfile.tsx

// Folder for complex components
NoteGrid/
  ├── NoteGrid.tsx
  └── index.ts
```

### Hooks
```typescript
// camelCase with 'use' prefix
useNotes.ts          // Query hook
useCreateNote.ts     // Mutation hook
useNoteFilters.ts    // Custom hook
```

### Services
```typescript
// camelCase with 'Service' suffix
noteService.ts
authService.ts
storageService.ts
```

### Types
```typescript
// camelCase with '.types.ts' suffix for domain models
note.types.ts        // Note, NoteStatus, etc.
note.dto.ts          // CreateNoteDTO, UpdateNoteDTO
auth.types.ts        // User, AuthState, etc.
```

### Utilities
```typescript
// camelCase, descriptive names
format.ts            // formatDate, formatCurrency
validation.ts        // validateEmail, validatePassword
helpers.ts           // General helpers
```

---

## 📦 Module Boundaries

### Feature Module Exports

```typescript
// features/notes/index.ts - Feature public API
// Components
export { NoteGrid } from './components/NoteGrid'
export { NoteCard } from './components/NoteCard'
export { NoteDialog } from './components/NoteDialog'

// Hooks
export { useNotes } from './hooks/useNotes'
export { useCreateNote } from './hooks/useCreateNote'
export { useUpdateNote } from './hooks/useUpdateNote'

// Service (for testing or advanced usage)
export { noteService } from './services/noteService'

// Types
export type { Note, CreateNoteDTO, UpdateNoteDTO } from './types/note.types'

// Context
export { NoteUIProvider, useNoteUI } from './store/NoteUIContext'
```

### Usage in Other Features

```typescript
// ✅ GOOD: Import from feature public API
import { NoteCard, useNotes } from '@/features/notes'

// ❌ BAD: Import from internal files
import { NoteCard } from '@/features/notes/components/NoteCard'
import { useNotes } from '@/features/notes/hooks/useNotes'
```

---

## 🔗 Dependencies Between Layers

### Allowed Dependencies

```
Presentation → State Management ✅
Presentation → Business Logic ✅
State Management → Business Logic ✅
Business Logic → Data Access ✅

Data Access → Business Logic ❌
Business Logic → Presentation ❌
State Management → Presentation ❌
```

### Example of Correct Flow

```typescript
// ✅ Component uses hooks
function NoteList() {
    const { data: notes } = useNotes()
    return <div>{notes.map(...)}</div>
}

// ✅ Hook uses service
function useNotes() {
    return useQuery({
        queryKey: ['notes'],
        queryFn: noteService.getNotes,
    })
}

// ✅ Service uses API client
class NoteService {
    getNotes() {
        return apiClient.get('/notes')
    }
}

// ❌ Service should NOT use hooks
class NoteService {
    getNotes() {
        const { data } = useQuery(...) // ❌ NO!
    }
}
```

---

## 🎯 Feature Independence

### Guidelines for Feature Modules

1. **Self-Contained**: Each feature has its own components, hooks, services
2. **Explicit Dependencies**: If Feature A needs Feature B, import from public API
3. **Shared Code**: Move truly shared code to `shared/`

### Example: Feature Dependencies

```typescript
// features/notes/components/NoteCard.tsx
// ✅ Can use shared components
import { Card } from '@/shared/components/ui/Card'
import { Button } from '@/shared/components/ui/Button'

// ✅ Can use shared hooks
import { useDebounce } from '@/shared/hooks/useDebounce'

// ✅ Can use other features (via public API)
import { UserAvatar } from '@/features/users'

// ❌ Should NOT directly import from other feature internals
import { UserService } from '@/features/users/services/userService' // ❌
```

---

## 🧩 Shared vs Feature Code

### When to Put Code in `shared/`

**Put in `shared/` when:**
- Used by 3+ features
- Pure utility (no feature-specific logic)
- Generic UI component
- Common type/interface

**Keep in feature when:**
- Used by single feature
- Contains feature-specific logic
- Tightly coupled to feature domain

### Example Decision Tree

```
Q: Is this component used by multiple features?
   ├─ No → Keep in feature/
   └─ Yes → Q: Does it have feature-specific logic?
              ├─ Yes → Keep in feature/, accept duplication
              └─ No → Move to shared/

Q: Is this a utility function?
   ├─ Q: Is it generic (formatDate, validateEmail)?
   │     └─ Yes → shared/utils/
   ├─ Q: Is it feature-specific (calculateNoteScore)?
   │     └─ Yes → feature/utils/ or feature/component/utils/
   └─ Q: Is it used across features but feature-aware?
         └─ Yes → Consider making it more generic or accept duplication
```

---

## 📐 Scalability Patterns

### Adding New Features

```bash
# 1. Create feature structure
mkdir -p src/features/todos/{components,hooks,services,store,types}

# 2. Create types first (design your domain)
# src/features/todos/types/todo.types.ts
export interface Todo {
    id: number
    title: string
    completed: boolean
}

# 3. Create service (API layer)
# src/features/todos/services/todoService.ts

# 4. Create hooks (React Query)
# src/features/todos/hooks/useTodos.ts

# 5. Create UI context (if needed for feature UI state)
# src/features/todos/store/TodoUIContext.tsx

# 6. Create components
# src/features/todos/components/TodoList.tsx

# 7. Create public API
# src/features/todos/index.ts

# 8. Wire up in app
# Add TodoUIProvider if created
# Add routes if needed
```

### Growing a Feature

```
Phase 1: Simple (Single file)
  features/todos/
    ├── TodoList.tsx
    └── useTodos.ts

Phase 2: Medium (Organized folders)
  features/todos/
    ├── components/
    │   └── TodoList.tsx
    ├── hooks/
    │   └── useTodos.ts
    └── services/
        └── todoService.ts

Phase 3: Complex (Full structure)
  features/todos/
    ├── components/
    │   ├── TodoList/
    │   ├── TodoCard/
    │   └── TodoDialog/
    ├── hooks/
    │   ├── useTodos.ts
    │   ├── useCreateTodo.ts
    │   └── useUpdateTodo.ts
    ├── services/
    │   └── todoService.ts
    ├── store/
    │   └── TodoUIContext.tsx
    └── types/
        └── todo.types.ts
```

---

## 🔍 Code Organization Examples

### Example 1: Simple Feature (Users)

```
features/users/
├── components/
│   ├── UserCard.tsx        # 50 lines
│   └── UserAvatar.tsx      # 30 lines
├── hooks/
│   └── useUsers.ts         # Query hook
├── services/
│   └── userService.ts      # API calls
├── types/
│   └── user.types.ts       # User interface
└── index.ts
```

### Example 2: Complex Feature (Notes)

```
features/notes/
├── components/
│   ├── NoteGrid/
│   │   ├── NoteGrid.tsx
│   │   ├── NoteGrid.hooks.ts
│   │   ├── NoteGrid.utils.ts
│   │   ├── NoteGrid.columns.tsx    # Column definitions
│   │   └── index.ts
│   ├── NoteDialog/
│   │   ├── NoteDialog.tsx
│   │   ├── NoteDialog.hooks.ts
│   │   └── index.ts
│   ├── NoteForm/
│   └── NoteCard.tsx
├── hooks/
│   ├── useNotes.ts
│   ├── useNote.ts
│   ├── useCreateNote.ts
│   ├── useUpdateNote.ts
│   ├── useDeleteNote.ts
│   └── useNoteFilters.ts
├── services/
│   └── noteService.ts
├── store/
│   └── NoteUIContext.tsx
├── types/
│   ├── note.types.ts
│   └── note.dto.ts
└── index.ts
```

---

## 🎪 Provider Hierarchy

### Centralized Provider Structure (Required Pattern)

**🎯 RULE**: All Context providers MUST be centralized in `Main.tsx` for cross-feature data sharing.

```typescript
// Main.tsx - Centralized Provider Setup
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from '@/contexts/AuthContext'
import { NoteUIProvider } from '@/features/notes'
import { DialogProvider } from '@/store'

function Main() {
    return (
        <BrowserRouter>
            <SnackbarProvider autoHideDuration={3000}>
                <AuthProvider>
                    <NoteUIProvider>
                        <DialogProvider>
                            <MainNav />
                        </DialogProvider>
                    </NoteUIProvider>
                </AuthProvider>
            </SnackbarProvider>
        </BrowserRouter>
    )
}
```

### Page Implementation (No Provider Wrapping)

```typescript
// pages/NotesPage.tsx - Direct context usage
export function NotesPage() {
    return (
        <ErrorBoundary>
            <NotesPageContent />
        </ErrorBoundary>
    )
}

function NotesPageContent() {
    // Direct access to centralized contexts
    const { filters, selectedNote } = useNoteUI()
    const { data: notes } = useNotes()
    
    return (
        <div>
            <NoteGrid notes={notes} />
            <NoteDialog />
        </div>
    )
}
```

**Benefits:**
- Cross-feature data sharing
- Single source of truth
- Easier debugging
- No provider conflicts

---

## 🚀 Performance Considerations

### Code Splitting by Feature

```typescript
// Lazy load features
const NotesPage = lazy(() => import('@/pages/NotesPage'))
const TodosPage = lazy(() => import('@/pages/TodosPage'))

function Routes() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Switch>
                <Route path="/notes" component={NotesPage} />
                <Route path="/todos" component={TodosPage} />
            </Switch>
        </Suspense>
    )
}
```

### Feature-Level Code Splitting

```typescript
// features/notes/index.ts
// Export components lazily if needed
export const NoteDialog = lazy(() => 
    import('./components/NoteDialog').then(m => ({ default: m.NoteDialog }))
)
```

---

## 📝 Architecture Checklist

When designing a new feature:

- [ ] Feature name is clear and represents domain concept
- [ ] Types defined first (domain model)
- [ ] Service layer handles all API calls
- [ ] React Query hooks for data fetching
- [ ] Context only for UI state (if needed)
- [ ] Components are presentational
- [ ] Public API exports only necessary items
- [ ] No circular dependencies
- [ ] Feature is self-contained
- [ ] Follows naming conventions

---

## 🔧 Troubleshooting

### "Where should this code go?"

**Use this decision tree:**

```
Is it a React component?
├─ Used by multiple features? → shared/components/
└─ Feature-specific? → features/[name]/components/

Is it a hook?
├─ React Query (data fetching)? → features/[name]/hooks/
├─ Generic utility? → shared/hooks/
└─ Component-specific? → features/[name]/components/[Component]/[Component].hooks.ts

Is it business logic?
└─ features/[name]/services/

Is it a type?
├─ Used across app? → shared/types/
└─ Feature-specific? → features/[name]/types/

Is it a utility?
├─ Generic? → shared/utils/
├─ Feature-specific? → features/[name]/utils/ or component folder
└─ Component-specific? → next to component file
```

---

**Remember**: Architecture should enable fast development, not slow it down. Start simple, refactor when needed.