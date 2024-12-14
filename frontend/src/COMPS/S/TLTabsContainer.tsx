import { Box, Grow, Tab, Tabs, styled } from "@mui/material";
import { SetStateAction, useState } from "react";
import Badge, { BadgeProps } from '@mui/material/Badge';

const WBadge = styled(Badge)<BadgeProps>(() => ({
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
    [`& .MuiTabs-scroller`]: {
        borderRightWidth: '0',
    }
})

export interface ITabsContainer {
    tabs: TabItem[]
}

export interface TabItem {
    label: string
    tabComponent: React.ReactNode
    disabled?: boolean
    badge?: number
    icon?: React.ReactNode
}

const a11yProps = (index: number) => {
    return {
        id: `x-tab-${index}`,
        'aria-controls': `tabs-tabpanel-${index}`,
    };
}

export const TLTabsContainer = ({ tabs }: ITabsContainer) => {
    const [value, setValue] = useState(0);
    const handleChange = (event: any, newValue: SetStateAction<number>) => {
        setValue(newValue);
    };

    return (
        <WTabsContainer id='TLTabsContainer'>
            <WTabBar
                id='tabBar'
                value={value}
                onChange={handleChange}
                aria-label="tabs">
                {(tabs ?? []).map((val, idx) => (
                    <Tab
                    key={idx}
                    disabled={val.disabled ?? false}
                    sx={{ minHeight: '50px' }}
                    label={
                        <WBadge badgeContent={val.badge} color="primary" max={99}>
                            {val.icon ? val.icon : val.label}
                        </WBadge>
                    }
                    {...a11yProps(idx)} />
                ))}
                {/* <Grow><div/></Grow> */}
                {/* RIGHT THINGS HERE */}
            </WTabBar>

            <div id='tabContent' style={{ width: '100%', height: 'calc(100% - 50px)' }}>
                {tabs.filter((tab, index) => value === index)[0].tabComponent}
            </div>
        </WTabsContainer>
    )
}