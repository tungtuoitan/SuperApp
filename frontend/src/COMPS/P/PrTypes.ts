import {cDate} from "../S/TLTypes";

export type Pr = {
    id: number;
    name: string;
    desc?: string;
    timeStart: cDate;
    timeEnd?: cDate;
    repeatType: string;
    parentId?: number;
    pypes: string;
    activeC: string;
    prioriC: string;
    history: string;
    note: string;
}



export type ResultOptions = {
        success: boolean;
        message?: string;
        reference?: string;
        reference2?: string;
        reference3?: string;
        reference4?: string;
        reference5?: string;
        object?: any;
        status?: number;
}

export type EvsResult = {
    evs: Pr[];
    options: ResultOptions;
}