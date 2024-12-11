
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { TI } from "../TLTypes";

export interface TLBaseBgContextData {
    TIList: TI[];
    setTIList: Dispatch<SetStateAction<TI[]>>;
    zoomLv: number;
    setZoomLv: Dispatch<SetStateAction<number>>;
    dateReal: Date;
    setDateReal: Dispatch<SetStateAction<Date>>;

    spotRatio: React.MutableRefObject<number>;
    w$FrameLeft_spot: React.MutableRefObject<number>;

    TLBaseFrameRef: React.RefObject<HTMLDivElement>;
    TLBaseBgRef: React.RefObject<HTMLDivElement>;
    scrollByHand: React.MutableRefObject<boolean>;

    startX: React.MutableRefObject<number>;
    startScrollX: React.MutableRefObject<number>;
    mouseDown: boolean;
    setMouseDown: Dispatch<SetStateAction<boolean>>;
    
    loadingTL: boolean;
    setLoadingTL: Dispatch<SetStateAction<boolean>>;
    
};

export const TLBaseBgContextDefaultValue: TLBaseBgContextData = {
    TIList: [],
    setTIList: () => {},
    zoomLv: 1,
    setZoomLv: () => {},
    dateReal: new Date(),
    setDateReal: () => {},

    spotRatio: {current: 0.5},
    w$FrameLeft_spot: {current: 0},

    TLBaseFrameRef: {current: null},
    TLBaseBgRef: {current: null},
    scrollByHand: {current: true},

    startX: {current: 0},
    startScrollX: {current: 0},
    mouseDown: false,
    setMouseDown: () => {},

    loadingTL: false,
    setLoadingTL: () => {},

};
const TLBaseBgStore = createContext<TLBaseBgContextData>(TLBaseBgContextDefaultValue);

export const useTLBaseBgStore = () => useContext(TLBaseBgStore);
export const TLBaseBgProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [TIList, setTIList] = useState<TI[]>([]);
    const [zoomLv, setZoomLv] = useState<number>(1);
    const spotRatio = useRef<number>(0.5);
    const TLBaseFrameRef = useRef<null| HTMLDivElement>(null);
    const TLBaseBgRef = useRef<null| HTMLDivElement>(null);
    const [dateReal, setDateReal] = useState<Date>(new Date());
    
    const w$FrameLeft_spot = useRef<number>(0);
    
    const startX = useRef<number>(0);
    const startScrollX = useRef<number>(0);
    const scrollByHand = useRef<boolean>(true);
    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [loadingTL, setLoadingTL] = useState<boolean>(true);

    return (
        <TLBaseBgStore.Provider
        value={{
                TIList,
                setTIList,
                zoomLv,
                setZoomLv,
                dateReal,
                setDateReal,

                spotRatio,
                w$FrameLeft_spot,

                TLBaseFrameRef,
                TLBaseBgRef,
                scrollByHand,

                startX,
                startScrollX,
                mouseDown,
                setMouseDown,

                loadingTL,
                setLoadingTL,


            }}>
            {children}
        </TLBaseBgStore.Provider>
    )
}