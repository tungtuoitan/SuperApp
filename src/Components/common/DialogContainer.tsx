import React, { MouseEventHandler } from 'react';
import { 
    AppBar, 
    Box, 
    Dialog, 
    DialogContent, 
    IconButton, 
    SxProps, 
    Theme, 
    Toolbar, 
    Tooltip, 
    Typography, 
    styled, 
    useMediaQuery, 
    useTheme 
} from '@mui/material';
import { CSSProperties } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Props interface for dialog content customization.
 */
export interface IDialogContentProps {
    /** Child components to render within dialog content */
    children: React.ReactNode | null;
    /** Optional inline styles for dialog content */
    style?: CSSProperties;
    /** Optional MUI sx prop for dialog content styling */
    sx?: SxProps<Theme>;
}

/**
 * Props interface for the DialogContainer component.
 */
export interface IDialogContainer {
    /** Dialog title, can be string or React element */
    title: string | React.ReactNode;
    /** Optional unique identifier for the dialog */
    dialogId?: string;
    /** Optional MUI sx prop for dialog styling */
    sx?: SxProps<Theme>;
    /** Optional inline styles for dialog */
    style?: CSSProperties;
    /** Whether dialog should be fullscreen */
    fullscreen?: boolean;
    /** Whether dialog is open */
    open: boolean;
    /** Optional props for dialog content customization */
    dialogContentProps?: IDialogContentProps;
    /** Function called when dialog should close */
    onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined;
    /** Function called when close button is clicked */
    onClickClose: MouseEventHandler<HTMLButtonElement> | undefined;
    /** Child components to render within dialog */
    children: React.ReactNode;
    /** Whether to disable focus enforcement */
    disableEnforceFocus?: boolean;
    /** Optional custom toolbar component */
    toolbar?: React.ReactNode;
    /** Optional file for download functionality (currently unused) */
    allowDownloadFile?: File;
}


/**
 * Styled toolbar container for dialog headers.
 * 
 * Provides consistent styling for dialog toolbars with:
 * - Flex layout with grow behavior
 * - Fixed height constraints
 * - White background with black text
 * - Proper AppBar and Toolbar styling
 */
export const ToolbarBox = styled(Box)({
    flexGrow: 1,
    display: 'flex',
    maxHeight: '64px',
    '& header.MuiPaper-root': {
        height: '64px',
        '& .MuiToolbar-root': {
            backgroundColor: '#fff!important',
            color: '#000',
            minHeight: 64,
        }
    }
});

/**
 * Reusable dialog container component with built-in header and close functionality.
 * 
 * This component provides a standardized dialog interface with:
 * - Customizable title (string or React element)
 * - Built-in close button with tooltip
 * - Responsive fullscreen behavior on mobile
 * - Custom toolbar support
 * - Configurable content area styling
 * - Proper accessibility attributes
 * 
 * The dialog automatically becomes fullscreen on medium and smaller screens
 * unless explicitly overridden by the fullscreen prop.
 * 
 * @param props - Component props for dialog configuration
 * @returns Configured dialog component with header and content areas
 */
export function DialogContainer({ 
    title, 
    open, 
    onClose, 
    onClickClose, 
    dialogId, 
    sx, 
    style, 
    fullscreen, 
    children, 
    disableEnforceFocus, 
    dialogContentProps, 
    toolbar, 
    allowDownloadFile 
}: IDialogContainer) {
    const dialogContentStyle = dialogContentProps?.style;
    const theme = useTheme();
    const responsiveFullscreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            id={dialogId ?? ''}
            sx={sx}
            style={style}
            disableEnforceFocus={disableEnforceFocus ?? false}
            open={open}
            fullScreen={fullscreen ?? responsiveFullscreen}
            onClose={onClose}
        >
            {toolbar ? (
                toolbar
            ) : (
                <ToolbarBox>
                    <AppBar position="static">
                        <Toolbar 
                            variant="dense" 
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <Box sx={{ width: 'calc(100% - 48px)' }}>
                                {typeof title === 'string' && (
                                    <Typography 
                                        variant="h5" 
                                        sx={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                )}
                                {typeof title !== 'string' && title}
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Tooltip title="Close" aria-label="close">
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={onClickClose}
                                        aria-label="close"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ToolbarBox>
            )}
            <DialogContent 
                sx={{
                    backgroundColor: '#fff',
                    padding: 0,
                    height: '100%',
                    marginTop: '10px',
                    ...dialogContentStyle
                }}
            >
                {children}
            </DialogContent>
        </Dialog>
    );
}