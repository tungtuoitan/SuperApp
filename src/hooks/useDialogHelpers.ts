/**
 * useDialogHelpers Hook
 * Helper functions for dialog operations including opening, closing, and managing dialog data.
 * Uses DialogStore for state management.
 */

import { useDialogStore } from '../store/dialog/DialogStore';

interface UseDialogHelpersReturn<T = any> {
    openDialog: (data?: T, dialogType?: string, title?: string, message?: string) => void;
    closeDialog: () => void;
    openConfirmation: (data?: any, title?: string, message?: string) => void;
    closeConfirmation: () => void;
    setDialogData: (data: T | null) => void;
    setDialogError: (error: string | null) => void;
    setDialogLoading: (loading: boolean) => void;
    pushDialog: (dialogId: string) => void;
    popDialog: () => void;
    clearDialogStack: () => void;
}

/**
 * Custom helper hook for dialog operations
 * NO PARAMETERS - Helper hooks should not accept any parameters
 * NO useEffect - Components handle dialog timing
 * NO side effects - Components handle business logic timing
 * ONLY function definitions - Return callable functions
 * USE store setters - Update centralized state
 * 
 * @returns Object containing dialog helper functions
 */
export function useDialogHelpers<T = any>(): UseDialogHelpersReturn<T> {
    // Get state setters from DialogStore (no state returned)
    const {
        setOpen,
        setData,
        setDialogType,
        setLoading,
        setError,
        setTitle,
        setMessage,
        setShowConfirmation,
        setConfirmationData,
        setDialogStack,
    } = useDialogStore();

    /**
     * Open a dialog with optional data, type, title, and message
     * @param data Optional data to associate with the dialog
     * @param dialogType Optional dialog type identifier
     * @param title Optional dialog title
     * @param message Optional dialog message
     */
    const openDialog = (data?: T, dialogType?: string, title?: string, message?: string): void => {
        if (data !== undefined) {
            setData(data);
        }
        if (dialogType) {
            setDialogType(dialogType);
        }
        if (title) {
            setTitle(title);
        }
        if (message) {
            setMessage(message);
        }
        
        // Clear any previous errors when opening dialog
        setError(null);
        setLoading(false);
        
        setOpen(true);
    };

    /**
     * Close the dialog and reset dialog state
     */
    const closeDialog = (): void => {
        setOpen(false);
        
        // Reset dialog state when closing
        setData(null);
        setDialogType('');
        setTitle('');
        setMessage('');
        setError(null);
        setLoading(false);
    };

    /**
     * Open a confirmation dialog
     * @param data Optional data to associate with the confirmation
     * @param title Optional confirmation title
     * @param message Optional confirmation message
     */
    const openConfirmation = (data?: any, title?: string, message?: string): void => {
        if (data !== undefined) {
            setConfirmationData(data);
        }
        if (title) {
            setTitle(title);
        }
        if (message) {
            setMessage(message);
        }
        
        setShowConfirmation(true);
    };

    /**
     * Close the confirmation dialog and reset confirmation state
     */
    const closeConfirmation = (): void => {
        setShowConfirmation(false);
        setConfirmationData(null);
        setTitle('');
        setMessage('');
    };

    /**
     * Set dialog data without opening/closing
     * @param data Data to set for the dialog
     */
    const setDialogData = (data: T | null): void => {
        setData(data);
    };

    /**
     * Set dialog error state
     * @param error Error message to display in dialog
     */
    const setDialogError = (error: string | null): void => {
        setError(error);
    };

    /**
     * Set dialog loading state
     * @param loading Loading state for dialog
     */
    const setDialogLoading = (loading: boolean): void => {
        setLoading(loading);
    };

    /**
     * Push a dialog ID to the dialog stack for multiple dialog support
     * @param dialogId Unique identifier for the dialog
     */
    const pushDialog = (dialogId: string): void => {
        setDialogStack(prev => [...prev, dialogId]);
    };

    /**
     * Pop the top dialog from the dialog stack
     */
    const popDialog = (): void => {
        setDialogStack(prev => prev.slice(0, -1));
    };

    /**
     * Clear all dialogs from the dialog stack
     */
    const clearDialogStack = (): void => {
        setDialogStack([]);
    };

    // NO useEffect - Components handle dialog timing

    return {
        openDialog,
        closeDialog,
        openConfirmation,
        closeConfirmation,
        setDialogData,
        setDialogError,
        setDialogLoading,
        pushDialog,
        popDialog,
        clearDialogStack,
    };
}