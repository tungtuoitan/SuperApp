import {
    LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {StartDatePicker, StartTimePicker, WRow} from "./5Lui";
import {LaperTimeStartProps} from "./5Lty";

export default function LaperTimeStart(props: LaperTimeStartProps) {
    const { handleChange } = useEtailHelpers();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;
    
    return (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StartDatePicker
                    label="Date Start"
                    name="dateStart"
                    className="dateStartPicker"
                    value={new Date(etail.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, "timeStart", newValue);
                        }
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StartTimePicker
                    className="timeStartPicker"
                    name="timeStart"
                    label="Time Start"
                    value={new Date(etail.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, "timeStart", newValue);
                        }
                    }}
                />
            </LocalizationProvider>
        </WRow>
    );
}