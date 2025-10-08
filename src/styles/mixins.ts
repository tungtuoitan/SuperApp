/**
 * Style Mixins
 * Reusable style objects and functions
 */

import { CSSObject } from '@mui/material';

/**
 * Truncate text with ellipsis
 */
export const truncateText = (): CSSObject => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/**
 * Truncate text to multiple lines
 */
export const truncateMultiline = (lines: number = 2): CSSObject => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/**
 * Smooth transition
 */
export const smoothTransition = (property: string = 'all', duration: string = '0.3s'): CSSObject => ({
  transition: `${property} ${duration} ease`,
});

/**
 * Hide scrollbar while maintaining scroll functionality
 */
export const hideScrollbar = (): CSSObject => ({
  scrollbarWidth: 'none' /* Firefox */,
  msOverflowStyle: 'none' /* IE and Edge */,
  '&::-webkit-scrollbar': {
    display: 'none' /* Chrome, Safari, Opera */,
  },
});

/**
 * Center absolute positioned element
 */
export const absoluteCenter = (): CSSObject => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
