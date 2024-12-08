
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../TLTypes";
import { v4 as uuid } from 'uuid';

export type GragEdge = {
    id: number | null;
    position: 'left' | 'right';
    mouseenter: boolean;
    mousedownAtGE: boolean;
}
const defaultGrabEdge: GragEdge = {id: null, position: 'left', mouseenter: false, mousedownAtGE: false};

export interface TLBaseFgContextData {
    allEvs: Ev[];
    setAllEvs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
    activeId: string | null;
    setActiveId: Dispatch<SetStateAction<string | null>>;
    newEvId: string;
    setNewEvId: Dispatch<SetStateAction<string>>;

    mouseenter: boolean;
    setEnterGrabEdge: Dispatch<SetStateAction<boolean>>;
    mousedownAtGE: boolean;
    setGrabbing: Dispatch<SetStateAction<boolean>>;
    grabEdge: GragEdge;
    setGrabEdge: Dispatch<SetStateAction<GragEdge>>;

    fevId: number | null;
    setFevId: Dispatch<SetStateAction<number | null>>;
};

export const TLBaseFgContextDefaultValue: TLBaseFgContextData = {
    allEvs: [],
    setAllEvs: () => { },
    isFirstTime: true,
    setIsFirstTime: () => { },
    activeId: null,
    setActiveId: () => { },
    newEvId: uuid(),
    setNewEvId: () => {},

    mouseenter: false,
    setEnterGrabEdge: () => {},
    mousedownAtGE: false,
    setGrabbing: () => {},
    grabEdge: defaultGrabEdge,
    setGrabEdge: () => {},
    fevId: null,
    setFevId: () => {},
};

const TLBaseFgStore = createContext<TLBaseFgContextData>(TLBaseFgContextDefaultValue);
export const useTLBaseFgStore = () => useContext(TLBaseFgStore);

export const TLBaseFgProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allEvs, setAllEvs] = useState<any[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const [activeId, setActiveId] = useState<string|null>(null); 
    const [newEvId, setNewEvId] = useState<string>(uuid());

    const [mouseenter, setEnterGrabEdge] = useState<boolean>(false);
    const [mousedownAtGE, setGrabbing] = useState<boolean>(false);
    const [grabEdge, setGrabEdge] = useState<GragEdge>(defaultGrabEdge);

    const [fevId, setFevId] = useState<number | null>(null);


    return (
        <TLBaseFgStore.Provider
            value={{
                allEvs,
                setAllEvs,
                isFirstTime,
                setIsFirstTime,
                activeId,
                setActiveId,
                newEvId,
                setNewEvId,

                mouseenter,
                setEnterGrabEdge,
                mousedownAtGE,
                setGrabbing,
                grabEdge,
                setGrabEdge,

                fevId,
                setFevId,
            }}>
            {children}
        </TLBaseFgStore.Provider>
    )
}