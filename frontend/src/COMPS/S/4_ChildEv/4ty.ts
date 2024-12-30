import {CSSProperties} from "react";
import {Ev} from "../TLTypes";

export type BlackMiniProps = {
    childId: number,
    parentWidth?: number,
    isBegger?: boolean,
    sx?: CSSProperties
}


export type ChildEvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}

export type DotGroupProps = {
    childEv: Ev;
    sx?: CSSProperties;
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
    top: number;
    index: number;
}

export type GrabEdgeProps = {
    id: number,
    position: 'left' | 'right'
    type?: 'parent' | 'child',
    sx?: CSSProperties
}

export type MiNimeProps = {
    width: number;
    childName: string;
}