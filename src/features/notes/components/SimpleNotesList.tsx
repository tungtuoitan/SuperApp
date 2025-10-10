/**
 * Simple Notes List Component
 * Demonstrates the new React Query architecture
 */

import React from 'react';
import { Box, Card, Typography, CircularProgress, Alert } from '@mui/material';
import { useNotes } from '../hooks/useNotes';
import { Button } from '../../../shared/components/ui/Button';
import type { Note } from '../types/note.types';

export function SimpleNotesList() {
    // ✅ NEW: Using React Query hook for server state
    const { data: notes, isLoading, error, refetch } = useNotes();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading notes...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                Failed to load notes: {(error as Error).message}
                <Button onClick={() => refetch()} variant="text" sx={{ ml: 2 }}>
                    Retry
                </Button>
            </Alert>
        );
    }

    if (!notes || notes.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6" color="text.secondary">
                    No notes found
                </Typography>
                <Typography variant="body2" color="text.disabled">
                    Create your first note to get started
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Notes ({notes.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {notes.map((note: Note) => (
                    <Card key={note.noteId} sx={{ p: 2 }}>
                        <Typography variant="h6">{note.name}</Typography>
                        {note.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {note.description}
                            </Typography>
                        )}
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Created: {note.createdAt.toLocaleDateString()}
                            {note.isArchived && ' • Archived'}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}