// NoteGrid.container.tsx (Smart Component)
import { useEffect } from 'react';

// Internal hooks
import { useDialogHelpers, useNoteHelpers } from '../../../hooks';
import { useNoteStore } from '../../../store/notes/NoteStore';

// Internal types
import type { Note } from '../../../types';

// View component
import { NoteGridView } from './NoteGrid.view';

/**
 * NoteGrid container component (Smart Component).
 * 
 * This container handles all business logic, data fetching, and state management for the note grid:
 * - Fetches notes from API using useNoteHelpers
 * - Manages grid state using useNoteStore
 * - Handles note click events using useDialogHelpers
 * - Sorts and processes note data
 * - Passes all necessary data as props to the view component
 * 
 * @returns NoteGrid container with business logic
 */
export function NoteGridContainer() {
    // Get state from NoteStore
    const {
        notes,
        loading,
        error,
        searchText,
        setSearchText,
        loadingMasterGrid,
        setLoadingMasterGrid,
        refreshMasterGrid,
        setRefreshMasterGrid,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage
    } = useNoteStore();
    
    // Get helper functions from useNoteHelpers
    const { createNote, updateNote, deleteNote, fetchNotes } = useNoteHelpers();
    
    // Get dialog helper functions
    const { openDialog } = useDialogHelpers<Note>();

    // Sort notes by createdAt date (latest first)
    const sortedNotes = [...notes ?? []].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNoteClick = (note: Note) => {
        openDialog(note);
    };

    return (
        <NoteGridView
            notes={sortedNotes}
            loading={loading}
            error={error}
            onNoteClick={handleNoteClick}
        />
    );
}