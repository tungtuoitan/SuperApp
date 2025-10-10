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
    // border: '1px solid red',
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
 */
export const ContainerWrapper = styled('div')({
    flex: 1,
    margin: '6px',
    overflow: 'auto',
});

/**
 * Props interface for the GridContainer component.
 */
export interface GridContainerProps {
    /** Child components to render within the grid container */
    children: ReactNode;
    /** Optional CSS class name for custom styling */
    className?: string;
    /** Optional inline styles for the container */
    style?: CSSProperties;
    /** Optional MUI sx prop for advanced styling */
    sx?: SxProps<Theme>;
    /** Optional ref for direct DOM access */
    ref?: LegacyRef<HTMLDivElement>;
    /** Optional identifier for the container */
    id?: string;
    /** Whether to disable the default background color */
    noBackground?: boolean;
    /** Whether to disable default padding/margins */
    noPadding?: boolean;
}

/**
 * GridContainer - A layout container component for data grids and tables.
 * 
 * This component provides a standardized container for grid layouts with:
 * - Consistent background and spacing
 * - Proper overflow handling for large datasets
 * - Flexible content area that adapts to available space
 * - Support for custom styling and theming
 * 
 * The container uses a two-layer structure:
 * 1. ContainerRoot - Provides the main layout structure
 * 2. ContainerWrapper - Provides the content area with margins
 * 
 * @param props - Grid container configuration props
 * @returns Styled container component for grid layouts
 */
export function GridContainer({
    children,
    className,
    style,
    sx,
    ref,
    id,
    noBackground = false,
    noPadding = false,
    ...props
}: GridContainerProps) {
    return (
        <ContainerRoot
            ref={ref}
            id={id}
            className={className}
            style={style}
            sx={{
                backgroundColor: noBackground ? 'transparent' : undefined,
                ...sx,
            }}
            {...props}
        >
            <ContainerWrapper
                sx={{
                    margin: noPadding ? 0 : undefined,
                }}
            >
                {children}
            </ContainerWrapper>
        </ContainerRoot>
    );
}