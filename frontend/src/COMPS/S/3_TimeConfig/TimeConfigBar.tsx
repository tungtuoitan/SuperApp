import { Autocomplete, Box, Button, FormControl, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { clvs, sr } from "../TLConstants";
import {useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { getDate$MondayOfCurrentWeek, getDate$FirstDayOfCurrentMonth, 
    getDate$FirstDayOfCurrentYear, getDate$FirstDayOfCurrentDecade, getDate$FirstDayOfCurrentCentury, 
    GhToCDate,
    getDate$NextMonday,
    getDate$LastMonday,
    addTime,
    getDateOf,
    getTimeTitle} from "./TimeHelpers";
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
import { helperMUIcss } from "../../Helpers/HelperMUIcss";
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
    const { TIList, setZoomLv, keyboardState } = useTLBaseBgStore();
    const dpSelector = helperMUIcss.getDatePickerCSSSelector();
    const sSelector = helperMUIcss.getSelectCSSSelector();

    // init các value mặc định / tương tự từ userProfile load lên
    useEffect(() => {
        const initCevelId = 5; //! điều chỉnh CLevel ban đầu tại đây
        const initTimeStart = clvs[initCevelId].cevelC === sr.century.c
            ? dateToCDate(getDate$FirstDayOfCurrentCentury())
            : clvs[initCevelId].cevelC === sr.decade.c
            ? dateToCDate(getDate$FirstDayOfCurrentDecade())
            : clvs[initCevelId].cevelC === sr.year.c
            ? dateToCDate(getDate$FirstDayOfCurrentYear())
            : clvs[initCevelId].cevelC === sr.month.c
            ? dateToCDate(getDate$FirstDayOfCurrentMonth())
            : clvs[initCevelId].cevelC === sr.week.c
            ? dateToCDate(getDate$MondayOfCurrentWeek())
            : clvs[initCevelId].cevelC === sr.day.c
            
            ? getDateOf('Today')
            : null;


        const timeConfigInit = { cevelId: initCevelId, timeStart: initTimeStart  } as timeConfig

        setTimeConfig(timeConfigInit);
    }, []);

    const clickPrevNext = (prev: 'prev'|'next') => {
        const numb = prev === 'prev' ? -1 : 1;
        setZoomLv(1);
        switch (clvs[timeConfig.cevelId].cevelC) {
            case sr.decade.c:
                setTimeConfig({ ...timeConfig, timeStart: addTime(timeConfig.timeStart, 10*numb, 0, 0, 0, 0) });
                break;
            case sr.year.c:
                setTimeConfig({ ...timeConfig, timeStart: addTime(timeConfig.timeStart, numb, 0, 0, 0, 0) });
                break;
            case sr.month.c:
                setTimeConfig({ ...timeConfig, timeStart: addTime(timeConfig.timeStart, 0, numb, 0, 0, 0) });
                break;
            case sr.week.c:
                setTimeConfig({ ...timeConfig, timeStart: 
                    dateToCDate(prev === 'prev' 
                        ? getDate$LastMonday(new Date(TIList[0].date)) 
                        : getDate$NextMonday(new Date(TIList[0].date)))}
                    );
                break;
            case sr.day.c:
                setTimeConfig({ ...timeConfig, timeStart: addTime(timeConfig.timeStart, 0, 0, numb, 0, 0)});
                break;
            default:
                break;
        }
    }
    const clickLevel = (updown: 'up'|'down') => {
        if (timeConfig.cevelId <= 5) {
            const newCevelId = timeConfig.cevelId + (updown === 'up' ? 1 : -1);
            setTimeConfig({ 
                timeStart: clvs[newCevelId].cevelC === sr.century.c
                    ? dateToCDate(getDate$FirstDayOfCurrentCentury())
                    :clvs[newCevelId].cevelC === sr.decade.c 
                    ? dateToCDate(getDate$FirstDayOfCurrentDecade())
                    : clvs[newCevelId].cevelC === sr.year.c
                    ? dateToCDate(getDate$FirstDayOfCurrentYear())
                    : clvs[newCevelId].cevelC === sr.month.c
                    ? dateToCDate(getDate$FirstDayOfCurrentMonth())
                    : clvs[newCevelId].cevelC === sr.week.c
                    ? dateToCDate(getDate$MondayOfCurrentWeek())
                    : clvs[newCevelId].cevelC === sr.day.c
                    ? getDateOf('Today')
                    : dateToCDate(new Date()), 
                cevelId: newCevelId });
        }
    }
    const clickNow = () => {
        setTimeConfig({ cevelId: 5, timeStart: getDateOf('Today') });
    }

    return (
        <WBar>
            <WLeft>
                <Typography variant='h2' sx={{color: 'gray', marginLeft: 10, fontSize: '32px !important'}}>{getTimeTitle(timeConfig)}</Typography>
            </WLeft>
            <WMid>
                <WArrowBtn
                    title={`Go Today`}
                    onClick={clickNow}
                >
                    Now
                </WArrowBtn>
                <WArrowBtn  
                    title={`To Level: ${clvs[timeConfig.cevelId+1<5 ? timeConfig.cevelId+1 : 5].cevelD}`}
                    disabled={timeConfig.cevelId===5}
                    onClick={()=>clickLevel('up')}
                >
                    <NavigateBeforeIcon />
                </WArrowBtn>
                <WArrowBtn  
                    title={`Prev ${clvs[timeConfig.cevelId].cevelD}`}
                    disabled={timeConfig.cevelId===0}
                    onClick={()=>clickPrevNext('prev')}
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
                    title={`Next ${clvs[timeConfig.cevelId].cevelD}`}
                    disabled={timeConfig.cevelId===0}
                    onClick={()=>clickPrevNext('next')}
                >
                    <KeyboardDoubleArrowRightIcon />
                </WArrowBtn>
                <WArrowBtn 
                    title={`To Level: ${clvs[timeConfig.cevelId-1>=0 ? timeConfig.cevelId : 0].cevelD}`}
                    disabled={timeConfig.cevelId===0}
                    onClick={() => clickLevel('down')}
                >
                    <NavigateNextIcon />
                </WArrowBtn>
            </WMid>
            <div style={{width: '33.3%'}}></div>
        </WBar>
    )
}

