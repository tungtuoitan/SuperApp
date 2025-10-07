import { AppBar, SxProps, Theme, Toolbar, styled } from "@mui/material";

export const ToolbarWrapper = styled('div')({
    height: '64px',
    minHeight: '64px',
    maxHeight: '64px',
    flexShrink: 0,
    '& .MuiPaper-root': {
        marginTop: '1px',
        backgroundColor: '#fff',
        color: '#000',
    },
    '& .isImportant-icon-false': {
        color: '#D8D8D7'
    },
    '& .isImportant-icon-true': {
        color: '#C70039'
    },
    '& .selected-true': {
        backgroundColor: '#D8D8D7'
    }
});

export interface IToolbarContainer {
    children: React.ReactNode;
    sxBoxToolbar?: SxProps<Theme> | undefined;
}

export const ToolbarContainer = ({ children, sxBoxToolbar }: IToolbarContainer) => {
    return (
        <ToolbarWrapper sx={sxBoxToolbar}>
            <AppBar
                style={{ marginTop: '3px', backgroundColor: '#fff', height: '64px' }}
                position="static"
                elevation={2}
                variant="elevation">
                <Toolbar style={{
                    backgroundColor: '#fff',
                    color: '#000',
                    paddingLeft: '18px',
                    minHeight: '64px',
                    height: '64px'
                }}>
                    {children}
                </Toolbar>
            </AppBar>
        </ToolbarWrapper>
    );
};
