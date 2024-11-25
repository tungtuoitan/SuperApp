
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { TI } from "../TLConfigs";

export interface TLBaseBgContextData {
    TIList: TI[];
    setTIList: Dispatch<SetStateAction<TI[]>>;

    spotlightMoment: Date;
    setSpotlightMoment: Dispatch<SetStateAction<Date>>;

    zoomLv: number;
    setZoomLv: Dispatch<SetStateAction<number>>;

    ratio: React.MutableRefObject<number>;

    mili$TLBaseBgContainer_spotlight: React.MutableRefObject<number>;
    px$TLBaseBgContainerLeft_spotlight: React.MutableRefObject<number>;
    w$TIList: React.MutableRefObject<number>;
    mili$TLBaseBgBackgroundLeft_spotlight: React.MutableRefObject<number>;
    mili$70_spotlight: React.MutableRefObject<number>;
    

    TLBaseContainerRef: React.RefObject<HTMLDivElement>;
    TLBaseBackgroundRef: React.RefObject<HTMLDivElement>;
    scrollByHand: React.MutableRefObject<boolean>;

    startX: React.MutableRefObject<number>;
    startScrollX: React.MutableRefObject<number>;

    mouseDown: boolean;
    setMouseDown: Dispatch<SetStateAction<boolean>>;
    
    position: { x: number, y: number };
    setPosition: Dispatch<SetStateAction<{ x: number; y: number; }>>

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

    ratio: {current: 0.5},

    mili$TLBaseBgContainer_spotlight: {current: 0},
    px$TLBaseBgContainerLeft_spotlight: {current: 0},
    w$TIList: {current: 0},
    mili$TLBaseBgBackgroundLeft_spotlight: {current: 0},
    mili$70_spotlight: {current: 0},

    TLBaseContainerRef: {current: null},
    TLBaseBackgroundRef: {current: null},

    scrollByHand: {current: true},

    startX: {current: 0},
    startScrollX: {current: 0},

    mouseDown: false,
    setMouseDown: () => {},

    position: { x: 0, y: 0 },
    setPosition: () => {},

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
    const ratio = useRef<number>(0.5);
    
    const [zoomLv, setZoomLv] = useState<number>(1);
    
    const scrollByHand = useRef<boolean>(true);
    
    const mili$70_spotlight = useRef<number>(0);
    const mili$TLBaseBgBackgroundLeft_spotlight = useRef<number>(0);
    const w$TIList = useRef<number>(0);
    const mili$TLBaseBgContainer_spotlight = useRef<number>(0);
    const px$TLBaseBgContainerLeft_spotlight = useRef<number>(0);

    
    const TLBaseContainerRef = useRef<null| HTMLDivElement>(null);
    const TLBaseBackgroundRef = useRef<null| HTMLDivElement>(null);

    const startX = useRef<number>(0);
    const startScrollX = useRef<number>(0);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
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

                ratio,
                mili$TLBaseBgContainer_spotlight,
                px$TLBaseBgContainerLeft_spotlight,
                w$TIList,
                mili$TLBaseBgBackgroundLeft_spotlight,
                mili$70_spotlight,

                TLBaseContainerRef,
                TLBaseBackgroundRef,
                scrollByHand,

                startX,
                startScrollX,

                mouseDown,
                setMouseDown,

                position,
                setPosition,

                loadingTL,
                setLoadingTL,

                dateReal,
                setDateReal,

            }}>
            {children}
        </TLBaseBgStore.Provider>
    )
}