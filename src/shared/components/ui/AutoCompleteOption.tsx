import React from 'react';
import { Box, BoxProps } from '@mui/material';

export interface AutoCompleteOptionProps extends BoxProps {
    /** Child content to display in the option */
    children: React.ReactNode;
    /** Whether the option is disabled */
    disabled?: boolean;
}

/**
 * Reusable option component for autocomplete items
 * 
 * @example
 * ```tsx
 * <AutoCompleteOption {...props}>
 *   Option Label
 * </AutoCompleteOption>
 * ```
 */
export function AutoCompleteOption({ 
    children, 
    disabled, 
    ...props 
}: AutoCompleteOptionProps) {
    return (
        <Box 
            component="li" 
            {...props}
            sx={{
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? 'none' : 'auto',
                ...props.sx,
            }}
        >
            {children}
        </Box>
    );
}

export default AutoCompleteOption;