import {
    TextField,
} from "@mui/material";
import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {WRow} from "./5Lui";
import {LaperNameProps} from "./5Lty";

export default function LaperName(props: LaperNameProps) {
    const { handleChange } = useEtailHelpers();
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

     return (   
        <WRow>
            <TextField
                id={"evName" + etail.id}
                name="name"
                label="Event Name"
                value={etail.name??''}
                autoComplete="off"
                onChange={(e) => {
                    // setEtailForm({ name: e.target.value });
                    if (e.target && e.target.name) {
                        handleChange(etail.id, e.target.name, e.target.value??'');
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
   