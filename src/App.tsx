import { Box, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { NavProvider } from './contexts/NavigationContext';
import { Main } from './Components/Main';
import { queryClient } from './lib/react-query';
import { theme } from './lib/theme';

import './App.css';

/**
 * Root application component.
 * 
 * This component serves as the main entry point for the application,
 * setting up the global providers and the main layout structure.
 * It provides React Query for server state, Material-UI theme,
 * navigation context, and ensures the application fills the entire viewport.
 * 
 * @returns The main application component with all necessary providers
 */
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    className="App"
                    sx={{
                        overflow: 'hidden',
                        height: '100vh',
                        width: '100%',
                        margin: 0,
                        padding: 0,
                        overflowX: 'hidden',
                    }}
                >
                    <NavProvider>
                        <Main />
                    </NavProvider>
                </Box>
                {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
            </ThemeProvider>
        </QueryClientProvider>
    );
}
