// Example usage of GenericTextField component

import { GenericTextField } from './GenericTextField';

// Example 1: Small size (default) - like LeftFormStyle Notes field
function NotesForm() {
    return (
        <GenericTextField
            label="Notes"
            name="notes"
            // size="small" is default
            multiline
            rows={4}
            placeholder="Enter your notes here..."
        />
    );
}

// Example 2: Tiny size - like RequestDetail request note field  
function RequestForm() {
    return (
        <GenericTextField
            label="Request Note"
            name="requestNote"
            size="tiny"
            placeholder="Enter request details..."
            style={{ marginTop: '16.5px' }}
        />
    );
}

// Example 3: With custom styling and error state
function CustomForm() {
    return (
        <GenericTextField
            label="Custom Field"
            name="customField"
            size="tiny"
            error
            helperText="This field is required"
            sx={{ 
                marginBottom: '16px',
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f5f5f5'
                }
            }}
        />
    );
}

export { NotesForm, RequestForm, CustomForm };