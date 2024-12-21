import { _3css } from "../3_TimeConfig/3css";
import { useEffect } from "react";
import { useEtailFormStore } from "./EtailFormsStore";
import { EtailForm } from "./EtailType";
import { EtailContainer, EtailPaper, WBar, WBody, WRow } from "./5uis";
import EIds from "./Left/eIds";
import EName from "./Left/eName";
import ELevel from "./Left/eLevel";
import EPriority from "./Left/ePriority";
import EStatus from "./Left/eStatus";
import ETimeStart from "./Left/eTimeStart";
import EtimeEnd from "./Left/eTimeEnd";
import {Bar} from "./Bar";

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
            <Bar id={props.id} />
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
