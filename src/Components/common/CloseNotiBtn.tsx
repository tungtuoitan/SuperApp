import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SnackbarKey } from 'notistack';

export interface CloseNotiBtnProps {
    /** Snackbar key from notistack */
    snackbarKey: SnackbarKey;
    /** Close snackbar function */
    closeSnackbar: (key: SnackbarKey) => void;
}

/**
 * Custom close button for notistack snackbars
 * 
 * @example
 * ```tsx
 * <SnackbarProvider 
 *   action={(key) => (
 *     <CloseNotiBtn snackbarKey={key} closeSnackbar={closeSnackbar} />
 *   )}
 * >
 * ```
 */
export function CloseNotiBtn({ snackbarKey, closeSnackbar }: CloseNotiBtnProps) {
    return (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(snackbarKey)}
        >
            <Close fontSize="small" />
        </IconButton>
    );
}

export default CloseNotiBtn;