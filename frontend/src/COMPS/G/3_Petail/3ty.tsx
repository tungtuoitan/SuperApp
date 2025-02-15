import {cDate} from "../../S/TLTypes";
import {Pr} from "../GTypes";

export type PetailForm = Omit<Pr,''>
export type PetailProps = {
    petailId: string;
};

export type Pesult = {
    id: string;
    prId: string;
    time: cDate;

    feasonCs: string;
    pesultC: string;

    fink: string;
    note: string;
    activeC: string;
}
