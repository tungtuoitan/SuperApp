/**
 * Note Detail Dialog Component
 * Main dialog container for note details with fullscreen layout
 * Replicates RFDDetailDialog UI structure but follows SuperApp architecture guidelines
 */

import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    AppBar,
    Toolbar,
    Box,
    Backdrop,
    CircularProgress,
    styled,
    Grid2,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNoteUI } from '../../store/NoteUIContext';
import { NoteContentToolbar } from './NoteContentToolbar';
import { NOTE_TYPES } from '../../types/note.types';
import type { Note, NoteType } from '../../types/note.types';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        margin: 0,
        maxWidth: 'none',
        maxHeight: 'none',
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
    },
    '& .MuiDialogContent-root': {
        padding: 0,
        overflowY: 'hidden',
        height: '100%',
        background: 'rgb(246, 246, 246)',
    },
}));

const NoteDetailWrapper = styled('div')({
    display: 'flex',
    flexFlow: 'column',
    margin: 0,
    padding: 8,
    flex: 1,
    height: '100%',
    background: '#f6f6f6',
    overflowY: 'auto',
    [`& .card-content`]: {
        margin: '10px 0',
        [`& .MuiPaper-root.MuiPaper-elevation`]: {
            marginBottom: 0,
        }
    }
});

/**
 * Note Detail Dialog - Fullscreen dialog for note management
 * Uses the same UI structure as RFDDetailDialog
 */
export function NoteDetailDialog() {
    const { selectedNote, isDialogOpen, closeDialog } = useNoteUI();
    const [loading, setLoading] = React.useState(false);

    // Handlers for form interactions
    const handleFieldChange = (field: keyof Note, value: any) => {
        // TODO: Implement field change logic
        console.log(`Field ${field} changed to:`, value);
    };

    const handleAddTag = (tag: string) => {
        if (tag.trim()) {
            // TODO: Implement add tag logic
            console.log('Adding tag:', tag);
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        // TODO: Implement remove tag logic
        console.log('Removing tag:', tagToRemove);
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

    return (
        <StyledDialog
            open={isDialogOpen}
            onClose={closeDialog}
            fullScreen
            disableEnforceFocus
        >
            {/* Dialog Header */}
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                maxHeight: '64px',
                zIndex: 1300,
                '& header.MuiPaper-root': {
                    height: '64px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
                    '& .MuiToolbar-root': {
                        backgroundColor: '#fff!important',
                        color: '#000',
                        minHeight: 64,
                    }
                }
            }}>
                <AppBar 
                    position="static" 
                    elevation={2}
                    sx={{ 
                        backgroundColor: '#fff',
                        color: '#000',
                        borderBottom: '1px solid #e0e0e0',
                        height: '64px',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px'
                    }}
                >
                    <Toolbar variant="dense" sx={{ minHeight: '64px !important' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" sx={{ lineHeight: 1 }}>
                                {isCreateMode ? 'Create New Note' : `${selectedNote.name || 'Untitled Note'}`}
                            </Typography>
                            {!isCreateMode && (
                                <Typography variant="caption" sx={{ fontSize: 11.5 }}>
                                    Created: {selectedNote.createdAt.toLocaleDateString()}
                                    {selectedNote.createdBy && ` • Created by: ${selectedNote.createdBy}`}
                                </Typography>
                            )}
                        </Box>
                        
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={closeDialog}
                            aria-label="close"
                            sx={{ color: '#000' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Toolbar Section */}
            <NoteContentToolbar />

            {/* Loading Backdrop */}
            <Backdrop 
                open={loading} 
                sx={{ 
                    color: '#fff', 
                    zIndex: 9999999 
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* Dialog Content */}
            <DialogContent className="note-dialog-content">
                {selectedNote && (
                    <NoteDetailWrapper>
                        <Grid2 container spacing={1}>
                            {/* Left Column - Form Fields */}
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                <div style={{ 
                                    height: 'calc(100vh - 160px)', 
                                    background: '#fff', 
                                    padding: '12px 24px 0 24px', 
                                    overflowY: 'auto'
                                }}>
                                    <Box sx={{ padding: '16px 0' }}>
                                        <Typography variant="h6" sx={{ mb: '16px', fontWeight: 600 }}>
                                            Note Details
                                        </Typography>
                                        
                                        {/* Note Name */}
                                        <TextField
                                            fullWidth
                                            label="Note Name"
                                            value={selectedNote?.name || ''}
                                            onChange={(e) => handleFieldChange('name', e.target.value)}
                                            sx={{ mb: '16px' }}
                                            variant="outlined"
                                        />

                                        {/* Note Type */}
                                        <FormControl fullWidth sx={{ mb: '16px' }}>
                                            <InputLabel>Type</InputLabel>
                                            <Select
                                                value={selectedNote?.type || ''}
                                                label="Type"
                                                onChange={(e) => handleFieldChange('type', e.target.value)}
                                            >
                                                {NOTE_TYPES.map((type) => (
                                                    <MenuItem key={type} value={type}>
                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        {/* Tags */}
                                        <Box sx={{ mb: '16px' }}>
                                            <Typography variant="subtitle2" sx={{ mb: '8px' }}>
                                                Tags
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', mb: '8px' }}>
                                                {selectedNote?.tags?.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        onDelete={() => handleRemoveTag(tag)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                            <TextField
                                                fullWidth
                                                placeholder="Add tag..."
                                                size="small"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddTag((e.target as HTMLInputElement).value)
                                                        ;(e.target as HTMLInputElement).value = ''
                                                    }
                                                }}
                                            />
                                        </Box>

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
                                </div>
                            </Grid2>

                            {/* Center Column - Content */}
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                <div style={{ 
                                    height: 'calc(100vh - 160px)', 
                                    background: '#fff', 
                                    padding: '12px 24px 0 24px', 
                                    overflowY: 'auto'
                                }}>
                                    <Box sx={{ padding: '16px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" sx={{ mb: '16px', fontWeight: 600 }}>
                                            Content
                                        </Typography>
                                        
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={25}
                                            label="Description"
                                            value={selectedNote?.description || ''}
                                            onChange={(e) => handleFieldChange('description', e.target.value)}
                                            variant="outlined"
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
                                </div>
                            </Grid2>

                            {/* Right Column - Actions & Metadata */}
                            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                <div style={{ 
                                    height: 'calc(100vh - 170px)', 
                                    background: '#fff', 
                                    padding: '12px 0 0 0' 
                                }}>
                                    <Box sx={{ padding: '16px' }}>
                                        <Typography variant="h6" sx={{ mb: '16px', fontWeight: 600 }}>
                                            Actions
                                        </Typography>
                                        
                                        {/* Quick Actions */}
                                        <Box sx={{ mb: '24px' }}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<ContentCopyIcon />}
                                                sx={{ mb: '8px' }}
                                                onClick={handleDuplicate}
                                            >
                                                Duplicate Note
                                            </Button>
                                            
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={selectedNote?.isArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
                                                sx={{ mb: '8px' }}
                                                onClick={handleArchive}
                                            >
                                                {selectedNote?.isArchived ? 'Unarchive' : 'Archive'}
                                            </Button>
                                            
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={handleDelete}
                                            >
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
                                </div>
                            </Grid2>
                        </Grid2>
                    </NoteDetailWrapper>
                )}
            </DialogContent>
        </StyledDialog>
    );
}