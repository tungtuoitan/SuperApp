import {
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    styled,
    TextField,
    Tooltip,
} from "@mui/material";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { _3css } from "../3_TimeConfig/3css";
import { helperMUIcss } from "../../Helpers/HelperMUIcss";
import { useEtailHelpers } from "./EtailHelper";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { clvs, sr } from "../TLConstants";
import { useEtailFormStore } from "./EtailFormStore";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { iuEv } from "../TLAPIs";
import { cDateToUTCDate, dateToCDate } from "../3_TimeConfig/TimeHelpers";
import { useSnackbar } from "notistack";
import { useSRsStore } from "../8_SRs/SRsStore";
import {useEffect} from "react";

const EtailPaper = styled(Paper)({
    display: "flex",
    flexFlow: "column",
    margin: 0,
    padding: 20,
    flex: 1,
    [`& .card-content`]: {
        margin: "10px 0",
        [`& .MuiPaper-root.MuiPaper-elevation`]: {
            marginBottom: 0,
        },
    },
});

const WBar = styled("div")({
    height: 50,
    width: "100%",
    background: "white",
    margin: "0 0 10px 0",
});

const WBody = styled("div")({
    display: "flex",
    gap: 10,
    width: "100%",
    height: "calc(100% - 50px)",
    padding: "0 10px 10px 10px",
});

const WRow = styled("div")({
    display: "flex",
    gap: 10,

    width: "100%",
    margin: "0 0 16px 0",
});

