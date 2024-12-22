
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../TLTypes";

export interface TLBaseFgContextData {
    allEvs: Ev[];
    setAllEvs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
};

export const TLBaseFgContextDefaultValue: TLBaseFgContextData = {
    allEvs: [],
    setAllEvs: () => { },
    isFirstTime: true,
    setIsFirstTime: () => { },
};

const TLBaseFgStore = createContext<TLBaseFgContextData>(TLBaseFgContextDefaultValue);
export const useTLBaseFgStore = () => useContext(TLBaseFgStore);

export const TLBaseFgProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allEvs, setAllEvs] = useState<any[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

    return (
        <TLBaseFgStore.Provider
            value={{
                allEvs,
                setAllEvs,
                isFirstTime,
                setIsFirstTime,
            }}>
            {children}
        </TLBaseFgStore.Provider>
    )
}