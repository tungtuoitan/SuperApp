import {CSSProperties} from "react";
import {Ev} from "../TLTypes";

export type IconGroupProps = {
    childEv: Ev;
    sx?: CSSProperties;
}

export type CeventNameProps = {
    childName: string;
    sx?: CSSProperties;
}

export type CeventProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}