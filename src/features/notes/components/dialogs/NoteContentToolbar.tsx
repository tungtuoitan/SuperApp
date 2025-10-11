/**
 * Note Content Toolbar Component
 * Toolbar for note dialog actions
 * Replicates RFD toolbar structure but follows SuperApp architecture guidelines
 */

import React, { useState } from 'react';
import { 
    AppBar, 
    IconButton, 
    styled, 
    Toolbar, 
    Tooltip, 
    Typography,
    Box 
} from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LinkIcon from '@mui/icons-material/Link';
import { useNoteUI } from '../../store/NoteUIContext';
import { useAuthStore } from '../../../../contexts/AuthContext';

// Grow spacer component
const Grow = styled('div')({
    flexGrow: 1,
});

// Styled wrapper for tooltips
export const TooltipContainer = styled('div')({
    display: 'inline-flex', 
    '& .hide': {
        display: 'none',
    }
});

// Main toolbar panel wrapper matching RFD structure
export const ToolbarPanelWrapper = styled(Toolbar)({
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.6)!important',
    paddingLeft: '24px!important',
    paddingRight: '20px!important',
    height: '61px',
    maxHeight: '61px !important',
    minHeight: '61px !important',

    '& .MuiBox-root ': {
        maxHeight: '61px !important',

        '& .MuiPaper-root': {
            height: '61px !important',

            ' & .MuiToolbar-root': {
                minHeight: '61px !important',
            }
        }
    },
    '& .MuiPaper-elevation4': {
        boxShadow: 'none',
    }
});

/**
 * Note Content Toolbar
 * Contains action buttons for note operations
 * Matches RFD toolbar structure and styling
 */
export function NoteContentToolbar() {
    const { selectedNote, closeDialog } = useNoteUI();
    const { isAuthenticated } = useAuthStore();
    const [isEdit, setIsEdit] = useState(false);
    const [inProgressSaving, setInProgressSaving] = useState(false);

    const handleSave = async () => {
        if (!selectedNote) return;
        
        setInProgressSaving(true);
        try {
            // TODO: Implement save functionality
            console.log('Save note:', selectedNote);
            setIsEdit(false);
        } catch (error) {
            console.error('Error saving note:', error);
        } finally {
            setInProgressSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        closeDialog();
    };

    const handleDelete = async () => {
        if (!selectedNote || selectedNote.noteId === 0) return;
        
        try {
            // TODO: Implement delete functionality
            console.log('Delete note:', selectedNote);
            closeDialog();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const copyNoteLink = () => {
        if (!selectedNote || selectedNote.noteId === 0) return;
        
        const baseUrl = window.location.href;
        const noteLink = `${baseUrl}/note/${selectedNote.noteId}`;
        
        navigator.clipboard.writeText(noteLink).then(() => {
            // TODO: Add snackbar notification
            console.log('Note link copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy link:', err);
        });
    };

    const isNewNote = selectedNote?.noteId === 0;
    const hasChanges = isEdit; // TODO: Implement actual change detection

    // Render save/cancel/delete buttons
    const renderSaveCancel = () => {
        return (
            <TooltipContainer>
                <div style={{ display: 'inline-flex' }}>
                    <div id="saving-cancel-note">
                        {hasChanges && (
                            <>
                                <Tooltip title="Save">
                                    <span>
                                        <IconButton
                                            onClick={handleSave}
                                            disabled={inProgressSaving}
                                        >
                                            <CheckOutlinedIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Cancel">
                                    <span>
                                        <IconButton onClick={handleCancel}>
                                            <CloseOutlinedIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </>
                        )}
                        {!isEdit && !isNewNote && (
                            <Tooltip title="Delete Note">
                                <span>
                                    <IconButton onClick={handleDelete}>
                                        <DeleteForeverOutlinedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </TooltipContainer>
        );
    };

    return (
        <AppBar
            style={{ zIndex: 'auto', backgroundColor: '#fff' }}
            position="static"
            elevation={2}
            variant="elevation"
        >
            <ToolbarPanelWrapper>
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    flexDirection: 'column', 
                    marginTop: 6 
                }}>
                    <Typography 
                        variant="h6" 
                        className="MuiTypography-root MuiTypography-h6"
                        style={{ 
                            display: 'flex', 
                            color: '#000000',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '20px',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            letterSpacing: '0.0075em'
                        }}
                    >
                        {`NOTE ID: ${selectedNote?.noteId || '0'}`}
                        {selectedNote && selectedNote.noteId !== 0 && (
                            <div style={{ display: 'flex' }}>
                                <IconButton 
                                    style={{ padding: '0 16px' }}
                                    onClick={copyNoteLink}
                                >
                                    <LinkIcon />
                                </IconButton>
                            </div>
                        )}
                    </Typography>
                </div>
                <Grow />
                {isAuthenticated && !inProgressSaving && renderSaveCancel()}
            </ToolbarPanelWrapper>
        </AppBar>
    );
}