import { useState } from 'react';

/**
 * Return type for the useDialog hook
 * @template T - Type of data associated with the dialog
 */
interface UseDialogReturn<T = any> {
    /** Whether the dialog is currently open */
    open: boolean;
    /** Data associated with the dialog, null if no data */
    data: T | null;
    /** Function to open the dialog, optionally with data */
    openDialog: (data?: T) => void;
    /** Function to close the dialog */
    closeDialog: () => void;
    /** Function to set dialog data without opening/closing */
    setData: (data: T | null) => void;
}

/**
 * Reusable hook for managing dialog state and associated data.
 * 
 * This hook provides a consistent pattern for managing modal dialogs, popups,
 * and other overlay components throughout the application. It handles both
 * the open/closed state and any data that should be passed to the dialog.
 * 
 * @template T - The type of data that will be associated with the dialog
 * @param initialData - Optional initial data for the dialog
 * @returns Object containing dialog state and control functions
 * 
 * @example
 * ```typescript
 * // Basic usage without data
 * const confirmDialog = useDialog();
 * 
 * // Usage with typed data
 * const editUserDialog = useDialog<User>();
 * 
 * // Opening dialog with data
 * const handleEditUser = (user: User) => {
 *   editUserDialog.openDialog(user);
 * };
 * 
 * // In JSX
 * <Dialog open={editUserDialog.open} onClose={editUserDialog.closeDialog}>
 *   {editUserDialog.data && (
 *     <UserEditForm user={editUserDialog.data} />
 *   )}
 * </Dialog>
 * ```
 */
export function useDialog<T = any>(initialData: T | null = null): UseDialogReturn<T> {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(initialData);

    /**
     * Open the dialog, optionally with associated data.
     * If data is provided, it will be set as the dialog's data.
     * 
     * @param dialogData - Optional data to associate with the dialog
     */
    const openDialog = (dialogData?: T) => {
        if (dialogData !== undefined) {
            setData(dialogData);
        }
        setOpen(true);
    };

    /**
     * Close the dialog.
     * Note: This does not clear the dialog data - use setData(null) if needed.
     */
    const closeDialog = () => {
        setOpen(false);
    };

    return {
        open,
        data,
        openDialog,
        closeDialog,
        setData,
    };
}
