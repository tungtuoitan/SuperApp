
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { TI } from "../TLConfigs";

export interface TLBaseBgContextData {
    TIList: TI[];
    setTIList: Dispatch<SetStateAction<TI[]>>;

    spotlightMoment: Date;
    setSpotlightMoment: Dispatch<SetStateAction<Date>>;

    zoomLv: number;
    setZoomLv: Dispatch<SetStateAction<number>>;

    spotRatio: React.MutableRefObject<number>;

    w$TIList: React.MutableRefObject<number>;
    w$BgLeft_spot: React.MutableRefObject<number>;
    w$70_spot: React.MutableRefObject<number>;
    

    TLBaseContainerRef: React.RefObject<HTMLDivElement>;
    TLBaseBgRef: React.RefObject<HTMLDivElement>;
    scrollByHand: React.MutableRefObject<boolean>;

    startX: React.MutableRefObject<number>;
    startScrollX: React.MutableRefObject<number>;

    mouseDown: boolean;
    setMouseDown: Dispatch<SetStateAction<boolean>>;
    
    mousePosition: { x: number, y: number };
    setMousePosition: Dispatch<SetStateAction<{ x: number; y: number; }>>

    loadingTL: boolean;
    setLoadingTL: Dispatch<SetStateAction<boolean>>;

    dateReal: Date;
    setDateReal: Dispatch<SetStateAction<Date>>;

};

export const TLBaseBgContextDefaultValue: TLBaseBgContextData = {

    TIList: [],
    setTIList: () => {},
    spotlightMoment: new Date(),
    setSpotlightMoment: () => {},

    zoomLv: 1,
    setZoomLv: () => {},

    spotRatio: {current: 0.5},

    w$TIList: {current: 0},
    w$BgLeft_spot: {current: 0},
    w$70_spot: {current: 0},

    TLBaseContainerRef: {current: null},
    TLBaseBgRef: {current: null},

    scrollByHand: {current: true},

    startX: {current: 0},
    startScrollX: {current: 0},

    mouseDown: false,
    setMouseDown: () => {},

    mousePosition: { x: 0, y: 0 },
    setMousePosition: () => {},

    loadingTL: false,
    setLoadingTL: () => {},

    dateReal: new Date(),
    setDateReal: () => {},
};
const TLBaseBgStore = createContext<TLBaseBgContextData>(TLBaseBgContextDefaultValue);

export const useTLBaseBgStore = () => useContext(TLBaseBgStore);
export const TLBaseBgProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [TIList, setTIList] = useState<TI[]>([]);
    const [spotlightMoment, setSpotlightMoment] = useState<Date>(new Date()); // là TI mà chuột hover vào
    const spotRatio = useRef<number>(0.5);
    
    const [zoomLv, setZoomLv] = useState<number>(1);
    
    const scrollByHand = useRef<boolean>(true);
    
    const w$70_spot = useRef<number>(0);
    const w$BgLeft_spot = useRef<number>(0);

    const w$TIList = useRef<number>(0);
    const TLBaseContainerRef = useRef<null| HTMLDivElement>(null);
    const TLBaseBgRef = useRef<null| HTMLDivElement>(null);

    const startX = useRef<number>(0);
    const startScrollX = useRef<number>(0);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [loadingTL, setLoadingTL] = useState<boolean>(true);

    const [dateReal, setDateReal] = useState<Date>(new Date());


    return (
        <TLBaseBgStore.Provider
            value={{
                TIList,
                setTIList,

                spotlightMoment,
                setSpotlightMoment,

                zoomLv,
                setZoomLv,

                spotRatio,
                w$TIList,
                w$BgLeft_spot,
                w$70_spot,

                TLBaseContainerRef,
                TLBaseBgRef,
                scrollByHand,

                startX,
                startScrollX,

                mouseDown,
                setMouseDown,

                mousePosition,
                setMousePosition,

                loadingTL,
                setLoadingTL,

                dateReal,
                setDateReal,

            }}>
            {children}
        </TLBaseBgStore.Provider>
    )
}