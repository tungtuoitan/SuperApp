import {cDate, Ev, ResultOptions} from "../S/TLTypes";
import {Kesult} from "./10_Rialog/10ty";
import {Pesult} from "./3_Petail/3ty";

export type Pr = {
        id: string,
        name: string,
        
        timeStart: cDate,
        timeEnd: cDate|null,
        parentId: string,
        
        activeC: string,
        statusC: string,
        prioriC: string,
        
        fink: string|null,
        desc: string|null,

        types: string,
        repeatType: string,
        pesults: (Pesult|Kesult)[],
        knowC: string,
        knowLevelC: string,
     }



export type Pr2 = Omit<Pr, 'pesults'> & {pesults: string};     
export type PrsResult = {
    prs: Pr2[];
    options: ResultOptions;
}


