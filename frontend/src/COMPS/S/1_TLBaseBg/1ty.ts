import {cDate, CevelC} from "../TLTypes";

export type CellProps = {
    val?: string,
    borderLeft?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    borderBottom?: boolean,
    isMilestone?: boolean,
}

export type TLColumnProps = {
    val: string,
    id: string,
    val2?: string,
    width: string,
}

export type ContainerTIProps = {
    borderLeft?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    borderBottom?: boolean,
    isMilestone?: boolean,
    children?: React.ReactNode,
    width: number,
}



export type TIcProps = {
    date: cDate;
    TILevel: CevelC;
    width: number;
    index: number;
}