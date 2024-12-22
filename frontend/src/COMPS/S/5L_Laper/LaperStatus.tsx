import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {sr} from "../TLConstants";
import {EtailForm} from "../5_Etail/5ty";
import {WRow} from "./5Lui";
import {LaperStatusProps} from "./5Lty";

export default function LaperStatus(props: LaperStatusProps) {
    const { handleChange } = useEtailHelpers();
    const [etails, dispatch] = useEtailFormStore();
    const etail =
        etails.find((etail) => etail.id === props.id) ?? ({} as EtailForm);

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
                <RadioGroup
                    name="statusC"
                    value={etail.statusC}
                    onChange={(e) => {
                        handleChange(etail.id, e.target.name, e.target.value);
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
                </RadioGroup>
            </FormControl>
        </WRow>
    );
}
