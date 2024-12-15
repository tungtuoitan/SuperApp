import { cDate, CevelC } from "../TLTypes";


export type EtailForm = {
    id: number;
    parentId: number|null;
    name: string;
    levelC: CevelC;
    timeStart: cDate;
    timeEnd: cDate;
    type: string|null;
}