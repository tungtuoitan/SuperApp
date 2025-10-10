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
export interface IDialogContainerProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Function to call when dialog should close */
    onClose?: () => void;
    /** Dialog title text */
    title?: string;
    /** Whether to show close button in toolbar */
    showCloseButton?: boolean;
    /** Whether dialog should be full screen */
    fullScreen?: boolean;
    /** Maximum width for dialog */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    /** Whether dialog should take full width */
    fullWidth?: boolean;
    /** Dialog content configuration */
    dialogContentProps?: IDialogContentProps;
    /** Custom toolbar content */
    toolbarContent?: React.ReactNode;
    /** Additional styling for dialog */
    sx?: SxProps<Theme>;
    /** Inline styles for dialog */
    style?: CSSProperties;
    /** Whether to disable backdrop click close */
    disableBackdropClick?: boolean;
    /** Whether to disable escape key close */
    disableEscapeKeyDown?: boolean;
}

/**
 * Styled dialog content component with custom padding and styling.
 */
const StyledDialogContent = styled(DialogContent)({
    padding: '16px 24px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
});

/**
 * Styled toolbar with responsive design and consistent spacing.
 */
const StyledToolbar = styled(Toolbar)({
    paddingLeft: '16px !important',
    paddingRight: '8px !important',
    minHeight: '56px',
});

/**
 * DialogContainer - A reusable dialog wrapper component.
 * 
 * This component provides a consistent dialog interface with:
 * - Responsive design with mobile fullscreen support
 * - Customizable header with title and close button
 * - Flexible content area with proper spacing
 * - Configurable backdrop and escape key behavior
 * - Built-in accessibility features
 * 
 * The component automatically adapts to mobile screens by using
 * fullscreen mode on smaller devices for better user experience.
 * 
 * @param props - Dialog configuration props
 * @returns Configured Material-UI Dialog component
 */
export function DialogContainer({
    open,
    onClose,
    title,
    showCloseButton = true,
    fullScreen: forceFullScreen,
    maxWidth = 'md',
    fullWidth = true,
    dialogContentProps,
    toolbarContent,
    sx,
    style,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    ...props
}: IDialogContainerProps & { children?: React.ReactNode }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const fullScreen = forceFullScreen || isMobile;

    const handleClose = (_event: {}, reason: string) => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return;
        }
        if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
            return;
        }
        onClose?.();
    };

    const handleCloseClick: MouseEventHandler = (event) => {
        event.stopPropagation();
        onClose?.();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            sx={{
                '& .MuiDialog-paper': {
                    margin: fullScreen ? 0 : '32px',
                    maxHeight: fullScreen ? '100vh' : 'calc(100vh - 64px)',
                },
                ...sx,
            }}
            style={style}
            PaperProps={{
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                },
            }}
        >
            {(title || showCloseButton || toolbarContent) && (
                <AppBar
                    position="static"
                    color="default"
                    elevation={1}
                    sx={{
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                    }}
                >
                    <StyledToolbar>
                        {/* Title section */}
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 500,
                                fontSize: '1.1rem',
                            }}
                        >
                            {title}
                        </Typography>

                        {/* Custom toolbar content */}
                        {toolbarContent && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                {toolbarContent}
                            </Box>
                        )}

                        {/* Close button */}
                        {showCloseButton && onClose && (
                            <Tooltip title="Close">
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCloseClick}
                                    size="small"
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </StyledToolbar>
                </AppBar>
            )}

            {/* Dialog content */}
            <StyledDialogContent
                style={dialogContentProps?.style}
                sx={{
                    flex: 1,
                    overflow: 'auto',
                    ...dialogContentProps?.sx,
                }}
            >
                {dialogContentProps?.children || props.children}
            </StyledDialogContent>
        </Dialog>
    );
}