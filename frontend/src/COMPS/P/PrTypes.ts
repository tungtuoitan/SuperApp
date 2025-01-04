import {cDate, Ev, ResultOptions} from "../S/TLTypes";

export type Pr = 
    (Omit<Ev, 'isOverlap' | 'isLateNight' | 'lineOrder' | 'subType' | 'evelC' | 'levelC' | 'subType' | 'type'>)
    & { 
        types: string;
        repeatType: string;
        history: string;
     };

export type PrsResult = {
    prs: Pr[];
    options: ResultOptions;
}