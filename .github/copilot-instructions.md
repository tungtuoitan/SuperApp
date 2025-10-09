# 📘 Development Guidelines - Portfolio Application

## Table of Contents
1. [Project Structure]
2. [Configuration Management]
3. [API Layer Guidelines]
4. [State Management]
5. [Custom Hooks]
6. [Component Development]
7. [Styling Guidelines]
8. [Code Formatting Guidelines]
9. [Type Safety]
10. [Best Practices]
11. [Common Patterns]

---

## Project Structure

### Directory Layout

```
src/
├── config/              # Application configuration
│   ├── api.config.ts    # API endpoints & base URLs
│   ├── app.config.ts    # App-wide settings
│   └── theme.ts         # MUI theme configuration
│
├── services/            # External service integrations
│   ├── api/
│   │   ├── apiClient.ts    # Base HTTP client
│   │   ├── auth.api.ts     # Authentication API
│   │   ├── notes.api.ts    # Notes API
│   │   └── index.ts        # API exports
│   └── storage.service.ts  # localStorage wrapper
│
├── hooks/               # Custom React hooks
│   ├── useAuthHelpers.ts    # Authentication helper functions (no state)
│   ├── useNoteHelpers.ts    # Notes helper functions (no state)
│   ├── useDialogHelpers.ts  # Dialog helper functions (no state)
│   ├── useApiHelpers.ts     # Generic API helper functions (no state)
│   └── index.ts             # Hook exports
│
├── contexts/            # Global state management
│   ├── AuthContext.tsx         # Auth state
│   ├── NavigationContext.tsx   # Navigation state
│   └── index.ts                # Context exports
│
├── store/               # Store-based state management
│   ├── notes/
│   │   └── NoteStore.tsx       # Note state management
│   ├── dialog/
│   │   └── DialogStore.tsx     # Dialog state management
│   └── index.ts                # Store exports
│   │   └── NoteStore.tsx       # Note state management
│   └── index.ts                # Store exports
│
├── types/               # TypeScript definitions
│   ├── models.ts        # Domain models
│   ├── api.types.ts     # API request/response types
│   ├── common.types.ts  # Shared utility types
│   └── index.ts         # Type exports
│
├── utils/               # Utility functions
│   ├── formatters.ts    # Date, currency formatting
│   ├── validators.ts    # Form validation
│   ├── locale.ts        # Locale detection
│   ├── constants.ts     # Static constants
│   └── index.ts         # Utils exports
│
├── styles/              # Shared styles
│   ├── common.styles.ts # Reusable styled components
│   ├── mixins.ts        # Style utility functions
│   └── index.ts         # Style exports
│
├── components/          # React components
│   ├── common/          # Reusable UI components
│   │   ├── Button/
│   │   ├── Dialog/
│   │   └── Tooltip/
│   ├── layout/          # Layout components
│   │   ├── MainNav/
│   │   ├── SideMenu/
│   │   └── TopNav/
│   └── features/        # Feature-specific components
│       ├── auth/
│       │   ├── LoginForm.tsx
│       │   └── AuthGuard.tsx
│       └── notes/
│           ├── NoteGrid.tsx
│           ├── NoteDialog.tsx
│           └── hooks/
│               └── useNoteFilters.ts
│
├── App.tsx              # Root component
├── Main.tsx             # Main layout
└── index.tsx            # Entry point
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `NoteGrid.tsx` |
| **Hooks** | camelCase with `use` prefix | `useAuthHelpers.ts` |
| **Utils** | camelCase | `formatters.ts` |
| **Types** | PascalCase for interfaces | `Note`, `User` |
| **Constants** | UPPER_SNAKE_CASE | `API_BASE_URL` |
| **Styled Components** | PascalCase | `StyledButton` |

---

## Configuration Management

### Environment Variables

**File**: `.env`

```bash
# API Configuration
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_LOGGING=true

# Feature Flags
REACT_APP_ENABLE_DARK_MODE=false
```

**Local Overrides**: `.env.local` (gitignored)

```bash
# Use for local development overrides
REACT_APP_API_URL=http://localhost:5000
```

### API Configuration Pattern

**File**: `src/config/api.config.ts`

```typescript
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:5000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    exchangeToken: '/auth/exchangeAuthorizationCodeForToken',
  },
  notes: {
    getAll: '/Notes/GetNotes',
    createOrUpdate: '/Notes/IuNote',
  },
} as const;
```

**Usage**:
```typescript
import { API_CONFIG, ENDPOINTS } from '@/config/api.config';

