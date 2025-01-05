import {cDate, Ev, ResultOptions} from "../S/TLTypes";
import {Pesult} from "./3_Petail/3ty";

export type Pr = 
    (Omit<Ev, 'isOverlap' | 'isLateNight' | 'lineOrder' | 'subType' | 'evelC' | 'levelC' | 'subType' | 'type' | 'timeEnd'>)
    & { 
        types: string;
        repeatType: string;
        pesults: Pesult[];
        timeEnd: cDate|null;
     };


export type Pr2 = Omit<Pr, 'pesults'> & {pesults: string};     
export type PrsResult = {
    prs: Pr2[];
    options: ResultOptions;
}