# 🎯 INSTRUCTIONS - Development Guidelines

> **Last Updated**: January 2025  
> **Pattern**: Hybrid React Architecture (React Query + Context + Best Practices)  
> **Philosophy**: Simple, Maintainable, Scalable

---

## ⚠️ IMPORTANT PROJECT RULES

**🚫 DO NOT MODIFY PORTAL FILES**: All files in the `portal/` directory are for reference only. Do not update, edit, or modify any files in the portal project. Only work with files in the `SuperApp/` directory.

---

## 📚 Quick Navigation

This is the **main instruction file**. For detailed information, see:

- **[ARCHITECTURE.md](../docs/ARCHITECTURE.md)** - System architecture, folder structure, and layer patterns
- **[STATE_MANAGEMENT.md](../docs/STATE_MANAGEMENT.md)** - React Query, Context, and state patterns
- **[API_LAYER.md](../docs/API_LAYER.md)** - API client, services, and error handling
- **[COMPONENT_PATTERNS.md](../docs/COMPONENT_PATTERNS.md)** - Component architecture and best practices
- **[DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md)** - Design tokens, colors, typography, and UI standards
- **[STYLING_GUIDE.md](../docs/STYLING_GUIDE.md)** - MUI styling patterns and conventions
- **[TYPE_SAFETY.md](../docs/TYPE_SAFETY.md)** - TypeScript patterns and type definitions
- **[ERROR_HANDLING.md](../docs/ERROR_HANDLING.md)** - Error boundaries, API errors, and user feedback
- **[DATA_TYPES.md](../docs/DATA_TYPES.md)** - Cross-stack type consistency and data transformation
- **[TESTING_GUIDE.md](../docs/TESTING_GUIDE.md)** - Testing strategies and examples
- **[COMMON_PATTERNS.md](../docs/COMMON_PATTERNS.md)** - Reusable patterns and recipes
- **[ANTI_PATTERNS.md](../docs/ANTI_PATTERNS.md)** - What NOT to do

---

## 🎯 Core Principles

### 1. **Simplicity Over Cleverness**
```typescript
// ❌ Clever but hard to maintain
const data = useMemo(() => items?.filter(i => !i.archived)?.sort((a,b) => b.date - a.date), [items]);

// ✅ Simple and clear
const activeItems = items.filter(item => !item.archived);
const sortedItems = activeItems.sort((a, b) => b.date - a.date);
```

### 2. **Explicit Over Implicit**
```typescript
// ❌ Magic/implicit
const { open, data } = useDialog();

// ✅ Explicit and clear
const { isDialogOpen, selectedNote } = useNoteDialog();
```

### 3. **Colocation Over Abstraction**
```typescript
// ✅ Keep related code together
features/notes/
  ├── components/NoteGrid/
  │   ├── NoteGrid.tsx
  │   ├── NoteGrid.hooks.ts    // Local hooks
  │   ├── NoteGrid.utils.ts    // Local utils
  │   └── NoteGrid.types.ts
```

### 4. **Standard Over Custom**
```typescript
// ❌ Custom hook that wraps React Query unnecessarily
function useNotes() {
    const query = useQuery(...);
    return { notes: query.data, loading: query.isLoading };
}

// ✅ Use React Query directly
const { data: notes, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: noteService.getNotes,
});
```

### 5. **Design System Consistency**
```typescript
// ❌ Hardcoded values
<Box sx={{ 
    padding: '16px',
    backgroundColor: '#1976D2',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}}>

// ✅ Design system tokens
<Box sx={{ 
    padding: 'spacing.4',
    backgroundColor: 'primary.main',
    borderRadius: 'borderRadius.md',
    boxShadow: 'shadows.sm',
}}>
```

---

## 🏗️ Architecture Overview

### Layer Flow
```
Component → React Query Hook → Service → API Client → Backend
              ↓
            Cache (Automatic)
```

### State Philosophy

| State Type | Solution | Location | Example |
|------------|----------|----------|---------|
| **Server State** | React Query | Feature hooks | Notes list, user profile |
| **Global UI State** | Context | Main.tsx | Auth, theme, navigation |
| **Feature UI State** | Context | Main.tsx (centralized) | Note filters, dialog state |
| **Local State** | useState | Component level | Form inputs, toggles |

**🎯 Provider Centralization Rule**: All Context providers should be defined in `Main.tsx` to enable cross-feature data sharing and maintain a single source of truth.

