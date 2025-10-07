import { AppBar, styled } from "@mui/material";

export const Grow = styled('div')({
    flexGrow: 1,
    padding: 0,
    margin: 0,
});

export const ToolbarContainer = styled('div')({
    '& .MuiPaper-root': {
        backgroundColor: '#fff',
        color: '#000'
    }
});

export const GroupIconContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [`& .MuiIconButton-root`]: {
        marginLeft: '0',
        padding: '12px 12px',
        [`& .MuiSvgIcon-root`]: {
            color: '#000',
        }
    }
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#fff',
    color: '#000',
    '&.MuiAppBar-colorPrimary': {
        backgroundColor: '#fff!important',
        color: '#000!important',
    },
    '& .bottom-navigation': {
        '& .MuiButtonBase-root': {
            '&.MuiBottomNavigationAction-root': {
                color: '#3f51b5',
                '& .MuiBottomNavigationAction-label': {
                    fontSize: '0.875rem',
                }
            }
        },
        '& .MuiBottomNavigationAction-root.Mui-selected': {
            color: '#3f51b5!important',
        }
    },
}));