const url = `${API_CONFIG.baseURL}${ENDPOINTS.notes.getAll}`;
```

### Application Configuration Pattern

**File**: `src/config/app.config.ts`

```typescript
export const APP_CONFIG = {
  appName: 'My Portfolio App',
  version: '1.0.0',
  enableLogging: process.env.REACT_APP_ENABLE_LOGGING === 'true',
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
} as const;
```

---

## API Layer Guidelines

### Architecture Pattern

```
Component → Hook → API Service → API Client → Backend
```

### API Client Pattern

**File**: `src/services/api/apiClient.ts`

```typescript
import { API_CONFIG } from '@/config/api.config';

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('userToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new ApiError(
          response.status,
          response.statusText,
          `API request failed: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new Error(`Network error: ${error}`);
    }
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
```

### API Service Pattern

**Pattern**: Create one file per resource

**Example**: `src/services/api/notes.api.ts`

```typescript
import { apiClient } from './apiClient';
import { ENDPOINTS } from '@/config/api.config';
import type { Note, GetNotesParams } from '@/types/models';
import type { NoteResponse, ApiResponse } from '@/types/api.types';

// Transform API response to domain model
const transformNote = (apiNote: NoteResponse): Note => ({
  ...apiNote,
  createdAt: new Date(apiNote.createdAt),
  updatedAt: apiNote.updatedAt ? new Date(apiNote.updatedAt) : undefined,
});

export const notesApi = {
  async getNotes(params: GetNotesParams = {}): Promise<Note[]> {
    const queryParams = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    
    const endpoint = `${ENDPOINTS.notes.getAll}?${queryParams}`;
    const response = await apiClient.get<ApiResponse<NoteResponse[]>>(endpoint);
    
    if (!response.data) return [];
    
    return response.data.map(transformNote);
  },

  async createOrUpdateNote(note: Partial<Note>): Promise<Note> {
    const response = await apiClient.post<ApiResponse<NoteResponse>>(
      ENDPOINTS.notes.createOrUpdate,
      note
    );
    
    if (!response.data) {
      throw new Error('Failed to save note');
    }
    
    return transformNote(response.data);
  },
};
```

### Error Handling Pattern

```typescript
import { ApiError } from '@/services/api/apiClient';

try {
  const data = await notesApi.getNotes();
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API errors
    if (error.status === 401) {
      // Redirect to login
    } else if (error.status === 404) {
      // Show not found message
    }
  } else {
    // Handle network errors
    console.error('Network error:', error);
  }
}
```

---

## State Management

### Context Pattern

**When to Use Context**:
- Global application state (auth, theme, navigation)
- State needed by many components at different nesting levels
- State that changes infrequently

**Context Structure**:

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '@/types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // Login logic
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
```

**Usage**:
```typescript
import { useAuthContext } from '@/contexts';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthContext();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.userName}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### When to Use Each State Management Approach

| Scenario | Use |
|----------|-----|
| Global app state (auth, theme) | Context API |
| Business logic functions (CRUD operations) | Helper Hooks with Store |
| Local component state | `useState` |
| Complex local state with actions | `useReducer` |
| Derived state | `useMemo` |
| Feature-specific complex state management | Store Pattern |

### Store Pattern

**When to Use Store Pattern**:
- Feature-specific state that needs to be shared across multiple components
- Complex UI state with multiple related properties (grids, dialogs, forms)
- State that requires coordination between multiple UI elements
- When you need centralized state for a specific feature module

**Store Structure**:

```typescript
// src/store/notes/NoteStore.tsx
import { SxProps } from "@mui/material";
import type { GridApi } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Note } from "../../types/models";
import { DialogProps } from "../../types/common.types";

export interface NoteContextData {
    noteMasterContainerRef: React.RefObject<HTMLDivElement>;

    // Core notes data moved from useNotes to store
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    
    // Note detail management
    noteDetail: Note;
    setNoteDetail: Dispatch<SetStateAction<Note>>;
    noteId: number;
    setNoteId: Dispatch<SetStateAction<number>>;
    
    // Search functionality
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    searchLoading: boolean;
    setSearchLoading: Dispatch<SetStateAction<boolean>>;
    searchInputRef: React.RefObject<HTMLInputElement>;
    
    // Grid management
    loadingMasterGrid: boolean;
    setLoadingMasterGrid: Dispatch<SetStateAction<boolean>>;
    refreshMasterGrid: boolean;
    setRefreshMasterGrid: Dispatch<SetStateAction<boolean>>;
    apiRef: React.MutableRefObject<GridApi | null>;
    
    // Pagination
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    totalRows: number;
    setTotalRows: Dispatch<SetStateAction<number>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    
    // Dialog management
    openView: boolean;
    setOpenView: Dispatch<SetStateAction<boolean>>;
    previewDialogPropsNote: DialogProps;
    setPreviewDialogPropsNote: Dispatch<SetStateAction<DialogProps>>;
    isPreviewDialogLoadingNote: boolean;
    setIsPreviewDialogLoadingNote: Dispatch<SetStateAction<boolean>>;
    noteDetailDialogRef: React.RefObject<HTMLDivElement> | undefined;
    noteDetailDialogSxProps: SxProps;
    setNoteDetailDialogSxProps: Dispatch<SetStateAction<SxProps>>;
}

const noteContextDefaultValue: NoteContextData = {
    noteMasterContainerRef: { current: null },

    // Core notes data moved from useNotes to store
    notes: [],
    setNotes: () => { },
    loading: false,
    setLoading: () => { },
    error: null,
    setError: () => { },
    
    // Note detail management
    noteDetail: {} as Note,
    setNoteDetail: () => { },
    noteId: 0,
    setNoteId: () => { },
    
    // Search functionality
    searchText: '',
    setSearchText: () => { },
    searchLoading: false,
    setSearchLoading: () => { },
    searchInputRef: { current: null },
    
    // Grid management
    loadingMasterGrid: false,
    setLoadingMasterGrid: () => { },
    refreshMasterGrid: false,
    setRefreshMasterGrid: () => { },
    apiRef: { current: null },
    
    // Pagination
    currentPage: 1,
    setCurrentPage: () => { },
    totalRows: 0,
    setTotalRows: () => { },
    pageSize: 100,
    setPageSize: () => { },
    
    // Dialog management
    openView: false,
    setOpenView: () => { },
    previewDialogPropsNote: {} as DialogProps,
    setPreviewDialogPropsNote: () => { },
    isPreviewDialogLoadingNote: false,
    setIsPreviewDialogLoadingNote: () => { },
    noteDetailDialogRef: { current: null },
    noteDetailDialogSxProps: {} as SxProps,
    setNoteDetailDialogSxProps: () => { },
}

export const NoteStore = createContext<NoteContextData>(noteContextDefaultValue);

export const useNoteStore = () => useContext(NoteStore);

export const NoteProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const noteMasterContainerRef = useRef<HTMLDivElement>(null);
    
    const [notes, setNotes] = useState<Note[]>([]);
    const [noteDetail, setNoteDetail] = useState<Note>({} as Note);
    const [noteId, setNoteId] = useState<number>(0);
    const [loadingMasterGrid, setLoadingMasterGrid] = useState<boolean>(false);
    const [refreshMasterGrid, setRefreshMasterGrid] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(100);
    const [searchGridOption, setSearchGridOption] = useState<string>('');
    const [openView, setOpenView] = useState<boolean>(false);
    const [previewDialogPropsNote, setPreviewDialogPropsNote] = useState<DialogProps>({} as DialogProps);
    const [isPreviewDialogLoadingNote, setIsPreviewDialogLoadingNote] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const noteDetailDialogRef = useRef<HTMLDivElement | null>(null);
    const [noteDetailDialogSxProps, setNoteDetailDialogSxProps] = useState<SxProps>({} as SxProps);
    const apiRef = useRef<GridApi | null>(null);
    const [isDownload, setIsDownload] = useState<boolean>(false);
    const [showDocTypeDownloadOption, setShowDocTypeDownloadOption] = useState<HTMLButtonElement | null>(null);
    const [selectedDocNoteDownloadTypes, setSelectedDocNoteDownloadTypes] = useState<string[]>([]);
    
    return (
        <NoteStore.Provider
            value={{
                noteMasterContainerRef,
                notes,
                setNotes,
                noteId,
                setNoteId,
                noteDetail,
                setNoteDetail,
                loadingMasterGrid,
                setLoadingMasterGrid,
                refreshMasterGrid,
                setRefreshMasterGrid,
                searchText,
                setSearchText,
                currentPage,
                setCurrentPage,
                totalRows,
                setTotalRows,
                pageSize,
                setPageSize,
                searchGridOption,
                setSearchGridOption,
                openView,
                setOpenView,
                previewDialogPropsNote,
                setPreviewDialogPropsNote,
                isPreviewDialogLoadingNote,
                setIsPreviewDialogLoadingNote,
                searchInputRef,
                searchLoading,
                setSearchLoading,
                noteDetailDialogRef,
                noteDetailDialogSxProps,
                setNoteDetailDialogSxProps,
                apiRef,
                isDownload,
                setIsDownload,
                showDocTypeDownloadOption,
                setShowDocTypeDownloadOption,
                selectedDocNoteDownloadTypes,
                setSelectedDocNoteDownloadTypes,
            }}>
            {children}
        </NoteStore.Provider>
    );
};
```

