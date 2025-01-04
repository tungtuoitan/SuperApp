import {cDate, Ev, ResultOptions} from "../S/TLTypes";

export type Pr = 
    (Omit<Ev, 'isOverlap' | 'isLateNight' | 'lineOrder' | 'subType' | 'evelC' | 'levelC' | 'subType' | 'type' | 'timeEnd'>)
    & { 
        types: string;
        repeatType: string;
        history: string;
        timeEnd: cDate|null;
     };

export type PrsResult = {
    prs: Pr[];
    options: ResultOptions;
}