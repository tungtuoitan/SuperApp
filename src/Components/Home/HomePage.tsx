import { Box } from '@mui/material';

import { GridContainer, GridWrapper } from '../common/GridContainer';
import { ToolbarContainer } from '../common/ToolbarContainer';
import { NoteGrid } from './NoteGrid';
import { NoteCreate } from './toolbars/items/NoteCreate';
import { NoteFilter } from './toolbars/items/NoteFilter';
import { NoteSearch } from './toolbars/items/NoteSearch';

/**
 * Home page component.
 * 
 * This component serves as the main landing page of the application,
 * providing a comprehensive notes management interface with:
 * - Toolbar with create, search, and filter functionality
 * - Main content area displaying notes in a grid layout
 * - Responsive design that adapts to different screen sizes
 * 
 * The layout uses a standard grid container pattern with a toolbar
 * at the top and the main content area below.
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
                <NoteGrid />
            </GridWrapper>
        </GridContainer>
    );
}
