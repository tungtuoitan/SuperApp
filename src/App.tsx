import { Box } from '@mui/material';

import { NavProvider } from './contexts/NavigationContext';
import { Main } from './Components/Main';

import './App.css';

/**
 * Root application component.
 * 
 * This component serves as the main entry point for the application,
 * setting up the global providers and the main layout structure.
 * It provides navigation context to all child components and ensures
 * the application fills the entire viewport with proper overflow handling.
 * 
 * @returns The main application component with context providers
 */
export function App() {
    return (
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
    );
}
