import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NoteDetailDialog from "../../NoteDetailDialog";
import { Note } from "../../../../types";
import { useDialog, useNotes } from "../../../../hooks";

export const NoteCreate = () => {
    const { saveNote } = useNotes();
    const { open: dialogOpen, openDialog, closeDialog } = useDialog<Note>();

    const handleCreate = () => {
        openDialog(newNote);
    };

    const handleClose = () => {
        closeDialog();
    };

    const handleSave = async (note: Note) => {
        try {
            await saveNote(note);
            console.log('Note created successfully:', note);
            closeDialog();
            // The saveNote hook will handle updating the global notes state
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
