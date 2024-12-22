import { _3css } from "../3_TimeConfig/3css";
import { useEffect } from "react";
import { useEtailFormStore } from "./EtailFormsStore";
import { EtailContainer, LeftEtailPaper, MidEtailPaper, RightEtailPaper, WBody } from "./5ui";
import {EtailBar} from "./EtailBar";
import LIds from "../5L_Laper/LaperIds";
import LName from "../5L_Laper/LaperName";
import LaperLevel from "../5L_Laper/LaperLevel";
import LTimeStart from "../5L_Laper/LaperTimeStart";
import LTimeEnd from "../5L_Laper/LaperTimeEnd";
import LStatus from "../5L_Laper/LaperStatus";
import LPriority from "../5L_Laper/LaperPriority";
import {EtailForm, EtailProps} from "./5ty";


export default function Etail(props: EtailProps) {
    const { etailId } = props;
    const [etails, dispatch] = useEtailFormStore();
    const etail =
        etails.find((etail) => etail.id === etailId) ?? ({} as EtailForm);

    useEffect(() => {
        console.log("etail", etail);
    }, [etail]);

    return (
        <EtailContainer>
            <EtailBar id={etailId} />
            <WBody>
                <LeftEtailPaper>
                    <LIds id={etailId} />
                    <LName id={etailId} />
                    <LaperLevel id={etailId} />
                    <LTimeStart id={etailId} />
                    <LTimeEnd id={etailId} />
                    <LStatus id={etailId} />
                    <LPriority id={etailId} />
                </LeftEtailPaper>
                <MidEtailPaper></MidEtailPaper>
                <RightEtailPaper></RightEtailPaper>
            </WBody>
        </EtailContainer>
    );
}
