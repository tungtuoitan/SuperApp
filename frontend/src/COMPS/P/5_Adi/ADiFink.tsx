import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {FigmaButton, WRow} from "./5ui";
import {AdiFinkProps} from "./5ty";

import {useADiaHelpers} from "./ADiaHelpers";
import {useADiStore} from "./ADiStore";

export default function AdiFink(props: AdiFinkProps) {
    const selector = helperMUIcss.getTextFieldCSSSelector("fink");
    const { handleChange } = useADiaHelpers();
    const { aDia, setADia } = useADiStore();

    return (   
        <WRow>
            <TextField
                id={"fink" + aDia?.pesult.id}
                name="fink"
                label="FigJam Link"
                value={aDia?.pesult.fink??''}
                onChange={(e) => {
                    if (e.target && e.target.name) {
                        handleChange(e.target.name, e.target.value??'');
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
            <FigmaButton fink={aDia?.pesult.fink??''} />
        </WRow>
    )
}
   