import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NoteDetailDialog from "../../NoteDetailDialog";
import { Note } from "../../NoteTypes";
import { notesApi } from "../../NotesApi";

export const NoteCreate = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleSave = async (note: Note) => {
        try {
            setError(null);
            const result = await notesApi.iuNote(note);

            if (result.options?.success) {
                console.log('Note created successfully:', result);
                setDialogOpen(false);
                // Optionally trigger a refresh of the grid here
            } else {
                setError(result.options?.message || 'Failed to create note');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create note');
            console.error('Error creating note:', err);
        }
    };

    // Create a note object with id = 0 for new requests
    const newNote: Note = {
        noteId: 0,
        name: '',
        description: '',
        tags: '',
        type: '',
        createdBy: '',
        createdAt: new Date(),
        isArchived: false
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCreate}
                sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                }}
            >
                Create Request
            </Button>

            <NoteDetailDialog
                open={dialogOpen}
                note={newNote}
                onClose={handleClose}
                onSave={handleSave}
            />
        </>
    );
};
