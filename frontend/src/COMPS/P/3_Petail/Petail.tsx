import { useEffect } from "react";
import { EtailContainer, LeftEtailPaper, MidEtailPaper, RightEtailPaper, WBody } from "./3ui";
import {EtailBar} from "./PetailBar";
import {PetailForm, PetailProps} from "./3ty";
import LaperIds from "../3L_Laper/LaperIds";
import LaperName from "../3L_Laper/LaperName";
import LaperTimeStart from "../3L_Laper/LaperTimeStart";
import LaperTimeEnd from "../3L_Laper/LaperTimeEnd";
import LaperStatus from "../3L_Laper/LaperStatus";
import {LowPriority} from "@mui/icons-material";
import LaperFink from "../3L_Laper/LaperFink";
import LaperPriority from "../3L_Laper/LaperPriority";
import LaperType from "../3L_Laper/LaperType";
import LaperSubType from "../3L_Laper/LaperSubType";
import {usePetailFormStore} from "./PetailFormsStore";
import LaperDetail from "../3L_Laper/LaperDetail";



export default function Etail(props: PetailProps) {
    const { petailId } = props;
    const [petails, dispatch] = usePetailFormStore();
    const petail =
        petails.find((petail:PetailForm) => petail.id === petailId) ?? ({} as PetailForm);

    useEffect(() => {
        // console.log("petail", petail.type);
    }, [petail]);

    return (
        <EtailContainer>
            <EtailBar id={petailId} />
            <WBody>
                <LeftEtailPaper>
                    <LaperIds id={petailId} />
                    <LaperName id={petailId} />
                    {/* <LaperLevel id={petailId} />
                    <LaperTimeStart id={petailId} />
                    <LaperTimeEnd id={petailId} />
                    <LaperStatus id={petailId} />
                    <LaperPriority id={petailId} />
                    <LaperFink id={petailId} />
                    <LaperType id={petailId} />
                    <LaperSubType id={petailId} /> */}
                </LeftEtailPaper>
                <MidEtailPaper>
                    {/* <LaperDetail id={petailId} /> */}
                </MidEtailPaper>
                <RightEtailPaper></RightEtailPaper>
            </WBody>
        </EtailContainer>
    );
}
