import {IconButton, TextField} from "@mui/material";
import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {FigmaButton, WRow} from "./5Lui";
import {LaperFinkProps} from "./5Lty";

export default function LaperFink(props: LaperFinkProps) {
    const { handleChange } = useEtailHelpers();
    const selector = helperMUIcss.getTextFieldCSSSelector("fink");
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

    return (   
        <WRow>
            <TextField
                id={"fink" + etail.id}
                name="fink"
                label="FigJam Link"
                value={etail.fink??''}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(etail.id, e.target.name, e.target.value??'');
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
            <FigmaButton fink={etail.fink??''} />
        </WRow>
    )
}
   