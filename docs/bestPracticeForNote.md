


🏗️ Folder Structure
src/
├── features/
│   └── notes/
│       ├── components/
│       │   ├── NoteGrid/
│       │   │   ├── index.ts
│       │   │   ├── NoteGrid.tsx
│       │   │   ├── NoteGrid.types.ts
│       │   │   ├── NoteGrid.styles.ts
│       │   │   ├── NoteGridColumns.tsx
│       │   │   └── NoteGridToolbar.tsx
│       │   ├── NoteDialog/
│       │   │   ├── index.ts
│       │   │   ├── NoteDialog.tsx
│       │   │   └── NoteDialog.types.ts
│       │   └── NoteForm/
│       │       ├── index.ts
│       │       ├── NoteForm.tsx
│       │       └── NoteForm.types.ts
│       ├── hooks/
│       │   ├── useNotes.ts
│       │   ├── useNoteActions.ts
│       │   └── useNoteDialog.ts
│       ├── services/
│       │   └── noteService.ts
│       ├── store/
│       │   ├── noteSlice.ts          # If using Redux Toolkit
│       │   └── noteAtoms.ts          # If using Jotai/Recoil
│       ├── types/
│       │   └── note.types.ts
│       └── utils/
│           └── noteHelpers.ts
├── shared/
│   ├── components/
│   │   ├── DataGrid/
│   │   └── Dialog/
│   ├── hooks/
│   │   └── useDialog.ts
│   └── types/
│       └── common.types.ts
└── lib/
    └── api/
        └── client.ts

📁 Files Implementation
1. Types Definition
typescript// features/notes/types/note.types.ts

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

export interface CreateNoteDTO {
    name: string;
    type?: Note['type'];
    description?: string;
    tags?: string[];
}

export interface UpdateNoteDTO extends Partial<CreateNoteDTO> {
    isArchived?: boolean;
}

export interface GetNotesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    type?: Note['type'];
    isArchived?: boolean;
}

export interface NotesResponse {
    data: Note[];
    total: number;
    page: number;
    pageSize: number;
}
typescript// shared/types/common.types.ts

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginationParams {
    page: number;
    pageSize: number;
}

export interface SortParams {
    field: string;
    order: 'asc' | 'desc';
}

2. API Service Layer
typescript// lib/api/client.ts

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
    private instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Handle unauthorized
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
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL);
typescript// features/notes/services/noteService.ts

import { apiClient } from '@/lib/api/client';
import type {
    Note,
    CreateNoteDTO,
    UpdateNoteDTO,
    GetNotesParams,
    NotesResponse,
} from '../types/note.types';
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
        const response = await apiClient.post<ApiResponse<Note>>(
            this.BASE_PATH,
            data
        );
        return response.data;
    }

    async updateNote(id: number, data: UpdateNoteDTO): Promise<Note> {
        const response = await apiClient.put<ApiResponse<Note>>(
            `${this.BASE_PATH}/${id}`,
            data
        );
        return response.data;
    }

    async deleteNote(id: number): Promise<void> {
        await apiClient.delete(`${this.BASE_PATH}/${id}`);
    }

    async archiveNote(id: number): Promise<Note> {
        return this.updateNote(id, { isArchived: true });
    }

    async unarchiveNote(id: number): Promise<Note> {
        return this.updateNote(id, { isArchived: false });
    }
}

export const noteService = new NoteService();

3. State Management (React Query Pattern)
typescript// features/notes/hooks/useNotes.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '../services/noteService';
import type {
    GetNotesParams,
    CreateNoteDTO,
    UpdateNoteDTO,
} from '../types/note.types';

// Query keys
export const noteKeys = {
    all: ['notes'] as const,
    lists: () => [...noteKeys.all, 'list'] as const,
    list: (params?: GetNotesParams) => [...noteKeys.lists(), params] as const,
    details: () => [...noteKeys.all, 'detail'] as const,
    detail: (id: number) => [...noteKeys.details(), id] as const,
};

