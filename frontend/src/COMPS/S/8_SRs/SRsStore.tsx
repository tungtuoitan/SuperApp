
import { createContext, useContext, useState } from "react";

export type SR = {
    id: number;
    code: string;
    desc: string;
    type: string;
    active: string;
}

export interface SRsContextData {
    sRs: SR[];
    setSRs: (SRs: SR[]) => void;
};

export const SRsContextDefaultValue: SRsContextData = {
    sRs: [],
    setSRs: () => {},
};

const sRsContext = createContext<SRsContextData>(SRsContextDefaultValue);
export const useSRsStore = () => useContext(sRsContext);

export const SRsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [sRs, setSRs] = useState<SR[]>([]);

    return (
        <sRsContext.Provider
            value={{
                sRs,
                setSRs,
            }}>
            {children}
        </sRsContext.Provider>
    )
}