import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDialogHelpers } from '../../../../hooks';
import { Note } from '../../../../types';

/**
 * Note creation component for the toolbar.
 * 
 * This component provides a button interface for creating new notes with:
 * - Add button with icon for intuitive user interaction
 * - Integration with the shared note detail dialog managed at HomePage level
 * - Uses the global DialogStore pattern for state management
 * 
 * The component uses openDialog to trigger the creation dialog,
 * which is managed by the HomePage component.
 * 
 * @returns Button component that opens note creation dialog
 */
export function NoteCreate() {
    // Get dialog helper functions
    const { openDialog } = useDialogHelpers<Note>();

    const handleCreate = () => {
        // Create a new note template for creation
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
        
        openDialog(newNote);
    };

    return (
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
    );
};
