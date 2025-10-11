/**
 * Note Detail Dialog Component
 * Main dialog container for note details with fullscreen layout
 * Uses shared components following SuperApp architecture guidelines
 */

import React from 'react';
import { 
    Typography,
    Box,
    Grid2,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNoteUI } from '../../store/NoteUIContext';
import { NoteContentToolbar } from './NoteContentToolbar';
import { NOTE_TYPES } from '../../types/note.types';
import type { Note } from '../../types/note.types';
import { 
    DialogContainer,
    GenericTextField,
    Button,
    Spinner,
    GenericTagAutoComplete,
    type IAutoCompleteOptions
} from '@/shared/components/ui';
import { ErrorBoundary } from '@/shared/components/feedback';

// Mock data for tags - this would come from API in real implementation
const MOCK_TAG_OPTIONS: IAutoCompleteOptions[] = [
    { id: 1, label: 'Important', desc: 'Important', isActive: true },
    { id: 2, label: 'Work', desc: 'Work', isActive: true },
    { id: 3, label: 'Personal', desc: 'Personal', isActive: true },
    { id: 4, label: 'Project', desc: 'Project', isActive: true },
    { id: 5, label: 'Meeting', desc: 'Meeting', isActive: true },
];

/**
 * Note Detail Dialog - Fullscreen dialog for note management
 * Uses shared DialogContainer component following architecture guidelines
 */
