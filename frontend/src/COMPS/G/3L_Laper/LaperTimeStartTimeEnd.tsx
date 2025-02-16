import {
    LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {EndDatePicker, StartDatePicker, StartTimePicker, WRow} from "./3Lui";
import {LaperTimeStartProps} from "./3Lty";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";
import {cDate} from "../../S/TLTypes";
import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";

export default function LaperTimeStartTimeEnd(props: LaperTimeStartProps) {
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
                            handleChange(petail.id, "timeStart", dateToCDate(newValue));
                        }
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <EndDatePicker
                label="Date End"
                name="timeEnd"
                className="DateEndPicker"
                value={petail.timeEnd ? new Date(petail.timeEnd) : null}
                onChange={(newValue) => {
                    if (newValue) {
                        handleChange(petail.id, 'timeEnd', dateToCDate(newValue));
                    }
                }}
            />
        </LocalizationProvider>
        </WRow>
    );
}