
import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./5ui";
import {AdiIdsProps} from "./5ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {Pesult, PetailForm} from "../3_Petail/3ty";
import {usePridContainerStore} from "../2_PridContainer/PridContainerStore";
import {Pr} from "../PrTypes";
import {useADiStore} from "./ADiStore";
import {useADiaHelpers} from "./ADiaHelpers";


export default function AdiIds(props: AdiIdsProps) {
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const parentIdSelector = helperMUIcss.getTextFieldCSSSelector("parentId");
    const evIdSelector = helperMUIcss.getTextFieldCSSSelector("evID");
    const { handleChange } = useADiaHelpers();
    const { aDia, setADia } = useADiStore();

    return (
        <WRow>
            <TextField
                id="pesultId"
                name="id"
                label="Pesult ID"
                value={aDia?.pesult.id ?? ''}
                disabled
                sx={{
                    width: "100%", // 50(width of 2 GrabEdges)
                    height: 30,
                    [`& ${evNameSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${evNameSelector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -9,
                    },
                    [`& ${evIdSelector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0 0 0 10px",
                    },
                }}
            />
            <TextField
                id="prId"
                name="prId"
                label="Pr ID"
                disabled
                value={aDia?.pesult.prId ?? ''}
                onChange={(e) => {
                    // update name here ....
                }}
                sx={{
                    width: "100%", // 50(width of 2 GrabEdges)
                    height: 30,
                    [`& ${parentIdSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${parentIdSelector.label1NoShrink}`]: {
                        fontSize: "12px",
                        top: -9,
                    },
                    [`& ${parentIdSelector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0 0 0 10px",
                    },
                    [`& ${parentIdSelector.legend3}`]: {
                        width: "48px",
                    },
                }}
            />
        </WRow>
    )
}
   