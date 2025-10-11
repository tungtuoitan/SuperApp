import { TextField, TextFieldProps, SxProps, Theme } from '@mui/material';
import { forwardRef } from 'react';

/**
 * Props interface for the GenericTextField component.
 */
export interface GenericTextFieldProps extends Omit<TextFieldProps, 'size'> {
    /** Size variant for the component */
    size?: 'small' | 'tiny';
    /** MUI sx prop for styling */
    sx?: SxProps<Theme>;
}

/**
 * Generic text field component for consistent text input across the application.
 * 
 * This component provides a reusable text field interface with:
 * - Two size variants: 'small' (default) and 'tiny'
 * - Configurable styling and behavior
 * - Built-in error states and validation
 * - Accessible design with proper ARIA attributes
 * 
 * Size variants:
 * - 'small': Standard size similar to LeftFormStyle Notes field (default)
 * - 'tiny': Compact size similar to RequestDetail request note field with 12px font
 * 
 * @param props - Component props for text field configuration
 * @returns Configured text field component
 */
export const GenericTextField = forwardRef<HTMLDivElement, GenericTextFieldProps>(
    ({ size = 'small', sx, ...props }, ref) => {
        // Define styles based on size prop
        const getStyles = (): SxProps<Theme> => {
            const baseStyles: SxProps<Theme> = {
                width: '100%',
                ...sx,
            };

            if (size === 'tiny') {
                return {
                    ...baseStyles,
                    '& .MuiInputBase-input': {
                        fontSize: '12px!important',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                    },
                    '& .MuiFormLabel-root': {
                        fontSize: '12px!important',
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                        fontSize: '12px!important',
                    },
                };
            } else {
                // Small size - standard styling (LeftFormStyle Notes field)
                return {
                    ...baseStyles,
                    '& .MuiTextField-root': {
                        width: '100%',
                    },
                };
            }
        };

        return (
            <TextField
                ref={ref}
                size="small" // Always use MUI's small size as base
                variant="outlined"
                sx={getStyles()}
                {...props}
            />
        );
    }
);

GenericTextField.displayName = 'GenericTextField';