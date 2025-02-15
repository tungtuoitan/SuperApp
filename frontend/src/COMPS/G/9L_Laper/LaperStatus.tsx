import {
    FormControl,
    FormLabel,
} from "@mui/material";
import {WRow} from "./3Lui";
import {LaperStatusProps} from "./3Lty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";

export default function LaperStatus(props: LaperStatusProps) {
    const { handleChange } = useFotailHelpers();
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail =
        fotails.find((fotail) => fotail.id === props.id) ?? ({} as FotailForm);

    return (
        <WRow>
            <FormControl
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgb(199, 199, 199)",
                    borderRadius: "5px",
                    height: "30px",
                    width: "100%",
                }}
            >
                <FormLabel
                    sx={{
                        textAlign: "left",
                        fontSize: 10,
                        position: "relative",
                        width: 42,
                        background: "white",
                        top: "-8px",
                        left: "10px",
                        padding: "0 5px 0 5px",
                    }}
                >
                    Status
                </FormLabel>
                {/* <RadioGroup
                    name="statusC"
                    value={fotail.statusC}
                    onChange={(e) => {
                        handleChange(fotail.id, e.target.name, e.target.value);
                    }}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        position: "relative",
                        top: "-19px",
                        padding: "0 10px 0 10px",
                    }}
                >
                    <FormControlLabel
                        value={sr.status.open.c}
                        control={<Radio size="small" />}
                        label={sr.status.open.d}
                    />
                    <FormControlLabel
                        value={sr.status.inProgress.c}
                        control={<Radio size="small" />}
                        label={sr.status.inProgress.d}
                    />
                    <FormControlLabel
                        value={sr.status.resolved.c}
                        control={<Radio size="small" />}
                        label={sr.status.resolved.d}
                    />
                </RadioGroup> */}
            </FormControl>
        </WRow>
    );
}
