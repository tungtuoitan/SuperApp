/**
 * Left Dialog Content Component
 * Left column content for note detail dialog
 * Contains note form fields and basic information
 */

import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Typography, 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useNoteUI } from '../../../store/NoteUIContext';
const NOTE_TYPES = ['meeting', 'brainstorm', 'research', 'bug'] as const;

/**
 * Left Dialog Content
 * Form fields for note editing
 */
export function LeftDialogContent() {
    const { selectedNote } = useNoteUI();
    const [formData, setFormData] = useState({
        name: selectedNote?.name || '',
        description: selectedNote?.description || '',
        type: selectedNote?.type || 'meeting',
        tags: selectedNote?.tags || [],
    });

    const handleFieldChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Box sx={{ padding: '16px 0' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Note Details
            </Typography>

            {/* Note Name */}
            <TextField
                label="Note Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                sx={{ mb: 2 }}
                required
            />

            {/* Note Type */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                    value={formData.type}
                    onChange={(e) => handleFieldChange('type', e.target.value)}
                    label="Type"
                >
                    {NOTE_TYPES.map(type => (
                        <MenuItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Tags */}
            <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                value={formData.tags}
                onChange={(e) => handleFieldChange('tags', e.target.value)}
                sx={{ mb: 2 }}
                placeholder="Enter tags separated by commas"
                helperText="Separate multiple tags with commas"
            />

            {/* Creation Info */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                <Typography variant="body2" color="text.secondary">
                    Created: {selectedNote?.createdAt ? new Date(selectedNote.createdAt).toLocaleDateString() : 'New'}
                </Typography>
                {selectedNote?.updatedAt && (
                    <Typography variant="body2" color="text.secondary">
                        Updated: {new Date(selectedNote.updatedAt).toLocaleDateString()}
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    By: {selectedNote?.createdBy || 'Current User'}
                </Typography>
            </Box>
        </Box>
    );
}