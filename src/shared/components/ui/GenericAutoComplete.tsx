import { CSSProperties, useEffect, useState } from 'react';
import { 
    Autocomplete, 
    AutocompleteClasses, 
    Box,
    styled, 
    SxProps, 
    TextField, 
    Theme 
} from '@mui/material';

/**
 * Styled TextField component for autocomplete inputs.
 * Provides consistent styling for text input fields.
 */
export const StyledTextfield = styled(TextField)({
    margin: 0,
});

/**
 * Utility function to check if a value is empty.
 * 
 * @param value - Value to check for emptiness
 * @returns True if value is empty, false otherwise
 */
export function isEmpty(value: unknown): boolean {
    const type = typeof value;
    if ((value !== null && type === 'object') || type === 'function') {
        const properties = Object.keys(value as object);
        if (properties.length === 0) {
            return true;
        }
    }
    return !value;
}

/**
 * Interface for autocomplete option items.
 * Defines the structure for selectable options in the autocomplete component.
 */
export interface IAutoCompleteOptions {
    /** Unique identifier for the option (can be number or string) */
    id: number | string;
    /** Code or key for the option */
    code?: string;
    /** Display description for the option */
    desc?: string;
    /** Display label for the option (alternative to desc) */
    label?: string;
    /** Whether the option is active/enabled */
    active?: boolean;
    /** Alternative property name for active state */
    isActive?: boolean;
    /** Optional type categorization */
    type?: string;
    /** Extended description for the option */
    longDesc?: string;
    /** Hierarchical level for nested options */
    level?: number;
}
/**
 * Props interface for the GenericAutoComplete component.
 */
export interface GenericAutoCompleteProps {
    /** Optional unique identifier for the component */
    id?: string;
    /** Whether multiple selections are allowed */
    multiple?: boolean;
    /** Whether the component should be hidden */
    hidden?: boolean;
    /** Size variant for the component (default: 'small') */
    size?: 'small' | 'tiny';
    /** CSS classes for styling customization */
    classes?: Partial<AutocompleteClasses>;
    /** Currently selected value */
    value: IAutoCompleteOptions | null | undefined;
    /** MUI sx prop for styling */
    sx?: SxProps<Theme>;
    /** Input field properties */
    inputProps: {
        /** Input field name */
        name: string;
        /** Input field label */
        label: string;
        /** Whether the field is required */
        required?: boolean;
        /** Whether the field has an error state */
        error?: boolean;
        /** MUI sx prop for input styling */
        sx?: SxProps<Theme>;
    };
    /** Props for rendering option items */
    renderOptionProps?: {
        /** MUI sx prop for option styling */
        sx?: SxProps<Theme>;
    };
    /** Array of all available options */
    allOptions: IAutoCompleteOptions[];
    /** Callback function when selection changes */
    onChange?: (event: React.SyntheticEvent, newValue: IAutoCompleteOptions | null) => void;
    /** Optional inline styles */
    style?: CSSProperties;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Whether the clear button is disabled */
    disableClearable?: boolean;
    /** Function to determine if an option should be disabled */
    getOptionDisabled?: (option: IAutoCompleteOptions) => boolean;
}

/**
 * Generic autocomplete component for consistent option selection.
 * 
 * This component provides a reusable autocomplete interface with:
 * - Configurable option data structure
 * - Support for single selection
 * - Two size variants: 'small' (default) and 'tiny'
 * - Customizable styling and behavior
 * - Built-in error states and validation
 * - Accessible design with proper ARIA attributes
 * 
 * Size variants:
 * - 'small': Standard size similar to TagAutoComplete (default)
 * - 'tiny': Compact size with 12px font for dense layouts
 * 
 * The component automatically handles option filtering and selection
 * state management based on the provided options and value.
 * 
 * @param props - Component props for autocomplete configuration
 * @returns Configured autocomplete component
 */
export function GenericAutoComplete(props: GenericAutoCompleteProps) {
    const { id, allOptions, size = 'small', classes, onChange, inputProps, value, sx, style, disabled, renderOptionProps, disableClearable, hidden, getOptionDisabled } = props;
    const [selectedValue, setSelectedValue] = useState<IAutoCompleteOptions>({} as IAutoCompleteOptions);

    useEffect(() => {
        if (!isEmpty(value) && !isEmpty(allOptions)) {
            var _filteredOption = allOptions.filter(x => x.id === value?.id);
            if (value?.id === 0) {
                setSelectedValue({} as IAutoCompleteOptions);
            }
            if (_filteredOption.length > 0) {
                setSelectedValue(_filteredOption[0]);
            }
        }
    }, [value, allOptions]);
    // Define styles based on size prop, similar to GenericTextField
    const getStyles = () => {
        const baseStyles = {
            '& .MuiOutlinedInput-root': {
                borderRadius: '4px !important',
            },
            '& .MuiSvgIcon-root': {
                color: '#9e9e9e', // Default gray color for dropdown arrow
            },
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
                    borderRadius: '4px',
                },
                '& .MuiAutocomplete-option': {
                    fontSize: '12px!important',
                },
            };
        } else {
            // Small size - standard styling (matches TagAutoComplete)
            return {
                ...baseStyles,
            };
        }
    };

    return (
        <Autocomplete
            id={id}
            disabled={disabled}
            options={allOptions}
            disableClearable={disableClearable}
            size="small"
            fullWidth={true}
            classes={classes}
            value={selectedValue}
            hidden={hidden}
            style={style}
            sx={getStyles()}
            getOptionDisabled={getOptionDisabled}
            getOptionLabel={(option) => option?.label || option?.desc || " "}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            onChange={(event: React.SyntheticEvent, newValue: IAutoCompleteOptions | null) => {
                if (onChange) {
                    if (newValue) {
                        setSelectedValue(newValue);
                    }
                    return onChange(event, newValue);
                }
            }}
            renderOption={(props, option) => {
                if ((typeof (option.active) !== 'undefined' && option.active === false) || 
                    (typeof (option.isActive) !== 'undefined' && option.isActive === false)) {
                    props['aria-disabled'] = true;
                }
                
                // Apply font size based on size prop for options
                const optionStyles = size === 'tiny' ? { fontSize: '12px' } : {};
                const mergedRenderOptionProps = {
                    ...renderOptionProps,
                    sx: {
                        ...optionStyles,
                        ...renderOptionProps?.sx,
                    }
                };
                
                return <Box component="li" {...props} {...mergedRenderOptionProps} >
                    <span style={{ marginRight: '20px' }}>{option?.label || option?.desc}</span>{option.longDesc}
                </Box>
            }}
            renderInput={(params) => (
                <StyledTextfield
                    {...params}
                    name={inputProps.name}
                    label={inputProps.label}
                    required={inputProps.required ?? false}
                    error={inputProps.error ?? false}
                    sx={inputProps.sx}
                    inputProps={{
                        ...params.inputProps,
                    }}
                    fullWidth />
            )}
        />
    )
}