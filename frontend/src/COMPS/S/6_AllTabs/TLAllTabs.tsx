import { IconButton, Tab } from "@mui/material";
import { SetStateAction, useState, MouseEvent, useEffect } from "react";
import TLContainer from "../TLContainer";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Etail from "../5_Etail/Etail";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { useAllTabsStore } from "./AllTabsStore";
import { getSRs } from "../TLAPIs";
import { useSRsStore } from "../8_SRs/SRsStore";
import { IAutoCompleteOptions } from "../../CommonHelpers/4_GenericAutoComplete";
import {useTLBaseBgStore} from "../1_TLBaseBg/TLBaseBgStore";
import { WBadge, WTabBar, WTabsContainer} from "./6ui";
import {a11yProps} from "./6he";
import {SR} from "../8_SRs/8ty";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import CloseIcon from '@mui/icons-material/Close';

export const TLAllTabs = () => {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { allTabIds, setAllTabIds, curTabIndex, setCurTabIndex } = useAllTabsStore();
    const { sRs, setSRs, setLevelOptions } = useSRsStore();
    const { windowWidth, setWindowWidth } = useTLBaseBgStore();
    const [etails, dispatch] = useEtailFormStore();
    const [hoverId, setHoverId] = useState<number | string | null>(null);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeTab = (event: MouseEvent<HTMLButtonElement> | undefined, id: any) => {
        event?.preventDefault();
        event?.stopPropagation();
        setAllTabIds(prev => {
            dispatch({ type: 'REMO', payload: {id} });
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
                onChange={(e: any, newTabIndex: SetStateAction<number>) => setCurTabIndex(newTabIndex)}
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
                            onMouseEnter={() => setHoverId(id)}
                            onMouseLeave={() => setHoverId(null)}
                            label={
                                <WBadge
                                    // badgeContent={ev.badge}
                                    color="primary" max={99}>
                                    {ev.name.length > 40 ? ev.name.slice(0, 35) + '...' : ev.name}
                                </WBadge>}
                            icon={index > 0 ?
                                <IconButton id='closeTabBtn' onClick={(e) => closeTab(e, id)} sx={{ margin: '0 !important', opacity: hoverId === id ? 1 : 0 }}>
                                    <CloseIcon sx={{fontSize:12}} />
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
                    : <Etail etailId={allTabIds[curTabIndex] as number} />}
            </div>
        </WTabsContainer>
    )
}