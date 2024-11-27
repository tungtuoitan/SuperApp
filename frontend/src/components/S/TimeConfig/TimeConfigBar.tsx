import { Autocomplete, Button, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { lvList, cDateOption } from "../TLConfigs";
import { getPeriodListUnit1000y, getInYearsList, getPeriodListUnit100y, parseCDate, getPeriodListUnit1y, getPeriodListUnit1m } from "../TLBaseBg/TLBaseBgHelpers";
import { timeConfig, useTimeConfigStore } from "./TimeConfigStore";
import { useEffect } from "react";

export const TimeConfigBar = () => {
    const {
        timeConfig,
        setTimeConfig,
        timeConfig2,
        setTimeConfig2,

        allPeriods,
        setAllPeriods,
    } = useTimeConfigStore();

    // init các value mặc định / tương tự từ userProfile load lên
    useEffect(() => {
        const list = getPeriodListUnit1m()
        const timeConfigInit = { level: 0, period: list[0] } as timeConfig

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
                    {lvList.map((option) => {
                        return (
                            <MenuItem key={option.id} value={option.id} disabled={option.status === 'off'}>{option.levelName}</MenuItem>
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