
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

export type GragEdge = {
    id: number | null;
    position: 'left' | 'right';
    mouseenter: boolean;
    mousedownAtGE: boolean;
}
const defaultGrabEdge: GragEdge = {id: null, position: 'left', mouseenter: false, mousedownAtGE: false};

export interface TLBaseEvContextData {
    mouseenter: boolean;
    setEnterGrabEdge: Dispatch<SetStateAction<boolean>>;
    mousedownAtGE: boolean;
    setGrabbing: Dispatch<SetStateAction<boolean>>;
    grabEdge: GragEdge;
    setGrabEdge: Dispatch<SetStateAction<GragEdge>>;

    fevId: number | null;
    setFevId: Dispatch<SetStateAction<number | null>>;
};

export const TLBaseEvContextDefaultValue: TLBaseEvContextData = {
    mouseenter: false,
    setEnterGrabEdge: () => {},
    mousedownAtGE: false,
    setGrabbing: () => {},
    grabEdge: defaultGrabEdge,
    setGrabEdge: () => {},
    fevId: null,
    setFevId: () => {},
};

const TLBaseEvStore = createContext<TLBaseEvContextData>(TLBaseEvContextDefaultValue);
export const useTLBaseEvStore = () => useContext(TLBaseEvStore);

export const TLBaseEvProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [mouseenter, setEnterGrabEdge] = useState<boolean>(false);
    const [mousedownAtGE, setGrabbing] = useState<boolean>(false);
    const [grabEdge, setGrabEdge] = useState<GragEdge>(defaultGrabEdge);

    const [fevId, setFevId] = useState<number | null>(null);

    return (
        <TLBaseEvStore.Provider
            value={{
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
        </TLBaseEvStore.Provider>
    )
}