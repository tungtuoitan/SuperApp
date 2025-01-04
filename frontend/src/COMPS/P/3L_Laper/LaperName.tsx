import {
    TextField,
} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./3Lui";
import {LaperNameProps} from "./3Lty";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";

export default function LaperName(props: LaperNameProps) {
    const { handleChange } = usePetailHelpers();
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === props.id) ?? {} as PetailForm;

     return (   
        <WRow>
            <TextField
                id={"evName" + petail.id}
                name="name"
                label="Event Name"
                value={petail.name??''}
                onChange={(e) => {
                    // setEtailForm({ name: e.target.value });
                    if (e.target && e.target.name) {
                        handleChange(petail.id, e.target.name, e.target.value??'');
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
   