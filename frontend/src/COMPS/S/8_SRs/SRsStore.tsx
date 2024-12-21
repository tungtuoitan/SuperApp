
import { createContext, useContext, useState } from "react";
import { IAutoCompleteOptions } from "../../CommonHelpers/4_GenericAutoComplete";

export type SR = {
    id: number;
    code: string;
    desc: string;
    type: string;
    active: number|null;
}

export interface SRsContextData {
    sRs: SR[];
    setSRs: (SRs: SR[]) => void;
    levelOptions: IAutoCompleteOptions[];
    setLevelOptions: (options: IAutoCompleteOptions[]) => void;
};

export const SRsContextDefaultValue: SRsContextData = {
    sRs: [],
    setSRs: () => {},
    levelOptions: [],
    setLevelOptions: () => {},
};

const sRsContext = createContext<SRsContextData>(SRsContextDefaultValue);
export const useSRsStore = () => useContext(sRsContext);

export const SRsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [sRs, setSRs] = useState<SR[]>([]);
    const [levelOptions, setLevelOptions] = useState<IAutoCompleteOptions[]>([]);

    return (
        <sRsContext.Provider
            value={{
                sRs,
                setSRs,
                levelOptions,
                setLevelOptions
            }}>
            {children}
        </sRsContext.Provider>
    )
}