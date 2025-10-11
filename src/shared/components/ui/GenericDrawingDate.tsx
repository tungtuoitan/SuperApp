import React, { forwardRef } from 'react';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SxProps, Theme } from '@mui/material';
import { spacing } from '@/lib/theme';

/**
 * Props interface for the GenericDrawingDate component.
 */
export interface GenericDrawingDateProps {
    /**
     * The size of the date picker
     * - 'small': Default size, same as GenericTextField (standard styling)
     * - 'tiny': Compact size like CADDrawings DatePicker (12px font, compact height)
     */
    size?: 'small' | 'tiny';
    
    /**
     * The date format to display
     * @default "MM/dd/yyyy"
     */
    format?: string;
    
    /**
     * The name of the date picker field
     */
    name?: string;
    
    /**
     * The label for the date picker
     */
    label?: string;
    
    /**
     * The current value of the date picker
     */
    value?: Date | null;
    
    /**
     * Callback fired when the value changes
     */
    onChange?: (date: Date | null) => void;
    
    /**
     * If true, the date picker is disabled
     */
    disabled?: boolean;
    
    /**
     * If true, shows validation error styling
     */
    error?: boolean;
    
    /**
     * Custom styles for the date picker
     */
    sx?: SxProps<Theme>;
    
    /**
     * CSS class name
     */
    className?: string;
    
    /**
     * If true, shows a clear button
     * @default true
     */
    clearable?: boolean;
}

/**
 * Generic date picker component for consistent date input across the application.
 * 
 * This component provides a reusable date picker interface with:
 * - Two size variants: 'small' (default) and 'tiny'
 * - Configurable styling and behavior
 * - Built-in error states and validation
 * - Automatic LocalizationProvider wrapping
 * - Consistent styling with GenericTextField
 * 
 * Size variants:
 * - 'small': Standard size similar to GenericTextField (default)
 * - 'tiny': Compact size similar to CADDrawings DatePicker with 12px font and 29.5px height
 * 
 * @param props - Component props for date picker configuration
 * @returns Configured date picker component
 */
export const GenericDrawingDate = forwardRef<HTMLDivElement, GenericDrawingDateProps>(
    ({
        size = 'small',
        format = "MM/dd/yyyy",
        name,
        label,
        value,
        onChange,
        disabled = false,
        error = false,
        sx,
        className,
        clearable = true,
        ...props
    }, ref) => {
        // Define styles based on size prop
        const getStyles = (): SxProps<Theme> => {
            const baseStyles: SxProps<Theme> = {
                width: '100%',
                ...sx,
            };

            if (size === 'tiny') {
                // Compact styles matching CADDrawings DatePicker
                return {
                    ...baseStyles,
                    '& .MuiInputBase-root': {
                        height: '29.5px !important',
                        paddingTop: '3px !important',
                        paddingBottom: '4px !important',
                        ...(error && {
                            border: '1.5px solid red',
                            borderRadius: '4px',
                        })
                    },
                    '& .MuiInputBase-input': {
                        fontSize: '12px!important',
                        marginTop: '5px !important',
                        padding: '6px 8px 6px 12px',
                    },
                    '& .MuiFormLabel-root': {
                        fontSize: '12px!important',
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                        fontSize: '12px!important',
                    },
                };
            } else {
                // Small size - standard styling matching GenericTextField
                return {
                    ...baseStyles,
                    '& .MuiTextField-root': {
                        width: '100%',
                    },
                };
            }
        };

        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    ref={ref}
                    format={format}
                    name={name}
                    label={label}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={className}
                    slotProps={{
                        field: { clearable },
                        textField: {
                            size: 'small', // Always use MUI's small size as base
                            variant: 'outlined',
                            sx: getStyles(),
                            error,
                            fullWidth: true,
                        },
                    }}
                    {...props}
                />
            </LocalizationProvider>
        );
    }
);

GenericDrawingDate.displayName = 'GenericDrawingDate';

export default GenericDrawingDate;