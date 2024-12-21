import { Box, IconButton, Typography } from "@mui/material"
import { clvs, sr } from "../TLConstants";
import {useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { getDate$MondayOfCurrentWeek, getDate$FirstDayOfCurrentMonth, 
    getDate$FirstDayOfCurrentYear, getDate$FirstDayOfCurrentDecade, getDate$FirstDayOfCurrentCentury, 
    GhToCDate,
    getDate$NextMonday,
    getDate$LastMonday,
    addTime,
    getDateOf,
    getTimeTitle,
    useTimeHelpers} from "./TimeHelpers";
import { timeConfig, useTimeConfigStore } from "./TimeConfigStore";
import { useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { _3css } from "./3css";
import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { styled } from "@mui/system";
import { helperMUIcss } from "../../CommonHelpers/5_MUIcss";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
const WLeft = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    paddingLeft: 10,
    alignItems: 'center',
    gap: 10,
    height: '100%',
    width: "33.3%",
    
})
const WMid = styled(Box)({
    display: 'flex',
    flexDirection: 'row',  
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: '100%',
    width: "33.3%"
})
const WBar = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
})

const WArrowBtn = styled(IconButton)({
    width: 40,
    height: 40,
    fontSize: '10px !important',
    fontStyle: 'italic',
})

export const TimeConfigBar = () => {
    const {timeConfig, setTimeConfig } = useTimeConfigStore();
    const { dateToCDate, h$G_BgEnd } = useTLBaseBgHelpers();
    const { TIList, setZoomLv, keyboardState, firstTimeInit } = useTLBaseBgStore();
    const dpSelector = helperMUIcss.getDatePickerCSSSelector();
    const { clickNow, changeTimeStart, changeLevel, isPast, isFuture } = useTimeHelpers();
    const timeTitle = getTimeTitle(timeConfig);

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
                <Typography variant='h2' 
                    sx={{
                            color: timeTitle === 'Today'|| timeTitle.includes('This') 
                                ? _3css.timeTitle.nowColor
                                : isPast(timeConfig.timeStart) 
                                ? _3css.timeTitle.pastColor 
                                : _3css.timeTitle.futureColor, 
                            marginLeft: 10, 
                            fontSize: '32px !important',

                        }}
                >{timeTitle}</Typography>
            </WLeft>
            <WMid>
                <WArrowBtn
                    title={`Go Today`}
                    onClick={clickNow}
                    sx={{
                        '&:hover': {
                            color: 'red',
                        },
                    }}
                >
                    Now
                </WArrowBtn>
                <WArrowBtn  
                    title={`Prev ${clvs[timeConfig.cevelId].cevelD}`}
                    disabled={timeConfig.cevelId===0}
                    sx={{
                        '&:hover': {
                            color: 'black',
                        },
                    }}
                    onClick={()=>changeTimeStart('prev')}
                >
                    <NavigateBeforeIcon />
                </WArrowBtn>
                <WArrowBtn  
                    title={`Prev Level`}
                    disabled={timeConfig.cevelId===5} 
                    onClick={()=>changeLevel('up')}
                >
                    <KeyboardDoubleArrowLeftIcon />
                </WArrowBtn>
                <Box display={'flex'} alignItems={'center'}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            className="fromDatePicker"
                            disabled
                            sx={{ 
                                height: 30, 
                                width: 150,
                                [`& ${dpSelector.div1}`]: {
                                    height: 30,
                                },
                                [`& ${dpSelector.label1NoShrink}`]: {
                                    top: -8,
                                },
                                [`& ${dpSelector.input2}`]: {
                                    height: 30,
                                    padding: '0px 0px 0 10px',
                                },
                             }}
                            // label="From"
                            // format="DD/MM/YYYY"
                            value={new Date(TIList[0]?.date)}
                            onChange={(newValue) => {
                                // setTimeConfig2({ ...timeConfig2, period: { id: 0, label: 'custom', date: newValue } });
                            }}
                            // renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            className="toDatePicker"
                            disabled
                            sx={{ 
                                height: 30, 
                                width: 150,
                                [`& ${dpSelector.div1}`]: {
                                    height: 30,
                                },
                                [`& ${dpSelector.label1NoShrink}`]: {
                                    top: -8,
                                },
                                [`& ${dpSelector.input2}`]: {
                                    height: 30,
                                    padding: '0px 0px 0 10px',
                                },
                                [`& ${dpSelector.button3}`]: {
                                    // height: 30,
                                    padding: '0 !important',
                                },
                            }}
                            // label="To"
                            // format="DD/MM/YYYY"
                            value={new Date(GhToCDate(h$G_BgEnd))}
                            onChange={(newValue) => {
                                // update timeFrom here ....
                    
                            }}
                            // renderInput={(params) => <TextField {...params} />}
                        />
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

