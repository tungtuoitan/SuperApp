import {ResultOptions} from "../../S/TLTypes";

export type Fo = 
{ 
    id: string;
    name: string;
    iconId: string;
    parentId: string;
    
    activeC: string;
    prioriC: string;

    desc?: string;
    fink?: string;
    pinIndex?: string;
};

export type FosResult = {
    fos: Fo[];
    options: ResultOptions;
}