**Usage**:
```typescript
// 1. Wrap your app with the provider in Main.tsx
import { NoteProvider } from '../store/notes/NoteStore';

export function Main() {
    return (
        <BrowserRouter>
            <SnackbarProvider>
                <AuthProvider>
                    <NoteProvider>
                        <MainNav />
                    </NoteProvider>
                </AuthProvider>
            </SnackbarProvider>
        </BrowserRouter>
    );
}

// 2. Use the store in components
import { useNoteStore } from '../../store/notes/NoteStore';

function NoteGrid() {
    const {
        // Core data moved from useNotes to store
        notes,
        setNotes,
        loading,
        setLoading,
        error,
        setError,
        
        // Search functionality
        searchText,
        setSearchText,
        searchLoading,
        setSearchLoading,
        
        // Grid management
        loadingMasterGrid,
        setLoadingMasterGrid,
        refreshMasterGrid,
        setRefreshMasterGrid,
        
        // Pagination
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage
    } = useNoteStore();

    return (
        <div>
            {/* Use store state in your component */}
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {notes.map(note => <div key={note.noteId}>{note.name}</div>)}
        </div>
    );
}
```

**Store Pattern Guidelines**:

1. **Naming Convention**: 
   - Store file: `{Feature}Store.tsx` (e.g., `NoteStore.tsx`)
   - Context: `{Feature}Store` (e.g., `NoteStore`)
   - Hook: `use{Feature}Store` (e.g., `useNoteStore`)
   - Provider: `{Feature}Provider` (e.g., `NoteProvider`)

2. **Structure Requirements**:
   - Interface: `{Feature}ContextData`
   - Default values: `{feature}ContextDefaultValue`
   - All state should have getter and setter pairs
   - Include refs for DOM elements when needed
   - Include loading and error states

3. **Don't Use Reducers in Store**:
   - Store pattern uses direct state setters
   - For complex state logic, create a separate reducer-based store
   - Keep store pattern simple for UI state management

4. **Provider Placement**:
   - Wrap providers in `Main.tsx` at the appropriate level
   - Place store providers inside Context providers (like AuthProvider)
   - Ensure proper nesting order

---

## Custom Hooks

### Hook Creation Guidelines

1. **Name**: Always start with `use` (React convention)
2. **Location**: `src/hooks/`
3. **Export**: Add to `src/hooks/index.ts`
4. **Type Safety**: Always use TypeScript
5. **Single Responsibility**: One hook, one purpose

### Helper Functions Hook Pattern

**When to Use Helper Hooks**:
- When you need functions but not state (state comes from Store)
- For CRUD operations that interact with APIs
- When you want to separate business logic from state management

**Helper Hook Rules**:
- ❌ **No useEffect** - Helpers are pure function definitions only
- ❌ **No side effects** - Components handle data fetching timing
- ❌ **No parameters** - Helper hooks should not accept any parameters
- ✅ **Only function definitions** - Return callable functions
- ✅ **Use store setters** - Update centralized state

