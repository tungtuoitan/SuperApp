import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNoteUI } from '../../../store/NoteUIContext';
import type { Note } from '../../../types/note.types';

/**
 * Note Create toolbar component
 * Matches the exact UI pattern from ITRequestCreate
 */
export const NoteCreate = () => {
    const { openDialog } = useNoteUI();

    const handleCreateNote = () => {
        // Create a new note object with id = 0 for create mode
        const newNote: Note = {
            noteId: 0,
            name: '',
            description: '',
            tags: [],
            type: undefined,
            createdBy: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isArchived: false,
        };
        
        openDialog(newNote);
    };

    return (
        <BottomNavigation onChange={() => {}}
            value={0}>
            <BottomNavigationAction
                label="Create Note"
                onClick={handleCreateNote} />
        </BottomNavigation>
    );
};