import {FormControl,InputLabel,MenuItem,Select} from "@mui/material";
import {LaperLevelProps} from "./3Lty";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {WRow} from "./3Lui";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";


export default function LaperRepeatType(props: LaperLevelProps) {
    const { handleChange } = useFotailHelpers();
    const levelSelector = helperMUIcss.getSelectCSSSelector();
    const { repeatTypeOptions } = useSRsStore();
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find(fotail => fotail.id === props.id) ?? {} as FotailForm;

    return (
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
                        width: 64,
                    },
                }}
            >
                <InputLabel id="repeatType">Repeat Type</InputLabel>
                {/* <Select
                    labelId="repeatType"
                    name="repeatType"
                    id="repeatTypeSelect"
                    value={fotail.repeatType}
                    label="Current Repeat Type"
                    onChange={(e) => {
                        if (e.target && e.target.name && e.target.value) {
                            handleChange(fotail.id, e.target.name, e.target.value);
                        }
                    }}
                >
                    {repeatTypeOptions.map((option) => {
                        return (
                            <MenuItem
                                key={option.id}
                                value={option.code.toLowerCase()}
                            >
                                {option.desc}
                            </MenuItem>
                        );
                    })}
                </Select> */}
            </FormControl>
        </WRow>
    );
}