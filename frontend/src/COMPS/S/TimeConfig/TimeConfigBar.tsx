import { Autocomplete, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { clvs, tl } from "../TLConstants";
import { getPeriodListUnit100y, getPeriodListUnit1y, getPeriodListUnit1m, getDate$MondayOfCurrentWeek, useTLBaseBgHelpers, getDate$FirstDayOfCurrentMonth, getDate$FirstDayOfCurrentYear, getDate$FirstDayOfCurrentDecade, getDate$FirstDayOfCurrentCentury } from "../TLBaseBg/TLBaseBgHelpers";
import { timeConfig, useTimeConfigStore } from "./TimeConfigStore";
import { useEffect } from "react";
import { cDateOption } from "../TLTypes";

export const TimeConfigBar = () => {
    const {
        timeConfig,
        setTimeConfig,
        timeConfig2,
        setTimeConfig2,

        allPeriods,
        setAllPeriods, 
    } = useTimeConfigStore();
    const { dateToCDate } = useTLBaseBgHelpers();

    // init các value mặc định / tương tự từ userProfile load lên
    useEffect(() => {
        const initClevel = 4; //! điều chỉnh CLevel ban đầu tại đây
        const period = clvs[initClevel].Clevel === tl.century
            ? {id: 0, label: 'century now', date: dateToCDate(getDate$FirstDayOfCurrentCentury())}
            : clvs[initClevel].Clevel === tl.decade
            ? {id: 0, label: 'decade now', date: dateToCDate(getDate$FirstDayOfCurrentDecade())}
            : clvs[initClevel].Clevel === tl.year
            ? {id: 0, label: 'year now', date: dateToCDate(getDate$FirstDayOfCurrentYear())}
            : clvs[initClevel].Clevel === tl.month
            ? {id: 0, label: 'month now', date: dateToCDate(getDate$FirstDayOfCurrentMonth())}
            : clvs[initClevel].Clevel === tl.week
            ? {id: 0, label: 'week now', date: dateToCDate(getDate$MondayOfCurrentWeek())}
            : null;

        const timeConfigInit = { level: initClevel, period } as timeConfig

        if (timeConfigInit.level === 1) setAllPeriods(getPeriodListUnit1y());
        if (timeConfigInit.level === 2) setAllPeriods(getPeriodListUnit1m());

        setTimeConfig(timeConfigInit);
        setTimeConfig2(timeConfigInit);
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
            }}>
            <FormControl
                style={{
                    width: 200,
                    marginBottom: 10,
                    textAlign: 'left',
                }}
            >
                {/* //! Level */}
                <InputLabel id="demo-simple-select-label">Current Level</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                            <MenuItem key={option.id} value={option.id} disabled={option.status === 'off'}>{option.Clevel}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>

            {/* //! 1000year */}
            <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }} >
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
            </FormGroup>
        </div>
    )
}