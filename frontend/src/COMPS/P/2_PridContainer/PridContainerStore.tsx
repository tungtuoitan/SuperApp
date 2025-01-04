
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Pr} from "../PrTypes";

export interface PridContainerContextData {
    allPrs: Pr[];
    setAllPrs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
};

export const PridContainerContextDefaultValue: PridContainerContextData = {
    allPrs: [],
    setAllPrs: () => { },
    isFirstTime: true,
    setIsFirstTime: () => { },
};

const PridContainerStore = createContext<PridContainerContextData>(PridContainerContextDefaultValue);
export const usePridContainerStore = () => useContext(PridContainerStore);

export const PridContainerProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allPrs, setAllPrs] = useState<Pr[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

    return (
        <PridContainerStore.Provider
            value={{
                allPrs,
                setAllPrs,
                isFirstTime,
                setIsFirstTime,
            }}>
            {children}
        </PridContainerStore.Provider>
    )
}