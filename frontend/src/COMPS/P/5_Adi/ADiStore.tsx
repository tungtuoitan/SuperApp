
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Pesult} from "../3_Petail/3ty";

type ADia = {open: boolean, pesult: Pesult}
export interface ADiContextData {
    aDia: ADia|null;
    setADia: Dispatch<SetStateAction<ADia|null>>;
};

export const ADiContextDefaultValue: ADiContextData = {
    aDia: null,
    setADia: () => { },
};

const ADiStore = createContext<ADiContextData>(ADiContextDefaultValue);
export const useADiStore = () => useContext(ADiStore);

export const ADiProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [aDia, setADia] = useState<ADia|null>(null);

    return (
        <ADiStore.Provider
            value={{
                aDia,
                setADia,
            }}>
            {children}
        </ADiStore.Provider>
    )
}