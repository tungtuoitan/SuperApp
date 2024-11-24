
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";

export interface TLBaseContextData {
    spotlightMoment: Date;
    setSpotlightMoment: Dispatch<SetStateAction<Date>>;

    zoomLv: number;
    setZoomLv: Dispatch<SetStateAction<number>>;

    ratio: React.MutableRefObject<number>;

    mili$TLBaseContainer_spotlight: React.MutableRefObject<number>;
    px$TLBaseContainerLeft_spotlight: React.MutableRefObject<number>;
    w$TLBaseContent: React.MutableRefObject<number>;
    mili$TLBaseContentLeft_spotlight: React.MutableRefObject<number>;
    mili$70_spotlight: React.MutableRefObject<number>;
    

    TLBaseContainerRef: React.RefObject<HTMLDivElement>;
    TLBaseContentRef: React.RefObject<HTMLDivElement>;
    scrollByHand: React.MutableRefObject<boolean>;

    startX: React.MutableRefObject<number>;
    startScrollX: React.MutableRefObject<number>;

    mouseDown: boolean;
    setMouseDown: Dispatch<SetStateAction<boolean>>;
    
    position: { x: number, y: number };
    setPosition: Dispatch<SetStateAction<{ x: number; y: number; }>>

    loadingTL: boolean;
    setLoadingTL: Dispatch<SetStateAction<boolean>>;

};

export const TLBaseContextDefaultValue: TLBaseContextData = {
    spotlightMoment: new Date(),
    setSpotlightMoment: () => {},

    zoomLv: 1,
    setZoomLv: () => {},

    ratio: {current: 0.5},

    mili$TLBaseContainer_spotlight: {current: 0},
    px$TLBaseContainerLeft_spotlight: {current: 0},
    w$TLBaseContent: {current: 0},
    mili$TLBaseContentLeft_spotlight: {current: 0},
    mili$70_spotlight: {current: 0},

    TLBaseContainerRef: {current: null},
    TLBaseContentRef: {current: null},

    scrollByHand: {current: true},

    startX: {current: 0},
    startScrollX: {current: 0},

    mouseDown: false,
    setMouseDown: () => {},

    position: { x: 0, y: 0 },
    setPosition: () => {},

    loadingTL: false,
    setLoadingTL: () => {},
};
const TLBaseStore = createContext<TLBaseContextData>(TLBaseContextDefaultValue);

export const useTLBaseStore = () => useContext(TLBaseStore);
export const TLBaseProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [spotlightMoment, setSpotlightMoment] = useState<Date>(new Date()); // là TI mà chuột hover vào
    const ratio = useRef<number>(0.5);
    
    const [zoomLv, setZoomLv] = useState<number>(1);
    
    const scrollByHand = useRef<boolean>(true);
    
    const mili$70_spotlight = useRef<number>(0);
    const mili$TLBaseContentLeft_spotlight = useRef<number>(0);
    const w$TLBaseContent = useRef<number>(0);
    const mili$TLBaseContainer_spotlight = useRef<number>(0);
    const px$TLBaseContainerLeft_spotlight = useRef<number>(0);

    
    const TLBaseContainerRef = useRef<null| HTMLDivElement>(null);
    const TLBaseContentRef = useRef<null| HTMLDivElement>(null);

    const startX = useRef<number>(0);
    const startScrollX = useRef<number>(0);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [loadingTL, setLoadingTL] = useState<boolean>(false);

    return (
        <TLBaseStore.Provider
            value={{
                spotlightMoment,
                setSpotlightMoment,

                zoomLv,
                setZoomLv,

                ratio,

                mili$TLBaseContainer_spotlight,
                px$TLBaseContainerLeft_spotlight,
                w$TLBaseContent,
                mili$TLBaseContentLeft_spotlight,
                mili$70_spotlight,

                TLBaseContainerRef,
                TLBaseContentRef,
                scrollByHand,

                startX,
                startScrollX,

                mouseDown,
                setMouseDown,

                position,
                setPosition,

                loadingTL,
                setLoadingTL,

            }}>
            {children}
        </TLBaseStore.Provider>
    )
}