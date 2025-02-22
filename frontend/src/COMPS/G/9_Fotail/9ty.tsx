import {cDate} from "../../S/TLTypes";
import {Fo} from "../0_Fo/FoTypes";




export type FotailForm = Omit<Fo,''>
export type FotailProps = {
    fotailId: string;
};

export type Fosult = {
    id: string;
    prId: string;
    time: cDate;

    feasonCs: string;
    pesultC: string;

    fink: string;
    note: string;
    activeC: string;
}

export type FotailBarProps = {
    id: string;
};