```typescript
// src/hooks/useNoteHelpers.ts
import { notesApi } from '@/services/api';
import { useNoteStore } from '@/store/notes/NoteStore';
import type { Note, GetNotesParams, CreateNoteRequest, UpdateNoteRequest } from '@/types';

interface UseNoteHelpersReturn {
    fetchNotes: (params?: GetNotesParams) => Promise<void>;
    createNote: (request: CreateNoteRequest) => Promise<Note>;
    updateNote: (id: number, request: UpdateNoteRequest) => Promise<Note>;
    deleteNote: (id: number) => Promise<void>;
}

// NO PARAMETERS - Helper hooks should not accept any parameters
export function useNoteHelpers(): UseNoteHelpersReturn {
  // Get state setters from NoteStore (no state returned)
  const { setNotes, setLoading, setError } = useNoteStore();

  const fetchNotes = async (params?: GetNotesParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await notesApi.getNotes(params || { getAll: true });
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (request: CreateNoteRequest) => {
    try {
      const newNote = await notesApi.createNote(request);
      setNotes(prev => [...prev, newNote]);
      return newNote;
    } catch (err) {
      throw err;
    }
  };

  const updateNote = async (id: number, request: UpdateNoteRequest) => {
    try {
      const updatedNote = await notesApi.updateNote(id, request);
      setNotes(prev => {
        const index = prev.findIndex(n => n.noteId === id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = updatedNote;
          return updated;
        }
        return prev;
      });
      return updatedNote;
    } catch (err) {
      throw err;
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await notesApi.deleteNote(id);
      setNotes(prev => prev.filter(n => n.noteId !== id));
    } catch (err) {
      throw err;
    }
  };

  // NO useEffect - Components handle data fetching timing
  
  return {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
}
```

**Usage**:
```typescript
import { useNoteHelpers } from '@/hooks';
import { useNoteStore } from '@/store/notes/NoteStore';

function NotesPage() {
  // Get state from store
  const { notes, loading, error } = useNoteStore();
  
  // Get functions from helpers
  const { fetchNotes, createNote, updateNote, deleteNote } = useNoteHelpers();

  // Component handles data fetching timing
  useEffect(() => {
    fetchNotes({ getAll: true });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      {notes.map(note => (
        <NoteCard key={note.noteId} note={note} />
      ))}
      <Button onClick={() => fetchNotes()}>Refresh</Button>
    </div>
  );
}
```

### Dialog Management Pattern

**Current Architecture**: Use `useDialogHelpers` + `useDialogStore` + `DialogStore`

```typescript
// Get dialog helper functions
import { useDialogHelpers } from '@/hooks';
import { useDialogStore } from '@/store/dialog/DialogStore';

function NotesTable() {
  // Get helper functions
  const { openDialog, closeDialog } = useDialogHelpers<Note>();
  
  // Get dialog state
  const { open, data } = useDialogStore();

  const handleNoteClick = (note: Note) => {
    openDialog(note);
  };

  return (
    <>
      <DataGrid
        rows={notes}
        onRowClick={(params) => handleNoteClick(params.row)}
      />
      
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent>
          {data && (
            <NoteEditor note={data} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

---

## Component Development

### Component Patterns

#### Smart vs Dumb Components

**Smart Component (Container)**:
- Handles data fetching
- Manages state
- Contains business logic
- Uses hooks

**Dumb Component (Presentational)**:
- Pure presentation
- Receives data via props
- No business logic
- Highly reusable

**Example**:

```typescript
// NoteGrid.container.tsx (Smart)
import { useNoteHelpers, useDialogHelpers } from '@/hooks';
import { useNoteStore } from '@/store/notes/NoteStore';
import { useDialogStore } from '@/store/dialog/DialogStore';
import { NoteGridView } from './NoteGrid.view';

export const NoteGrid: React.FC = () => {
  // Get state from store
  const { notes, loading, error } = useNoteStore();
  
  // Get functions from helpers
  const { createNote, updateNote } = useNoteHelpers();
  const { openDialog, closeDialog } = useDialogHelpers<Note>();
  
  // Get dialog state
  const { open, data } = useDialogStore();

  const handleNoteClick = (note: Note) => {
    openDialog(note);
  };

  const handleSave = async (note: Note) => {
    await updateNote(note.noteId, note);
    closeDialog();
  };

  return (
    <NoteGridView
      notes={notes}
      loading={loading}
      error={error}
      selectedNote={data}
      dialogOpen={open}
      onNoteClick={handleNoteClick}
      onDialogClose={closeDialog}
      onNoteSave={handleSave}
    />
  );
};
```

```typescript
// NoteGrid.view.tsx (Dumb)
import { DataGrid } from '@mui/x-data-grid';
import type { Note } from '@/types';

interface NoteGridViewProps {
  notes: Note[];
  loading: boolean;
  error: string | null;
  selectedNote: Note | null;
  dialogOpen: boolean;
  onNoteClick: (note: Note) => void;
  onDialogClose: () => void;
  onNoteSave: (note: Note) => void;
}

