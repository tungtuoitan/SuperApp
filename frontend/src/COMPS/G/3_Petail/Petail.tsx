import { useEffect } from "react";
import { EtailContainer, LeftEtailPaper, RightPetailPaper, WBody } from "./3ui";
import {PetailBar} from "./PetailBar";
import {PetailForm, PetailProps} from "./3ty";
import LaperIds from "../3L_Laper/LaperIds";
import LaperName from "../3L_Laper/LaperName";
import LaperStatus from "../3L_Laper/LaperStatus";
import LaperFink from "../3L_Laper/LaperFink";
import LaperPriority from "../3L_Laper/LaperPriority";
import {usePetailFormStore} from "./PetailFormsStore";
import LaperTimeStartTimeEnd from "../3L_Laper/LaperTimeStartTimeEnd";
import LaperTypes from "../3L_Laper/LaperTypes";
import LaperRepeat from "../3L_Laper/LaperRepeatType";
import LaperDetail from "../3L_Laper/LaperDesc";
import PeridContainer from "../4_PeridContainer/PeridContainer";
import {sr} from "../../S/TLConstants";

export default function Petail(props: PetailProps) {
    const { petailId } = props;
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find((petail:PetailForm) => petail.id === petailId) ?? ({} as PetailForm);

    useEffect(() => {
        // console.log("petail", petail, petailId);
    }, [petail]);

    return (
        <EtailContainer>
            <PetailBar id={petailId} />
            <WBody>
                <LeftEtailPaper>
                    <LaperIds id={petailId} />
                    <LaperName id={petailId} />
                    <LaperTimeStartTimeEnd id={petailId} />
                    <LaperStatus id={petailId} />
                    <LaperPriority id={petailId} />
                    <LaperFink id={petailId} />
                    <LaperRepeat id={petailId} />
                    <LaperTypes id={petailId} />
                </LeftEtailPaper>
                <RightPetailPaper>
                    <LaperDetail id={petailId} />
                    {!petail.types.includes(sr.knowledge.c) && 
                        <PeridContainer petailId={petailId} />}
                </RightPetailPaper>
                {/* <RightEtailPaper></RightEtailPaper> */}
            </WBody>
        </EtailContainer>
    );
}
