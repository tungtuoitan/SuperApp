
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface GAllTabsContextData {
    gAllTabIds: string[];
    setGAllTabIds: Dispatch<SetStateAction<string[]>>;
    curTabIndex: number;
    setCurTabIndex: Dispatch<SetStateAction<number>>;
    
};

export const GAllTabsContextDefaultValue: GAllTabsContextData = {
    gAllTabIds: [],
    setGAllTabIds: () => {},
    curTabIndex: 0,
    setCurTabIndex: () => {},
    
};

const GAllTabsContext = createContext<GAllTabsContextData>(GAllTabsContextDefaultValue);
export const useGAllTabsStore = () => useContext(GAllTabsContext);

export const GAllTabsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [gAllTabIds, setGAllTabIds] = useState<(string)[]>(['GeneralGrid']);
    const [curTabIndex, setCurTabIndex] = useState<number>(0);
 


    return (
        <GAllTabsContext.Provider
            value={{
                gAllTabIds,
                setGAllTabIds,
                curTabIndex,
                setCurTabIndex,
               
            }}>
            {children}
        </GAllTabsContext.Provider>
    )
}