type EtailProps = {
    id: number;
};
export default function Etail(props: EtailProps) {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const [etailForm, setEtailForm] = useEtailFormStore();
    const { enqueueSnackbar } = useSnackbar();
    const { handleChange } = useEtailHelpers();

    const dpSelector = helperMUIcss.getDatePickerCSSSelector();
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const parentIdSelector = helperMUIcss.getTextFieldCSSSelector("parentId");
    const evIdSelector = helperMUIcss.getTextFieldCSSSelector("evID");
    const levelSelector = helperMUIcss.getSelectCSSSelector();
    const { levelOptions } = useSRsStore();

    useEffect(() => {
        console.log('etailForm', etailForm.prioriC);
    }, [etailForm]);
    
    const Bar = () => {
        const saveEtail = (e: any) => {
            const ev = allEvs.find((ev) => ev.id === props.id);
            if (ev) {
                const x = {
                    ...ev,
                    id: ev.id,
                    name: etailForm.name,
                    parentId: etailForm.parentId ?? null,
                    levelC: etailForm.levelC ?? sr.hour.c,
                    timeStart: cDateToUTCDate(etailForm.timeStart),
                    timeEnd: cDateToUTCDate(etailForm.timeEnd),
                    activeC: etailForm.activeC,
                    statusC: etailForm.statusC,
                    prioriC: etailForm.prioriC,
                }
                iuEv(x).then((data: any) => {
                    if (data.options.success) {
                        enqueueSnackbar(data.options.message, {
                            variant: "success",
                            autoHideDuration: 3000,
                        });
                    } else {
                        enqueueSnackbar(data.options.message, {
                            variant: "error",
                            autoHideDuration: 3000,
                        });
                    }
                });
            }
        };
        const cancelEtail = (e: any) => {
            // cancel etail here ....
        };
        return (
        <WBar>
            <Tooltip title="Save">
                <span>
                    <IconButton onClick={(e) => saveEtail(e)}>
                        <CheckOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Cancel">
                <span>
                    <IconButton onClick={(e) => cancelEtail(e)}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </WBar>
    )}
    const Ids = () => (
        <WRow>
            <TextField
                id="evId"
                name="id"
                label="ID"
                value={etailForm.id}
                disabled
                sx={{
                    width: "100%", // 50(width of 2 GrabEdges)
                    height: 30,
                    [`& ${evNameSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${evIdSelector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0 0 0 10px",
                    },
                }}
            />
            <TextField
                id="parentId"
                name="parentId"
                label="Parent ID"
                disabled
                value={etailForm.parentId}
                onChange={(e) => {
                    // update name here ....
                }}
                sx={{
                    width: "100%", // 50(width of 2 GrabEdges)
                    height: 30,
                    [`& ${parentIdSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${parentIdSelector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -9,
                    },
                    [`& ${parentIdSelector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0 0 0 10px",
                    },
                    [`& ${parentIdSelector.legend3}`]: {
                        width: "48px",
                    },
                }}
            />
        </WRow>
    );
    const EvName = () => (
        <WRow>
            <TextField
                id={"evName" + etailForm.id}
                name="name"
                label="Event Name"
                value={etailForm.name}
                onChange={(e) => {
                    // setEtailForm({ name: e.target.value });
                    if (e.target && e.target.value && e.target.name) {
                        handleChange(e.target.name, e.target.value);
                    }
                }}
                sx={{
                    width: "100%",
                    height: 30,
                    textAlign: "center",
                    [`& ${evNameSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${evNameSelector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -9,
                    },
                    [`& ${evNameSelector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0px 0px 0 10px",
                    },
                    [`& ${evNameSelector.legend3}`]: {
                        width: "60px",
                    },
                }}
            />
        </WRow>
    );
    const Level = () => (
        <WRow>
            <FormControl
                sx={{
                    textAlign: "left",
                    height: 30,
                    width: "100%",
                    margin: 0,
                    [`& ${levelSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${levelSelector.div1}`]: {
                        height: 30,
                    },
                    [`& ${levelSelector.div2}`]: {
                        padding: "0px 0px 0 10px",
                        fontSize: "12px",
                        height: 30,
                        lineHeight: "30px",
                    },
                    [`& ${levelSelector.legend2}`]: {
                        width: 32,
                    },
                }}
            >
                <InputLabel id="timeLevelLabel">Level</InputLabel>
                <Select
                    labelId="timeLevelLabel"
                    name="level"
                    id="levelSelect"
                    value={etailForm.levelC ?? sr.hour.c}
                    label="Current Cevel"
                    onChange={(e) => {
                        if (e.target && e.target.name && e.target.value) {
                            handleChange(e.target.name, e.target.value);
                        }
                    }}
                >
                    {levelOptions.map((option) => {
                        return (
                            <MenuItem
                                key={option.id}
                                value={option.code.toLowerCase()}
                            >
                                {option.desc}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </WRow>
    );
    const TimeStart = () => (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date Start"
                    name="dateStart"
                    className="dateStartPicker"
                    value={new Date(etailForm.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange("dateStart", newValue);
                        }
                    }}
                    sx={{
                        height: 30,
                        width: "calc((100% - 10px)/2)", // 10px is gap
                        [`& ${dpSelector.div1}`]: {
                            height: 30,
                        },
                        [`& ${dpSelector.label1Shrink}`]: {
                            fontSize: "12px",
                            top: 3,
                        },
                        [`& ${dpSelector.label1NoShrink}`]: {
                            top: -8,
                        },
                        [`& ${dpSelector.input2}`]: {
                            height: 30,
                            padding: "0px 0px 0 10px",
                            fontSize: "12px",
                        },
                        [`& ${dpSelector.button3}`]: {
                            // height: 30,
                            padding: "0 !important",
                        },
                        [`& ${dpSelector.legend3}`]: {
                            width: "53px",
                        },
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    className="timeStartPicker"
                    name="timeStart"
                    label="Time Start"
                    value={new Date(etailForm.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange("timeStart", newValue);
                        }
                    }}
                    sx={{
                        height: 30,
                        width: "calc((100% - 10px)/2)", // 10px is gap
                        [`& ${dpSelector.div1}`]: {
                            height: 30,
                        },
                        [`& ${dpSelector.label1NoShrink}`]: {
                            top: -8,
                        },
                        [`& ${dpSelector.label1Shrink}`]: {
                            fontSize: "12px",
                            top: 3,
                        },
                        [`& ${dpSelector.input2}`]: {
                            height: 30,
                            padding: "0px 0px 0 10px",
                            fontSize: "12px",
                        },
                        [`& ${dpSelector.button3}`]: {
                            // height: 30,
                            padding: "0 !important",
                        },
                        [`& ${dpSelector.legend3}`]: {
                            width: "53px",
                        },
                    }}
                />
            </LocalizationProvider>
        </WRow>
    );
    const TimeEnd = () => (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date End"
                    name="dateEnd"
                    className="DateEndPicker"
                    value={new Date(etailForm.timeEnd)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange("dateEnd", newValue);
                        }
                    }}
                    sx={{
                        height: 30,
                        width: "calc((100% - 10px)/2)", // 10px is gap
                        [`& ${dpSelector.div1}`]: {
                            height: 30,
                        },
                        [`& ${dpSelector.label1Shrink}`]: {
                            fontSize: "12px",
                            top: 3,
                        },
                        [`& ${dpSelector.label1NoShrink}`]: {
                            top: -8,
                        },
                        [`& ${dpSelector.input2}`]: {
                            height: 30,
                            padding: "0px 0px 0 10px",
                            fontSize: "12px",
                        },
                        [`& ${dpSelector.button3}`]: {
                            // height: 30,
                            padding: "0 !important",
                        },
                        [`& ${dpSelector.legend3}`]: {
                            width: "53px",
                        },
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    className="timeEndPicker"
                    name="timeEnd"
                    label="Time End"
                    value={new Date(etailForm.timeEnd)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange("timeEnd", newValue);
                        }
                    }}
                    sx={{
                        height: 30,
                        width: "calc((100% - 10px)/2)", // 10px is gap
                        [`& ${dpSelector.div1}`]: {
                            height: 30,
                        },
                        [`& ${dpSelector.label1NoShrink}`]: {
                            top: -8,
                        },
                        [`& ${dpSelector.label1Shrink}`]: {
                            fontSize: "12px",
                            top: 3,
                        },
                        [`& ${dpSelector.input2}`]: {
                            height: 30,
                            padding: "0px 0px 0 10px",
                            fontSize: "12px",
                        },
                        [`& ${dpSelector.button3}`]: {
                            // height: 30,
                            padding: "0 !important",
                        },
                        [`& ${dpSelector.legend3}`]: {
                            width: "53px",
                        },
                    }}
                />
            </LocalizationProvider>
        </WRow>
    );

    const Status = () => {
        return (
        <WRow>
            <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgb(199, 199, 199)',
                borderRadius: '5px',
                height: '30px',
                width: '100%',
            }}>
                <FormLabel 
                    sx={{
                        textAlign: 'left', 
                        fontSize: 10, 
                        position: 'relative', 
                        width: 42, 
                        background: 'white',
                        top: '-8px',
                        left: '10px',
                        padding: '0 5px 0 5px',
                    }}
                >Status</FormLabel>
                <RadioGroup 
                name="status" 
                value={etailForm.statusC} 
                onChange={(e)=>{
                    handleChange('status', e.target.value)
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '12px',
                    position: 'relative',
                    top: '-19px',
                    padding: '0 10px 0 10px',
                }}
                >
                    <FormControlLabel value={sr.status.open.c} control={<Radio size="small"/>} label={sr.status.open.d} />
                    <FormControlLabel value={sr.status.inProgress.c} control={<Radio size="small" />} label={sr.status.inProgress.d} />
                    <FormControlLabel value={sr.status.resolved.c} control={<Radio size="small" />} label={sr.status.resolved.d} />
                </RadioGroup>
            </FormControl>
        </WRow>
    )}

    const Priority = () => {
        return (
        <WRow>
            <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgb(199, 199, 199)',
                borderRadius: '5px',
                height: '30px',
                width: '100%',
            }}>
                <FormLabel 
                    sx={{
                        textAlign: 'left', 
                        fontSize: 10, 
                        position: 'relative', 
                        width: 42, 
                        background: 'white',
                        top: '-8px',
                        left: '10px',
                        padding: '0 5px 0 5px',
                    }}
                >Priority</FormLabel>
                <RadioGroup 
                name="status" 
                value={etailForm.prioriC} 
                onChange={(e)=>{
                    handleChange('priority', e.target.value)
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '12px',
                    position: 'relative',
                    top: '-19px',
                    padding: '0 10px 0 10px',
                }}
                >
                    <FormControlLabel value={sr.priority.high.c} control={<Radio size="small"/>} label={sr.priority.high.d} />
                    <FormControlLabel value={sr.priority.medium.c} control={<Radio size="small" />} label={sr.priority.medium.d} />
                    <FormControlLabel value={sr.priority.normal.c} control={<Radio size="small" />} label={sr.priority.normal.d} />
                    <FormControlLabel value={sr.priority.low.c} control={<Radio size="small" />} label={sr.priority.low.d} />
                </RadioGroup>
            </FormControl>
        </WRow>
    )}


    //! ###################################################################################################
    return (
        <>
            <div
                style={{
                    margin: 0,
                    padding: "20px 0 0 0",
                    gap: 10,
                    width: "100%",
                    height: "100%",
                    flex: 1,
                }}
            >
                {Bar()}
                <WBody>
                    <EtailPaper>
                        {Ids()}
                        {EvName()}
                        {Level()}
                        {TimeStart()}
                        {TimeEnd()}
                        {Status()}
                        {Priority()}
                    </EtailPaper>
                    <EtailPaper></EtailPaper>
                    <EtailPaper></EtailPaper>
                </WBody>
            </div>
        </>
    );
}
