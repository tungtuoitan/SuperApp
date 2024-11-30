
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../TLTypes";
import { v4 as uuid } from 'uuid';

export interface TLBaseFgContextData {
    allEvs: Ev[];
    setAllEvs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
    activeId: string | null;
    setActiveId: Dispatch<SetStateAction<string | null>>;
    newEvId: string;
    setNewEvId: Dispatch<SetStateAction<string>>;
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
    const [activeId, setActiveId] = useState<string|null>(null); 
    const [newEvId, setNewEvId] = useState<string>(uuid());

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