export const NoteGridView: React.FC<NoteGridViewProps> = ({
  notes,
  loading,
  error,
  selectedNote,
  dialogOpen,
  onNoteClick,
  onDialogClose,
  onNoteSave,
}) => {
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <DataGrid
        rows={notes}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.noteId}
        onRowClick={(params) => onNoteClick(params.row)}
      />
      
      <NoteDialog
        open={dialogOpen}
        note={selectedNote}
        onClose={onDialogClose}
        onSave={onNoteSave}
      />
    </>
  );
};
```

### Component File Organization

**Simple Component** (Single file):
```
Button.tsx
```

**Complex Component** (Folder structure):
```
Button/
├── Button.tsx          # Main component
├── Button.styles.ts    # Styled components
├── Button.types.ts     # TypeScript types
├── Button.test.tsx     # Unit tests
└── index.ts            # Exports
```

### Component Template

```typescript
import { FC } from 'react';
import { Box, Typography } from '@mui/material';

// Types
interface MyComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

// Component
export const MyComponent: FC<MyComponentProps> = ({
  title,
  description,
  onAction,
}) => {
  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h6">{title}</Typography>
      {description && (
        <Typography variant="body2">{description}</Typography>
      )}
      {onAction && (
        <button onClick={onAction}>Action</button>
      )}
    </Box>
  );
};
```

---

## Styling Guidelines

### MUI Theme Configuration

**File**: `src/config/theme.ts`

```typescript
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    sidebar: Palette['primary'];
  }
  interface PaletteOptions {
    sidebar?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    sidebar: {
      main: '#36454f',
      light: '#4a5a6a',
      dark: '#2a3840',
      contrastText: '#fff',
    },
    divider: '#e0e0e0',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});
```

### Styling Methods

#### 1. sx Prop (For layout & one-off styles)

**Use for**:
- Layout properties (flex, grid)
- Spacing (margin, padding)
- Quick, component-specific styles

```typescript
<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    marginTop: '16px',
  }}
>
  <Button sx={{ marginTop: '16px' }}>Save</Button>
</Box>
```

#### 2. styled() (For reusable components)

**Use for**:
- Reusable components
- Complex styles
- Hover/focus states
- Media queries

```typescript
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const NoteCard = styled(Paper)(({ theme }) => ({
  padding: '16px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
  },
  '& .note-title': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '16px',
  },
}));

// Usage
<NoteCard>
  <div className="note-title">My Note</div>
</NoteCard>
```

### Styling Best Practices

**✅ DO**:
- Use `sx` for layout and spacing
- Use `styled()` for reusable components
- Use **pixels (px)** for all measurements
- Keep styles close to components
- Use theme colors consistently

**❌ DON'T**:
- Don't use inline styles (`style={{ ... }}`)
- Don't create tiny wrapper components
- Don't use `theme.spacing()` - use px directly
- Don't mix styling approaches in one component

### Common Styling Patterns

**Flexbox Layout**:
```typescript
<Box sx={{ 
  display: 'flex', 
  alignItems: 'center', 
  gap: '16px' 
}}>
  <TextField />
  <Button>Submit</Button>
</Box>
```

**Conditional Styling**:
```typescript
<Button
  sx={{
    backgroundColor: isActive ? 'primary.main' : 'grey.300',
    '&:hover': {
      backgroundColor: isActive ? 'primary.dark' : 'grey.400',
    },
  }}
>
  Click Me
</Button>
```

**Responsive Styles**:
```typescript
<Box
  sx={{
    width: '100%',
    padding: { xs: '8px', sm: '16px', md: '24px' },
    display: { xs: 'block', md: 'flex' },
  }}
/>
```

---

## Code Formatting Guidelines

### General Rules

Follow these guidelines to maintain consistent code style across the project. These can be enforced via tools like Prettier or ESLint if configured.

| Rule              | Description                          |
|-------------------|--------------------------------------|
| **Indentation**   | Use 4 spaces for indentation. |
| **Line Length**   | Maximum 100 characters per line.    |
| **Quotes**        | Use double quotes (`"`) for strings. |
| **Semicolons**    | Always end statements with semicolons (`;`). |
| **Trailing Commas**| Use trailing commas in arrays, objects, and function parameters for better diff readability. |
| **Bracket Spacing**| Use spaces inside curly braces: `{ key: value }`. |
| **Arrow Functions**| Prefer concise arrow functions without braces for single-line bodies. |
| **Operator Spacing** | Add spaces around operators: `a + b`, not `a+b`. |
| **Function Declarations** | Add a space after the `function` keyword and before parameters: `function myFunc() {}`. For arrow functions: `const myFunc = () => {};`. |
| **Object Literals** | Use spaces inside object literals: `{ key: value }`. Place opening brace on the same line as the declaration. |
| **Array Literals** | Use spaces inside array literals: `[ item1, item2 ]`. |
| **Comments** | Use `//` for single-line comments and `/* */` for multi-line. Place comments above the code they describe, with a blank line before if needed. |
| **Line Breaks** | For long lines, break after operators or commas. Indent continued lines by 4 spaces. |
| **Import Spacing** | Group imports with blank lines between categories (e.g., React/third-party, internal). No space between import and the path. |
| **Conditional Statements** | Place opening brace on the same line: `if (condition) {`. |
| **Variable Declarations** | Use one `const` or `let` per variable. Align assignments if it improves readability. |

**Example**:
```typescript
// Good
import { useState } from 'react';

const MAX_ITEMS = 100;

function calculateSum(a: number, b: number): number {
    if (a > MAX_ITEMS || b > MAX_ITEMS) {
        return 0;  // Prevent overflow
    }

    return a + b;
}

const options = {
    color: 'red',
    size: 'large',
};

const items = [
    'apple',
    'banana',
    'cherry',
];

// Bad (no operator spacing, no trailing commas, double quotes)
const calculateSum=(a:number,b:number):number=>{
if(a>MAX_ITEMS||b>MAX_ITEMS)return 0
return a+b
}

const options={"color":"red","size":"large"}
```

---

## Type Safety

