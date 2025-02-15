import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {FigmaButton, WRow} from "./3Lui";
import {LaperFinkProps} from "./3Lty";
import {PetailForm} from "../3_Petail/3ty";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";

export default function LaperFink(props: LaperFinkProps) {
    const { handleChange } = usePetailHelpers();
    const selector = helperMUIcss.getTextFieldCSSSelector("fink");
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find((petail:PetailForm) => petail.id === props.id) ?? {} as PetailForm;

    return (   
        <WRow>
            <TextField
                id={"fink" + petail.id}
                name="fink"
                label="FigJam Link"
                value={petail.fink??''}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(petail.id, e.target.name, e.target.value??'');
                    }
                }}
                sx={{
                    width: "100%",
                    height: 30,
                    textAlign: "center",
                    [`& ${selector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${selector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -9,
                    },
                    [`& ${selector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0px 10px 0 10px",
                    },
                    [`& ${selector.legend3}`]: {
                        width: "54px",
                    },
                }}
            />
            <FigmaButton fink={petail.fink??''} />
        </WRow>
    )
}
   