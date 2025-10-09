import { CSSProperties, LegacyRef, ReactNode } from 'react';
import { SxProps, Theme, styled } from '@mui/material';

/**
 * Styled root container component for grid layouts.
 * 
 * Provides a full-width, full-height container with:
 * - Vertical flex layout
 * - Light gray background
 * - Proper overflow handling
 * - Responsive design support
 */
export const ContainerRoot = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(246, 246, 246)',
    overflowX: 'auto',
    overflowY: 'hidden',
});

/**
 * Styled wrapper component for grid content.
 * 
 * Provides a flexible content area with:
 * - Flex-grow behavior to fill available space
 * - Consistent margin spacing
 * - Auto overflow handling
 * - Column flex direction for stacking content
 */
export const GridWrapper = styled('div')({
    flex: 1,
    margin: '20px 20px 0',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
});

/**
 * Props interface for the GridContainer component.
 */
export interface IGridContainer {
    /** Child components to render within the container */
    children: ReactNode;
    /** Optional MUI sx prop for additional styling */
    sx?: SxProps<Theme>;
    /** Optional inline styles */
    style?: CSSProperties;
    /** Optional ref for accessing the DOM element */
    ref?: LegacyRef<HTMLDivElement>;
}

/**
 * Grid container component for consistent page layouts.
 * 
 * This component provides a standardized container for grid-based layouts
 * with proper spacing, overflow handling, and responsive behavior.
 * 
 * Features:
 * - Full viewport coverage
 * - Consistent background and spacing
 * - Flexible content area
 * - Support for MUI sx props and inline styles
 * - Forward ref support
 * 
 * @param props - Component props including children and styling options
 * @returns Styled container component for grid layouts
 */
export function GridContainer({
    children,
    sx,
    style,
    ref,
}: IGridContainer) {
    return (
        <ContainerRoot
            ref={ref}
            sx={sx}
            style={style}
        >
            {children}
        </ContainerRoot>
    );
}