See [STATE_MANAGEMENT.md](../docs/STATE_MANAGEMENT.md) for details.

---

## 📁 Folder Structure

```
src/
├── features/              # Feature modules (domain-driven)
│   └── notes/
│       ├── components/    # Feature components
│       ├── hooks/         # Feature-specific hooks
│       ├── services/      # Business logic + API
│       ├── store/         # Feature state (Context)
│       └── types/         # Feature types
│
├── shared/                # Shared across features
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Pure UI components (Button, Input, TagAutoComplete, etc.)
│   │   ├── feedback/      # Error boundaries, alerts, notifications
│   │   ├── containers/    # Layout containers and wrappers
│   │   └── styles/        # Shared styled components
│   ├── hooks/             # Reusable hooks
│   ├── services/          # Shared services
│   └── types/             # Shared types
│
├── lib/                   # Third-party setup
│   ├── react-query.ts     # React Query config
│   ├── api-client.ts      # Axios/Fetch setup
│   └── theme/             # Design system & MUI theme
│       ├── index.ts       # Main theme export
│       ├── colors.ts      # Color tokens
│       ├── typography.ts  # Typography scale
│       ├── spacing.ts     # Spacing tokens
│       ├── shadows.ts     # Shadow tokens
│       ├── borderRadius.ts # Border radius tokens
│       ├── breakpoints.ts # Responsive breakpoints
│       ├── zIndex.ts      # Z-index scale
│       └── transitions.ts # Animation tokens
│
└── config/                # Configuration
    ├── env.ts             # Environment variables
    └── constants.ts       # App constants
```

