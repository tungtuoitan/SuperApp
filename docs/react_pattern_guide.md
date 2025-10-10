# React Feature-Based Architecture Pattern - Complete Guidelines

## 📚 Table of Contents

1. [Overview](#overview)
2. [Core Principles](#core-principles)
3. [Folder Structure](#folder-structure)
4. [Layer Architecture](#layer-architecture)
5. [Naming Conventions](#naming-conventions)
6. [Implementation Guidelines](#implementation-guidelines)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)
9. [Testing Strategy](#testing-strategy)
10. [Performance Optimization](#performance-optimization)
11. [Example Checklist](#example-checklist)

---

## Overview

This pattern provides a scalable, maintainable, and type-safe architecture for React applications using feature-based organization with clear separation of concerns.

### Key Technologies
- **React 18+** with TypeScript
- **React Query** for server state management
- **React Hook Form + Zod** for form validation
- **Material-UI** for UI components
- **Axios** for HTTP requests

### Architecture Philosophy
```
Feature-Driven → Type-Safe → Composable → Testable
```

---

## Core Principles

### 1. Feature-Based Organization
- Each feature is self-contained
- Features can be developed, tested, and deployed independently
- Easy to understand and navigate codebase

### 2. Separation of Concerns
```
Presentation ← Logic ← Business Logic ← Data Access
   (View)      (Hook)     (Service)      (API)
```

### 3. Single Responsibility
- Each file/function has ONE clear purpose
- Easy to test and maintain

### 4. Type Safety First
- TypeScript for everything
- Shared types between layers
- No `any` types

### 5. Don't Repeat Yourself (DRY)
- Reusable hooks, components, utilities
- Shared logic in custom hooks

---

## Folder Structure

```
src/
├── features/                    # Feature modules
│   └── [feature-name]/         # e.g., notes, users, products
│       ├── components/         # Feature-specific components
│       │   └── [ComponentName]/
│       │       ├── index.ts                    # Public exports
│       │       ├── [ComponentName].tsx         # Main component
│       │       ├── [ComponentName].types.ts    # Component types
│       │       ├── [ComponentName].styles.ts   # Styles (if complex)
│       │       ├── [ComponentName].test.tsx    # Component tests
│       │       └── [SubComponent].tsx          # Sub-components
│       ├── hooks/              # Feature-specific hooks
│       │   ├── use[Feature].ts              # Data fetching hooks
│       │   ├── use[Feature]Actions.ts       # CRUD operations
│       │   ├── use[Feature]Dialog.ts        # UI state management
│       │   └── use[Feature]Form.ts          # Form logic
│       ├── services/           # Business logic & API calls
│       │   └── [feature]Service.ts
│       ├── store/              # Feature state (if needed)
│       │   ├── [feature]Slice.ts           # Redux Toolkit
│       │   └── [feature]Atoms.ts           # Jotai/Recoil
│       ├── types/              # Feature types
│       │   ├── [feature].types.ts          # Domain models
│       │   └── [feature].dto.ts            # API DTOs
│       ├── utils/              # Feature utilities
│       │   └── [feature]Helpers.ts
│       └── index.ts            # Feature public API
│
├── shared/                     # Shared/common code
│   ├── components/            # Reusable components
│   │   ├── DataGrid/
│   │   ├── Dialog/
│   │   ├── Form/
│   │   └── Layout/
│   ├── hooks/                 # Reusable hooks
│   │   ├── useDialog.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── utils/                 # Utility functions
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── types/                 # Global types
│   │   └── common.types.ts
│   └── constants/             # Global constants
│       └── config.ts
│
├── lib/                       # Third-party integrations
│   ├── api/
│   │   ├── client.ts         # Axios instance
│   │   └── interceptors.ts
│   ├── query/
│   │   └── queryClient.ts    # React Query config
│   └── theme/
│       └── theme.ts          # MUI theme
│
├── pages/                     # Page components (routing)
│   ├── [PageName]Page.tsx
│   └── index.ts
│
├── App.tsx                    # Root component
└── main.tsx                   # Entry point
```

---

## Layer Architecture

### Layer 1: API Client (lib/api)

**Purpose**: Handle HTTP communication

**Files**:
```typescript
// lib/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
    private instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            timeout: 30000,
            headers: { 'Content-Type': 'application/json' },
        });
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig) {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig) {
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    }

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
        const response = await this.instance.patch<T>(url, data, config);
        return response.data;
    }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL);
```

**Guidelines**:
- ✅ Single instance exported
- ✅ Centralized interceptors
- ✅ Type-safe methods
- ✅ Error handling
- ❌ No business logic here

---

### Layer 2: Service Layer (features/[feature]/services)

**Purpose**: Business logic and API interaction

**Template**:
```typescript
// features/notes/services/noteService.ts
import { apiClient } from '@/lib/api/client';
import type { Note, CreateNoteDTO, UpdateNoteDTO, GetNotesParams, NotesResponse } from '../types/note.types';
import type { ApiResponse } from '@/shared/types/common.types';

class NoteService {
    private readonly BASE_PATH = '/api/notes';

    async getNotes(params?: GetNotesParams): Promise<NotesResponse> {
        return apiClient.get<NotesResponse>(this.BASE_PATH, { params });
    }

    async getNoteById(id: number): Promise<Note> {
        return apiClient.get<Note>(`${this.BASE_PATH}/${id}`);
    }

    async createNote(data: CreateNoteDTO): Promise<Note> {
        const response = await apiClient.post<ApiResponse<Note>>(this.BASE_PATH, data);
        return response.data;
    }

    async updateNote(id: number, data: UpdateNoteDTO): Promise<Note> {
        const response = await apiClient.put<ApiResponse<Note>>(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }

    async deleteNote(id: number): Promise<void> {
        await apiClient.delete(`${this.BASE_PATH}/${id}`);
    }

    // Additional business logic methods
    async archiveNote(id: number): Promise<Note> {
        return this.updateNote(id, { isArchived: true });
    }

    async unarchiveNote(id: number): Promise<Note> {
        return this.updateNote(id, { isArchived: false });
    }
}

export const noteService = new NoteService();
```

**Guidelines**:
- ✅ Class-based service
- ✅ Single instance export
- ✅ All API calls here
- ✅ Business logic transformations
- ✅ Type-safe inputs/outputs
- ❌ No React hooks
- ❌ No state management
- ❌ No UI logic

---

### Layer 3: Data Hooks (features/[feature]/hooks)

**Purpose**: Data fetching and caching with React Query

**Template**:
```typescript
// features/notes/hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '../services/noteService';
import type { GetNotesParams, CreateNoteDTO, UpdateNoteDTO } from '../types/note.types';

// Query Keys Factory
export const noteKeys = {
    all: ['notes'] as const,
    lists: () => [...noteKeys.all, 'list'] as const,
    list: (params?: GetNotesParams) => [...noteKeys.lists(), params] as const,
    details: () => [...noteKeys.all, 'detail'] as const,
    detail: (id: number) => [...noteKeys.details(), id] as const,
};

// Query Hooks
export function useNotes(params?: GetNotesParams) {
    return useQuery({
        queryKey: noteKeys.list(params),
        queryFn: () => noteService.getNotes(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useNote(id: number, enabled = true) {
    return useQuery({
        queryKey: noteKeys.detail(id),
        queryFn: () => noteService.getNoteById(id),
        enabled,
    });
}

// Mutation Hooks
export function useCreateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateNoteDTO) => noteService.createNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}

export function useUpdateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateNoteDTO }) =>
            noteService.updateNote(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}

export function useDeleteNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => noteService.deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}
```

**Guidelines**:
- ✅ Use React Query for server state
- ✅ Query keys factory pattern
- ✅ Proper cache invalidation
- ✅ Consistent naming: `use[Feature]`, `useCreate[Feature]`
- ❌ No UI logic
- ❌ No side effects (toasts, navigation)

---

### Layer 4: Action Hooks (features/[feature]/hooks)

**Purpose**: Combine mutations with side effects

**Template**:
```typescript
// features/notes/hooks/useNoteActions.ts
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useCreateNote, useUpdateNote, useDeleteNote } from './useNotes';
import type { CreateNoteDTO, UpdateNoteDTO } from '../types/note.types';

export function useNoteActions() {
    const { enqueueSnackbar } = useSnackbar();
    
    const createNoteMutation = useCreateNote();
    const updateNoteMutation = useUpdateNote();
    const deleteNoteMutation = useDeleteNote();

    const createNote = useCallback(
        async (data: CreateNoteDTO) => {
            try {
                const result = await createNoteMutation.mutateAsync(data);
                enqueueSnackbar('Note created successfully', { variant: 'success' });
                return result;
            } catch (error) {
                enqueueSnackbar('Failed to create note', { variant: 'error' });
                throw error;
            }
        },
        [createNoteMutation, enqueueSnackbar]
    );

    const updateNote = useCallback(
        async (id: number, data: UpdateNoteDTO) => {
            try {
                const result = await updateNoteMutation.mutateAsync({ id, data });
                enqueueSnackbar('Note updated successfully', { variant: 'success' });
                return result;
            } catch (error) {
                enqueueSnackbar('Failed to update note', { variant: 'error' });
                throw error;
            }
        },
        [updateNoteMutation, enqueueSnackbar]
    );

    const deleteNote = useCallback(
        async (id: number) => {
            try {
                await deleteNoteMutation.mutateAsync(id);
                enqueueSnackbar('Note deleted successfully', { variant: 'success' });
            } catch (error) {
                enqueueSnackbar('Failed to delete note', { variant: 'error' });
                throw error;
            }
        },
        [deleteNoteMutation, enqueueSnackbar]
    );

    return {
        createNote,
        updateNote,
        deleteNote,
        isCreating: createNoteMutation.isPending,
        isUpdating: updateNoteMutation.isPending,
        isDeleting: deleteNoteMutation.isPending,
    };
}
```

**Guidelines**:
- ✅ Wrap mutations with side effects
- ✅ User notifications (toasts)
- ✅ Error handling
- ✅ useCallback for stable references
- ✅ Return loading states
- ❌ No direct API calls

---

### Layer 5: UI State Hooks (features/[feature]/hooks)

**Purpose**: Manage UI-specific state (dialogs, modals, etc.)

**Template**:
```typescript
// features/notes/hooks/useNoteDialog.ts
import { useState, useCallback } from 'react';
import type { Note } from '../types/note.types';

interface UseNoteDialogReturn {
    isOpen: boolean;
    selectedNote: Note | null;
    mode: 'create' | 'edit' | 'view';
    openCreate: () => void;
    openEdit: (note: Note) => void;
    openView: (note: Note) => void;
    close: () => void;
}

export function useNoteDialog(): UseNoteDialogReturn {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [mode, setMode] = useState<'create' | 'edit' | 'view'>('view');

    const openCreate = useCallback(() => {
        setMode('create');
        setSelectedNote(null);
        setIsOpen(true);
    }, []);

    const openEdit = useCallback((note: Note) => {
        setMode('edit');
        setSelectedNote(note);
        setIsOpen(true);
    }, []);

    const openView = useCallback((note: Note) => {
        setMode('view');
        setSelectedNote(note);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setTimeout(() => {
            setSelectedNote(null);
            setMode('view');
        }, 200);
    }, []);

    return {
        isOpen,
        selectedNote,
        mode,
        openCreate,
        openEdit,
        openView,
        close,
    };
}
```

**Guidelines**:
- ✅ Local UI state only
- ✅ useCallback for handlers
- ✅ Clear naming
- ❌ No data fetching
- ❌ No business logic

---

### Layer 6: Components (features/[feature]/components)

**Purpose**: Presentation and user interaction

**Component Structure**:
```typescript
// features/notes/components/NoteGrid/NoteGrid.types.ts
export interface NoteGridProps {
    searchText?: string;
    showArchived?: boolean;
    onNoteClick?: (note: Note) => void;
}

// features/notes/components/NoteGrid/NoteGrid.tsx
import { useState, useMemo, useCallback } from 'react';
import { Box, Alert, CircularProgress } from '@mui/material';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { useNotes } from '../../hooks/useNotes';
import { useNoteActions } from '../../hooks/useNoteActions';
import { useNoteDialog } from '../../hooks/useNoteDialog';
import type { NoteGridProps } from './NoteGrid.types';

export function NoteGrid({ 
    searchText = '', 
    showArchived = false,
    onNoteClick 
}: NoteGridProps) {
    // Local state
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 25,
    });

    // Data fetching
    const { data, isLoading, error } = useNotes({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        search: searchText || undefined,
        isArchived: showArchived ? true : undefined,
    });

    // Actions
    const { deleteNote, archiveNote } = useNoteActions();

    // Dialog management
    const dialog = useNoteDialog();

    // Handlers
    const handleView = useCallback((note: Note) => {
        onNoteClick?.(note) ?? dialog.openView(note);
    }, [onNoteClick, dialog]);

    // Memoized values
    const columns = useMemo(() => getColumns({ onView: handleView }), [handleView]);

    // Render states
    if (error) return <Alert severity="error">{error.message}</Alert>;
    if (isLoading && !data) return <CircularProgress />;

    return (
        <Box>
            <DataGrid
                rows={data?.data || []}
                columns={columns}
                // ... other props
            />
        </Box>
    );
}

// features/notes/components/NoteGrid/index.ts
export { NoteGrid } from './NoteGrid';
export type { NoteGridProps } from './NoteGrid.types';
```

**Guidelines**:
- ✅ Separate types file
- ✅ Use custom hooks for logic
- ✅ useMemo for expensive calculations
- ✅ useCallback for handlers
- ✅ Handle loading/error states
- ✅ Export through index.ts
- ❌ No direct API calls
- ❌ No complex business logic

---

## Naming Conventions

### Files
```
PascalCase for components:     NoteGrid.tsx
camelCase for hooks:           useNotes.ts
camelCase for utilities:       noteHelpers.ts
camelCase for services:        noteService.ts
kebab-case for config:         api-config.ts
```

### Types & Interfaces
```typescript
// Domain Models (PascalCase)
interface Note { ... }
interface User { ... }

// Props (PascalCase + Props suffix)
interface NoteGridProps { ... }
interface DialogProps { ... }

// DTOs (PascalCase + DTO suffix)
interface CreateNoteDTO { ... }
interface UpdateUserDTO { ... }

// Parameters (PascalCase + Params suffix)
interface GetNotesParams { ... }

// Response (PascalCase + Response suffix)
interface NotesResponse { ... }

// Return types (PascalCase + Return suffix)
interface UseNotesReturn { ... }
```

### Functions & Variables
```typescript
// Hooks (use + PascalCase)
useNotes()
useNoteActions()
useDialog()

// Event handlers (handle + PascalCase)
handleClick()
handleSubmit()
handleChange()

// Boolean variables (is/has/should + PascalCase)
isLoading
hasError
shouldShow

// Functions (verb + Object)
getNotes()
createNote()
deleteUser()
formatDate()
```

### Constants
```typescript
// UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// Query keys (camelCase + Keys suffix)
export const noteKeys = { ... };
export const userKeys = { ... };
```

---

## Implementation Guidelines

### 1. Type Definitions

**Always define types first before implementation**

```typescript
// features/notes/types/note.types.ts

// Domain Model
export interface Note {
    noteId: number;
    name: string;
    type?: 'Meeting' | 'Brainstorm' | 'Research' | 'Bug';
    description?: string;
    tags?: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    isArchived: boolean;
}

// Create DTO
export interface CreateNoteDTO {
    name: string;
    type?: Note['type'];
    description?: string;
    tags?: string[];
}

// Update DTO
export interface UpdateNoteDTO extends Partial<CreateNoteDTO> {
    isArchived?: boolean;
}

// Query Parameters
export interface GetNotesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    type?: Note['type'];
    isArchived?: boolean;
}

// API Response
export interface NotesResponse {
    data: Note[];
    total: number;
    page: number;
    pageSize: number;
}
```

**Guidelines**:
- ✅ Separate domain models from DTOs
- ✅ Use `Partial<>`, `Pick<>`, `Omit<>` for derived types
- ✅ Export all types
- ✅ Document complex types with JSDoc

---

### 2. Service Implementation

```typescript
// features/notes/services/noteService.ts
import { apiClient } from '@/lib/api/client';
import type { Note, CreateNoteDTO, UpdateNoteDTO, GetNotesParams, NotesResponse } from '../types/note.types';

class NoteService {
    private readonly BASE_PATH = '/api/notes';

    async getNotes(params?: GetNotesParams): Promise<NotesResponse> {
        return apiClient.get<NotesResponse>(this.BASE_PATH, { params });
    }

    async getNoteById(id: number): Promise<Note> {
        return apiClient.get<Note>(`${this.BASE_PATH}/${id}`);
    }

    async createNote(data: CreateNoteDTO): Promise<Note> {
        const response = await apiClient.post<ApiResponse<Note>>(this.BASE_PATH, data);
        return response.data;
    }

    async updateNote(id: number, data: UpdateNoteDTO): Promise<Note> {
        const response = await apiClient.put<ApiResponse<Note>>(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }

    async deleteNote(id: number): Promise<void> {
        await apiClient.delete(`${this.BASE_PATH}/${id}`);
    }
}

export const noteService = new NoteService();
```

**Checklist**:
- ✅ Class-based service
- ✅ Private BASE_PATH constant
- ✅ Async methods with Promise return types
- ✅ Type-safe parameters and returns
- ✅ Single instance export
- ✅ No React dependencies

---

### 3. React Query Integration

```typescript
// features/notes/hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '../services/noteService';

// Query Keys Factory
export const noteKeys = {
    all: ['notes'] as const,
    lists: () => [...noteKeys.all, 'list'] as const,
    list: (params?: GetNotesParams) => [...noteKeys.lists(), params] as const,
    details: () => [...noteKeys.all, 'detail'] as const,
    detail: (id: number) => [...noteKeys.details(), id] as const,
};

// Queries
export function useNotes(params?: GetNotesParams) {
    return useQuery({
        queryKey: noteKeys.list(params),
        queryFn: () => noteService.getNotes(params),
        staleTime: 5 * 60 * 1000,
    });
}

export function useNote(id: number, enabled = true) {
    return useQuery({
        queryKey: noteKeys.detail(id),
        queryFn: () => noteService.getNoteById(id),
        enabled,
    });
}

// Mutations
export function useCreateNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateNoteDTO) => noteService.createNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}

export function useUpdateNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateNoteDTO }) =>
            noteService.updateNote(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}
```

**Checklist**:
- ✅ Query keys factory pattern
- ✅ Proper cache invalidation
- ✅ StaleTime configuration
- ✅ Type-safe hooks
- ✅ Consistent naming

---

### 4. Form Implementation

```typescript
// features/notes/components/NoteForm/NoteForm.tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const noteFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200),
    type: z.enum(['Meeting', 'Brainstorm', 'Research', 'Bug']).optional(),
    description: z.string().max(1000).optional(),
    tags: z.array(z.string()).optional(),
});

type NoteFormData = z.infer<typeof noteFormSchema>;

export function NoteForm({ note, mode, onSuccess, onCancel }: NoteFormProps) {
    const { createNote, updateNote, isCreating, isUpdating } = useNoteActions();

    const { control, handleSubmit, formState: { errors } } = useForm<NoteFormData>({
        resolver: zodResolver(noteFormSchema),
        defaultValues: {
            name: note?.name || '',
            type: note?.type,
            description: note?.description || '',
            tags: note?.tags || [],
        },
    });

    const onSubmit = async (data: NoteFormData) => {
        try {
            if (mode === 'create') {
                await createNote(data);
            } else if (note) {
                await updateNote(note.noteId, data);
            }
            onSuccess();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Note Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                        required
                    />
                )}
            />
            {/* More fields... */}
        </Box>
    );
}
```

**Checklist**:
- ✅ Zod schema validation
- ✅ React Hook Form
- ✅ Type inference from schema
- ✅ Error handling
- ✅ Loading states
- ✅ Proper default values

---

## Best Practices

### 1. Component Best Practices

#### ✅ DO:
```typescript
// Small, focused components
export function NoteCard({ note }: { note: Note }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{note.name}</Typography>
                <Typography variant="body2">{note.description}</Typography>
            </CardContent>
        </Card>
    );
}

// Use memo for expensive renders
export const NoteList = memo(function NoteList({ notes }: { notes: Note[] }) {
    return (
        <Box>
            {notes.map(note => (
                <NoteCard key={note.noteId} note={note} />
            ))}
        </Box>
    );
});

// Extract complex logic to hooks
export function NoteGrid() {
    const { data, isLoading } = useNotes();
    const { deleteNote } = useNoteActions();
    const dialog = useNoteDialog();
    
    // Component only handles rendering
}
```

#### ❌ DON'T:
```typescript
// Too much logic in component
export function NoteGrid() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetch('/api/notes')
            .then(res => res.json())
            .then(data => setNotes(data))
            .finally(() => setLoading(false));
    }, []);
    
    // 200 lines of logic...
}
```

---

### 2. Hook Best Practices

#### ✅ DO:
```typescript
// Single responsibility
export function useNoteDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState<Note | null>(null);
    
    const open = useCallback((note: Note) => {
        setNote(note);
        setIsOpen(true);
    }, []);
    
    return { isOpen, note, open, close };
}

// Memoize callbacks
export function useNoteActions() {
    const mutation = useCreateNote();
    
    const createNote = useCallback(
        async (data: CreateNoteDTO) => {
            await mutation.mutateAsync(data);
        },
        [mutation]
    );
    
    return { createNote };
}
```

#### ❌ DON'T:
```typescript
// Multiple responsibilities
export function useNoteEverything() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({});
    // Too many responsibilities...
}

// Missing memoization
export function useNoteActions() {
    return {
        // New function on every render!
        createNote: (data) => mutation.mutateAsync(data)
    };
}
```

---

### 3. State Management Best Practices

#### ✅ DO:
```typescript
// Server state with React Query
const { data, isLoading } = useNotes();

// UI state locally
const [dialogOpen, setDialogOpen] = useState(false);

// Shared UI state in custom hook
const dialog = useNoteDialog();

// Global app state in Context/Redux (if needed)
const { user } = useAuth();
```

#### ❌ DON'T:
```typescript
// Server state in useState/Context
const [notes, setNotes] = useState([]);
useEffect(() => {
    fetchNotes().then(setNotes);
}, []);

// Everything in global state
const { notes, loading, error, dialogOpen, formData } = useGlobalState();
```

---

### 4. Performance Best Practices

#### ✅ DO:
```typescript
// Memoize expensive calculations
const sortedNotes = useMemo(() => {
    return notes.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}, [notes]);

// Memoize callbacks
const handleClick = useCallback((note: Note) => {
    openDialog(note);
}, [openDialog]);

// Memoize components
const NoteCard = memo(({ note }: { note: Note }) => {
    return <Card>...</Card>;
});

// Code splitting
const NoteDialog = lazy(() => import('./NoteDialog'));
```

#### ❌ DON'T:
```typescript
// Recalculate on every render
function NoteGrid() {
    const sortedNotes = notes.sort(...); // ❌
    
    return (
        <DataGrid 
            onRowClick={(note) => openDialog(note)} // ❌ New function every render
        />
    );
}
```

---

### 5. Error Handling Best Practices

#### ✅ DO:
```typescript
// Service layer
class NoteService {
    async getNotes(): Promise<NotesResponse> {
        try {
            return await apiClient.get<NotesResponse>(this.BASE_PATH);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
            throw error; // Re-throw for upper layers
        }
    }
}

// Hook layer
export function useNoteActions() {
    const createNote = useCallback(async (data: CreateNoteDTO) => {
        try {
            await mutation.mutateAsync(data);
            enqueueSnackbar('Success!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to create note', { variant: 'error' });
            throw error; // Allow component to handle if needed
        }
    }, []);
}

// Component layer
function NoteForm() {
    const { createNote } = useNoteActions();
    
    const onSubmit = async (data: NoteFormData) => {
        try {
            await createNote(data);
            onSuccess();
        } catch (error) {
            // Error already shown by hook
            console.error('Form submission failed:', error);
        }
    };
}
```

#### ❌ DON'T:
```typescript
// Silent failures
async function createNote(data: CreateNoteDTO) {
    try {
        await api.post('/notes', data);
    } catch (error) {
        // ❌ Swallowing error
    }
}

// Alert spam
async function createNote(data: CreateNoteDTO) {
    try {
        await api.post('/notes', data);
    } catch (error) {
        alert('Error!'); // ❌ Use proper notification system
    }
}
```

---

## Common Patterns

### Pattern 1: Master-Detail View

```typescript
// Page component
export function NotesPage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Master - List */}
            <Box sx={{ flex: '0 0 400px' }}>
                <NoteList onSelect={setSelectedId} />
            </Box>
            
            {/* Detail */}
            <Box sx={{ flex: 1 }}>
                {selectedId && <NoteDetail noteId={selectedId} />}
            </Box>
        </Box>
    );
}

// List component
function NoteList({ onSelect }: { onSelect: (id: number) => void }) {
    const { data } = useNotes();
    
    return (
        <List>
            {data?.data.map(note => (
                <ListItem 
                    key={note.noteId}
                    button
                    onClick={() => onSelect(note.noteId)}
                >
                    {note.name}
                </ListItem>
            ))}
        </List>
    );
}

// Detail component
function NoteDetail({ noteId }: { noteId: number }) {
    const { data, isLoading } = useNote(noteId);
    
    if (isLoading) return <CircularProgress />;
    if (!data) return <Alert>Note not found</Alert>;
    
    return <NoteCard note={data} />;
}
```

---

### Pattern 2: Search with Debounce

```typescript
// Page component
export function NotesPage() {
    const [searchText, setSearchText] = useState('');
    const debouncedSearch = useDebounce(searchText, 500);
    
    return (
        <Box>
            <TextField
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search notes..."
            />
            <NoteGrid searchText={debouncedSearch} />
        </Box>
    );
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(handler);
    }, [value, delay]);
    
    return debouncedValue;
}

// Grid component
function NoteGrid({ searchText }: { searchText: string }) {
    const { data } = useNotes({ search: searchText });
    // ...
}
```

---

### Pattern 3: Optimistic Updates

```typescript
export function useUpdateNote() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateNoteDTO }) =>
            noteService.updateNote(id, data),
            
        // Optimistic update
        onMutate: async ({ id, data }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: noteKeys.detail(id) });
            
            // Snapshot previous value
            const previousNote = queryClient.getQueryData(noteKeys.detail(id));
            
            // Optimistically update
            queryClient.setQueryData(noteKeys.detail(id), (old: Note) => ({
                ...old,
                ...data,
            }));
            
            // Return context with snapshot
            return { previousNote };
        },
        
        // Rollback on error
        onError: (err, { id }, context) => {
            queryClient.setQueryData(
                noteKeys.detail(id),
                context?.previousNote
            );
        },
        
        // Refetch on settle
        onSettled: (_, __, { id }) => {
            queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) });
        },
    });
}
```

---

### Pattern 4: Infinite Scroll

```typescript
export function useInfiniteNotes(params?: Omit<GetNotesParams, 'page'>) {
    return useInfiniteQuery({
        queryKey: noteKeys.list(params),
        queryFn: ({ pageParam = 1 }) =>
            noteService.getNotes({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1;
            return nextPage <= Math.ceil(lastPage.total / lastPage.pageSize)
                ? nextPage
                : undefined;
        },
        initialPageParam: 1,
    });
}

// Component
function NoteInfiniteList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteNotes();
    
    const observerTarget = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        
        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
        
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);
    
    return (
        <Box>
            {data?.pages.map((page) =>
                page.data.map((note) => (
                    <NoteCard key={note.noteId} note={note} />
                ))
            )}
            <div ref={observerTarget} />
            {isFetchingNextPage && <CircularProgress />}
        </Box>
    );
}
```

---

### Pattern 5: Form with File Upload

```typescript
const noteFormSchema = z.object({
    name: z.string().min(1),
    attachments: z.array(z.instanceof(File)).optional(),
});

function NoteForm() {
    const { control, handleSubmit } = useForm<NoteFormData>({
        resolver: zodResolver(noteFormSchema),
    });
    
    const onSubmit = async (data: NoteFormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        
        data.attachments?.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file);
        });
        
        await createNote(formData);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="attachments"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <input
                        type="file"
                        multiple
                        onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            onChange(files);
                        }}
                    />
                )}
            />
        </form>
    );
}
```

---

## Testing Strategy

### 1. Unit Tests - Services

```typescript
// features/notes/services/noteService.test.ts
import { noteService } from './noteService';
import { apiClient } from '@/lib/api/client';

jest.mock('@/lib/api/client');

describe('NoteService', () => {
    describe('getNotes', () => {
        it('should fetch notes successfully', async () => {
            const mockResponse = {
                data: [{ noteId: 1, name: 'Test' }],
                total: 1,
            };
            
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);
            
            const result = await noteService.getNotes();
            
            expect(apiClient.get).toHaveBeenCalledWith('/api/notes', {
                params: undefined,
            });
            expect(result).toEqual(mockResponse);
        });
        
        it('should handle errors', async () => {
            (apiClient.get as jest.Mock).mockRejectedValue(
                new Error('Network error')
            );
            
            await expect(noteService.getNotes()).rejects.toThrow('Network error');
        });
    });
});
```

---

### 2. Unit Tests - Hooks

```typescript
// features/notes/hooks/useNotes.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNotes } from './useNotes';
import { noteService } from '../services/noteService';

jest.mock('../services/noteService');

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useNotes', () => {
    it('should fetch notes successfully', async () => {
        const mockNotes = {
            data: [{ noteId: 1, name: 'Test' }],
            total: 1,
        };
        
        (noteService.getNotes as jest.Mock).mockResolvedValue(mockNotes);
        
        const { result } = renderHook(() => useNotes(), {
            wrapper: createWrapper(),
        });
        
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        
        expect(result.current.data).toEqual(mockNotes);
    });
});
```

---

### 3. Component Tests

```typescript
// features/notes/components/NoteCard/NoteCard.test.tsx
import { render, screen } from '@testing-library/react';
import { NoteCard } from './NoteCard';

describe('NoteCard', () => {
    const mockNote = {
        noteId: 1,
        name: 'Test Note',
        description: 'Test description',
        createdBy: 'John Doe',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        isArchived: false,
    };
    
    it('should render note information', () => {
        render(<NoteCard note={mockNote} />);
        
        expect(screen.getByText('Test Note')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });
    
    it('should show archived badge when archived', () => {
        render(<NoteCard note={{ ...mockNote, isArchived: true }} />);
        
        expect(screen.getByText('Archived')).toBeInTheDocument();
    });
});
```

---

### 4. Integration Tests

```typescript
// features/notes/components/NoteGrid/NoteGrid.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NoteGrid } from './NoteGrid';
import { noteService } from '../../services/noteService';

jest.mock('../../services/noteService');

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('NoteGrid Integration', () => {
    it('should load and display notes', async () => {
        const mockNotes = {
            data: [
                { noteId: 1, name: 'Note 1', /* ... */ },
                { noteId: 2, name: 'Note 2', /* ... */ },
            ],
            total: 2,
        };
        
        (noteService.getNotes as jest.Mock).mockResolvedValue(mockNotes);
        
        render(<NoteGrid />, { wrapper: createWrapper() });
        
        await waitFor(() => {
            expect(screen.getByText('Note 1')).toBeInTheDocument();
            expect(screen.getByText('Note 2')).toBeInTheDocument();
        });
    });
    
    it('should delete note when delete button clicked', async () => {
        const user = userEvent.setup();
        const mockNotes = {
            data: [{ noteId: 1, name: 'Note 1', /* ... */ }],
            total: 1,
        };
        
        (noteService.getNotes as jest.Mock).mockResolvedValue(mockNotes);
        (noteService.deleteNote as jest.Mock).mockResolvedValue(undefined);
        
        render(<NoteGrid />, { wrapper: createWrapper() });
        
        await waitFor(() => {
            expect(screen.getByText('Note 1')).toBeInTheDocument();
        });
        
        const deleteButton = screen.getByLabelText('Delete');
        await user.click(deleteButton);
        
        expect(noteService.deleteNote).toHaveBeenCalledWith(1);
    });
});
```

---

## Performance Optimization

### 1. Code Splitting

```typescript
// Lazy load heavy components
const NoteDialog = lazy(() => import('./components/NoteDialog'));
const NoteEditor = lazy(() => import('./components/NoteEditor'));

function NotesPage() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <NoteDialog />
            <NoteEditor />
        </Suspense>
    );
}

// Route-based code splitting
const routes = [
    {
        path: '/notes',
        component: lazy(() => import('./pages/NotesPage')),
    },
    {
        path: '/notes/:id',
        component: lazy(() => import('./pages/NoteDetailPage')),
    },
];
```

---

### 2. Memoization

```typescript
// Expensive calculations
const sortedAndFilteredNotes = useMemo(() => {
    return notes
        .filter(note => note.name.includes(searchText))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}, [notes, searchText]);

// Stable callback references
const handleDelete = useCallback((id: number) => {
    deleteNote(id);
}, [deleteNote]);

// Memoized components
const NoteCard = memo(({ note }: { note: Note }) => {
    return <Card>...</Card>;
}, (prev, next) => {
    // Custom comparison
    return prev.note.noteId === next.note.noteId &&
           prev.note.updatedAt === next.note.updatedAt;
});
```

---

### 3. Virtualization

```typescript
import { FixedSizeList } from 'react-window';

function NoteVirtualList({ notes }: { notes: Note[] }) {
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style}>
            <NoteCard note={notes[index]} />
        </div>
    );
    
    return (
        <FixedSizeList
            height={600}
            itemCount={notes.length}
            itemSize={100}
            width="100%"
        >
            {Row}
        </FixedSizeList>
    );
}
```

---

### 4. Query Optimization

```typescript
// Prefetch
function NoteList() {
    const queryClient = useQueryClient();
    
    const handleMouseEnter = (noteId: number) => {
        queryClient.prefetchQuery({
            queryKey: noteKeys.detail(noteId),
            queryFn: () => noteService.getNoteById(noteId),
        });
    };
    
    return (
        <List>
            {notes.map(note => (
                <ListItem
                    key={note.noteId}
                    onMouseEnter={() => handleMouseEnter(note.noteId)}
                >
                    {note.name}
                </ListItem>
            ))}
        </List>
    );
}

// Select specific data
function NoteTitle({ noteId }: { noteId: number }) {
    const { data } = useNote(noteId, {
        select: (note) => note.name, // Only re-render when name changes
    });
    
    return <Typography>{data}</Typography>;
}
```

---

## Example Checklist

### When Creating a New Feature

#### Phase 1: Planning
- [ ] Define feature requirements
- [ ] Identify data models
- [ ] Design API endpoints
- [ ] Sketch component hierarchy

#### Phase 2: Types
- [ ] Create `types/[feature].types.ts`
- [ ] Define domain models
- [ ] Define DTOs (Create, Update)
- [ ] Define query parameters
- [ ] Define API responses

#### Phase 3: Service Layer
- [ ] Create `services/[feature]Service.ts`
- [ ] Implement all CRUD methods
- [ ] Add type annotations
- [ ] Export single instance
- [ ] Write unit tests

#### Phase 4: Data Hooks
- [ ] Create `hooks/use[Feature].ts`
- [ ] Define query keys factory
- [ ] Implement query hooks
- [ ] Implement mutation hooks
- [ ] Add proper cache invalidation
- [ ] Write hook tests

#### Phase 5: Action Hooks
- [ ] Create `hooks/use[Feature]Actions.ts`
- [ ] Wrap mutations with error handling
- [ ] Add user notifications
- [ ] Export loading states
- [ ] Write integration tests

#### Phase 6: UI State Hooks (if needed)
- [ ] Create `hooks/use[Feature]Dialog.ts` (or similar)
- [ ] Manage local UI state
- [ ] Use useCallback for handlers
- [ ] Write unit tests

#### Phase 7: Components
- [ ] Create component folder structure
- [ ] Define component types
- [ ] Implement main component
- [ ] Implement sub-components
- [ ] Add loading/error states
- [ ] Apply memoization
- [ ] Write component tests

#### Phase 8: Integration
- [ ] Export feature through `index.ts`
- [ ] Integrate with page component
- [ ] Test end-to-end flow
- [ ] Performance check
- [ ] Code review

#### Phase 9: Documentation
- [ ] Add JSDoc comments
- [ ] Update README if needed
- [ ] Document complex logic
- [ ] Add usage examples

---

## Quick Reference

### File Template Checklist

#### Service File
```typescript
✅ Import types
✅ Class-based structure
✅ Private BASE_PATH
✅ Type-safe async methods
✅ Single instance export
✅ No React dependencies
```

#### Hook File
```typescript
✅ Import React hooks
✅ Import service
✅ Query keys factory (if React Query)
✅ Type-safe hook signature
✅ useCallback for functions
✅ Return object with clear naming
```

#### Component File
```typescript
✅ Import types separately
✅ Props interface
✅ Use custom hooks
✅ useMemo for expensive calcs
✅ useCallback for handlers
✅ Handle loading/error states
✅ Export through index.ts
```

#### Types File
```typescript
✅ Domain models
✅ DTOs (Create, Update)
✅ Query parameters
✅ API responses
✅ Component props
✅ Hook return types
✅ Export all types
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Mixing Concerns
```typescript
// BAD: Component doing everything
function NoteGrid() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetch('/api/notes')
            .then(res => res.json())
            .then(setNotes)
            .finally(() => setLoading(false));
    }, []);
    
    const handleDelete = async (id: number) => {
        await fetch(`/api/notes/${id}`, { method: 'DELETE' });
        setNotes(prev => prev.filter(n => n.noteId !== id));
    };
    
    // More logic...
}

// GOOD: Separation of concerns
function NoteGrid() {
    const { data, isLoading } = useNotes();
    const { deleteNote } = useNoteActions();
    
    return <DataGrid rows={data?.data} onDelete={deleteNote} />;
}
```

---

### ❌ Mistake 2: Not Using React Query
```typescript
// BAD: Manual state management
const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
    setLoading(true);
    noteService.getNotes()
        .then(setNotes)
        .catch(setError)
        .finally(() => setLoading(false));
}, []);

// GOOD: React Query
const { data, isLoading, error } = useNotes();
```

---

### ❌ Mistake 3: Missing Memoization
```typescript
// BAD: No memoization
function NoteGrid({ notes }) {
    const sortedNotes = notes.sort(...); // Recalculates every render
    
    return (
        <DataGrid 
            onRowClick={(note) => handleClick(note)} // New function every render
        />
    );
}

// GOOD: Proper memoization
function NoteGrid({ notes }) {
    const sortedNotes = useMemo(() => notes.sort(...), [notes]);
    const handleClick = useCallback((note) => {...}, []);
    
    return <DataGrid onRowClick={handleClick} />;
}
```

---

### ❌ Mistake 4: Type Safety Issues
```typescript
// BAD: Using 'any'
function createNote(data: any) { // ❌
    return apiClient.post('/notes', data);
}

// GOOD: Proper types
function createNote(data: CreateNoteDTO): Promise<Note> {
    return apiClient.post<Note>('/notes', data);
}
```

---

### ❌ Mistake 5: Poor Error Handling
```typescript
// BAD: Silent failures
try {
    await createNote(data);
} catch (error) {
    // Nothing happens
}

// GOOD: Proper error handling
try {
    await createNote(data);
    enqueueSnackbar('Success!', { variant: 'success' });
} catch (error) {
    enqueueSnackbar('Failed to create note', { variant: 'error' });
    console.error('Create note error:', error);
}
```

---

## Conclusion

This pattern provides:
- ✅ **Scalability**: Easy to add new features
- ✅ **Maintainability**: Clear structure and separation
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Performance**: Optimized with memoization and caching
- ✅ **Testability**: Each layer tested independently
- ✅ **Developer Experience**: Great DX with auto-complete

Remember: **Consistency is key**. Follow these patterns across your entire codebase for maximum benefit.

---

## Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Material-UI](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Author**: React Architecture Team