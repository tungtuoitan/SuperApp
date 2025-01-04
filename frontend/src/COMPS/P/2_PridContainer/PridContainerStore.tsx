
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Pr} from "../PrTypes";

export interface PridContextData {
    allPrs: Pr[];
    setAllPrs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
};

export const PridContextDefaultValue: PridContextData = {
    allPrs: [],
    setAllPrs: () => { },
    isFirstTime: true,
    setIsFirstTime: () => { },
};

const PridStore = createContext<PridContextData>(PridContextDefaultValue);
export const usePridStore = () => useContext(PridStore);

export const PridProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allPrs, setAllPrs] = useState<Pr[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

    return (
        <PridStore.Provider
            value={{
                allPrs,
                setAllPrs,
                isFirstTime,
                setIsFirstTime,
            }}>
            {children}
        </PridStore.Provider>
    )
}