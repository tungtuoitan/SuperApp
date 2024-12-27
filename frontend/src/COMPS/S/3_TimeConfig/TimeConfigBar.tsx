import { Box, Typography } from "@mui/material"
import { clvs, sr, tt } from "../TLConstants";
import {useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { getDate$MondayOfCurrentWeek, getDate$FirstDayOfCurrentMonth, 
    getDate$FirstDayOfCurrentYear, getDate$FirstDayOfCurrentDecade, getDate$FirstDayOfCurrentCentury, 
    GhToCDate,
    getDateOf,
    getTimeTitle,
    useTimeHelpers,
    parseCDate,
    pad,
    getMonthShortName} from "./TimeHelpers";
import { timeConfig, useTimeConfigStore } from "./TimeConfigStore";
import { useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { _3css } from "./3css";
import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {FromDatePicker, ToDatePicker, WArrowBtn, WBar, WLeft, WMid} from "./3ui";
import {getWeek} from "date-fns";


export const TimeConfigBar = () => {
    const {timeConfig, setTimeConfig } = useTimeConfigStore();
    const { dateToCDate, h$G_BgEnd } = useTLBaseBgHelpers();
    const { TIList, firstTimeInit } = useTLBaseBgStore();
    const { clickNow, changeTimeStart, changeLevel, isPast } = useTimeHelpers();
    const timeTitle = getTimeTitle(timeConfig);
    const {y, m, d } = parseCDate(timeConfig.timeStart);

    // init các value mặc định / tương tự từ userProfile load lên
    useEffect(() => {
        if(!firstTimeInit) return;
        const cevelId = 5; //! điều chỉnh CLevel ban đầu tại đây
        const timeStart = clvs[cevelId].cevelC === sr.century.c
            ? dateToCDate(getDate$FirstDayOfCurrentCentury())
            : clvs[cevelId].cevelC === sr.decade.c
            ? dateToCDate(getDate$FirstDayOfCurrentDecade())
            : clvs[cevelId].cevelC === sr.year.c
            ? dateToCDate(getDate$FirstDayOfCurrentYear())
            : clvs[cevelId].cevelC === sr.month.c
            ? dateToCDate(getDate$FirstDayOfCurrentMonth())
            : clvs[cevelId].cevelC === sr.week.c
            ? dateToCDate(getDate$MondayOfCurrentWeek())
            : clvs[cevelId].cevelC === sr.day.c
            ? getDateOf('Today')
            : null;

        setTimeConfig({ cevelId, timeStart } as timeConfig);
    }, []);


    return (
        <WBar>
            <WLeft>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography variant='h2' sx={{  fontSize: '32px !important',
                                color: timeTitle === tt.today || timeTitle.includes('This') 
                                ? _3css.timeTitle.nowCo
                                : isPast(timeConfig.timeStart) 
                                ? _3css.timeTitle.passCo 
                                : _3css.timeTitle.futureCo, 
                            }}>{timeTitle}</Typography>
                            <Typography sx={{fontSize: '12px !important', color: '#00000040', marginLeft:1, marginBottom: -1.7}}>{
                                [tt.today, tt.tomorrow, tt.yesterday, tt.afterTomorrow, tt.beforeYesterday].includes(timeTitle) 
                                ? `${pad(d)}.${pad(m)}`
                                : [tt.thisWeek, tt.nextWeek, tt.lastWeek].includes(timeTitle)
                                ? pad(getWeek(new Date(timeConfig.timeStart)))
                                : [tt.thisMonth, tt.nextMonth, tt.lastMonth].includes(timeTitle)
                                ? `${getMonthShortName(m)}.${y}`
                                : [tt.thisYear, tt.nextYear, tt.lastYear].includes(timeTitle)
                                ? y.toString()
                                : ''
                            }</Typography>

                </Box>
            </WLeft>
            <WMid>  
                <WArrowBtn title={`Go Today`} onClick={clickNow}
                    sx={{
                        '&:hover': {
                            color: 'red',
                        },
                    }}
                >Now</WArrowBtn>
                <WArrowBtn title={`Prev ${clvs[timeConfig.cevelId].cevelD}`} disabled={timeConfig.cevelId===0} onClick={()=>changeTimeStart('prev')}
                    sx={{
                        '&:hover': {
                            color: 'black',
                        },
                    }}
                >
                    <NavigateBeforeIcon />
                </WArrowBtn>
                <WArrowBtn title={`Prev Level`} disabled={timeConfig.cevelId===5} onClick={()=>changeLevel('up')}
                >
                    <KeyboardDoubleArrowLeftIcon />
                </WArrowBtn>
                <Box display={'flex'} alignItems={'center'}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <FromDatePicker className="fromDatePicker" disabled value={new Date(TIList[0]?.date)}/>
                    </LocalizationProvider>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <ToDatePicker className="toDatePicker" disabled value={new Date(GhToCDate(h$G_BgEnd))}/>
                    </LocalizationProvider>
                </Box>
                <WArrowBtn 
                    title={`Next Level`}
                    disabled={timeConfig.cevelId===0}
                    onClick={() => changeLevel('down')}
                >
                    <KeyboardDoubleArrowRightIcon />
                </WArrowBtn>
                <WArrowBtn 
                    title={`Next ${clvs[timeConfig.cevelId].cevelD}`}
                    disabled={timeConfig.cevelId===0}
                    onClick={()=>changeTimeStart('next')}
                >
                    <NavigateNextIcon />
                </WArrowBtn>
            </WMid>
            <div style={{width: '33.3%'}}></div>
        </WBar>
    )
}

