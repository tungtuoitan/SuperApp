import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./5ui";
import {AdiNameProps} from "./5ty";
import {useADiStore} from "./ADiStore";
import {useADiaHelpers} from "./ADiaHelpers";

export default function AdiDesc(props: AdiNameProps) {
    const evDescSelector = helperMUIcss.getTextFieldMultipleLineCSSSelector("evDesc");
    const { aDia, setADia } = useADiStore();
    const { handleChange } = useADiaHelpers();

     return (   
        <WRow>
            <TextField
                id={"pesultNote" + aDia?.pesult.id}
                name="note"
                label="Note"
                multiline
                minRows={4}
                value={aDia?.pesult?.note??''}
                spellCheck={false}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(e.target.name, e.target.value??'');
                    }
                }}
                sx={{
                    width: "100%",
                    // height: 30,
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
                        height: 150,
                        padding: "0px 0px 0 10px",
                        lineHeight: '16px',
                    },
                    [`& ${evDescSelector.legend3}`]: {
                        width: "32px",
                    },
                }}
            />
        </WRow>
    )
}
   