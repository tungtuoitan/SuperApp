/**
 * Style mixins and utility functions for consistent styling.
 * 
 * This module provides reusable style objects and functions that can be
 * applied throughout the application for consistent design patterns.
 * All mixins return MUI-compatible CSSObject types for type safety.
 */

import { CSSObject } from '@mui/material';

/**
 * Truncate single-line text with ellipsis overflow.
 * 
 * @returns CSS object for single-line text truncation
 * 
 * @example
 * ```typescript
 * <Box sx={truncateText()}>
 *   This is a very long text that will be truncated...
 * </Box>
 * ```
 */
export function truncateText(): CSSObject {
    return {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };
}

/**
 * Truncate multi-line text with ellipsis overflow.
 * 
 * @param lines - Number of lines to show before truncation (default: 2)
 * @returns CSS object for multi-line text truncation
 * 
 * @example
 * ```typescript
 * <Box sx={truncateMultiline(3)}>
 *   This is a longer text that will be truncated after 3 lines...
 * </Box>
 * ```
 */
export function truncateMultiline(lines: number = 2): CSSObject {
    return {
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };
}

/**
 * Apply smooth CSS transition to properties.
 * 
 * @param property - CSS property to transition (default: 'all')
 * @param duration - Transition duration (default: '0.3s')
 * @returns CSS object for smooth transitions
 * 
 * @example
 * ```typescript
 * <Box sx={{
 *   ...smoothTransition('opacity', '0.5s'),
 *   '&:hover': { opacity: 0.7 }
 * }}>
 *   Hover me for smooth fade
 * </Box>
 * ```
 */
export function smoothTransition(property: string = 'all', duration: string = '0.3s'): CSSObject {
    return {
        transition: `${property} ${duration} ease`,
    };
}

/**
 * Hide scrollbars while maintaining scroll functionality.
 * 
 * Works across all major browsers (Chrome, Safari, Firefox, IE/Edge).
 * 
 * @returns CSS object to hide scrollbars
 * 
 * @example
 * ```typescript
 * <Box sx={{ ...hideScrollbar(), overflow: 'auto' }}>
 *   Scrollable content without visible scrollbars
 * </Box>
 * ```
 */
export function hideScrollbar(): CSSObject {
    return {
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
        '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, Opera
        },
    };
}

/**
 * Center an absolutely positioned element.
 * 
 * Uses transform to center the element both horizontally and vertically
 * relative to its positioned parent.
 * 
 * @returns CSS object for absolute centering
 * 
 * @example
 * ```typescript
 * <Box sx={{ position: 'relative' }}>
 *   <Box sx={absoluteCenter()}>
 *     Perfectly centered content
 *   </Box>
 * </Box>
 * ```
 */
export function absoluteCenter(): CSSObject {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
}