See [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for detailed structure.

---

## 🔄 Quick Start Patterns

### 1. Data Fetching (90% of cases)

```typescript
// features/notes/hooks/useNotes.ts
import { useQuery } from '@tanstack/react-query';
import { noteService } from '../services/noteService';

export function useNotes(params?: GetNotesParams) {
    return useQuery({
        queryKey: ['notes', params],
        queryFn: () => noteService.getNotes(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Usage in component
function NotesList() {
    const { data: notes, isLoading, error } = useNotes({ archived: false });
    
    if (isLoading) return <Spinner />;
    if (error) return <ErrorAlert error={error} />;
    
    return <NoteGrid notes={notes} />;
}
```

### 2. Data Mutation

```typescript
// features/notes/hooks/useNoteActions.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '../services/noteService';

export function useCreateNote() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: noteService.createNote,
        onSuccess: () => {
            // Invalidate queries to refetch
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
}

// Usage
function CreateNoteButton() {
    const createNote = useCreateNote();
    
    const handleClick = async () => {
        try {
            await createNote.mutateAsync({ name: 'New Note' });
            toast.success('Note created!');
        } catch (error) {
            toast.error('Failed to create note');
        }
    };
    
    return <Button onClick={handleClick}>Create</Button>;
}
```

### 3. Global State (Auth Example)

```typescript
// shared/store/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface AuthContextValue {
    user: User | null;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    
    const login = async (credentials: LoginRequest) => {
        const response = await authService.login(credentials);
        setUser(response.user);
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
```

### 4. Feature State (Dialog Example)

```typescript
// features/notes/store/NoteUIContext.tsx
import { createContext, useContext, useState } from 'react';

interface NoteUIContextValue {
    selectedNote: Note | null;
    isDialogOpen: boolean;
    openDialog: (note: Note) => void;
    closeDialog: () => void;
}

const NoteUIContext = createContext<NoteUIContextValue | null>(null);

export function NoteUIProvider({ children }: { children: React.ReactNode }) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const openDialog = (note: Note) => {
        setSelectedNote(note);
        setIsDialogOpen(true);
    };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
        setTimeout(() => setSelectedNote(null), 200); // After animation
    };
    
    return (
        <NoteUIContext.Provider value={{ 
            selectedNote, 
            isDialogOpen, 
            openDialog, 
            closeDialog 
        }}>
            {children}
        </NoteUIContext.Provider>
    );
}

export function useNoteUI() {
    const context = useContext(NoteUIContext);
    if (!context) throw new Error('useNoteUI must be used within NoteUIProvider');
    return context;
}
```

### Centralized Provider Pattern

All Context providers MUST be centralized in `Main.tsx` to enable cross-feature data sharing:

```typescript
// Main.tsx - Centralized Provider Setup
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
    );
}
```

**Benefits of Centralized Providers:**
- **Cross-Feature Sharing**: Any component can access any context
- **Single Source of Truth**: All app state in one place
- **Easier Debugging**: Clear provider hierarchy
- **Consistent Access**: No need to wrap individual pages

**Page Implementation (No Provider Wrapping):**

```typescript
// pages/NotesPage.tsx - Direct context usage
export function NotesPage() {
    return (
        <ErrorBoundary>
            <NotesPageContent />
        </ErrorBoundary>
    );
}

function NotesPageContent() {
    // Direct access to centralized contexts
    const { filters, selectedNote } = useNoteUI();
    const { data: notes } = useNotes();
    
    return <NoteGrid notes={notes} />;
}
```

---

## 🎨 Component Patterns

### Component Organization

**🎯 Component Placement Rules:**

```
shared/components/ui/           # Pure UI components (Button, Input, Autocomplete)
shared/components/feedback/     # Error boundaries, alerts, notifications
shared/components/containers/   # Layout containers and wrappers
shared/components/styles/       # Shared styled components
features/[name]/components/     # Feature-specific components
```

**Examples:**
- `shared/components/ui/GenericAutoComplete.tsx` - Reusable autocomplete component
- `shared/components/ui/DialogContainer.tsx` - Modal/dialog wrapper
- `shared/components/containers/GridContainer.tsx` - Data grid layouts
- `features/notes/components/NoteCard.tsx` - Domain-specific note card

### Component Structure

```typescript
// features/notes/components/NoteCard/NoteCard.tsx
import { Card, Typography } from '@mui/material';
import { spacing, shadows, transitions } from '@/lib/theme';
import type { Note } from '../../types/note.types';

interface NoteCardProps {
    note: Note;
    onClick?: (note: Note) => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
    return (
        <Card 
            onClick={() => onClick?.(note)}
            sx={{ 
                padding: spacing[6],
                cursor: onClick ? 'pointer' : 'default',
                transition: transitions.common.standard,
                '&:hover': onClick ? { 
                    boxShadow: shadows.cardHover,
                    transform: 'translateY(-2px)',
                } : undefined,
            }}
        >
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
                {note.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {note.description}
            </Typography>
        </Card>
    );
}
```

### When to Split Components

```typescript
// ❌ Too small - over-abstraction
function NoteTitle({ title }: { title: string }) {
    return <Typography variant="h6">{title}</Typography>;
}

// ✅ Right size - reusable with logic
function NoteCard({ note }: { note: Note }) {
    return (
        <Card>
            <Typography variant="h6">{note.name}</Typography>
            <Typography variant="body2">{note.description}</Typography>
            <NoteActions note={note} />
        </Card>
    );
}
```

See [COMPONENT_PATTERNS.md](../docs/COMPONENT_PATTERNS.md) for more details.

---

## 🎯 Code Style

### Formatting (Enforced by Prettier)

```typescript
// 4 spaces indentation
function myFunction() {
    if (condition) {
        doSomething();
    }
}

// Double quotes
const name = "John Doe";

// Trailing commas
const obj = {
    name: "John",
    age: 30,
};

// No semicolons (Prettier removes them)
const greeting = "Hello"
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `NoteCard` |
| **Hooks** | camelCase with `use` | `useNotes` |
| **Functions** | camelCase | `createNote` |
| **Types/Interfaces** | PascalCase | `Note`, `CreateNoteDTO` |
| **Constants** | UPPER_SNAKE_CASE | `API_BASE_URL` |
| **Files** | Match export name | `NoteCard.tsx`, `useNotes.ts` |

### Import Order

```typescript
// 1. React
import { useState, useEffect } from 'react'

// 2. External libraries
import { useQuery } from '@tanstack/react-query'
import { Box, Button } from '@mui/material'

// 3. Internal - absolute imports
import { noteService } from '@/features/notes/services/noteService'
import { useAuth } from '@/shared/store/AuthContext'
import type { Note } from '@/features/notes/types/note.types'

// 4. Relative imports
import { NoteCard } from './NoteCard'
import type { NoteCardProps } from './NoteCard.types'
```

---

## ✅ Best Practices

### 1. **Keep Components Simple**

```typescript
// ❌ Component doing too much
function NoteGrid() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetch('/api/notes')
            .then(res => res.json())
            .then(setNotes)
            .finally(() => setLoading(false))
    }, [])
    
    return <DataGrid rows={notes} loading={loading} />
}

