
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";

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

    cutEvId: number | null;
    setCutEvId: Dispatch<SetStateAction<number | null>>;
};

export const EvContextDefaultValue: TLBaseEvContextData = {
    mouseenter: false,
    setEnterGrabEdge: () => {},
    mousedownAtGE: false,
    setGrabbing: () => {},
    grabEdge: defaultGrabEdge,
    setGrabEdge: () => {},
    fevId: null,
    setFevId: () => {},
    cutEvId: null,
    setCutEvId: () => {},
};

const EvContext = createContext<TLBaseEvContextData>(EvContextDefaultValue);
export const EvStore = () => useContext(EvContext);

export const TLBaseEvProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [mouseenter, setEnterGrabEdge] = useState<boolean>(false);
    const [mousedownAtGE, setGrabbing] = useState<boolean>(false);
    const [grabEdge, setGrabEdge] = useState<GragEdge>(defaultGrabEdge);

    const [fevId, setFevId] = useState<number | null>(null);
    const [cutEvId, setCutEvId] = useState<number | null>(null);


    return (
        <EvContext.Provider
            value={{
                mouseenter,
                setEnterGrabEdge,
                mousedownAtGE,
                setGrabbing,
                grabEdge,
                setGrabEdge,

                fevId,
                setFevId,
                cutEvId,
                setCutEvId,
            }}>
            {children}
        </EvContext.Provider>
    )
}