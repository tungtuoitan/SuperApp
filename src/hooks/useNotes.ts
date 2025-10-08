/**
 * useNotes Hook
 * Custom hook for managing notes data fetching and state
 */

import { useState, useEffect } from 'react';
import { notesApi } from '../services/api';
import { Note, GetNotesParams } from '../types';

interface UseNotesReturn {
  notes: Note[];
  loading: boolean;
  error: string | null;
  refetch: (params?: GetNotesParams) => Promise<void>;
  saveNote: (note: Partial<Note>) => Promise<any>;
}

export const useNotes = (initialParams?: GetNotesParams): UseNotesReturn => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async (params?: GetNotesParams) => {
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

  const saveNote = async (note: Partial<Note>) => {
    try {
      const savedNote = await notesApi.createOrUpdateNote(note as Note);

      // Update local state with the saved note
      if (savedNote.options?.success && savedNote.data) {
        setNotes(prev => {
          const index = prev.findIndex(n => n.noteId === savedNote.data!.noteId);
          if (index >= 0) {
            // Update existing note
            const updated = [...prev];
            updated[index] = savedNote.data!;
            return updated;
          }
          // Add new note
          return [...prev, savedNote.data!];
        });
      }

      return savedNote;
    } catch (err) {
      console.error('Error saving note:', err);
      throw err;
    }
  };

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedNotes = await notesApi.getNotes(initialParams || { getAll: true });
        setNotes(fetchedNotes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notes');
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    refetch: fetchNotes,
    saveNote,
  };
};
