/**
 * Notes Page Component
 * Main page for notes management using the new architecture
 */

import { Box, Typography } from '@mui/material';
import { ErrorBoundary } from '../shared/components/feedback/ErrorBoundary';
import { NoteGrid, NoteDialog } from '../features/notes';

/**
 * Notes page with proper error boundary
 * This page follows the new architecture patterns:
 * - Uses global NoteUIProvider from Main.tsx for cross-feature sharing
 * - Server state managed by React Query hooks
 * - Wrapped in error boundary for error handling
 */
export function NotesPage() {
    return (
        <ErrorBoundary>
            <NotesPageContent />
        </ErrorBoundary>
    );
}

/**
 * Internal content component that uses the note UI context
 */
function NotesPageContent() {
    return (
        <Box sx={{ p: 2}}>
            <NoteGrid />
            <NoteDialog />
        </Box>
    );
}