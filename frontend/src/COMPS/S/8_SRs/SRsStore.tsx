
import { createContext, useContext, useState } from "react";
import { IAutoCompleteOptions } from "../../CommonHelpers/4_GenericAutoComplete";
import {SR} from "./8ty";



export interface SRsContextData {
    sRs: SR[];
    setSRs: (SRs: SR[]) => void;
    levelOptions: IAutoCompleteOptions[];
    setLevelOptions: (options: IAutoCompleteOptions[]) => void;
    repeatTypeOptions: IAutoCompleteOptions[];
    setRepeatTypeOptions: (options: IAutoCompleteOptions[]) => void;
};

export const SRsContextDefaultValue: SRsContextData = {
    sRs: [],
    setSRs: () => {},
    levelOptions: [],
    setLevelOptions: () => {},
    repeatTypeOptions: [],
    setRepeatTypeOptions: () => {},
};

const sRsContext = createContext<SRsContextData>(SRsContextDefaultValue);
export const useSRsStore = () => useContext(sRsContext);

export const SRsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [sRs, setSRs] = useState<SR[]>([]);
    const [levelOptions, setLevelOptions] = useState<IAutoCompleteOptions[]>([]);
    const [repeatTypeOptions, setRepeatTypeOptions] = useState<IAutoCompleteOptions[]>([]);

    return (
        <sRsContext.Provider
            value={{
                sRs,
                setSRs,
                levelOptions,
                setLevelOptions,
                repeatTypeOptions,
                setRepeatTypeOptions,
            }}>
            {children}
        </sRsContext.Provider>
    )
}