
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';
import {FIIDs} from "./7ty";

export interface FloatToolsContextData {
    activeId: string|number|null;
    setActiveId: Dispatch<SetStateAction<string|number|null>>;
    FIIDs: FIIDs;
    setFIIDs: Dispatch<SetStateAction<FIIDs>>;
};

export const FloatToolsContextDefaultValue: FloatToolsContextData = {
    activeId: null,
    setActiveId: () => { },
    FIIDs: {parentEv: uuid(), childEv: uuid()},
    setFIIDs: () => {},
};

const FloatToolsStore = createContext<FloatToolsContextData>(FloatToolsContextDefaultValue);
export const useFloatToolsStore = () => useContext(FloatToolsStore);

export const FloatToolsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [activeId, setActiveId] = useState<string|number|null>(null); 
    const [FIIDs, setFIIDs] = useState<FIIDs>({parentEv: uuid(), childEv: uuid()});

    return (
        <FloatToolsStore.Provider
            value={{
                activeId,
                setActiveId,
                FIIDs,
                setFIIDs,
            }}>
            {children}
        </FloatToolsStore.Provider>
    )
}