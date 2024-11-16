
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Ev } from "../TLTypes";

export interface TLContextData {
    allEvs: Ev[];
    setAllEvs: Dispatch<SetStateAction<any[]>>;
};

export const TLContextDefaultValue: TLContextData = {
    allEvs: [],
    setAllEvs: () => { },
};
const TLStore = createContext<TLContextData>(TLContextDefaultValue);

export const useTLStore = () => useContext(TLStore);

export const TLProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allEvs, setAllEvs] = useState<any[]>([]);

    return (
        <TLStore.Provider
            value={{
                allEvs,
                setAllEvs,
            }}>
            {children}
        </TLStore.Provider>
    )
}