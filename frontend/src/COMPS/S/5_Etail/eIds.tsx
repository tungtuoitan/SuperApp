
import { _3css } from "../3_TimeConfig/3css";
import { helperMUIcss } from "../../CommonHelpers/5_MUIcss";

import {useEtailFormStore} from "./EtailFormsStore";
import {EtailForm} from "./EtailType";
import {EtailPaper, WBar, WBody, WRow} from "./5uis";
import {TextField} from "@mui/material";

type EtailProps = {
    id: number;
};
export default function EIds(props: EtailProps) {
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const parentIdSelector = helperMUIcss.getTextFieldCSSSelector("parentId");
    const evIdSelector = helperMUIcss.getTextFieldCSSSelector("evID");
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

    return (
        <WRow>
            <TextField
                id="evId"
                name="id"
                label="ID"
                value={etail.id}
                disabled
                sx={{
                    width: "100%", // 50(width of 2 GrabEdges)
                    height: 30,
                    [`& ${evNameSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${evIdSelector.input2}`]: {
                        fontSize: "12px",
                        height: 30,
                        padding: "0 0 0 10px",
                    },
                }}
            />
            <TextField
                id="parentId"
                name="parentId"
                label="Parent ID"
                disabled
                value={etail.parentId}
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
   