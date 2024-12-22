
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../TLTypes";
import { v4 as uuid } from 'uuid';



export interface TLBaseFgContextData {
    allEvs: Ev[];
    setAllEvs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
    activeId: string|number|null;
    setActiveId: Dispatch<SetStateAction<string|number|null>>;
    newEvId: string|number;
    setNewEvId: Dispatch<SetStateAction<string|number>>;
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
};

const TLBaseFgStore = createContext<TLBaseFgContextData>(TLBaseFgContextDefaultValue);
export const useTLBaseFgStore = () => useContext(TLBaseFgStore);

export const TLBaseFgProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allEvs, setAllEvs] = useState<any[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const [activeId, setActiveId] = useState<string|number|null>(null); 
    const [newEvId, setNewEvId] = useState<string|number>(uuid());

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
            }}>
            {children}
        </TLBaseFgStore.Provider>
    )
}