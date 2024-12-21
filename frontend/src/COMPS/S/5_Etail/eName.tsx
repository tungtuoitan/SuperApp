import {
    TextField,
} from "@mui/material";
import { _3css } from "../3_TimeConfig/3css";
import { helperMUIcss } from "../../CommonHelpers/5_MUIcss";
import { useEtailHelpers } from "./EtailHelper";
import {useEtailFormStore} from "./EtailFormsStore";
import {EtailForm} from "./EtailType";
import {EtailPaper, WBar, WBody, WRow} from "./5uis";

type EtailProps = {
    id: number;
};
export default function EName(props: EtailProps) {
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
                value={etail.name}
                onChange={(e) => {
                    // setEtailForm({ name: e.target.value });
                    if (e.target && e.target.value && e.target.name) {
                        handleChange(etail.id, e.target.name, e.target.value);
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
   