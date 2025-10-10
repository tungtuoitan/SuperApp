import React from 'react';
import { 
    Autocomplete, 
    TextField, 
    Stack,
    AutocompleteRenderOptionState
} from '@mui/material';
import { HTMLAttributes } from 'react';
import { IAutoCompleteOptions } from './GenericAutoComplete';
import { AutoCompleteOption } from './AutoCompleteOption';

export interface TagAutoCompleteProps {
    /** Array of available tag options */
    options: IAutoCompleteOptions[];
    /** Currently selected tags as comma-separated string */
    value?: string | null;
    /** Callback when tags change - receives comma-separated string of IDs */
    onChange: (tagsString: string) => void;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Label for the input field */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Additional styling */
    sx?: any;
    /** Size of the component */
    size?: 'small' | 'medium';
    /** Test ID for testing purposes */
    'data-testid'?: string;
}

/**
 * Reusable multi-select autocomplete component for tags
 * 
 * @example
 * ```tsx
 * <TagAutoComplete
 *   options={tagsOptions}
 *   value={currentTags}
 *   onChange={(newTags) => setTags(newTags)}
 *   label="Tags"
 *   placeholder="+ Add Tag"
 *   disabled={!isEdit}
 * />
 * ```
 */
export function TagAutoComplete({
    options,
    value,
    onChange,
    disabled = false,
    label = 'Tags',
    placeholder = '+ Add Tag',
    sx = { marginTop: '15px' },
    size = 'small',
    'data-testid': testId,
}: TagAutoCompleteProps) {
    
    // Convert comma-separated string to array of selected options
    const selectedOptions = value 
        ? options.filter(option => value.includes(String(option.id)))
        : [];

    // Filter out already selected options from available options
    const availableOptions = value 
        ? options.filter(option => !value.includes(String(option.id)))
        : options;

    // Render custom option with disabled state support
    const renderOption = (
        props: HTMLAttributes<HTMLLIElement>, 
        option: IAutoCompleteOptions, 
        state: AutocompleteRenderOptionState
    ) => {
        if (option.isActive === false) {
            props['aria-disabled'] = true;
        }
        return <AutoCompleteOption {...props as any}>{option.label || option.desc}</AutoCompleteOption>;
    };

    // Handle selection change
    const handleChange = (
        event: React.SyntheticEvent,
        newValue: IAutoCompleteOptions[] | null
    ) => {
        if (newValue === null) {
            onChange('');
        } else {
            const idsString = newValue.map((option) => option.id).join(',');
            onChange(idsString);
        }
    };

    return (
        <Stack>
            <Autocomplete
                multiple
                disabled={disabled}
                size={size}
                sx={sx}
                options={availableOptions}
                value={selectedOptions}
                onChange={handleChange}
                renderOption={renderOption}
                getOptionLabel={(option) => option.label || option.desc || ''}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label={label} 
                        placeholder={placeholder}
                        data-testid={testId}
                    />
                )}
                data-testid={testId ? `${testId}-autocomplete` : undefined}
            />
        </Stack>
    );
}

export default TagAutoComplete;