export function NoteDetailDialog() {
    const { selectedNote, isDialogOpen, closeDialog } = useNoteUI();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = React.useState(false);

    // Handlers for form interactions
    const handleFieldChange = (field: keyof Note, value: any) => {
        // TODO: Implement field change logic with proper state management
        console.log(`Field ${field} changed to:`, value);
    };

    const handleTagsChange = (tagsString: string) => {
        // Convert comma-separated string back to array for display
        const tagIds = tagsString ? tagsString.split(',').map(id => parseInt(id, 10)) : [];
        const tagLabels = MOCK_TAG_OPTIONS
            .filter(option => tagIds.includes(Number(option.id)))
            .map(option => option.label);
        
        handleFieldChange('tags', tagLabels);
    };

    const handleDuplicate = () => {
        // TODO: Implement duplicate logic
        console.log('Duplicating note');
    };

    const handleArchive = () => {
        // TODO: Implement archive logic
        console.log('Toggling archive status');
    };

    const handleDelete = () => {
        // TODO: Implement delete logic
        console.log('Deleting note');
    };

    if (!selectedNote) {
        return null;
    }

    const isCreateMode = selectedNote.noteId === 0;

    // Convert current tags to comma-separated string for TagAutoComplete
    const currentTagsString = selectedNote.tags 
        ? MOCK_TAG_OPTIONS
            .filter(option => selectedNote.tags?.includes(option.label || ''))
            .map(option => option.id)
            .join(',')
        : '';

    // Custom toolbar content with NoteContentToolbar
    const toolbarContent = <NoteContentToolbar />;

    return (
        <ErrorBoundary>
            <DialogContainer
                open={isDialogOpen}
                onClose={closeDialog}
                title={isCreateMode ? 'Create New Note' : selectedNote.name || 'Untitled Note'}
                fullScreen={true}
                toolbarContent={toolbarContent}
                dialogContentProps={{
                    style: { 
                        padding: 8,
                        background: '#f6f6f6',
                        overflow: 'auto'
                    },
                    children: (
                        <>
                            {/* Loading Spinner */}
                            {loading && (
                                <Box
                                    sx={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 9999,
                                    }}
                                >
                                    <Spinner />
                                </Box>
                            )}

                            {/* Dialog Content */}
                            <Grid2 container spacing={1} sx={{ height: '100%' }}>
                                {/* Left Column - Form Fields */}
                                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Box sx={{ 
                                        height: 'calc(100vh - 160px)', 
                                        background: '#fff', 
                                        padding: '12px 24px 0 24px', 
                                        overflowY: 'auto',
                                        borderRadius: 1
                                    }}>
                                        <Box sx={{ padding: '16px 0' }}>
                                            <Typography variant="h6" sx={{ mb: '16px', fontWeight: 600 }}>
                                                Note Details
                                            </Typography>
                                            
                                            {/* Note Name */}
                                            <GenericTextField
                                                fullWidth
                                                label="Note Name"
                                                value={selectedNote?.name || ''}
                                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                                sx={{ mb: '16px' }}
                                            />

                                            {/* Note Type */}
                                            <FormControl fullWidth sx={{ mb: '16px' }}>
                                                <InputLabel>Type</InputLabel>
                                                <Select
                                                    value={selectedNote?.type || ''}
                                                    label="Type"
                                                    onChange={(e) => handleFieldChange('type', e.target.value)}
                                                    size="small"
                                                >
                                                    {NOTE_TYPES.map((type) => (
                                                        <MenuItem key={type} value={type}>
                                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            {/* Tags using GenericTagAutoComplete */}
                                            <GenericTagAutoComplete
                                                options={MOCK_TAG_OPTIONS}
                                                value={currentTagsString}
                                                onChange={handleTagsChange}
                                                label="Tags"
                                                placeholder="+ Add Tag"
                                                sx={{ mb: '16px' }}
                                                data-testid="note-tags"
                                            />

                                            {/* Created/Updated Info */}
                                            <Box sx={{ mt: '24px', pt: '16px', borderTop: '1px solid #e0e0e0' }}>
                                                <Typography variant="subtitle2" sx={{ mb: '8px' }}>
                                                    Information
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: '4px' }}>
                                                    Created: {selectedNote?.createdAt ? selectedNote.createdAt.toLocaleDateString() : 'N/A'}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: '4px' }}>
                                                    Updated: {selectedNote?.updatedAt ? selectedNote.updatedAt.toLocaleDateString() : 'N/A'}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Created by: {selectedNote?.createdBy || 'Unknown'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid2>

                                {/* Center Column - Content */}
                                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Box sx={{ 
                                        height: 'calc(100vh - 160px)', 
                                        background: '#fff', 
                                        padding: '12px 24px 0 24px', 
                                        overflowY: 'auto',
                                        borderRadius: 1
                                    }}>
                                        <Box sx={{ padding: '16px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="h6" sx={{ mb: '16px', fontWeight: 600 }}>
                                                Content
                                            </Typography>
                                            
                                            <GenericTextField
                                                fullWidth
                                                multiline
                                                rows={25}
                                                label="Description"
                                                value={selectedNote?.description || ''}
                                                onChange={(e) => handleFieldChange('description', e.target.value)}
                                                sx={{ 
                                                    flex: 1,
                                                    '& .MuiInputBase-root': {
                                                        height: '100%',
                                                        alignItems: 'flex-start'
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        height: '100% !important',
                                                        overflow: 'auto !important'
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Grid2>

                                {/* Right Column - Actions & Metadata */}
                                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Box sx={{ 
                                        height: 'calc(100vh - 170px)', 
                                        background: '#fff', 
                                        padding: '12px 16px 0 16px',
                                        borderRadius: 1
                                    }}>
                                        <Box sx={{ padding: '16px 0' }}>
                                            <Typography variant="h6" sx={{ mb: '16px', fontWeight: 600 }}>
                                                Actions
                                            </Typography>
                                            
                                            {/* Quick Actions using shared Button component */}
                                            <Box sx={{ mb: '24px' }}>
                                                <Button
                                                    fullWidth
                                                    variant="secondary"
                                                    onClick={handleDuplicate}
                                                    sx={{ mb: '8px' }}
                                                >
                                                    <ContentCopyIcon sx={{ mr: 1 }} />
                                                    Duplicate Note
                                                </Button>
                                                
                                                <Button
                                                    fullWidth
                                                    variant="secondary"
                                                    onClick={handleArchive}
                                                    sx={{ mb: '8px' }}
                                                >
                                                    {selectedNote?.isArchived ? (
                                                        <UnarchiveIcon sx={{ mr: 1 }} />
                                                    ) : (
                                                        <ArchiveIcon sx={{ mr: 1 }} />
                                                    )}
                                                    {selectedNote?.isArchived ? 'Unarchive' : 'Archive'}
                                                </Button>
                                                
                                                <Button
                                                    fullWidth
                                                    variant="danger"
                                                    onClick={handleDelete}
                                                >
                                                    <DeleteIcon sx={{ mr: 1 }} />
                                                    Delete Note
                                                </Button>
                                            </Box>

                                            {/* Status */}
                                            <Box sx={{ mb: '24px' }}>
                                                <Typography variant="subtitle2" sx={{ mb: '8px' }}>
                                                    Status
                                                </Typography>
                                                <Chip
                                                    label={selectedNote?.isArchived ? 'Archived' : 'Active'}
                                                    color={selectedNote?.isArchived ? 'default' : 'success'}
                                                    size="small"
                                                />
                                            </Box>

                                            {/* Metadata */}
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: '8px' }}>
                                                    Metadata
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            ID:
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            #{selectedNote?.noteId || 'N/A'}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Type:
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {selectedNote?.type ? selectedNote.type.charAt(0).toUpperCase() + selectedNote.type.slice(1) : 'None'}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Tags:
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {selectedNote?.tags?.length || 0}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </>
                    )
                }}
            />
        </ErrorBoundary>
    );
}