
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface PRAllTabsContextData {
    pRAllTabIds: (number|string)[];
    setpRAllTabIds: Dispatch<SetStateAction<(number|string)[]>>;
    curTabIndex: number;
    setCurTabIndex: Dispatch<SetStateAction<number>>;
    
};

export const PRAllTabsContextDefaultValue: PRAllTabsContextData = {
    pRAllTabIds: [],
    setpRAllTabIds: () => {},
    curTabIndex: 0,
    setCurTabIndex: () => {},
    
};

const PRAllTabsContext = createContext<PRAllTabsContextData>(PRAllTabsContextDefaultValue);
export const usePRAllTabsStore = () => useContext(PRAllTabsContext);

export const PRAllTabsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [pRAllTabIds, setpRAllTabIds] = useState<(number|string)[]>(['ScheduleID']);
    const [curTabIndex, setCurTabIndex] = useState<number>(0);
 


    return (
        <PRAllTabsContext.Provider
            value={{
                pRAllTabIds,
                setpRAllTabIds,
                curTabIndex,
                setCurTabIndex,
               
            }}>
            {children}
        </PRAllTabsContext.Provider>
    )
}