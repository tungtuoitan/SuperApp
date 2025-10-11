/**
 * Note Delete Selected Component
 * Toolbar button to delete selected notes with confirmation popover
 */

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNoteUI } from '@/features/notes/store/NoteUIContext';
import { useDeleteNotes } from '@/features/notes/hooks/useNotes';
import { useSnackbar } from 'notistack';
import { ConfirmationPopover } from '@/shared/components/feedback/ConfirmationPopover';
import { useConfirmationPopover } from '@/shared/hooks/useConfirmationPopover';

/**
 * Delete selected notes button
 * Only visible when notes are selected
 * Uses confirmation popover before deletion
 */
export function NoteDeleteSelected() {
    const { selectedRowIds, setSelectedRowIds } = useNoteUI();
    const deleteNotes = useDeleteNotes();
    const { enqueueSnackbar } = useSnackbar();

    // Confirmation popover hook
    const deleteConfirmation = useConfirmationPopover({
        confirmText: 'Ok',
        cancelText: 'Cancel',
        confirmColor: 'primary',
        buttonVariant: 'text'
    });

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedRowIds.length === 0) {
            return;
        }

        // Stop event propagation
        event.stopPropagation();
        event.preventDefault();

        // Show confirmation popover
        deleteConfirmation.show({
            event,
            message: `Do you want to delete ${selectedRowIds.length} selected note${selectedRowIds.length > 1 ? 's' : ''}?`,
            onConfirm: async () => {
                try {
                    await deleteNotes.mutateAsync(selectedRowIds);

                    enqueueSnackbar(
                        `${selectedRowIds.length} note${selectedRowIds.length > 1 ? 's' : ''} deleted successfully`,
                        {
                            variant: 'success',
                            autoHideDuration: 3000
                        }
                    );

                    // Clear selection after successful deletion
                    setSelectedRowIds([]);
                } catch (error) {
                    console.error('Error deleting notes:', error);
                    enqueueSnackbar('Failed to delete notes', {
                        variant: 'error',
                        autoHideDuration: 5000
                    });
                }
            }
        });
    };

    // Only show when notes are selected
    if (selectedRowIds.length === 0) {
        return null;
    }

    return (
        <>
            <Tooltip
                title={`Delete ${selectedRowIds.length} selected note${selectedRowIds.length > 1 ? 's' : ''}`}
                disableInteractive
                slotProps={{
                    tooltip: {
                        sx: {
                            fontSize: '10px',
                            borderRadius: '2px'
                        }
                    }
                }}
            >
                <span>
                    <IconButton
                        onClick={handleDeleteClick}
                        disabled={deleteNotes.isPending}
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                        }}
                    >
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>

            {/* Confirmation Popover */}
            <ConfirmationPopover {...deleteConfirmation.getPopoverProps()} />
        </>
    );
}
