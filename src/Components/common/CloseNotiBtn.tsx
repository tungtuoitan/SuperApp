import { SnackbarKey, useSnackbar } from 'notistack';
import { Box } from '@mui/material';

/**
 * Props interface for the CloseNotiBtn component.
 */
interface CloseNotiProps {
    /** Unique identifier for the snackbar notification */
    id: SnackbarKey;
}

/**
 * Close notification button component.
 * 
 * This component provides a transparent overlay button that allows users
 * to dismiss snackbar notifications by clicking anywhere on the notification.
 * It integrates with the notistack library for notification management.
 * 
 * Features:
 * - Full overlay coverage of the notification area
 * - Hover effects for better user feedback
 * - Seamless integration with notistack
 * - Accessible click target
 * 
 * @param props - Component props containing the snackbar ID
 * @returns Transparent overlay button for closing notifications
 */
export function CloseNotiBtn({ id }: CloseNotiProps) {
    const { closeSnackbar } = useSnackbar();

    /**
     * Handle notification close action.
     * Closes the snackbar with the provided ID.
     */
    const handleClose = () => {
        closeSnackbar(id);
    };

    return (
        <Box 
            sx={{
                '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)' 
                },
                position: 'absolute',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
            }}
            onClick={handleClose}
        />
    );
}