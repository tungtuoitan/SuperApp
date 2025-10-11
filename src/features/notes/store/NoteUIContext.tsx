/**
 * Notes UI Context
 * Minimal UI state management for notes feature
 * Server state is handled by React Query hooks
 */

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import type { GridApi } from '@mui/x-data-grid';
import type { SxProps } from '@mui/material';
import type { Note } from '../types/note.types';

interface DialogProps {
    open: boolean;
    loading: boolean;
}

interface NoteUIContextValue {
    // Dialog state
    selectedNote: Note | null;
    isDialogOpen: boolean;
    openDialog: (note: Note) => void;
    closeDialog: () => void;
    updateSelectedNote: (updatedNote: Partial<Note>) => void;

    // Search UI state
    searchText: string;
    setSearchText: (text: string) => void;
    searchInputRef: React.RefObject<HTMLInputElement>;

    // Grid UI state
    loadingMasterGrid: boolean;
    setLoadingMasterGrid: (loading: boolean) => void;
    refreshMasterGrid: boolean;
    setRefreshMasterGrid: (refresh: boolean) => void;
    apiRef: React.RefObject<GridApi>;

    // Pagination UI state
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;

    // Container refs
    noteMasterContainerRef: React.RefObject<HTMLDivElement>;
    noteDetailDialogRef: React.RefObject<HTMLDivElement>;

    // Dialog styling
    noteDetailDialogSxProps: SxProps;
    setNoteDetailDialogSxProps: (sx: SxProps) => void;

    // Preview dialog state
    previewDialogProps: DialogProps;
    setPreviewDialogProps: (props: DialogProps) => void;
}

const NoteUIContext = createContext<NoteUIContextValue | null>(null);

export function NoteUIProvider({ children }: { children: React.ReactNode }) {
    // Dialog state
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Search UI state
    const [searchText, setSearchText] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Grid UI state
    const [loadingMasterGrid, setLoadingMasterGrid] = useState(false);
    const [refreshMasterGrid, setRefreshMasterGrid] = useState(false);
    const apiRef = useRef<GridApi>(null!);

    // Pagination UI state
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(100);

    // Container refs
    const noteMasterContainerRef = useRef<HTMLDivElement>(null);
    const noteDetailDialogRef = useRef<HTMLDivElement>(null);

    // Dialog styling
    const [noteDetailDialogSxProps, setNoteDetailDialogSxProps] = useState<SxProps>({});

    // Preview dialog state
    const [previewDialogProps, setPreviewDialogProps] = useState<DialogProps>({
        open: false,
        loading: false,
    });

    const openDialog = useCallback((note: Note) => {
        setSelectedNote(note);
        setIsDialogOpen(true);
    }, []);

    const closeDialog = () => {
        setIsDialogOpen(false);
        setTimeout(() => setSelectedNote(null), 200); // After animation
    };

    const updateSelectedNote = (updatedNote: Partial<Note>) => {
        if (selectedNote) {
            setSelectedNote(prev => prev ? { ...prev, ...updatedNote } : null);
        }
    };

    const value = {
        // Dialog state
        selectedNote,
        isDialogOpen,
        openDialog,
        closeDialog,
        updateSelectedNote,

        // Search UI state
        searchText,
        setSearchText,
        searchInputRef,

        // Grid UI state
        loadingMasterGrid,
        setLoadingMasterGrid,
        refreshMasterGrid,
        setRefreshMasterGrid,
        apiRef,

        // Pagination UI state
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,

        // Container refs
        noteMasterContainerRef,
        noteDetailDialogRef,

        // Dialog styling
        noteDetailDialogSxProps,
        setNoteDetailDialogSxProps,

        // Preview dialog state
        previewDialogProps,
        setPreviewDialogProps,
    };

    return (
        <NoteUIContext.Provider value={value}>
            {children}
        </NoteUIContext.Provider>
    );
}

export function useNoteUI() {
    const context = useContext(NoteUIContext);
    if (!context) {
        throw new Error('useNoteUI must be used within NoteUIProvider');
    }
    return context;
}