### Type Definition Patterns

**Location**: `src/types/`

#### Domain Models (models.ts)

```typescript
export interface Note {
  noteId: number;
  name: string;
  description?: string;
  tags?: string;
  type?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  isArchived: boolean;
}

export interface User {
  userId: number;
  userName: string;
  email: string;
  token?: string;
}

export interface GetNotesParams {
  getAll?: boolean;
  isArchived?: boolean;
  type?: string;
}
```

#### API Types (api.types.ts)

```typescript
export interface ApiResponse<T> {
  data?: T;
  options?: {
    success: boolean;
    message?: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  userName: string;
}
```

#### Common Types (common.types.ts)

```typescript
export type ID = number | string;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface SelectOption<T = string> {
  label: string;
  value: T;
}
```

### Type Safety Rules

**1. Never use `any`**:
```typescript
// ❌ BAD
function handleClick(event: any) { }

// ✅ GOOD
function handleClick(event: React.MouseEvent<HTMLButtonElement>) { }
```

**2. Type all function parameters and returns**:
```typescript
// ❌ BAD
function saveNote(note) { }

// ✅ GOOD
function saveNote(note: Partial<Note>): Promise<Note> { }
```

**3. Type component props**:
```typescript
// ❌ BAD
export const MyComponent = ({ title, count }) => { }

// ✅ GOOD
interface MyComponentProps {
  title: string;
  count: number;
}

export const MyComponent: FC<MyComponentProps> = ({ title, count }) => { }
```

**4. Type API responses**:
```typescript
// ❌ BAD
const response = await fetch(url);
const data = await response.json();

// ✅ GOOD
const response = await apiClient.get<ApiResponse<Note[]>>(url);
const notes = response.data || [];
```

---

## Best Practices

### Documentation Maintenance

**Always update examples when changing rules**:
When updating any rule, pattern, or guideline in documentation files or instruction files, you must:

1. **Review all examples** in the affected documentation
2. **Update inconsistent examples** to match the new rule/pattern
3. **Add new examples** if the rule introduces new concepts
4. **Remove outdated examples** that contradict the new rule

This ensures documentation remains accurate and prevents confusion between rules and examples.

**Example**: If you change a naming convention from `camelCase` to `PascalCase`, update all code examples throughout the file to use `PascalCase`.

### Security

**Never commit sensitive data**:
```typescript
// ❌ BAD
const API_URL = "http://157.66.218.17:5000";

// ✅ GOOD
const API_URL = process.env.REACT_APP_API_URL;
```

**Always use HTTPS in production**:
```typescript
// ❌ BAD
baseURL: "http://production-server.com"

// ✅ GOOD
baseURL: "https://production-server.com"
```

**Environment file structure**:
- `.env` - Default values (committed)
- `.env.local` - Local overrides (gitignored)
- `.env.production` - Production values (committed)

### Performance

**Don't use `useCallback` and `useMemo` when not necessary**:
```typescript
// ❌ BAD - Unnecessary useCallback
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

// ✅ GOOD - Regular function when no dependencies or performance issues
const handleClick = () => {
  console.log('clicked');
};

// ❌ BAD - Unnecessary useMemo
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);

// ✅ GOOD - Regular calculation for simple operations
const filteredData = data.filter(item => item.active);
```

**Use named exports instead of default exports**:
```typescript
// ❌ BAD - Default export
const MyComponent = () => <div>Hello</div>;
export default MyComponent;

// ✅ GOOD - Named export
export function MyComponent() {
  return <div>Hello</div>;
}

// ❌ BAD - Default export with separate export
const useCustomHook = () => {
  // hook logic
};
export default useCustomHook;

// ✅ GOOD - Named export
export function useCustomHook() {
  // hook logic
}
```

**Use React.memo for expensive components**:
```typescript
export const ExpensiveComponent = React.memo(({ data }) => {
  // Complex rendering
});
```

**Optimize re-renders**:
```typescript
// Use useCallback for functions passed as props
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);

// Use useMemo for expensive calculations
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

**Lazy load routes**:
```typescript
const HomePage = lazy(() => import('./pages/HomePage'));
const NotesPage = lazy(() => import('./pages/NotesPage'));
```

### Code Quality

**Use meaningful variable names**:
```typescript
// ❌ BAD
const d = new Date();
const n = notes.filter(x => x.t === 'work');

// ✅ GOOD
const currentDate = new Date();
const workNotes = notes.filter(note => note.type === 'work');
```

**Extract magic numbers to constants**:
```typescript
// ❌ BAD
if (notes.length > 100) { }

// ✅ GOOD
const MAX_NOTES_DISPLAY = 100;
if (notes.length > MAX_NOTES_DISPLAY) { }
```

**Write self-documenting code**:
```typescript
// ❌ BAD (needs comment)
// Check if user is admin
if (user.role === 'admin' && user.permissions.includes('write')) { }

// ✅ GOOD (name explains intent)
const canEditContent = user.role === 'admin' && 
                       user.permissions.includes('write');
if (canEditContent) { }
```

### Keep files concise:
- Each file should not exceed 400 lines of code to maintain readability and manageability.
- If a file grows beyond this limit, refactor by splitting into smaller files or modules (e.g., extract utilities, hooks, or sub-components).

### Error Handling

**Always handle errors**:
```typescript
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch:', error);
  setError('Failed to load data');
}
```

**Show user-friendly error messages**:
```typescript
// ❌ BAD
setError(error.message); // "Network request failed at line 42"

