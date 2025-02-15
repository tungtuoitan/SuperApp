import {ResultOptions} from "../../S/TLTypes";

export type Fo = 
{ 
    id: number;
    name: string;
    shortName?: string;
    iconId?: number;

    parentId?: number;
    activeC: string;
    prioriC: string;
    description?: string;
    pinIndex?: number;
};

export type FosResult = {
    fos: Fo[];
    options: ResultOptions;
}