/**
 * Example: Delete Confirmation for List Items
 * Demonstrates how to use the shared ConfirmationPopover in different contexts
 */

import React from 'react';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmationPopover } from '@/shared/components/feedback/ConfirmationPopover';
import { useConfirmationPopover } from '@/shared/hooks/useConfirmationPopover';

// Example 1: Delete button in a list item
export function DeleteItemButton({ itemId, itemName, onDelete }: {
    itemId: number;
    itemName: string;
    onDelete: (id: number) => void;
}) {
    const deleteConfirmation = useConfirmationPopover({
        confirmText: 'Delete',
        confirmColor: 'error',
        buttonVariant: 'text'
    });

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        deleteConfirmation.show({
            event,
            message: `Do you want to delete "${itemName}"?`,
            onConfirm: () => onDelete(itemId)
        });
    };

    return (
        <>
            <IconButton 
                onClick={handleDeleteClick}
                color="error"
                size="small"
            >
                <DeleteIcon />
            </IconButton>
            <ConfirmationPopover {...deleteConfirmation.getPopoverProps()} />
        </>
    );
}

// Example 2: Bulk delete action
export function BulkDeleteButton({ selectedIds, onBulkDelete }: {
    selectedIds: number[];
    onBulkDelete: (ids: number[]) => void;
}) {
    const bulkDeleteConfirmation = useConfirmationPopover({
        confirmText: 'Delete All',
        confirmColor: 'error',
        buttonVariant: 'contained'
    });

    const handleBulkDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        bulkDeleteConfirmation.show({
            event,
            message: `Do you want to delete ${selectedIds.length} selected items?`,
            onConfirm: () => onBulkDelete(selectedIds)
        });
    };

    return (
        <>
            <Button 
                onClick={handleBulkDelete}
                variant="outlined"
                color="error"
                disabled={selectedIds.length === 0}
            >
                Delete Selected ({selectedIds.length})
            </Button>
            <ConfirmationPopover {...bulkDeleteConfirmation.getPopoverProps()} />
        </>
    );
}

// Example 3: Logout confirmation
export function LogoutButton({ onLogout }: { onLogout: () => void }) {
    const logoutConfirmation = useConfirmationPopover({
        confirmText: 'Logout',
        confirmColor: 'primary',
        buttonVariant: 'contained'
    });

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        logoutConfirmation.show({
            event,
            message: 'Are you sure you want to logout?',
            onConfirm: onLogout
        });
    };

    return (
        <>
            <Button onClick={handleLogout} variant="outlined">
                Logout
            </Button>
            <ConfirmationPopover {...logoutConfirmation.getPopoverProps()} />
        </>
    );
}

// Example 4: Reset form confirmation
export function ResetFormButton({ onReset, hasChanges }: {
    onReset: () => void;
    hasChanges: boolean;
}) {
    const resetConfirmation = useConfirmationPopover({
        confirmText: 'Reset',
        confirmColor: 'warning',
        buttonVariant: 'text'
    });

    const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!hasChanges) {
            onReset();
            return;
        }

        resetConfirmation.show({
            event,
            message: 'You have unsaved changes. Are you sure you want to reset the form?',
            onConfirm: onReset
        });
    };

    return (
        <>
            <Button 
                onClick={handleReset}
                variant="outlined"
                color="warning"
            >
                Reset Form
            </Button>
            <ConfirmationPopover {...resetConfirmation.getPopoverProps()} />
        </>
    );
}