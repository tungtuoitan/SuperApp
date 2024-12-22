
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import {IGrabEdge} from "./4ty";
import {defaultGrabEdge} from "./4he";

export interface ChildEvContextData {
    mouseenter: boolean;
    setEnterGrabEdge: Dispatch<SetStateAction<boolean>>;
    mousedownAtGE: boolean;
    setGrabbing: Dispatch<SetStateAction<boolean>>;
    grabEdge: IGrabEdge;
    setGrabEdge: Dispatch<SetStateAction<IGrabEdge>>;

    fevId: number | null;
    setFevId: Dispatch<SetStateAction<number | null>>;

    cutEvId: number | null;
    setCutEvId: Dispatch<SetStateAction<number | null>>;

    focusTFId: number | null;
    setFocusTFId: Dispatch<SetStateAction<number | null>>;
};

export const ChildEvContextDefaultValue: ChildEvContextData = {
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

    focusTFId: null,
    setFocusTFId: () => {},
};

const ChildEvContext = createContext<ChildEvContextData>(ChildEvContextDefaultValue);
export const useChildEvStore = () => useContext(ChildEvContext);

export const ChildEvProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [mouseenter, setEnterGrabEdge] = useState<boolean>(false);
    const [mousedownAtGE, setGrabbing] = useState<boolean>(false);
    const [grabEdge, setGrabEdge] = useState<IGrabEdge>(defaultGrabEdge);

    const [fevId, setFevId] = useState<number | null>(null);
    const [cutEvId, setCutEvId] = useState<number | null>(null);
    const [focusTFId, setFocusTFId] = useState<number | null>(null);


    return (
        <ChildEvContext.Provider
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
                focusTFId,
                setFocusTFId,
            }}>
            {children}
        </ChildEvContext.Provider>
    )
}