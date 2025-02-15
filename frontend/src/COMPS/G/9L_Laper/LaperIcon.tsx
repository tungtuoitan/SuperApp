import {FormControl,InputLabel,MenuItem,Select} from "@mui/material";
import {LaperLevelProps} from "./3Lty";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {WRow} from "./3Lui";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";
import {allIcons} from "../../MainNav/Nhe";
import {GenericAutoComplete} from "../../CommonHelpers/4_GenericAutoComplete";


export default function LaperIcon(props: LaperLevelProps) {
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
                        top: 2,
                    },
                    [`& ${levelSelector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -10,
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
                        width: 28,
                    },
                }}
            >
                <InputLabel id="icon">Icon</InputLabel>
                <Select
                    labelId="iconId"
                    name="iconId"
                    id="iconId"
                    value={fotail.iconId}
                    label="Current Repeat Type"
                    onChange={(e) => {
                        if (e.target && e.target.name && e.target.value) {
                            handleChange(fotail.id, e.target.name, e.target.value);
                        }
                    }}
                >
                    {allIcons({sx: { fontSize:20, color: 'gray' }}).map((option) => {
                        return (
                            <MenuItem
                                key={option.code}
                                value={option.code.toLowerCase()}
                                sx={{display: "flex", gap: '8px', justifyContent: 'flex-start'}}
                            >
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    {option.icon}
                                </div>
                                <div>
                                    {option.code}
                                </div>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </WRow>
    );
}