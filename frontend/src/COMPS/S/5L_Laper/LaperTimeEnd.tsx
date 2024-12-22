
import {
    LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {EndDatePicker, EndTimePicker, WRow} from "./5Lui";
import {LaperTimeEndProps} from "./5Lty";

export default function LaperTimeEnd(props: LaperTimeEndProps) {
    const { handleChange } = useEtailHelpers();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;
    
    return (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <EndDatePicker
                    label="Date End"
                    name="timeEnd"
                    className="DateEndPicker"
                    value={new Date(etail.timeEnd)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, 'timeEnd', newValue);
                        }
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <EndTimePicker
                    className="timeEndPicker"
                    name="timeEnd"
                    label="Time End"
                    value={new Date(etail.timeEnd)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(etail.id, "timeEnd", newValue);
                        }
                    }}
                />
            </LocalizationProvider>
        </WRow>
    )
}
