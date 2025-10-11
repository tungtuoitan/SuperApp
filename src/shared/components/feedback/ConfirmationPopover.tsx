/**
 * ConfirmationPopover Component
 * Shared confirmation popover component based on Portal's PopoverBox pattern
 * Following SuperApp architecture guidelines
 */

import React from 'react';
import {
    Popover,
    PopoverOrigin,
    Typography,
    Button,
    Paper,
    styled
} from '@mui/material';

// Styled components matching Portal's PopoverBox exactly
const FooterButtons = styled('div')({
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-end',
    '& button': {
        textTransform: 'none'
    },  
});

const PopoverRoot = styled('div')({
    padding: '15px 10px 3px',
    margin: '10px 10px 3px',
});

export interface ConfirmationPopoverProps {
    /** Whether the popover is open */
    open: boolean;
    /** Element to anchor the popover to */
    anchorEl: HTMLElement | null;
    /** Message to display in the popover */
    message: string;
    /** Text for the confirm button */
    confirmText?: string;
    /** Text for the cancel button */
    cancelText?: string;
    /** Color for the confirm button */
    confirmColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    /** Color for the cancel button */
    cancelColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    /** Variant for buttons */
    buttonVariant?: 'text' | 'outlined' | 'contained';
    /** Custom width for the popover */
    width?: string;
    /** Z-index for the popover */
    zIndex?: number;
    /** Callback when confirm button is clicked */
    onConfirm: () => void;
    /** Callback when cancel button is clicked */
    onCancel: () => void;
    /** Callback when popover is closed */
    onClose?: () => void;
}

/**
 * ConfirmationPopover - A reusable confirmation popover component
 * 
 * @example
 * ```tsx
 * const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
 * const [showConfirm, setShowConfirm] = useState(false);
 * 
 * const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
 *     setAnchorEl(event.currentTarget);
 *     setShowConfirm(true);
 * };
 * 
 * const handleConfirmDelete = () => {
 *     deleteItem();
 *     setShowConfirm(false);
 *     setAnchorEl(null);
 * };
 * 
 * const handleCancel = () => {
 *     setShowConfirm(false);
 *     setAnchorEl(null);
 * };
 * 
 * return (
 *     <>
 *         <Button onClick={handleDeleteClick}>Delete</Button>
 *         <ConfirmationPopover
 *             open={showConfirm}
 *             anchorEl={anchorEl}
 *             message="Are you sure you want to delete this item?"
 *             onConfirm={handleConfirmDelete}
 *             onCancel={handleCancel}
 *         />
 *     </>
 * );
 * ```
 */
export function ConfirmationPopover({
    open,
    anchorEl,
    message,
    confirmText = 'Ok',
    cancelText = 'Cancel',
    confirmColor = 'primary',
    cancelColor = 'inherit',
    buttonVariant = 'text',
    width,
    zIndex = 10000,
    onConfirm,
    onCancel,
    onClose,
}: ConfirmationPopoverProps) {
    const handleClose = () => {
        onClose?.();
        onCancel();
    };

    const handleConfirm = () => {
        onConfirm();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Popover
            anchorOrigin={{ 
                vertical: 'bottom', 
                horizontal: 'left' 
            } as PopoverOrigin}
            open={open}
            anchorEl={anchorEl}
            style={{ zIndex }}
            PaperProps={{
                style: { boxShadow: '0px 2px 8px rgba(200, 200, 200, 0.3)' }
            }}
            onClose={handleClose}
        >
            <PopoverRoot>
                <Paper elevation={0}>
                    <Typography style={width ? { width } : {}}>{message}</Typography><br />
                    <hr />
                    <FooterButtons>
                        <Button 
                            size='small' 
                            variant={buttonVariant} 
                            color={confirmColor} 
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </Button>&nbsp;&nbsp;
                        <Button 
                            size='small' 
                            variant={buttonVariant} 
                            color={cancelColor}
                            onClick={handleCancel}
                        >
                            {cancelText}
                        </Button>
                    </FooterButtons>
                </Paper>
            </PopoverRoot>
        </Popover>
    );
}