// ✅ GOOD
setError('Unable to load notes. Please try again.');
```

**Handle loading states**:
```typescript
if (loading) return <CircularProgress />;
if (error) return <Alert severity="error">{error}</Alert>;
return <div>{data}</div>;
```

---

## Common Patterns

### Pattern 1: Data Fetching

```typescript
import { useEffect } from 'react';
import { useNoteHelpers } from '@/hooks';
import { useNoteStore } from '@/store/notes/NoteStore';

function NotesPage() {
  // Get state from store
  const { notes, loading, error } = useNoteStore();
  
  // Get functions from helpers
  const { fetchNotes } = useNoteHelpers();

  // Component handles data fetching timing
  useEffect(() => {
    fetchNotes({ getAll: true });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      {notes.map(note => (
        <NoteCard key={note.noteId} note={note} />
      ))}
      <Button onClick={() => fetchNotes()}>Refresh</Button>
    </div>
  );
}
```

### Pattern 2: Form Handling

```typescript
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAuthHelpers } from '@/hooks';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthHelpers();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        fullWidth
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        fullWidth
        sx={{ marginBottom: '16px' }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
```

### Pattern 3: Dialog Management

```typescript
import { useDialogHelpers } from '@/hooks';
import { useDialogStore } from '@/store/dialog/DialogStore';

function NotesTable() {
  // Get dialog helper functions
  const { openDialog, closeDialog } = useDialogHelpers<Note>();
  
  // Get dialog state
  const { open, data } = useDialogStore();

  return (
    <>
      <DataGrid
        rows={notes}
        onRowClick={(params) => openDialog(params.row)}
      />
      
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          {data && (
            <NoteForm note={data} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Pattern 4: Conditional Rendering

```typescript
function UserProfile() {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome, {user?.userName}</h1>
      {user?.isAdmin && (
        <AdminPanel />
      )}
    </div>
  );
}
```

### Pattern 5: List Rendering with Keys

```typescript
function NoteList({ notes }: { notes: Note[] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {notes.map(note => (
        <NoteCard 
          key={note.noteId} 
          note={note} 
        />
      ))}
    </Box>
  );
}
```

### Pattern 6: Optimistic Updates

```typescript
function useOptimisticNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const deleteNote = async (noteId: number) => {
    // Optimistic update
    const originalNotes = [...notes];
    setNotes(notes.filter(n => n.noteId !== noteId));

    try {
      await notesApi.deleteNote(noteId);
    } catch (error) {
      // Revert on error
      setNotes(originalNotes);
      throw error;
    }
  };

  return { notes, deleteNote };
}
```

### Pattern 7: Debounced Search

```typescript
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useMemo(
    () => debounce(async (term: string) => {
      if (term.length > 2) {
        const data = await searchApi(term);
        setResults(data);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <TextField
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Pattern 8: Pagination

```typescript
function usePagination<T>(items: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
  };
}
```

### Pattern 9: File Upload

```typescript
function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadApi.upload(formData);
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
      />
      <Button 
        onClick={handleUpload} 
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </Box>
  );
}
```

### Pattern 10: Custom Validation

```typescript
// src/utils/validators.ts
export const validators = {
  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
  },

  required: (value: string): string | null => {
    return value.trim() ? null : 'This field is required';
  },

  minLength: (min: number) => (value: string): string | null => {
    return value.length >= min ? null : `Minimum ${min} characters required`;
  },

  maxLength: (max: number) => (value: string): string | null => {
    return value.length <= max ? null : `Maximum ${max} characters allowed`;
  },
};

// Usage in component
function FormField() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    const validationError = validators.email(value);
    setError(validationError);
  };

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      error={!!error}
      helperText={error}
    />
  );
}
```

---

## Anti-Patterns (Avoid These)

### ❌ Anti-Pattern 1: Destructuring with Renaming

**Bad** (Avoid renaming in destructuring):
```typescript
// ❌ Don't rename properties in destructuring - it makes code harder to read
const { open: dialogOpen, data: selectedNote } = useDialogStore();
const { notes: apiNotes } = useNoteStore();
const { style: dialogcontentStyle } = dialogContentProps ?? {};
```

**Good** (Normal destructuring is fine, or use object access):
```typescript
// ✅ Normal destructuring without renaming is perfectly fine
const { openDialog, closeDialog } = useDialogHelpers();
const { notes, loading, error } = useNoteStore();
const { user, isAuthenticated } = useAuthContext();
const { open, data } = useDialogStore();

// ✅ Object access when you need the whole object or many properties
const dialogStore = useDialogStore(); // when using many properties
const noteStore = useNoteStore(); // when using many properties

// ✅ Direct property access for simple cases
const dialogContentStyle = dialogContentProps?.style;

// ✅ Descriptive variable names when needed
const notesProp = props.notes;
```

### ❌ Anti-Pattern 2: Prop Drilling

**Bad**:
```typescript
function App() {
  const [user, setUser] = useState(null);
  return <PageLayout user={user} />;
}

function PageLayout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <div>{user.name}</div>;
}
```

**Good** (Use Context):
```typescript
function App() {
  return (
    <AuthProvider>
      <PageLayout />
    </AuthProvider>
  );
}

function UserMenu() {
  const { user } = useAuthContext();
  return <div>{user.name}</div>;
}
```

### ❌ Anti-Pattern 3: Massive Components

**Bad**:
```typescript
function Dashboard() {
  // 500+ lines of code
  // Multiple responsibilities
  // Hard to maintain
}
```

**Good** (Split into smaller components):
```typescript
function Dashboard() {
  return (
    <Box>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <DashboardTable />
    </Box>
  );
}
```

### ❌ Anti-Pattern 4: Inline Event Handlers

**Bad**:
```typescript
<Button onClick={() => handleClick(item.id)}>
  Click
