/**
 * Right Dialog Content Component
 * Right column content for note detail dialog
 * Contains actions, metadata, and additional information
 */

import React from 'react';
import { 
    Box, 
    Typography,
    Divider,
    Chip,
    Button,
    Stack,
    Card,
    CardContent
} from '@mui/material';
import { useNoteUI } from '../../../store/NoteUIContext';

/**
 * Right Dialog Content
 * Actions and metadata panel
 */
export function RightDialogContent() {
    const { selectedNote } = useNoteUI();

    const isNewNote = selectedNote?.noteId === 0;

    return (
        <Box sx={{ padding: '16px', height: '100%', overflowY: 'auto' }}>
            {/* Status Section */}
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Status
                    </Typography>
                    <Chip 
                        label={selectedNote?.isArchived ? 'Archived' : 'Active'} 
                        color={selectedNote?.isArchived ? 'default' : 'success'}
                        size="small"
                    />
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Actions
                    </Typography>
                    <Stack spacing={1}>
                        {!isNewNote && (
                            <>
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    fullWidth
                                    onClick={() => console.log('Duplicate note')}
                                >
                                    Duplicate
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    fullWidth
                                    color="warning"
                                    onClick={() => console.log('Archive note')}
                                >
                                    {selectedNote?.isArchived ? 'Unarchive' : 'Archive'}
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    fullWidth
                                    color="error"
                                    onClick={() => console.log('Delete note')}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            {/* Metadata Section */}
            {!isNewNote && (
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Information
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Created
                            </Typography>
                            <Typography variant="body2">
                                {selectedNote?.createdAt ? 
                                    new Date(selectedNote.createdAt).toLocaleString() : 
                                    'Unknown'
                                }
                            </Typography>
                        </Box>

                        {selectedNote?.updatedAt && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Last Modified
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(selectedNote.updatedAt).toLocaleString()}
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Created By
                            </Typography>
                            <Typography variant="body2">
                                {selectedNote?.createdBy || 'Current User'}
                            </Typography>
                        </Box>

                        {selectedNote?.type && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Type
                                </Typography>
                                <Chip 
                                    label={selectedNote.type.charAt(0).toUpperCase() + selectedNote.type.slice(1)} 
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                            </Box>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Additional Info for New Notes */}
            {isNewNote && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            New Note
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Fill in the details on the left and add your content in the center column.
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}