import { AppBar, Box, Dialog, DialogContent, Grow, IconButton, SxProps, Theme, Toolbar, Tooltip, Typography, styled, useMediaQuery, useTheme } from "@mui/material"
import { CSSProperties } from "@mui/styles"
import React, { MouseEventHandler } from "react"
import CloseIcon from '@mui/icons-material/Close';
export interface IDialogContentProps {
    children: React.ReactNode | null,
    style?: CSSProperties | undefined
    sx?: SxProps<Theme> | undefined
}
export interface IDialogContainer {
    title: string | React.ReactNode
    dialogId?: string
    sx?: SxProps<Theme> | undefined
    style?: CSSProperties | undefined
    fullscreen?: boolean | undefined
    open: boolean
    dialogContentProps?: IDialogContentProps | undefined
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
    onClickClose: MouseEventHandler<HTMLButtonElement> | undefined
    children: React.ReactNode
    disableEnforceFocus?: boolean | undefined
    toolbar?: React.ReactNode
    allowDownloadFile?: File
}

export const ContentWrapper = styled('div')({

})

export const ContentIcon = styled('div')({
    display: 'flex',
})

export const ToolbarBox = styled(Box)({
    flexGrow: 1,
    display: 'flex',
    maxHeight: '64px',
    [`& header.MuiPaper-root`]: {
        height: '64px',
        [`& .MuiToolbar-root`]: {
            backgroundColor: '#fff!important',
            color: '#000',
            minHeight: 64,
        }
    }
})

export const DialogContainer = ({ title, open, onClose, onClickClose, dialogId, sx, style, fullscreen, children, disableEnforceFocus, dialogContentProps, toolbar, allowDownloadFile }: IDialogContainer) => {
    const { style: dialogcontentStyle } = dialogContentProps ?? {}
    const theme = useTheme();
    const responsiveFullscreen = useMediaQuery(theme.breakpoints.down('md'));
    // const { downloadWithFile } = useDialogContainerEvents();
    return (
        <Dialog
            id={dialogId ?? ""}
            sx={sx ?? undefined}
            style={style ?? undefined}
            disableEnforceFocus={disableEnforceFocus ?? false}
            open={open}
            fullScreen={fullscreen ?? responsiveFullscreen} // default true
            onClose={onClose}>
            {toolbar
                ? toolbar
                : <ToolbarBox>
                    <AppBar
                        position="static">
                        <Toolbar variant="dense" sx={{
                            justifyContent: 'space-between',
                        }}>
                            <div style={{width: 'calc(100% - 48px)'}}>
                                {typeof title === 'string' && 
                                    <Typography variant='h5' sx={{
                                        overflow: 'hidden', 
                                        whiteSpace: 'nowrap', 
                                        textOverflow: 'ellipsis'}}>{title}
                                    </Typography>
                                }
                            </div>
                            {/* <Grow /> */}
                            <ContentIcon>
                                <Tooltip title="Close" aria-label="close">
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={onClickClose}
                                        aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </ContentIcon>
                        </Toolbar>
                    </AppBar>
                </ToolbarBox>}
            <DialogContent style={dialogcontentStyle ?? { backgroundColor: '#fff', padding: 0, height: '100%', marginTop: '10px' }}>
                {/* <ContentWrapper> */}
                    {children}
                {/* </ContentWrapper> */}
            </DialogContent>
        </Dialog>
    )
}