// ✅ Simple component with hooks
function NoteGrid() {
    const { data: notes, isLoading } = useNotes()
    
    return <DataGrid rows={notes} loading={isLoading} />
}
```

### 2. **Use React Query for All Server State**

```typescript
// ❌ Manual state management
const [users, setUsers] = useState([])
useEffect(() => {
    fetchUsers().then(setUsers)
}, [])

// ✅ React Query handles everything
const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
})
```

### 3. **Colocate Related Code**

```typescript
// ✅ Feature folder has everything it needs
features/notes/
  ├── components/
  ├── hooks/
  ├── services/
  ├── store/
  └── types/
```

### 4. **Explicit Error Handling**

```typescript
// ✅ Handle errors at boundaries
function NotesList() {
    const { data: notes, error } = useNotes()
    
    if (error) {
        return <ErrorAlert message="Failed to load notes" error={error} />
    }
    
    return <NoteGrid notes={notes} />
}
```

### 5. **Type Everything**

```typescript
// ❌ No types
function createNote(data) {
    return api.post('/notes', data)
}

// ✅ Full type safety
function createNote(data: CreateNoteDTO): Promise<Note> {
    return api.post<Note>('/notes', data)
}
```

**For comprehensive error handling strategies, see [ERROR_HANDLING.md](../docs/ERROR_HANDLING.md)**

**For data type consistency across the stack, see [DATA_TYPES.md](../docs/DATA_TYPES.md)**

---

## 🚫 Anti-Patterns (What NOT to Do)

### 1. **Don't Create Unnecessary Abstractions**

```typescript
// ❌ Wrapper that adds no value
function useNotesData() {
    const query = useQuery(['notes'], getNotes)
    return { notes: query.data, loading: query.isLoading }
}

// ✅ Use React Query directly
const { data: notes, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
})
```

### 2. **Don't Put Everything in Global State**

```typescript
// ❌ Everything in Context
interface AppState {
    notes: Note[]
    users: User[]
    settings: Settings
    dialogOpen: boolean
    // ... 50 more properties
}

// ✅ Split by domain
// - Server state: React Query
// - Auth: AuthContext
// - Feature UI: Feature Context
// - Local: useState
```

### 3. **Don't Rename in Destructuring**

```typescript
// ❌ Confusing renames
const { open: dialogOpen, data: noteData } = useDialog()

// ✅ Clear naming
const { isOpen, selectedNote } = useNoteDialog()
```

See [ANTI_PATTERNS.md](../docs/ANTI_PATTERNS.md) for complete list.

---

## 🔧 Setup Checklist

### New Feature Checklist

When creating a new feature (e.g., `todos`):

```bash
# 1. Create feature folder
mkdir -p src/features/todos/{components,hooks,services,store,types}

# 2. Create types first
# src/features/todos/types/todo.types.ts

# 3. Create service
# src/features/todos/services/todoService.ts

# 4. Create React Query hooks
# src/features/todos/hooks/useTodos.ts

# 5. Create UI Context (if needed)
# src/features/todos/store/TodoUIContext.tsx

# 6. Create components
# src/features/todos/components/TodoList/TodoList.tsx

