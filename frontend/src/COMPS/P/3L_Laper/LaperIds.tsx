
import {TextField} from "@mui/material";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {WRow} from "./3Lui";
import {LaperIdsProps} from "./3Lty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";


export default function LaperIds(props: LaperIdsProps) {
    const evNameSelector = helperMUIcss.getTextFieldCSSSelector("evName");
    const parentIdSelector = helperMUIcss.getTextFieldCSSSelector("parentId");
    const evIdSelector = helperMUIcss.getTextFieldCSSSelector("evID");
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === props.id) ?? {} as PetailForm;

    return (
        <WRow>
            <TextField
                id="evId"
                name="id"
                label="ID"
                value={petail.id}
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
                value={petail.parentId}
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
   