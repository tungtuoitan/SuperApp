import { Box, Grow, IconButton, Tab, Tabs, styled } from "@mui/material";
import { SetStateAction, useState, MouseEvent, useEffect } from "react";
import Badge, { BadgeProps } from '@mui/material/Badge';
import TLContainer from "../TLContainer";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Etail from "../5_Etail/Etail";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { useAllTabsStore } from "./AllTabsStore";
import { getSRs } from "../TLAPIs";
import { SR, useSRsStore } from "../8_SRs/SRsStore";
import { IAutoCompleteOptions } from "../../Helpers/GenericAutoComplete";
import {useTLBaseBgStore} from "../1_TLBaseBg/TLBaseBgStore";

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
    height: '50px',
    [`& .MuiTabs-scroller`]: {
        borderRightWidth: '0',
    },
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

export const TLAllTabs = () => {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { allTabIds, setAllTabIds, curTabIndex, setCurTabIndex } = useAllTabsStore();
    const { sRs, setSRs, setLevelOptions } = useSRsStore();
    const { windowWidth, setWindowWidth } = useTLBaseBgStore();

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (event: any, newTabIndex: SetStateAction<number>) => {
        setCurTabIndex(newTabIndex);
    };

    const closeTab = (event: MouseEvent<HTMLButtonElement> | undefined, id: any) => {
        event?.preventDefault();
        event?.stopPropagation();
        setAllTabIds(prev => {
            const newAllTabIds = prev.filter(tabId => tabId !== id)
            if (curTabIndex === allTabIds.indexOf(id)) {
                setCurTabIndex(prev => prev-1);
            } else {
                const newCurTabIndex = newAllTabIds.indexOf(allTabIds[curTabIndex]);
                setCurTabIndex(newCurTabIndex);
            }

            return newAllTabIds;
        })
    }

    useEffect(() => {
        getSRs()
            .then((srs: SR[]) => {
                setSRs(srs);
                const levelOptions = srs.filter(sr => sr.type === 'Cevel');
                setLevelOptions(levelOptions.map(sr => (
                    { id: sr.id, code: sr.code.toLowerCase(), desc: sr.desc, active: (sr.active === 1 || sr.active === null) ? true : false } as IAutoCompleteOptions
                )));

            })
    }, [])

    return (
        <WTabsContainer id='TLAllTabs'>
            <WTabBar
                id='tabBar'
                value={curTabIndex}
                onChange={handleChange}
                aria-label="tabs">
                {allTabIds.map((id: number | string, index: number) => {
                    if (id === 'ScheduleID') return <Tab key={index} icon={<CalendarTodayIcon />} {...a11yProps(index)} sx={{
                        height: '48px',
                        minHeight: '48px',

                    }} />

                    const ev = allEvs.filter(ev => ev.id === id)[0];
                    return (
                        <Tab
                            key={index}
                            // disabled={ev.disabled ?? false}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurTabIndex(index);
                            }}
                            label={
                                <WBadge
                                    // badgeContent={ev.badge}
                                    color="primary" max={99}>
                                    {ev.name.length > 40 ? ev.name.slice(0, 35) + '...' : ev.name}
                                </WBadge>}
                            icon={index > 0 ?
                                <IconButton id='closeTabBtn' onClick={(e) => closeTab(e, id)} sx={{ margin: '0 !important' }}>
                                    <HighlightOffOutlinedIcon />
                                </IconButton> : <></>}
                            {...a11yProps(index)}
                            style={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                gap: 10,
                                padding: '0 0 0 16px',
                                height: '48px',
                                minHeight: '48px',
                            }}
                        />
                    )
                })}
                {/* <Grow><div/></Grow> */}
                {/* RIGHT THINGS HERE */}
            </WTabBar>

            <div id='tabContent' style={{ width: '100%', height: 'calc(100% - 50px)' }}>
                {(allTabIds.filter((id, index) => index === curTabIndex)[0]) === 'ScheduleID'
                    ? <TLContainer />
                    : <Etail id={allTabIds[curTabIndex] as number} />}
            </div>
        </WTabsContainer>
    )
}