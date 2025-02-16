import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {FigmaButton, WRow} from "./3Lui";
import {LaperFinkProps} from "./3Lty";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";
import {TextField} from "@mui/material";

export default function LaperFink(props: LaperFinkProps) {
    const { handleChange } = useFotailHelpers();
    const selector = helperMUIcss.getTextFieldCSSSelector("fink");
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find((fotail:FotailForm) => fotail.id === props.id) ?? {} as FotailForm;

    return (   
        <WRow>
            <TextField
                id={"fink" + fotail.id}
                name="fink"
                label="FigJam Link"
                value={fotail.fink??''}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(fotail.id, e.target.name, e.target.value??'');
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
            <FigmaButton fink={fotail.fink??''} />
        </WRow>
    )
}
   