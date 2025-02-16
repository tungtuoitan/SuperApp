import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./3Lui";
import {LaperNameProps} from "./3Lty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";

export default function LaperName(props: LaperNameProps) {
    const { handleChange } = useFotailHelpers();
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find(fotail => fotail.id === props.id) ?? {} as FotailForm;

     return (   
        <WRow>
            <TextField
                id={"prName" + fotail.id}
                name="name"
                label="Folder Name"
                value={fotail.name??''}
                onChange={(e) => {
                    // setEtailForm({ name: e.target.value });
                    if (e.target && e.target.name) {
                        handleChange(fotail.id, e.target.name, e.target.value??'');
                    }
                }}
                sx={{
                    width: "100%",
                    height: 30,
                    textAlign: "center",
                    [`& ${evNameSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${evNameSelector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -9,
                    },
                    [`& ${evNameSelector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0px 0px 0 10px",
                    },
                    [`& ${evNameSelector.legend3}`]: {
                        width: "60px",
                    },
                }}
            />
        </WRow>
    )
}
   