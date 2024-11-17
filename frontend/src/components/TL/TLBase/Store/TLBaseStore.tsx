
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../../TLTypes";
import { curL, TI } from "../../TLConfigs";




export interface TLBaseContextData {
    spotlightMoment: Date;
    setSpotlightMoment: Dispatch<SetStateAction<Date>>;
    curTIList: TI[];
    setCurTIList: Dispatch<SetStateAction<TI[]>>;

    curL: curL;
    setCurL: Dispatch<SetStateAction<curL>>;

    ratio: React.MutableRefObject<number>;
    X$TLBaseContainer_spotlight: React.MutableRefObject<number>;

    mili$TLBaseContentLeft_spotlight: React.MutableRefObject<number>;
    mili$70_spotlight: React.MutableRefObject<number>;
    

    TLBaseContainerRef: React.RefObject<HTMLDivElement>;
    TLBaseContentRef: React.RefObject<HTMLDivElement>;
    infiniteScrollLoading: boolean;
    setInfiniteScrollLoading: Dispatch<SetStateAction<boolean>>;
    scrollByHand: React.MutableRefObject<boolean>;

    startX: React.MutableRefObject<number>;
    startScrollX: React.MutableRefObject<number>;

    mouseDown: boolean;
    setMouseDown: Dispatch<SetStateAction<boolean>>;
    mouseEnter: boolean;
    setMouseEnter: Dispatch<SetStateAction<boolean>>;
};

export const TLBaseContextDefaultValue: TLBaseContextData = {
    spotlightMoment: new Date(),
    setSpotlightMoment: () => {},
    curTIList: Array(50).fill([]),
    setCurTIList: () => {},

    curL: {TILid: 3, timeTypeChange: false},
    setCurL: () => {},

    ratio: {current: 0.5},
    X$TLBaseContainer_spotlight: {current: 0},

    mili$TLBaseContentLeft_spotlight: {current: 0},
    mili$70_spotlight: {current: 0},

    TLBaseContainerRef: {current: null},
    TLBaseContentRef: {current: null},
    infiniteScrollLoading: false,
    setInfiniteScrollLoading: () => {},
    scrollByHand: {current: true},

    startX: {current: 0},
    startScrollX: {current: 0},

    mouseDown: false,
    setMouseDown: () => {},
    mouseEnter: false,
    setMouseEnter: () => {},



};
const TLBaseStore = createContext<TLBaseContextData>(TLBaseContextDefaultValue);

export const useTLBaseStore = () => useContext(TLBaseStore);

export const TLBaseProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [ curTIList, setCurTIList] = useState<TI[]>( Array(50).fill([]));
    const [spotlightMoment, setSpotlightMoment] = useState<Date>(new Date()); // là TI mà chuột hover vào
    const ratio = useRef<number>(0.5);
    const X$TLBaseContainer_spotlight = useRef<number>(0);
    
    const [curL, setCurL] = useState<curL>({TILid: 3, timeTypeChange: false});

    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState<boolean>(false);
    const wheeling = useRef<boolean>(false);
    const scrollByHand = useRef<boolean>(true);

    const mili$TLBaseContentLeft_spotlight = useRef<number>(0);
    const mili$70_spotlight = useRef<number>(0);
    
    const TLBaseContainerRef = useRef<null| HTMLDivElement>(null);
    const TLBaseContentRef = useRef<null| HTMLDivElement>(null);

    const startX = useRef<number>(0);
    const startScrollX = useRef<number>(0);

    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);

    return (
        <TLBaseStore.Provider
            value={{
                spotlightMoment,
                setSpotlightMoment,
                curTIList,
                setCurTIList,

                curL,
                setCurL,

                ratio,
                X$TLBaseContainer_spotlight,

                mili$TLBaseContentLeft_spotlight,
                mili$70_spotlight,

                TLBaseContainerRef,
                TLBaseContentRef,
                infiniteScrollLoading,
                setInfiniteScrollLoading,
                scrollByHand,

                startX,
                startScrollX,

                mouseDown,
                setMouseDown,
                mouseEnter,
                setMouseEnter,
            }}>
            {children}
        </TLBaseStore.Provider>
    )
}