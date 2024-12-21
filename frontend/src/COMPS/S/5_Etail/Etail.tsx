import { _3css } from "../3_TimeConfig/3css";
import { useEffect } from "react";
import { useEtailFormStore } from "./EtailFormsStore";
import { EtailForm } from "./EtailType";
import { EtailContainer, EtailPaper, WBar, WBody, WRow } from "./5uis";
import { EBar } from "./eBar";
import EIds from "./eIds";
import EName from "./eName";
import ELevel from "./eLevel";
import ETimeStart from "./eTimeStart";
import EtimeEnd from "./eTimeEnd";
import EPriority from "./ePriority";
import EStatus from "./eStatus";

type EtailProps = {
    id: number;
};
export default function Etail(props: EtailProps) {
    const [etails, dispatch] = useEtailFormStore();
    const etail =
        etails.find((etail) => etail.id === props.id) ?? ({} as EtailForm);

    useEffect(() => {
        console.log("etail", etail);
    }, [etail]);

    return (
        <EtailContainer>
            <EBar id={props.id} />
            <WBody>
                <EtailPaper>
                    <EIds id={props.id} />
                    <EName id={props.id} />
                    <ELevel id={props.id} />
                    <ETimeStart id={props.id} />
                    <EtimeEnd id={props.id} />
                    <EStatus id={props.id} />
                    <EPriority id={props.id} />
                </EtailPaper>
                <EtailPaper></EtailPaper>
                <EtailPaper></EtailPaper>
            </WBody>
        </EtailContainer>
    );
}
