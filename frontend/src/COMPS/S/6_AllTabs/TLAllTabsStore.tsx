
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface AllTabsContextData {
    allTabIds: (number|string)[];
    setAllTabIds: Dispatch<SetStateAction<(number|string)[]>>;
    curTabIndex: number;
    setCurTabIndex: Dispatch<SetStateAction<number>>;
    
};

export const AllTabsContextDefaultValue: AllTabsContextData = {
    allTabIds: [],
    setAllTabIds: () => {},
    curTabIndex: 0,
    setCurTabIndex: () => {},
    
};

const AllTabsContext = createContext<AllTabsContextData>(AllTabsContextDefaultValue);
export const useAllTabsStore = () => useContext(AllTabsContext);

export const TLAllTabsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allTabIds, setAllTabIds] = useState<(number|string)[]>(['ScheduleID']);
    const [curTabIndex, setCurTabIndex] = useState<number>(0);
 


    return (
        <AllTabsContext.Provider
            value={{
                allTabIds,
                setAllTabIds,
                curTabIndex,
                setCurTabIndex,
               
            }}>
            {children}
        </AllTabsContext.Provider>
    )
}