// Get notes list
export function useNotes(params?: GetNotesParams) {
    return useQuery({
        queryKey: noteKeys.list(params),
        queryFn: () => noteService.getNotes(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Get single note
export function useNote(id: number, enabled = true) {
    return useQuery({
        queryKey: noteKeys.detail(id),
        queryFn: () => noteService.getNoteById(id),
        enabled,
    });
}

// Create note mutation
export function useCreateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateNoteDTO) => noteService.createNote(data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}

// Update note mutation
export function useUpdateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateNoteDTO }) =>
            noteService.updateNote(id, data),
        onSuccess: (_, { id }) => {
            // Invalidate specific note and list
            queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}

// Delete note mutation
export function useDeleteNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => noteService.deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}

// Archive/Unarchive mutations
export function useArchiveNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => noteService.archiveNote(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
        },
    });
}
typescript// features/notes/hooks/useNoteActions.ts

import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {
    useCreateNote,
    useUpdateNote,
    useDeleteNote,
    useArchiveNote,
} from './useNotes';
import type { CreateNoteDTO, UpdateNoteDTO } from '../types/note.types';

export function useNoteActions() {
    const { enqueueSnackbar } = useSnackbar();
    
    const createNoteMutation = useCreateNote();
    const updateNoteMutation = useUpdateNote();
    const deleteNoteMutation = useDeleteNote();
    const archiveNoteMutation = useArchiveNote();

    const createNote = useCallback(
        async (data: CreateNoteDTO) => {
            try {
                await createNoteMutation.mutateAsync(data);
                enqueueSnackbar('Note created successfully', { 
                    variant: 'success' 
                });
            } catch (error) {
                enqueueSnackbar('Failed to create note', { 
                    variant: 'error' 
                });
                throw error;
            }
        },
        [createNoteMutation, enqueueSnackbar]
    );

    const updateNote = useCallback(
        async (id: number, data: UpdateNoteDTO) => {
            try {
                await updateNoteMutation.mutateAsync({ id, data });
                enqueueSnackbar('Note updated successfully', { 
                    variant: 'success' 
                });
            } catch (error) {
                enqueueSnackbar('Failed to update note', { 
                    variant: 'error' 
                });
                throw error;
            }
        },
        [updateNoteMutation, enqueueSnackbar]
    );

    const deleteNote = useCallback(
        async (id: number) => {
            try {
                await deleteNoteMutation.mutateAsync(id);
                enqueueSnackbar('Note deleted successfully', { 
                    variant: 'success' 
                });
            } catch (error) {
                enqueueSnackbar('Failed to delete note', { 
                    variant: 'error' 
                });
                throw error;
            }
        },
        [deleteNoteMutation, enqueueSnackbar]
    );

    const archiveNote = useCallback(
        async (id: number) => {
            try {
                await archiveNoteMutation.mutateAsync(id);
                enqueueSnackbar('Note archived successfully', { 
                    variant: 'success' 
                });
            } catch (error) {
                enqueueSnackbar('Failed to archive note', { 
                    variant: 'error' 
                });
                throw error;
            }
        },
        [archiveNoteMutation, enqueueSnackbar]
    );

    return {
        createNote,
        updateNote,
        deleteNote,
        archiveNote,
        isCreating: createNoteMutation.isPending,
        isUpdating: updateNoteMutation.isPending,
        isDeleting: deleteNoteMutation.isPending,
        isArchiving: archiveNoteMutation.isPending,
    };
}

4. Dialog Management Hook
typescript// features/notes/hooks/useNoteDialog.ts

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
        // Delay clearing to allow animation
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

5. Grid Columns Definition
typescript// features/notes/components/NoteGrid/NoteGridColumns.tsx

import { GridColDef } from '@mui/x-data-grid';
import { Chip, Box, IconButton, Tooltip } from '@mui/material';
import { Edit, Visibility, Archive, Delete } from '@mui/icons-material';
import type { Note } from '../../types/note.types';

