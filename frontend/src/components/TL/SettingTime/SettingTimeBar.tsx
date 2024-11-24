import { Autocomplete, Button, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { lvList, cDateOption, cDate, in1000YearsList, inMonthsList } from "../TLConfigs";
import { getInYearsList, parseCDate } from "../TLBase/TLBaseHelpers";
import { useSettingTimeStore } from "./SettingTimeStore";

export const SettingTimeBar = () => {
    const {
        timeConfig,
        setTimeConfig,
        inYearsList,
        setInYearsList,
    } = useSettingTimeStore();

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

                <InputLabel id="demo-simple-select-label">Current Level</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeConfig.level}
                    label="Current Level"
                    size='small'
                    onChange={(e) => {
                        const newLv = e.target.value as number;
                        const newInYearsList = getInYearsList(in1000YearsList[0].date) as cDateOption[];
                        const newTimeConfig = {
                            ...timeConfig,
                            level: newLv as number,
                            inYearsVal: lvList[newLv].levelName === 'year' || lvList[newLv].levelName === 'month'
                                ? newInYearsList[0]
                                : null,
                            inMonthsVal: lvList[newLv].levelName !== 'month'
                                ? null
                                : inMonthsList[0],
                        }
                        setInYearsList(newInYearsList);
                        setTimeConfig(newTimeConfig);

                    }}
                >
                    {lvList.map((option) => {
                        return (
                            <MenuItem key={option.id} value={option.id} disabled={option.status === 'off'}>{option.levelName}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>


            <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }} >
                <Autocomplete
                    disablePortal
                    size='small'
                    options={in1000YearsList}
                    sx={{ width: 200 }}
                    value={timeConfig.in1000YearsVal}
                    onChange={(e, value) => {
                        if (value && value?.date === timeConfig.in1000YearsVal?.date) {
                            const newInYearsList = getInYearsList(value.date) as cDateOption[];
                            setInYearsList(newInYearsList);
                            setTimeConfig({ ...timeConfig, in1000YearsVal: value as cDateOption, inYearsVal: newInYearsList[0] });
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label="Thousand Year" />}
                />
                <Autocomplete
                    disablePortal
                    size='small'
                    options={inYearsList}
                    sx={{ width: 150 }}
                    disabled={!(lvList[timeConfig.level].levelName === 'year' || lvList[timeConfig.level].levelName === 'month')}
                    value={timeConfig.inYearsVal}
                    onChange={(e, value) => {
                        setTimeConfig({ ...timeConfig, inYearsVal: value as cDateOption });
                    }}
                    renderInput={(params) => <TextField {...params} label="Year" />}
                />
                <Autocomplete
                    disablePortal
                    size='small'
                    options={inMonthsList}
                    disabled={!(lvList[timeConfig.level].levelName === 'month')}
                    sx={{ width: 150 }}
                    value={timeConfig.inMonthsVal}
                    onChange={(e, value) => {
                        setTimeConfig({ ...timeConfig, inMonthsVal: value as cDateOption });
                    }}
                    renderInput={(params) => <TextField {...params} label="Month" />}
                />
                <Button
                    variant="contained"
                    size="small"
                    sx={{ height: 40 }}
                    disabled={true}
                    onClick={() => {

                    }}
                >
                    OK
                </Button>
            </FormGroup>
        </div>
    )
}