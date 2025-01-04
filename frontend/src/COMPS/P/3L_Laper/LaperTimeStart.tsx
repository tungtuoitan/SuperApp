import {
    LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {StartDatePicker, StartTimePicker, WRow} from "./3Lui";
import {LaperTimeStartProps} from "./3Lty";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";

export default function LaperTimeStart(props: LaperTimeStartProps) {
    const { handleChange } = usePetailHelpers();
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === props.id) ?? {} as PetailForm;
    
    return (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StartDatePicker
                    label="Date Start"
                    name="dateStart"
                    className="dateStartPicker"
                    value={new Date(petail.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(petail.id, "timeStart", newValue);
                        }
                    }}
                />
            </LocalizationProvider>
        </WRow>
    );
}