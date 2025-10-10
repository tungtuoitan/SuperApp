/**
 * Center Dialog Content Component
 * Center column content for note detail dialog
 * Contains main note content and description
 */

import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Typography
} from '@mui/material';
import { useNoteUI } from '../../../store/NoteUIContext';

/**
 * Center Dialog Content
 * Main content area for note editing
 */
export function CenterDialogContent() {
    const { selectedNote } = useNoteUI();
    const [content, setContent] = useState(selectedNote?.description || '');

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    return (
        <Box sx={{ padding: '16px 0', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Note Content
            </Typography>

            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={20}
                value={content}
                onChange={handleContentChange}
                placeholder="Enter your note content here..."
                sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                        height: 'calc(100vh - 280px)',
                        alignItems: 'flex-start',
                        '& textarea': {
                            height: '100% !important',
                            overflow: 'auto !important',
                        }
                    }
                }}
            />
        </Box>
    );
}