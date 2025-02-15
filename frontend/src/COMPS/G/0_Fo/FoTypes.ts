import {ResultOptions} from "../../S/TLTypes";

export type Fo = 
{ 
    id: string;
    name: string;
    shortName?: string;
    iconId?: string;

    parentId?: string;
    activeC: string;
    prioriC: string;
    description?: string;
    pinIndex?: string;
};

export type FosResult = {
    fos: Fo[];
    options: ResultOptions;
}