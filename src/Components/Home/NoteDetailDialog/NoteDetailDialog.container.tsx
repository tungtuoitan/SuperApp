// NoteDetailDialog.container.tsx (Smart Component)
// Internal hooks
import { useDialogHelpers, useNoteHelpers } from '../../../hooks';
import { useDialogStore } from '../../../store/dialog/DialogStore';

// Internal types
import type { Note } from '../../../types';
import {NoteDetailDialogView} from './NoteDetailDialog.view';

// View component


/**
 * NoteDetailDialog container component (Smart Component).
 * 
 * This container handles all business logic for the note detail dialog:
 * - Manages dialog state using useDialogStore
 * - Handles note save operations (create/update) using useNoteHelpers
 * - Handles dialog close events using useDialogHelpers
 * - Determines if operation is create or update based on noteId
 * - Passes all necessary data as props to the view component
 * 
 * @returns NoteDetailDialog container with business logic
 */
export function NoteDetailDialogContainer() {
    // Get dialog helper functions
    const { closeDialog } = useDialogHelpers<Note>();
    
    // Get dialog state from DialogStore
    const { open, data } = useDialogStore();
    
    // Get helper functions from useNoteHelpers
    const { createNote, updateNote } = useNoteHelpers();

    const handleDialogClose = () => {
        closeDialog();
    };

    const handleNoteSave = async (updatedNote: Note) => {
        try {
            if (updatedNote.noteId && updatedNote.noteId > 0) {
                // Update existing note
                await updateNote(updatedNote.noteId, {
                    noteId: updatedNote.noteId,
                    name: updatedNote.name,
                    description: updatedNote.description,
                    tags: updatedNote.tags,
                    type: updatedNote.type,
                });
            } else {
                // Create new note
                await createNote({
                    name: updatedNote.name,
                    description: updatedNote.description,
                    tags: updatedNote.tags,
                    type: updatedNote.type,
                    createdBy: updatedNote.createdBy,
                });
            }
            closeDialog();
        } catch (err) {
            // Error is already handled by the useNotes hook
            console.error('Error saving note:', err);
        }
    };

    return (
        <NoteDetailDialogView
            open={open}
            note={data}
            onClose={handleDialogClose}
            onSave={handleNoteSave}
        />
    );
}