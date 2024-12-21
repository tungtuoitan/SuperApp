import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { _3css } from "../3_TimeConfig/3css";
import { helperMUIcss } from "../../CommonHelpers/5_MUIcss";
import { useEtailHelpers } from "./EtailHelper";
import {useEtailFormStore} from "./EtailFormsStore";
import {EtailForm} from "./EtailType";
import {EtailPaper, WBar, WBody, WRow} from "./5uis";

type EtailProps = {
    id: number;
};
export default function EPriority(props: EtailProps) {
    const { handleChange } = useEtailHelpers();

    const dpSelector = helperMUIcss.getDatePickerCSSSelector();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

    return (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date End"
                    name="timeEnd"
                    className="DateEndPicker"
                    value={new Date(etail.timeEnd)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, 'timeEnd', newValue);
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
                    value={new Date(etail.timeEnd)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, "timeEnd", newValue);
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
    )
}