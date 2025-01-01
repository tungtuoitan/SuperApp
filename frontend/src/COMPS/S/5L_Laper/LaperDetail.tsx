import {TextField} from "@mui/material";
import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {WRow} from "./5Lui";
import {LaperNameProps} from "./5Lty";

export default function LaperDetail(props: LaperNameProps) {
    const { handleChange } = useEtailHelpers();
    const evDescSelector = helperMUIcss.getTextFieldMultipleLineCSSSelector("evDesc");
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

     return (   
        <WRow>
            <TextField
                id={"evDetail" + etail.id}
                name="desc"
                label="Description"
                multiline
                minRows={4}
                value={etail.desc??''}
                spellCheck={false}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(etail.id, e.target.name, e.target.value??'');
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
   