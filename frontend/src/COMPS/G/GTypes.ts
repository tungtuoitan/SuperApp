import {cDate, Ev, ResultOptions} from "../S/TLTypes";
import {Pesult} from "./3_Petail/3ty";

export type Pr = {
        id: string,
        name: string,
        
        timeStart: cDate,
        parentId: string,
        
        activeC: string,
        statusC: string,
        prioriC: string,
        
        fink: string|null,
        desc: string|null,

        types: string,
        repeatType: string,
        pesults: Pesult[],
        timeEnd: cDate|null,
     }



export type Pr2 = Omit<Pr, 'pesults'> & {pesults: string};     
export type PrsResult = {
    prs: Pr2[];
    options: ResultOptions;
}


