import { BrowserRouter } from 'react-router-dom';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { Box } from '@mui/material';

import { AuthProvider } from '../contexts/AuthContext';
import { NoteUIProvider } from '../features/notes';
import { CloseNotiBtn } from './common/CloseNotiBtn';
import MainNav from './MainNav/MainNav';
import {DialogProvider} from 'store';

/**
 * Main application layout component.
 * 
 * This component serves as the primary layout wrapper for the entire application,
 * providing essential providers and routing functionality. It sets up:
 * - Browser routing for client-side navigation
 * - Snackbar notifications with auto-hide and custom close button
 * - Authentication context for user session management
 * - Main navigation structure
 * 
 * The component ensures the application fills the available space with proper
 * overflow handling to prevent scrolling issues.
 * 
 * @returns The main layout component with all necessary providers
 */
export function Main() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                }}
            >
                <SnackbarProvider 
                    action={(id: SnackbarKey) => <CloseNotiBtn id={id} />} 
                    autoHideDuration={3000}
                >
                    <AuthProvider>
                        <NoteUIProvider>
                            <DialogProvider>
                                <MainNav />
                            </DialogProvider>
                        </NoteUIProvider>
                    </AuthProvider>
                </SnackbarProvider>
            </Box>
        </BrowserRouter>
    );
}
