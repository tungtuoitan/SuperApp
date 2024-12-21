import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {useEtailHelpers} from "../EtailHelper";
import {helperMUIcss} from "../../../CommonHelpers/5_MUIcss";
import {useEtailFormStore} from "../EtailFormsStore";
import {EtailForm} from "../EtailType";
import {WRow} from "../5uis";

type EtailProps = {
    id: number;
};
export default function ETimeStart(props: EtailProps) {
    const { handleChange } = useEtailHelpers();
    const dpSelector = helperMUIcss.getDatePickerCSSSelector();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;
    
    return (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date Start"
                    name="dateStart"
                    className="dateStartPicker"
                    value={new Date(etail.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, "timeStart", newValue);
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
                    value={new Date(etail.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, "timeStart", newValue);
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
}