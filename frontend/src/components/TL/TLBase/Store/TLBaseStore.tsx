
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../../TLTypes";
import { TI } from "../../TLConfigs";




export interface TLBaseContextData {
    spotlightMoment: Date;
    setSpotlightMoment: Dispatch<SetStateAction<Date>>;
    curTIList: TI[];
    setCurTIList: Dispatch<SetStateAction<TI[]>>;
    curTIL: number;
    setCurTIL: Dispatch<SetStateAction<number>>;
    timeTypeChange: boolean;
    setTimeTypeChange: Dispatch<SetStateAction<boolean>>
    ratio: React.MutableRefObject<number>;
    X$TLBaseContainer_spotlight: React.MutableRefObject<number>;
    

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
    curTIL: 27,
    setCurTIL: () => {},
    timeTypeChange: false,
    setTimeTypeChange: () => {},
    ratio: {current: 0.5},
    X$TLBaseContainer_spotlight: {current: 0},

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
    
    const [curTIL, setCurTIL] = useState<number>(18); 
    const [timeTypeChange, setTimeTypeChange] = useState<boolean>(false); // là TIL mà chuột hover vào

    
    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState<boolean>(false);
    const wheeling = useRef<boolean>(false);
    const scrollByHand = useRef<boolean>(true);
    
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

                curTIL,
                setCurTIL,
                timeTypeChange,
                setTimeTypeChange,
                ratio,
                X$TLBaseContainer_spotlight,

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