import { Box } from '@mui/material';
import { GridContainer, GridWrapper } from '../common/GridContainer';
import { ToolbarContainer } from '../common/ToolbarContainer';
import { NoteCreate } from './toolbars/items/NoteCreate';
import { NoteFilter } from './toolbars/items/NoteFilter';
import { NoteSearch } from './toolbars/items/NoteSearch';
import { NoteDetailDialog } from './NoteDetailDialog/index';
import {NoteGridContainer} from './NoteGrid/NoteGrid.container';

/**
 * Home page component.
 * 
 * This component serves as the main landing page of the application,
 * providing a comprehensive notes management interface with:
 * - Toolbar with create, search, and filter functionality
 * - Main content area displaying notes in a grid layout (NoteGrid container)
 * - Note detail dialog for viewing/editing notes (NoteDetailDialog container)
 * - Responsive design that adapts to different screen sizes
 * 
 * The layout uses a standard grid container pattern with a toolbar
 * at the top and the main content area below. Both NoteGrid and NoteDetailDialog
 * are now container components that manage their own business logic and state.
 * 
 * @returns The home page component with notes management interface
 */
export default function HomePage() {
    return (
        <GridContainer>
            <ToolbarContainer>
                <NoteCreate />
                <Box sx={{ flexGrow: 1 }} />
                <NoteSearch />
                <NoteFilter />
            </ToolbarContainer>
            <GridWrapper>
                <NoteGridContainer />
            </GridWrapper>
            
            <NoteDetailDialog />
        </GridContainer>
    );
}
