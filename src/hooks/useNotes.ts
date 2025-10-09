/**
 * useNotes Hook
 * Custom hook for managing notes data fetching, state management,
 * and CRUD operations with optimistic updates and local state synchronization
 */

import { useState, useEffect } from 'react';

import { notesApi } from '../services/api';
import type { Note, GetNotesParams, CreateNoteRequest, UpdateNoteRequest } from '../types';

/**
 * Return type for useNotes hook
 */
interface UseNotesReturn {
    notes: Note[];
    loading: boolean;
    error: string | null;
    refetch: (params?: GetNotesParams) => Promise<void>;
    createNote: (request: CreateNoteRequest) => Promise<Note>;
    updateNote: (id: number, request: UpdateNoteRequest) => Promise<Note>;
    deleteNote: (id: number) => Promise<void>;
}

/**
 * Custom hook for notes management
 * @param initialParams Optional initial parameters for fetching notes
 * @returns Object containing notes data, loading state, error state, and CRUD operations
 */
export const useNotes = (initialParams?: GetNotesParams): UseNotesReturn => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch notes from API with optional parameters
     * @param params Optional parameters for filtering notes
     */
    const fetchNotes = async (params?: GetNotesParams): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const fetchedNotes = await notesApi.getNotes(params || initialParams || { getAll: true });
            setNotes(fetchedNotes);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch notes');
            console.error('Error fetching notes:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create a new note with optimistic updates
     * @param request Note creation request data
     * @returns Promise resolving to created note
     */
    const createNote = async (request: CreateNoteRequest): Promise<Note> => {
        try {
            const newNote = await notesApi.createNote(request);

            // Add new note to local state (optimistic update)
            setNotes(prev => [...prev, newNote]);

            return newNote;
        } catch (err) {
            console.error('Error creating note:', err);
            throw err;
        }
    };

    /**
     * Update an existing note with optimistic updates
     * @param id Note ID to update
     * @param request Note update request data
     * @returns Promise resolving to updated note
     */
    const updateNote = async (id: number, request: UpdateNoteRequest): Promise<Note> => {
        try {
            const updatedNote = await notesApi.updateNote(id, request);

            // Update local state (optimistic update)
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
            console.error('Error updating note:', err);
            throw err;
        }
    };

    /**
     * Delete a note with optimistic updates
     * @param id Note ID to delete
     */
    const deleteNote = async (id: number): Promise<void> => {
        try {
            await notesApi.deleteNote(id);

            // Remove note from local state (optimistic update)
            setNotes(prev => prev.filter(n => n.noteId !== id));
        } catch (err) {
            console.error('Error deleting note:', err);
            throw err;
        }
    };

    // Load notes on hook initialization
    useEffect(() => {
        fetchNotes();
    }, []);

    return {
        notes,
        loading,
        error,
        refetch: fetchNotes,
        createNote,
        updateNote,
        deleteNote,
    };
};
