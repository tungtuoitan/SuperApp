
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

    mili$TLBaseContainer_spotlight: React.MutableRefObject<number>;
    px$TLBaseContainerLeft_spotlight: React.MutableRefObject<number>;

    w$TLBaseContent: React.MutableRefObject<number>;
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
    position: { x: number, y: number };
    setPosition: Dispatch<SetStateAction<{ x: number; y: number; }>>
    isFirstTimeInit: boolean;
    setIsFirstTimeInit: Dispatch<SetStateAction<boolean>>;
};

export const TLBaseContextDefaultValue: TLBaseContextData = {
    spotlightMoment: new Date(),
    setSpotlightMoment: () => {},
    curTIList: Array(50).fill([]),
    setCurTIList: () => {},

    curL: {TILid: 3, timeTypeChange: false, zoomLv: 1},
    setCurL: () => {},

    ratio: {current: 0.5},

    mili$TLBaseContainer_spotlight: {current: 0},
    px$TLBaseContainerLeft_spotlight: {current: 0},

    w$TLBaseContent: {current: 0},
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

    position: { x: 0, y: 0 },
    setPosition: () => {},
    isFirstTimeInit: true,
    setIsFirstTimeInit: () => {},



};
const TLBaseStore = createContext<TLBaseContextData>(TLBaseContextDefaultValue);

export const useTLBaseStore = () => useContext(TLBaseStore);

export const TLBaseProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [ curTIList, setCurTIList] = useState<TI[]>( Array(100).fill([]));
    const [spotlightMoment, setSpotlightMoment] = useState<Date>(new Date()); // là TI mà chuột hover vào
    const ratio = useRef<number>(0.5);
    
    const [curL, setCurL] = useState<curL>({TILid: 2, timeTypeChange: false, zoomLv: 5}); //!
    
    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState<boolean>(false);
    const wheeling = useRef<boolean>(false);
    const scrollByHand = useRef<boolean>(true);
    
    //
    const mili$70_spotlight = useRef<number>(0);
    //
    const mili$TLBaseContentLeft_spotlight = useRef<number>(0);
    const w$TLBaseContent = useRef<number>(0);
    //
    const mili$TLBaseContainer_spotlight = useRef<number>(0);
    const px$TLBaseContainerLeft_spotlight = useRef<number>(0);

    
    const TLBaseContainerRef = useRef<null| HTMLDivElement>(null);
    const TLBaseContentRef = useRef<null| HTMLDivElement>(null);

    const startX = useRef<number>(0);
    const startScrollX = useRef<number>(0);

    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isFirstTimeInit, setIsFirstTimeInit] = useState<boolean>(true);
    

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

                mili$TLBaseContainer_spotlight,
                px$TLBaseContainerLeft_spotlight,

                w$TLBaseContent,
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

                position,
                setPosition,
                isFirstTimeInit,
                setIsFirstTimeInit,
            }}>
            {children}
        </TLBaseStore.Provider>
    )
}