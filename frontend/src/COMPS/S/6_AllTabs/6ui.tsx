import {Badge, BadgeProps, Box, styled, Tabs} from "@mui/material";

export const WBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
        right: -5,
        top: 0,
        padding: '0 2px',
        height: '16px',
        minWidth: '16px',
    },
}));

export const WTabsContainer = styled(Box)({
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(246, 246, 246)',
})

export const WTabBar = styled(Tabs)({
    backgroundColor: '#fff',
    marginRight: '30px',
    width: '100%',
    height: '50px',
    [`& .MuiTabs-scroller`]: {
        borderRightWidth: '0',
    },
})


