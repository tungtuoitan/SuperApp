import { Autocomplete, Box, Button, FormControl, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { clvs, tl } from "../TLConstants";
import {useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { getPeriodListUnit100y, getPeriodListUnit1y, getPeriodListUnit1m, getDate$MondayOfCurrentWeek, getDate$FirstDayOfCurrentMonth, 
    getDate$FirstDayOfCurrentYear, getDate$FirstDayOfCurrentDecade, getDate$FirstDayOfCurrentCentury, 
    GhToCDate,
    getDate$NextMonday,
    getDate$LastMonday} from "./TimeHelpers";
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

const WLeft = styled(Box)({
    
})
const WMid = styled(Box)({
    display: 'flex',
    flexDirection: 'row',  
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: '100%',
})
const WBar = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    height: 50
})

export const TimeConfigBar = () => {
    const {timeConfig, setTimeConfig, timeConfig2, setTimeConfig2,allPeriods,setAllPeriods, timeFrom, setTimeFrom } = useTimeConfigStore();
    const { dateToCDate, h$G_BgEnd } = useTLBaseBgHelpers();
    const { TIList } = useTLBaseBgStore();
    const dpSelector = helperMUIcss.getDatePickerCSSSelector();
    const sSelector = helperMUIcss.getSelectCSSSelector();

    // init các value mặc định / tương tự từ userProfile load lên
    useEffect(() => {
        const initCevel = 4; //! điều chỉnh CLevel ban đầu tại đây
        const period = clvs[initCevel].cevel === tl.century
            ? {id: 0, label: 'century now', date: dateToCDate(getDate$FirstDayOfCurrentCentury())}
            : clvs[initCevel].cevel === tl.decade
            ? {id: 0, label: 'decade now', date: dateToCDate(getDate$FirstDayOfCurrentDecade())}
            : clvs[initCevel].cevel === tl.year
            ? {id: 0, label: 'year now', date: dateToCDate(getDate$FirstDayOfCurrentYear())}
            : clvs[initCevel].cevel === tl.month
            ? {id: 0, label: 'month now', date: dateToCDate(getDate$FirstDayOfCurrentMonth())}
            : clvs[initCevel].cevel === tl.week
            ? {id: 0, label: 'week now', date: dateToCDate(getDate$MondayOfCurrentWeek())}
            : null;

        const timeConfigInit = { level: initCevel, period } as timeConfig

        if (timeConfigInit.level === 1) setAllPeriods(getPeriodListUnit1y());
        if (timeConfigInit.level === 2) setAllPeriods(getPeriodListUnit1m());

        setTimeConfig(timeConfigInit);
        setTimeFrom(timeConfigInit.period?.date ?? null);
        setTimeConfig2(timeConfigInit);
    }, []);

    return (
        <WBar>
            <WLeft>
                <FormControl
                 
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
                    {/* //! Level */}
                    <InputLabel id="timeLevelLabel"></InputLabel>
                    <Select
                        labelId="timeLevelLabel"
                        id="timeLevelSelect"
                        value={timeConfig2.level}
                        label="Current Level"
                        size='small'
                        onChange={(e) => {
                            if (e.target.value !== timeConfig2.level) {
                                const newLv = e.target.value as number;
                                if (newLv === 0) {
                                    const periodList = getPeriodListUnit100y();
                                    setAllPeriods(periodList);
                                    setTimeConfig2({ ...timeConfig2, level: newLv, period: periodList[0] });
                                }
                                if (newLv === 1) {
                                    const periodList = getPeriodListUnit1y();
                                    setAllPeriods(periodList);
                                    setTimeConfig2({ ...timeConfig2, level: newLv, period: periodList[0] });
                                }
                                if (newLv === 2) {
                                    const periodList = getPeriodListUnit1m();
                                    setAllPeriods(periodList);
                                    setTimeConfig2({ ...timeConfig2, level: newLv, period: periodList[0] });
                                }
                            }
                        }}
                      
                    >
                        {clvs.map((option) => {
                            return (
                                <MenuItem key={option.id} value={option.id} disabled={!option.isActive}>{option.cevel}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                {/* //! 1000year */}
                {/* <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }} >
                    <Autocomplete
                        disablePortal
                        size='small'
                        options={allPeriods}
                        sx={{ width: 200 }}
                        value={timeConfig2.period}
                        disabled={timeConfig2.level === 0}
                        onChange={(e, value) => {
                            if (value && value?.date !== timeConfig2.period?.date) {
                                setTimeConfig2({ ...timeConfig2, period: value as cDateOption });
                            }
                        }}
                        renderInput={(params) => <TextField {...params} error={timeConfig2.period === null} label="Period" />}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ height: 40 }}
                        onClick={() => {
                            setTimeConfig(timeConfig2);
                        }}
                    >
                        OK
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ height: 40 }}
                        onClick={() => {
                            setTimeConfig2(timeConfig);
                        }}
                    >
                        Reset
                    </Button>
                </FormGroup> */}
            </WLeft>
            <WMid>
                <IconButton aria-label="delete" 
                    title={`Back ${clvs[timeConfig2.level].cevel}`}
                    onClick={() => {
                        switch (clvs[timeConfig2.level].cevel) {
                            case tl.decade:
                                break;
                            case tl.year:
                                break;
                            case tl.month:
                                break;
                            case tl.week:
                                setTimeFrom(dateToCDate(getDate$LastMonday(new Date(TIList[0].date))));
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
                    title={`Next ${clvs[timeConfig2.level].cevel}`}
                    onClick={() => {
                        switch (clvs[timeConfig2.level].cevel) {
                            case tl.decade:
                                break;
                            case tl.year:
                                break;
                            case tl.month:
                                break;
                            case tl.week:
                                setTimeFrom(dateToCDate(getDate$NextMonday(new Date(TIList[0].date))));
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
            <div style={{width: 200}}></div>
        </WBar>
    )
}

