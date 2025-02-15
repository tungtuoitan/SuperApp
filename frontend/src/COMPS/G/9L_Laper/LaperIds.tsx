
import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./3Lui";
import {LaperIdsProps} from "./3Lty";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";


export default function LaperIds(props: LaperIdsProps) {
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const parentIdSelector = helperMUIcss.getTextFieldCSSSelector("parentId");
    const evIdSelector = helperMUIcss.getTextFieldCSSSelector("evID");
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find(fotail => fotail.id === props.id) ?? {} as FotailForm;

    return (
        <WRow>
            <TextField
                id="evId"
                name="id"
                label="ID"
                value={fotail.id}
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
                value={fotail.parentId}
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
   