/**
 * useNoteHelpers Hook
 * Custom hook for managing notes CRUD operations.
 * This hook provides only functions and does not return state.
 * State should be accessed directly from NoteStore using useNoteStore().
 * No side effects - pure function definitions only.
 * 
 * RULES:
 * - No useEffect
 * - No parameters in hook function
 * - Only function definitions
 * - Use store setters for state updates
 */

import { notesApi } from '../services/api';
import { useNoteStore } from '../store/notes/NoteStore';
import type { Note, GetNotesParams, CreateNoteRequest, UpdateNoteRequest } from '../types';

/**
 * Return type for useNoteHelpers hook - only functions, no state
 */
interface UseNoteHelpersReturn {
    fetchNotes: (params?: GetNotesParams) => Promise<void>;
    createNote: (request: CreateNoteRequest) => Promise<Note>;
    updateNote: (id: number, request: UpdateNoteRequest) => Promise<Note>;
    deleteNote: (id: number) => Promise<void>;
}

/**
 * Custom hook for notes helper functions
 * @returns Object containing only CRUD operation functions
 */
export const useNoteHelpers = (): UseNoteHelpersReturn => {
    // Get state setters from NoteStore
    const {
        setNotes,
        setLoading,
        setError
    } = useNoteStore();

    /**
     * Fetch notes from API with optional parameters
     * @param params Optional parameters for filtering notes
     */
    const fetchNotes = async (params?: GetNotesParams): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const fetchedNotes = await notesApi.getNotes(params || { getAll: true });
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

            // Add new note to store state (optimistic update)
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

            // Update store state (optimistic update)
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

            // Remove note from store state (optimistic update)
            setNotes(prev => prev.filter(n => n.noteId !== id));
        } catch (err) {
            console.error('Error deleting note:', err);
            throw err;
        }
    };

    return {
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
    };
};