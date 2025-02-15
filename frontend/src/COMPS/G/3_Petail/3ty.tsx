import {cDate} from "../../S/TLTypes";
import {Pr} from "../GTypes";

export type PetailForm = Omit<Pr,''>
export type PetailProps = {
    petailId: number;
};

export type Pesult = {
    id: number;
    prId: number;
    time: cDate;

    feasonCs: string;
    pesultC: string;

    fink: string;
    note: string;
    activeC: string;
}