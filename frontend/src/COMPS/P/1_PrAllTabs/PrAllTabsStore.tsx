
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface PRAllTabsContextData {
    prAllTabIds: (number|string)[];
    setPrAllTabIds: Dispatch<SetStateAction<(number|string)[]>>;
    curTabIndex: number;
    setCurTabIndex: Dispatch<SetStateAction<number>>;
    
};

export const PRAllTabsContextDefaultValue: PRAllTabsContextData = {
    prAllTabIds: [],
    setPrAllTabIds: () => {},
    curTabIndex: 0,
    setCurTabIndex: () => {},
    
};

const PRAllTabsContext = createContext<PRAllTabsContextData>(PRAllTabsContextDefaultValue);
export const usePrAllTabsStore = () => useContext(PRAllTabsContext);

export const PRAllTabsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [prAllTabIds, setPrAllTabIds] = useState<(number|string)[]>(['PridID']);
    const [curTabIndex, setCurTabIndex] = useState<number>(0);
 


    return (
        <PRAllTabsContext.Provider
            value={{
                prAllTabIds,
                setPrAllTabIds,
                curTabIndex,
                setCurTabIndex,
               
            }}>
            {children}
        </PRAllTabsContext.Provider>
    )
}