import { useEtailHelpers } from "../5_Etail/EtailHelpers";
import { useEtailFormStore } from "../5_Etail/EtailFormsStore";
import { EtailForm } from "../5_Etail/5ty";
import { FCType, FLType, RGType, WRow } from "./5Lui";
import { LaperTypeProps } from "./5Lty";
import {FormControlLabel,Radio} from "@mui/material";
import { evType } from "../TLConstants";

export default function LaperType(props: LaperTypeProps) {
    const { handleChange } = useEtailHelpers();
    const { id } = props;
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find((etail) => etail.id === id) ?? ({} as EtailForm);

    return (
        <WRow>
            <FCType>
                <FLType>Type</FLType>
                <RGType
                    name="type"
                    value={etail.type}
                    onChange={(e) => {
                        handleChange(etail.id, e.target.name, e.target.value);
                    }}
                >
                    {Object.values(evType).map((value, index) => (
                        <FormControlLabel
                            value={value}
                            control={<Radio size="small" />}
                            label={value}
                            key={index}
                        />
                    ))}
                </RGType>
            </FCType>
        </WRow>
    );
}