import { cDate } from "../TLTypes";


export type EtailForm = {
    id: number;
    parentId: number|null;
    name: string;
    level: string;
    timeStart: cDate;
    timeEnd: cDate;
    type: string|null;
}