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
import {cDate} from "../TLTypes";

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

export const TimeConfigBar = () => {
    const {timeConfig, setTimeConfig } = useTimeConfigStore();
    const { dateToCDate, h$G_BgEnd } = useTLBaseBgHelpers();
    const { TIList, setZoomLv } = useTLBaseBgStore();
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

    return (
        <WBar>
            <WLeft>
                {/* <FormControl
                 
                    sx={{ 
                        textAlign: 'left',
                        height: 30, 
                        width: 120,
                        margin: 0,
                        [`& ${sSelector.div1}`]: {
                            height: 30,
                        },
                        [`& ${sSelector.input2}`]: {
                            height: 30,
                            padding: '0px 0px 0 10px',
                        },
                         [`& ${sSelector.legend2}`]: {
                            width: '0 !important',
                        },
                    }}
                >
                    <InputLabel id="timeLevelLabel"></InputLabel>
                    <Select
                        labelId="timeLevelLabel"
                        id="timeLevelSelect"
                        value={timeConfig2.cevelId}
                        label="Current Level"
                        size='small'
                        onChange={(e) => {
                            if (e.target.value !== timeConfig2.cevelId) {
                                const newLv = e.target.value as number;
                                if (newLv === 0) {
                                    setTimeConfig2({ ...timeConfig2, cevelId: newLv });
                                }
                                if (newLv === 1) {
                                    setTimeConfig2({ ...timeConfig2, cevelId: newLv });
                                }
                                if (newLv === 2) {
                                    setTimeConfig2({ ...timeConfig2, cevelId: newLv });
                                }
                            }
                        }}
                      
                    >
                        {clvs.map((option) => {
                            return (
                                <MenuItem key={option.id} value={option.id} disabled={!option.active}>{option.cevelD}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl> */}
                <Typography variant='h2' sx={{color: 'gray', marginLeft: 10, fontSize: '32px !important'}}>{getTimeTitle(timeConfig)}</Typography>
            </WLeft>
            <WMid>
                <IconButton aria-label="delete" 
                    title={`Back ${clvs[timeConfig.cevelId].cevelD}`}
                    onClick={() => {
                        setZoomLv(1);
                        switch (clvs[timeConfig.cevelId].cevelC) {
                            case sr.decade.c:
                                break;
                            case sr.year.c:
                                break;
                            case sr.month.c:
                                break;
                            case sr.week.c:
                                setTimeConfig({ ...timeConfig, timeStart: dateToCDate(getDate$LastMonday(new Date(TIList[0].date))) });
                                break;
                            case sr.day.c:
                                setTimeConfig({ ...timeConfig, timeStart: addTime(timeConfig.timeStart, 0, 0, -1, 0, 0)});

                                break;
                            default:
                                break;
                        }
                        
                    }}
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                >
                    <NavigateBeforeIcon />
                </IconButton>
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
                <IconButton 
                    aria-label="delete"
                    title={`Next ${clvs[timeConfig.cevelId].cevelD}`}
                    onClick={() => {
                        setZoomLv(1);
                        switch (clvs[timeConfig.cevelId].cevelC) {
                            case sr.decade.c:
                                break;
                            case sr.year.c:
                                break;
                            case sr.month.c:
                                break;
                            case sr.week.c:
                                setTimeConfig({ ...timeConfig, timeStart: dateToCDate(getDate$NextMonday(new Date(TIList[0].date))) });

                                break;
                            case sr.day.c:
                                setTimeConfig({ ...timeConfig, timeStart: addTime(timeConfig.timeStart as cDate, 0, 0, 1, 0, 0) });
                                break;
                            default:
                                break;
                        }
                    }}
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                >
                    <NavigateNextIcon />
                </IconButton>
            </WMid>
            <div style={{width: '33.3%'}}></div>
        </WBar>
    )
}

