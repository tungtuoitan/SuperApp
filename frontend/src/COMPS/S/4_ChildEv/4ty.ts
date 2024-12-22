import {Ev} from "../TLTypes";

export type BlackMiniProps = {
    childId: number,
    parentWidth?: number,
    isBeggerGang?: boolean,
}


export type ChildEvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}

export type DotGroupProps = {
    childEv: Ev;
}

export type DotProps = {
    bg?: string;
}

export type IGrabEdge = {
    id: number | null;
    position: 'left' | 'right';
    mouseenter: boolean;
    mousedownAtGE: boolean;
}

export type ParentEvProps = {
    childEvs: Ev[];
    parentEv: Ev;
    lineOrder: number;
    isBeggerGang?: boolean;
}

export type GrabEdgeProps = {
    id: number,
    position: 'left' | 'right'
    type?: 'parent' | 'child'
}