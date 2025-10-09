import React from 'react';
import { AppBar, SxProps, Theme, Toolbar, styled } from '@mui/material';

/**
 * Styled wrapper component for toolbar containers.
 * 
 * Provides consistent styling for toolbar areas with:
 * - Fixed height dimensions (64px)
 * - Flex shrink prevention
 * - White background with black text
 * - Custom styling for importance indicators
 * - Selection state styling
 */
export const ToolbarWrapper = styled('div')({
    height: '64px',
    minHeight: '64px',
    maxHeight: '64px',
    flexShrink: 0,
    '& .MuiPaper-root': {
        marginTop: '1px',
        backgroundColor: '#fff',
        color: '#000',
    },
    '& .isImportant-icon-false': {
        color: '#D8D8D7'
    },
    '& .isImportant-icon-true': {
        color: '#C70039'
    },
    '& .selected-true': {
        backgroundColor: '#D8D8D7'
    }
});

/**
 * Props interface for the ToolbarContainer component.
 */
export interface IToolbarContainer {
    /** Child components to render within the toolbar */
    children: React.ReactNode;
    /** Optional MUI sx prop for additional toolbar styling */
    sxBoxToolbar?: SxProps<Theme>;
}

/**
 * Toolbar container component for consistent toolbar layouts.
 * 
 * This component provides a standardized toolbar container using MUI's
 * AppBar and Toolbar components with consistent styling and spacing.
 * 
 * Features:
 * - Fixed 64px height for consistent toolbar size
 * - White background with subtle elevation shadow
 * - Proper padding and spacing
 * - Support for custom styling via sx props
 * - Responsive design support
 * 
 * @param props - Component props including children and styling options
 * @returns Styled toolbar container with AppBar and Toolbar components
 */
export function ToolbarContainer({ children, sxBoxToolbar }: IToolbarContainer) {
    return (
        <ToolbarWrapper sx={sxBoxToolbar}>
            <AppBar
                sx={{ 
                    marginTop: '3px', 
                    backgroundColor: '#fff', 
                    height: '64px' 
                }}
                position="static"
                elevation={2}
                variant="elevation"
            >
                <Toolbar 
                    sx={{
                        backgroundColor: '#fff',
                        color: '#000',
                        paddingLeft: '18px',
                        minHeight: '64px',
                        height: '64px'
                    }}
                >
                    {children}
                </Toolbar>
            </AppBar>
        </ToolbarWrapper>
    );
}
