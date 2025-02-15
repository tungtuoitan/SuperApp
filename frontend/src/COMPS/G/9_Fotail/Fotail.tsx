import { useEffect } from "react";
import { EtailContainer, LeftEtailPaper, RightPetailPaper, WBody } from "./9ui";
import {FotailBar} from "./FotailBar";
import LaperIds from "../9L_Laper/LaperIds";
import LaperName from "../9L_Laper/LaperName";
import LaperTimeStartTimeEnd from "../9L_Laper/LaperTimeStartTimeEnd";
import LaperStatus from "../9L_Laper/LaperStatus";
import LaperPriority from "../9L_Laper/LaperPriority";
import LaperFink from "../9L_Laper/LaperFink";
import LaperTypes from "../9L_Laper/LaperTypes";
import LaperRepeatType from "../9L_Laper/LaperRepeatType";
import {FotailForm, FotailProps} from "./9ty";
import {useFotailFormStore} from "./FotailFormsStore";


export default function Fotail(props: FotailProps) {
    const { fotailId } = props;
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find((fotail:FotailForm) => fotail.id === fotailId) ?? ({} as FotailForm);

    useEffect(() => {
        // console.log("fotail", fotail);
    }, [fotail]);

    return (
        <EtailContainer>
            <FotailBar id={fotailId} />
            <WBody>
                <LeftEtailPaper>
                    <LaperIds id={fotailId} />
                    <LaperName id={fotailId} />
                    {/* <LaperTimeStartTimeEnd id={fotailId} /> */}
                    {/* <LaperStatus id={fotailId} /> */}
                    <LaperPriority id={fotailId} />
                    {/* <LaperFink id={fotailId} /> */}
                    {/* <LaperRepeatType id={fotailId} /> */}
                    {/* <LaperTypes id={fotailId} /> */}
                    {/* <LaperDetail id={fotailId} /> */}
                </LeftEtailPaper>
                <RightPetailPaper>
                    {/* <PeridContainer fotailId={fotailId} /> */}
                </RightPetailPaper>
                {/* <RightEtailPaper></RightEtailPaper> */}
            </WBody>
        </EtailContainer>
    );
}
