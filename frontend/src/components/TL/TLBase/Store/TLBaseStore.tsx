
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../../TLTypes";
import { TI } from "../../TLConfigs";




export interface TLBaseContextData {
    spotlightMoment: Date;
    setSpotlightMoment: Dispatch<SetStateAction<Date>>;
    curTIList: TI[];
    setCurTIList: Dispatch<SetStateAction<TI[]>>;
    curTIL: number;
    setCurTIL: Dispatch<SetStateAction<number>>;
    

    TLBaseContainerRef: React.RefObject<HTMLDivElement>;
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
    curTIL: 37,
    setCurTIL: () => {},

    TLBaseContainerRef: {current: null},
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
    const [curTIL, setCurTIL] = useState<number>(37); // là TIL mà chuột hover vào
    
    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState<boolean>(false);
    const wheeling = useRef<boolean>(false);
    const scrollByHand = useRef<boolean>(true);
    
    const TLBaseContainerRef = useRef<null| HTMLDivElement>(null);

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

                TLBaseContainerRef,
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