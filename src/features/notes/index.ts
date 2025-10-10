/**
 * Notes Feature Public API
 * Exports all public components, hooks, and services from the notes feature
 */

// Hooks
export * from './hooks/useNotes';

// Services
export { noteService } from './services/noteService';

// Types
export type { 
    Note, 
    CreateNoteDTO, 
    UpdateNoteDTO, 
    GetNotesParams 
} from './types/note.types';

// Context
export { NoteUIProvider, useNoteUI } from './store/NoteUIContext';

// Components
export { NoteGrid } from './components/NoteGrid';
export { SimpleNotesList } from './components/SimpleNotesList';
export { NoteDialog } from './components/NoteDialog';
// export { NoteCard } from './components/NoteCard';