interface GetColumnsParams {
    onView: (note: Note) => void;
    onEdit: (note: Note) => void;
    onArchive: (id: number) => void;
    onDelete: (id: number) => void;
}

export function getNoteGridColumns({
    onView,
    onEdit,
    onArchive,
    onDelete,
}: GetColumnsParams): GridColDef<Note>[] {
    return [
        {
            field: 'noteId',
            headerName: 'ID',
            width: 80,
            type: 'number',
        },
        {
            field: 'name',
            headerName: 'Note Name',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box
                    sx={{
                        cursor: 'pointer',
                        color: 'primary.main',
                        fontWeight: 500,
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    onClick={() => onView(params.row)}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 130,
            renderCell: (params) => {
                const colorMap: Record<string, any> = {
                    Meeting: 'primary',
                    Brainstorm: 'warning',
                    Research: 'info',
                    Bug: 'error',
                };

                return (
                    <Chip
                        label={params.value || 'N/A'}
                        color={colorMap[params.value] || 'default'}
                        size="small"
                        variant="outlined"
                    />
                );
            },
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            minWidth: 300,
            renderCell: (params) => (
                <Box
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {params.value || 'No description'}
                </Box>
            ),
        },
        {
            field: 'tags',
            headerName: 'Tags',
            width: 200,
            renderCell: (params) => {
                if (!params.value || params.value.length === 0) {
                    return <Box sx={{ color: 'text.secondary' }}>No tags</Box>;
                }

                const displayTags = params.value.slice(0, 2);
                const remainingCount = params.value.length - 2;

                return (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {displayTags.map((tag: string, index: number) => (
                            <Chip
                                key={index}
                                label={`#${tag}`}
                                size="small"
                                variant="outlined"
                                color="secondary"
                                sx={{ fontSize: '0.7rem', height: '20px' }}
                            />
                        ))}
                        {remainingCount > 0 && (
                            <Chip
                                label={`+${remainingCount}`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem', height: '20px' }}
                            />
                        )}
                    </Box>
                );
            },
        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            width: 140,
            type: 'date',
            valueGetter: (value) => new Date(value),
            renderCell: (params) => {
                return new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }).format(params.value);
            },
        },
        {
            field: 'isArchived',
            headerName: 'Status',
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={params.value ? 'Archived' : 'Active'}
                    color={params.value ? 'default' : 'success'}
                    size="small"
                    variant={params.value ? 'outlined' : 'filled'}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="View">
                        <IconButton
                            size="small"
                            onClick={() => onView(params.row)}
                        >
                            <Visibility fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            onClick={() => onEdit(params.row)}
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {!params.row.isArchived && (
                        <Tooltip title="Archive">
                            <IconButton
                                size="small"
                                onClick={() => onArchive(params.row.noteId)}
                            >
                                <Archive fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(params.row.noteId)}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];
}

6. Main Grid Component
typescript// features/notes/components/NoteGrid/NoteGrid.types.ts

import type { Note } from '../../types/note.types';

export interface NoteGridProps {
    searchText?: string;
    showArchived?: boolean;
    onNoteClick?: (note: Note) => void;
}
typescript// features/notes/components/NoteGrid/NoteGrid.tsx

import { useState, useMemo, useCallback } from 'react';
import { Box, Alert, CircularProgress } from '@mui/material';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { useNotes } from '../../hooks/useNotes';
import { useNoteActions } from '../../hooks/useNoteActions';
import { useNoteDialog } from '../../hooks/useNoteDialog';
import { getNoteGridColumns } from './NoteGridColumns';
import { NoteGridToolbar } from './NoteGridToolbar';
import { NoteDialog } from '../NoteDialog';
import type { NoteGridProps } from './NoteGrid.types';
import type { Note } from '../../types/note.types';

export function NoteGrid({ 
    searchText = '', 
    showArchived = false,
    onNoteClick 
}: NoteGridProps) {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 25,
    });

    // Fetch notes with params
    const { data, isLoading, error } = useNotes({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        search: searchText || undefined,
        isArchived: showArchived ? true : undefined,
    });

    // Actions
    const { deleteNote, archiveNote, isDeleting, isArchiving } = useNoteActions();

    // Dialog management
    const dialog = useNoteDialog();

    // Handle view
    const handleView = useCallback((note: Note) => {
        if (onNoteClick) {
            onNoteClick(note);
        } else {
            dialog.openView(note);
        }
    }, [onNoteClick, dialog]);

    // Handle edit
    const handleEdit = useCallback((note: Note) => {
        dialog.openEdit(note);
    }, [dialog]);

    // Handle archive
    const handleArchive = useCallback(async (id: number) => {
        if (window.confirm('Are you sure you want to archive this note?')) {
            await archiveNote(id);
        }
    }, [archiveNote]);

    // Handle delete
    const handleDelete = useCallback(async (id: number) => {
        if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
            await deleteNote(id);
        }
    }, [deleteNote]);

    // Columns definition
    const columns = useMemo(
        () =>
            getNoteGridColumns({
                onView: handleView,
                onEdit: handleEdit,
                onArchive: handleArchive,
                onDelete: handleDelete,
            }),
        [handleView, handleEdit, handleArchive, handleDelete]
    );

    // Error state
    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                Failed to load notes: {error.message}
            </Alert>
        );
    }

    // Loading state
    if (isLoading && !data) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 400,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={data?.data || []}
                    columns={columns}
                    getRowId={(row) => row.noteId}
                    rowCount={data?.total || 0}
                    loading={isLoading || isDeleting || isArchiving}
                    pageSizeOptions={[10, 25, 50, 100]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: NoteGridToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            onCreateClick: dialog.openCreate,
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-row': {
                            cursor: 'pointer',
                        },
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-row.Mui-hovered': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                />
            </Box>

            {/* Note Dialog */}
            <NoteDialog
                open={dialog.isOpen}
                note={dialog.selectedNote}
                mode={dialog.mode}
                onClose={dialog.close}
            />
        </>
    );
}

