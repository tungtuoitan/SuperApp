import {cDate} from "../../S/TLTypes";
import {Fo} from "../0_Nav/FoTypes";




export type FotailForm = Omit<Fo,''>
export type FotailProps = {
    petailId: number;
};

export type Fosult = {
    id: number;
    prId: number;
    time: cDate;

    feasonCs: string;
    pesultC: string;

    fink: string;
    note: string;
    activeC: string;
}
