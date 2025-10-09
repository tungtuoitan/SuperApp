import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDialog, useNotes } from '../../../../hooks';
import { Note } from '../../../../types';
import NoteDetailDialog from '../../NoteDetailDialog';

/**
 * Note creation component for the toolbar.
 * 
 * This component provides a button interface for creating new notes with:
 * - Add button with icon for intuitive user interaction
 * - Integration with note detail dialog for form input
 * - State management for dialog open/close operations
 * - Error handling for note creation operations
 * - Default note template for new notes
 * 
 * The component uses the useNotes hook for API operations and
 * useDialog hook for dialog state management.
 * 
 * @returns Button component that opens note creation dialog
 */
export function NoteCreate() {
    const { createNote } = useNotes();
    const { open: dialogOpen, openDialog, closeDialog } = useDialog<Note>();

    const handleCreate = () => {
        openDialog(newNote);
    };

    const handleClose = () => {
        closeDialog();
    };

    const handleSave = async (note: Note) => {
        try {
            await createNote({
                name: note.name,
                description: note.description,
                tags: note.tags,
                type: note.type,
                createdBy: note.createdBy,
            });
            console.log('Note created successfully:', note);
            closeDialog();
            // The createNote hook will handle updating the global notes state
        } catch (err) {
            console.error('Error creating note:', err);
            // Error handling is done in the hook
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