7. Toolbar Component
typescript// features/notes/components/NoteGrid/NoteGridToolbar.tsx

import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarColumnsButton,
} from '@mui/x-data-grid';

interface NoteGridToolbarProps {
    onCreateClick: () => void;
}

export function NoteGridToolbar({ onCreateClick }: NoteGridToolbarProps) {
    return (
        <GridToolbarContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    p: 1,
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarExport />
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onCreateClick}
                    size="small"
                >
                    Create Note
                </Button>
            </Box>
        </GridToolbarContainer>
    );
}

8. Dialog Component
typescript// features/notes/components/NoteDialog/NoteDialog.types.ts

import type { Note } from '../../types/note.types';

export interface NoteDialogProps {
    open: boolean;
    note: Note | null;
    mode: 'create' | 'edit' | 'view';
    onClose: () => void;
}
typescript// features/notes/components/NoteDialog/NoteDialog.tsx

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Box,
    Typography,
    Chip,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { useState } from 'react';
import { NoteForm } from '../NoteForm';
import type { NoteDialogProps } from './NoteDialog.types';

export function NoteDialog({ open, note, mode: initialMode, onClose }: NoteDialogProps) {
    const [mode, setMode] = useState<'create' | 'edit' | 'view'>(initialMode);

    const handleEditClick = () => {
        setMode('edit');
    };

    const handleFormSuccess = () => {
        onClose();
    };

    const isViewMode = mode === 'view';
    const isCreateMode = mode === 'create';

    const dialogTitle = isCreateMode
        ? 'Create Note'
        : isViewMode
        ? 'View Note'
        : 'Edit Note';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    minHeight: '60vh',
                },
            }}
        >
            <DialogTitle>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">{dialogTitle}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {isViewMode && note && (
                            <IconButton
                                onClick={handleEditClick}
                                size="small"
                                color="primary"
                            >
                                <Edit />
                            </IconButton>
                        )}
                        <IconButton onClick={onClose} size="small">
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                {isViewMode && note ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Name
                            </Typography>
                            <Typography variant="body1">{note.name}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Type
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                                <Chip label={note.type || 'N/A'} size="small" />
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Description
                            </Typography>
                            <Typography variant="body1">
                                {note.RetryLHContinuedescription || 'No description'}
</Typography>
</Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Tags
                        </Typography>
                        <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {note.tags && note.tags.length > 0 ? (
                                note.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={`#${tag}`}
                                        size="small"
                                        variant="outlined"
                                    />
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No tags
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Created By
                        </Typography>
                        <Typography variant="body1">{note.createdBy}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography variant="body1">
                            {new Date(note.createdAt).toLocaleString()}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Status
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                            <Chip
                                label={note.isArchived ? 'Archived' : 'Active'}
                                color={note.isArchived ? 'default' : 'success'}
                                size="small"
                            />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <NoteForm
                    note={note}
                    mode={mode}
                    onSuccess={handleFormSuccess}
                    onCancel={onClose}
                />
            )}
        </DialogContent>

        {isViewMode && (
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        )}
    </Dialog>
);
}

