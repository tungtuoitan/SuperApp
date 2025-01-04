import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./3Lui";
import {LaperNameProps} from "./3Lty";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";

export default function LaperDetail(props: LaperNameProps) {
    const { handleChange } = usePetailHelpers();
    const evDescSelector = helperMUIcss.getTextFieldMultipleLineCSSSelector("evDesc");
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === props.id) ?? {} as PetailForm;

     return (   
        <WRow>
            <TextField
                id={"evDetail" + petail.id}
                name="desc"
                label="Description"
                multiline
                minRows={4}
                value={petail.desc??''}
                spellCheck={false}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(petail.id, e.target.name, e.target.value??'');
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
   