import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./3Lui";
import {LaperNameProps} from "./3Lty";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";

export default function LaperDesc(props: LaperNameProps) {
    const { handleChange } = useFotailHelpers();
    const evDescSelector = helperMUIcss.getTextFieldMultipleLineCSSSelector("evDesc");
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find(fotail => fotail.id === props.id) ?? {} as FotailForm;

     return (   
        <WRow>
            <TextField
                id={"evDetail" + fotail.id}
                name="desc"
                label="Description"
                multiline
                minRows={4}
                value={fotail.desc??''}
                spellCheck={false}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(fotail.id, e.target.name, e.target.value??'');
                    }
                }}
                sx={{
                    width: "100%",
                    height: 30,
                    textAlign: "center",
                    [`& ${evDescSelector.div1}`]: {
                        padding: '10px',
                    },
                    [`& ${evDescSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${evDescSelector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -9,
                    },
                    [`& ${evDescSelector.textarea2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0px 0px 0 10px",
                        lineHeight: '16px',
                    },
                    [`& ${evDescSelector.legend3}`]: {
                        width: "60px",
                    },
                }}
            />
        </WRow>
    )
}
   