---

### 9. **Form Component**
```typescript
// features/notes/components/NoteForm/NoteForm.types.ts

import type { Note } from '../../types/note.types';

export interface NoteFormProps {
    note: Note | null;
    mode: 'create' | 'edit';
    onSuccess: () => void;
    onCancel: () => void;
}
typescript// features/notes/components/NoteForm/NoteForm.tsx

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Chip,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNoteActions } from '../../hooks/useNoteActions';
import type { NoteFormProps } from './NoteForm.types';
import type { CreateNoteDTO } from '../../types/note.types';

// Form validation schema
const noteFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
    type: z.enum(['Meeting', 'Brainstorm', 'Research', 'Bug']).optional(),
    description: z.string().max(1000, 'Description is too long').optional(),
    tags: z.array(z.string()).optional(),
});

type NoteFormData = z.infer<typeof noteFormSchema>;

const noteTypes = ['Meeting', 'Brainstorm', 'Research', 'Bug'] as const;

export function NoteForm({ note, mode, onSuccess, onCancel }: NoteFormProps) {
    const { createNote, updateNote, isCreating, isUpdating } = useNoteActions();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NoteFormData>({
        resolver: zodResolver(noteFormSchema),
        defaultValues: {
            name: note?.name || '',
            type: note?.type || undefined,
            description: note?.description || '',
            tags: note?.tags || [],
        },
    });

    const onSubmit = async (data: NoteFormData) => {
        try {
            if (mode === 'create') {
                await createNote(data as CreateNoteDTO);
            } else if (note) {
                await updateNote(note.noteId, data);
            }
            onSuccess();
        } catch (error) {
            // Error is handled in useNoteActions
            console.error('Form submission error:', error);
        }
    };

    const isSubmitting = isCreating || isUpdating;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Note Name"
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={isSubmitting}
                    />
                )}
            />

            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            {...field}
                            label="Type"
                            disabled={isSubmitting}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {noteTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        disabled={isSubmitting}
                    />
                )}
            />

            <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth>
                        <InputLabel>Tags</InputLabel>
                        <Select
                            {...field}
                            multiple
                            input={<OutlinedInput label="Tags" />}
                            disabled={isSubmitting}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={`#${value}`} size="small" />
                                    ))}
                                </Box>
                            )}
                        >
                            {['urgent', 'todo', 'important', 'follow-up', 'review'].map(
                                (tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        #{tag}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                )}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button
                    onClick={onCancel}
                    disabled={isSubmitting}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    {mode === 'create' ? 'Create' : 'Update'}
                </LoadingButton>
            </Stack>
        </Box>
    );
}

10. Index Exports
typescript// features/notes/components/NoteGrid/index.ts
export { NoteGrid } from './NoteGrid';
export type { NoteGridProps } from './NoteGrid.types';
typescript// features/notes/components/NoteDialog/index.ts
export { NoteDialog } from './NoteDialog';
export type { NoteDialogProps } from './NoteDialog.types';
typescript// features/notes/components/NoteForm/index.ts
export { NoteForm } from './NoteForm';
export type { NoteFormProps } from './NoteForm.types';
typescript// features/notes/index.ts
export * from './components/NoteGrid';
export * from './components/NoteDialog';
export * from './components/NoteForm';
export * from './hooks/useNotes';
export * from './hooks/useNoteActions';
export * from './hooks/useNoteDialog';
export * from './types/note.types';

11. Usage in Page
typescript// pages/NotesPage.tsx

import { useState } from 'react';
import { Box, Container, TextField, FormControlLabel, Switch } from '@mui/material';
import { NoteGrid } from '@/features/notes';

export function NotesPage() {
    const [searchText, setSearchText] = useState('');
    const [showArchived, setShowArchived] = useState(false);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: 'calc(100vh - 120px)' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        placeholder="Search notes..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        size="small"
                        sx={{ width: 300 }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showArchived}
                                onChange={(e) => setShowArchived(e.target.checked)}
                            />
                        }
                        label="Show Archived"
                    />
                </Box>

                {/* Grid */}
                <Box sx={{ flex: 1 }}>
                    <NoteGrid
                        searchText={searchText}
                        showArchived={showArchived}
                    />
                </Box>
            </Box>
        </Container>
    );
}