# 7. Wire up in app
# Add TodoUIProvider to app providers
```

### File Templates

See each guide for templates:
- Component template: [COMPONENT_PATTERNS.md](../docs/COMPONENT_PATTERNS.md)
- Hook template: [STATE_MANAGEMENT.md](../docs/STATE_MANAGEMENT.md)
- Service template: [API_LAYER.md](../docs/API_LAYER.md)
- Error handling template: [ERROR_HANDLING.md](../docs/ERROR_HANDLING.md)
- Type transformation template: [DATA_TYPES.md](../docs/DATA_TYPES.md)

---

## 📖 When to Read Each Guide

| If you want to... | Read... |
|-------------------|---------|
| Understand overall system design | [ARCHITECTURE.md](../docs/ARCHITECTURE.md) |
| Work with server data | [STATE_MANAGEMENT.md](../docs/STATE_MANAGEMENT.md) |
| Create API calls | [API_LAYER.md](../docs/API_LAYER.md) |
| Build components | [COMPONENT_PATTERNS.md](../docs/COMPONENT_PATTERNS.md) |
| Use design tokens and colors | [DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md) |
| Style components | [STYLING_GUIDE.md](../docs/STYLING_GUIDE.md) |
| Add TypeScript types | [TYPE_SAFETY.md](../docs/TYPE_SAFETY.md) |
| Handle errors gracefully | [ERROR_HANDLING.md](../docs/ERROR_HANDLING.md) |
| Manage data transformations | [DATA_TYPES.md](../docs/DATA_TYPES.md) |
| Write tests | [TESTING_GUIDE.md](../docs/TESTING_GUIDE.md) |
| Find examples | [COMMON_PATTERNS.md](../docs/COMMON_PATTERNS.md) |
| Avoid mistakes | [ANTI_PATTERNS.md](../docs/ANTI_PATTERNS.md) |

---

## 🎓 Learning Path

### For New Team Members

**Week 1: Core Concepts**
1. Read this file completely
2. Read [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
3. Read [STATE_MANAGEMENT.md](../docs/STATE_MANAGEMENT.md)
4. Practice: Create a simple feature (e.g., task list)

**Week 2: Deep Dive**
1. Read [API_LAYER.md](../docs/API_LAYER.md)
2. Read [COMPONENT_PATTERNS.md](../docs/COMPONENT_PATTERNS.md)
3. Read [DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md)
4. Read [COMMON_PATTERNS.md](../docs/COMMON_PATTERNS.md)
5. Practice: Add CRUD operations to your feature

**Week 3: Polish**
1. Read [STYLING_GUIDE.md](../docs/STYLING_GUIDE.md)
2. Read [TYPE_SAFETY.md](../docs/TYPE_SAFETY.md)
3. Read [ERROR_HANDLING.md](../docs/ERROR_HANDLING.md)
4. Read [DATA_TYPES.md](../docs/DATA_TYPES.md)
5. Read [ANTI_PATTERNS.md](../docs/ANTI_PATTERNS.md)
6. Practice: Refactor existing component

**Week 4: Professional**
1. Read [TESTING_GUIDE.md](../docs/TESTING_GUIDE.md)
2. Write tests for your feature
3. Code review with senior dev

---

## 🆘 Common Questions

### Q: When should I use Context vs React Query?

**A:** 
- **React Query**: All server data (API responses)
- **Context**: UI state, auth, theme, navigation

### Q: Should I create a custom hook for everything?

**A:** No. Only create hooks when:
- Logic is reused in multiple components
- Logic is complex enough to deserve separation
- Don't wrap React Query unnecessarily

### Q: How do I know if my component is too big?

**A:** Split if:
- File is over 200 lines
- Component has multiple responsibilities
- You struggle to name it clearly

### Q: Should I use styled() or sx?

**A:** 
- **sx**: Layout, spacing, simple styles
- **styled()**: Reusable components, complex styles, hover states

See [STYLING_GUIDE.md](../docs/STYLING_GUIDE.md)

---

## 🔄 Migration from Old Pattern

If migrating from manual state management:

1. **Install React Query**
   ```bash
   npm install @tanstack/react-query
   ```

2. **Setup QueryClient** (see [STATE_MANAGEMENT.md](../docs/STATE_MANAGEMENT.md))

3. **Migrate one feature at a time**
   - Start with simplest feature
   - Replace useState/useEffect with useQuery
   - Remove manual loading/error states
   - Test thoroughly

4. **Clean up old code**
   - Remove unused helper hooks
   - Simplify store (remove server state)
   - Update documentation

---

## 📝 Contributing

### Before Submitting PR

- [ ] Code follows patterns in this guide
- [ ] All files under 300 lines
- [ ] TypeScript types for everything
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Tests written (if applicable)
- [ ] Updated relevant documentation

### Code Review Checklist

- [ ] Follows SOLID principles
- [ ] No code duplication
- [ ] Clear naming
- [ ] Proper error handling
- [ ] Performance considered
- [ ] Accessibility checked

---

## 📞 Getting Help

1. **Check the guides** - Most answers are in this documentation
2. **Search codebase** - Look for similar examples
3. **Ask team** - Slack #frontend-help
4. **Create RFC** - For architectural changes

---

**Remember**: 
- **Simple > Clever**
- **Explicit > Implicit**  
- **Colocation > Abstraction**
- **Standard > Custom**

Happy coding! 🚀