</Button>
```

**Good**:
```typescript
const handleButtonClick = useCallback(() => {
  handleClick(item.id);
}, [item.id]);

<Button onClick={handleButtonClick}>
  Click
</Button>
```

### ❌ Anti-Pattern 5: Mutating State Directly

**Bad**:
```typescript
const [notes, setNotes] = useState([]);

// ❌ Don't mutate state
notes.push(newNote);
setNotes(notes);
```

**Good**:
```typescript
// ✅ Create new array
setNotes([...notes, newNote]);
```

### ❌ Anti-Pattern 6: Multiple API Calls in useEffect

**Bad**:
```typescript
useEffect(() => {
  fetchUsers();
  fetchNotes();
  fetchSettings();
}, []);
```

**Good**:
```typescript
useEffect(() => {
  const loadData = async () => {
    await Promise.all([
      fetchUsers(),
      fetchNotes(),
      fetchSettings(),
    ]);
  };
  loadData();
}, []);
```

---

## Import Guidelines

### Import Order

```typescript
// 1. React and third-party libraries
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

// 2. Internal contexts
import { useAuthContext } from '@/contexts';

// 3. Internal hooks
import { useNoteHelpers, useDialogHelpers } from '@/hooks';

// 4. Internal stores
import { useNoteStore } from '@/store/notes/NoteStore';
import { useDialogStore } from '@/store/dialog/DialogStore';

// 5. Internal services
import { notesApi } from '@/services/api';

// 5. Internal types
import type { Note, User } from '@/types';

// 6. Internal utils
import { formatDate } from '@/utils';

// 7. Styles
import { StyledContainer } from './MyComponent.styles';
```

### Path Aliases

Configure in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/config/*": ["config/*"],
      "@/services/*": ["services/*"],
      "@/hooks/*": ["hooks/*"],
      "@/contexts/*": ["contexts/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

---

## Testing Patterns

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const handleClick = jest.fn();
    render(<MyComponent onAction={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Hook Testing

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useNoteHelpers } from './useNoteHelpers';

describe('useNoteHelpers', () => {
  it('provides CRUD functions', async () => {
    const { result } = renderHook(() => useNoteHelpers());

    expect(result.current.createNote).toBeDefined();
    expect(result.current.updateNote).toBeDefined();
    expect(result.current.deleteNote).toBeDefined();
    expect(result.current.fetchNotes).toBeDefined();
  });
});
```

### API Testing

```typescript
import { notesApi } from './notes.api';

describe('notesApi', () => {
  it('fetches notes successfully', async () => {
    const notes = await notesApi.getNotes();
    expect(notes).toBeInstanceOf(Array);
  });

  it('handles errors correctly', async () => {
    await expect(notesApi.getNotes()).rejects.toThrow();
  });
});
```

---

## Quick Reference

### Common Imports

```typescript
// Contexts
import { useAuthContext, useNavigationContext } from '@/contexts';

// Hooks
import { useAuthHelpers, useNoteHelpers, useDialogHelpers, useApiHelpers } from '@/hooks';

// Stores
import { useNoteStore } from '@/store/notes/NoteStore';
import { useDialogStore } from '@/store/dialog/DialogStore';

// API Services
import { authApi, notesApi } from '@/services/api';

// Configuration
import { API_CONFIG, APP_CONFIG, ENDPOINTS } from '@/config';

// Types
import type { Note, User, ApiResponse } from '@/types';

// Utils
import { formatDate, validateEmail } from '@/utils';

// MUI Components
import { 
  Box, 
  Button, 
  TextField, 
  Typography,
  Dialog,
  CircularProgress 
} from '@mui/material';
```

### Code Snippets

**Basic Component**:
```typescript
import { FC } from 'react';

interface Props {
  title: string;
}

export const MyComponent: FC<Props> = ({ title }) => {
  return <div>{title}</div>;
};
```

**Custom Helper Hook**:
```typescript
import { useNoteStore } from '@/store/notes/NoteStore';
import { notesApi } from '@/services/api';

export function useNoteHelpers() {
  const { setNotes, setLoading, setError } = useNoteStore();

  const fetchNotes = async (params = { getAll: true }) => {
    setLoading(true);
    try {
      const data = await notesApi.getNotes(params);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchNotes };
}
```

**API Service**:
```typescript
export const myApi = {
  async getData(): Promise<Data[]> {
    const response = await apiClient.get<ApiResponse<Data[]>>(endpoint);
    return response.data || [];
  },
};
```

---

## Checklist for New Features

When implementing a new feature:

- [ ] Create types in `src/types/`
- [ ] Create API service in `src/services/api/`
- [ ] Create custom hook if needed in `src/hooks/`
- [ ] Create components in appropriate folder
- [ ] Add proper TypeScript types
- [ ] Handle loading and error states
- [ ] Add error boundaries if needed
- [ ] Follow styling guidelines
- [ ] Follow code formatting guidelines
- [ ] Write unit tests
- [ ] Update configuration if needed
- [ ] Document any new patterns

---

## Glossary

| Term | Description |
|------|-------------|
| **API Client** | Centralized HTTP client for making API requests |
| **Custom Hook** | Reusable React hook for specific functionality |
| **Context** | React Context API for global state management |
| **Smart Component** | Component with business logic and data fetching |
| **Dumb Component** | Presentational component with no business logic |
| **Type Safety** | Using TypeScript to catch errors at compile time |
| **sx Prop** | MUI's styling prop for inline styles |
| **styled()** | MUI's API for creating styled components |

---

**Last Updated**: January 2025