import {WRow} from "./3Lui";
import {LaperTimeStartProps} from "./3Lty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";

export default function LaperTimeStartTimeEnd(props: LaperTimeStartProps) {
    const { handleChange } = useFotailHelpers();
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find(fotail => fotail.id === props.id) ?? {} as FotailForm;
    
    return (
        <WRow>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StartDatePicker
                    label="Date Start"
                    name="dateStart"
                    className="dateStartPicker"
                    value={new Date(fotail.timeStart)}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange(fotail.id, "timeStart", newValue);
                        }
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <EndDatePicker
                label="Date End"
                name="timeEnd"
                className="DateEndPicker"
                value={fotail.timeEnd ? new Date(fotail.timeEnd) : null}
                onChange={(newValue) => {
                    if (newValue) {
                        handleChange(fotail.id, 'timeEnd', newValue);
                    }
                }}
            />
        </LocalizationProvider> */}
        </WRow>
    );
}