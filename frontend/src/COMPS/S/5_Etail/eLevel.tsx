import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { _3css } from "../3_TimeConfig/3css";
import { helperMUIcss } from "../../CommonHelpers/5_MUIcss";
import { useEtailHelpers } from "./EtailHelper";
import { clvs, sr } from "../TLConstants";
import { useSRsStore } from "../8_SRs/SRsStore";
import {useEtailFormStore} from "./EtailFormsStore";
import {EtailForm} from "./EtailType";
import { WRow} from "./5uis";

type EtailProps = {
    id: number;
};
export default function ELevel(props: EtailProps) {
    const { handleChange } = useEtailHelpers();
    const levelSelector = helperMUIcss.getSelectCSSSelector();
    const { levelOptions } = useSRsStore();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

    return (
        <WRow>
            <FormControl
                sx={{
                    textAlign: "left",
                    height: 30,
                    width: "100%",
                    margin: 0,
                    [`& ${levelSelector.label1Shrink}`]: {
                        fontSize: "12px",
                        top: 3,
                    },
                    [`& ${levelSelector.div1}`]: {
                        height: 30,
                    },
                    [`& ${levelSelector.div2}`]: {
                        padding: "0px 0px 0 10px",
                        fontSize: "12px",
                        height: 30,
                        lineHeight: "30px",
                    },
                    [`& ${levelSelector.legend2}`]: {
                        width: 32,
                    },
                }}
            >
                <InputLabel id="timeLevelLabel">Level</InputLabel>
                <Select
                    labelId="timeLevelLabel"
                    name="levelC"
                    id="levelSelect"
                    value={etail.levelC ?? sr.hour.c}
                    label="Current Cevel"
                    onChange={(e) => {
                        if (e.target && e.target.name && e.target.value) {
                            handleChange(etail.id, e.target.name, e.target.value);
                        }
                    }}
                >
                    {levelOptions.map((option) => {
                        return (
                            <MenuItem
                                key={option.id}
                                value={option.code.toLowerCase()}
                            >
                                {option.desc}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </WRow>
    );
}