12. App Setup
typescript// App.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './config/theme';
import { NotesPage } from './pages/NotesPage';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    autoHideDuration={3000}
                >
                    <CssBaseline />
                    <NotesPage />
                </SnackbarProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;

13. Package.json Dependencies
json{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.14.0",
    "@mui/x-data-grid": "^6.18.0",
    "@mui/lab": "^5.0.0-alpha.170",
    "@mui/icons-material": "^5.14.0",
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-query-devtools": "^5.0.0",
    "axios": "^1.6.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "notistack": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0"
  }
}

🎯 Key Patterns Summary
1. Feature-Based Structure

Mỗi feature tự chứa: components, hooks, services, types
Easy to scale và maintain

2. React Query for State Management

Server state hoàn toàn do React Query quản lý
Automatic caching, refetching, optimistic updates
No need for Redux/Context for server data

3. Separation of Concerns
Component → Hook → Service → API
   ↓         ↓        ↓        ↓
  View    Logic   Business  HTTP
4. Type Safety

Tất cả đều có TypeScript types
Shared types giữa frontend/backend

5. Reusable Hooks

useNotes: Data fetching
useNoteActions: CRUD operations
useNoteDialog: UI state management

6. Smart/Dumb Pattern

Smart components: Logic + Data (NoteGrid)
Dumb components: Pure presentation (Columns, Toolbar)

7. Form Management

React Hook Form + Zod validation
Type-safe forms with auto-completion

8. Error Handling

Centralized in hooks
User-friendly notifications via notistack
Consistent error UI


📊 Advantages của Pattern này
✅ Scalable: Dễ thêm features mới
✅ Testable: Mỗi layer test riêng
✅ Maintainable: Clear separation of concerns
✅ Type-safe: Full TypeScript support
✅ DRY: Không duplicate code
✅ Performance: Optimized với React Query cache
✅ Developer Experience: Auto-complete, refactoring dễ dàng
Pattern này được sử dụng bởi các công ty lớn như Vercel, Netflix, Airbnb!RetryClaude can make mistakes. Please double-check responses.hãy so sánh cách viết mới và cách cũ của tôi Sonnet 4.5