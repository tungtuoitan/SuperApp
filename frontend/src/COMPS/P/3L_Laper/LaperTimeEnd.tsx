
import {
    LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {EndDatePicker, EndTimePicker, WRow} from "./3Lui";
import {LaperTimeEndProps} from "./3Lty";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";
import {cDate} from "../../S/TLTypes";

export default function LaperTimeEnd(props: LaperTimeEndProps) {
    const { handleChange } = usePetailHelpers();
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === props.id) ?? {} as PetailForm;
    
    return (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <EndDatePicker
                    label="Date End"
                    name="timeEnd"
                    className="DateEndPicker"
                    value={new Date(petail.timeEnd as cDate)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(petail.id, 'timeEnd', newValue);
                        }
                    }}
                />
            </LocalizationProvider>
        </WRow>
    )
}
