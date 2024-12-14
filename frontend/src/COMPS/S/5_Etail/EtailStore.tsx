
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface EtailContextData {
    activeEtailIds: number[];
    setActiveEtailIds: Dispatch<SetStateAction<number[]>>;
    
};

export const EtailContextDefaultValue: EtailContextData = {
    activeEtailIds: [],
    setActiveEtailIds: () => {},
    
};

const EtailContext = createContext<EtailContextData>(EtailContextDefaultValue);
export const EtailStore = () => useContext(EtailContext);

export const EtailProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [activeEtailIds, setActiveEtailIds] = useState<number[]>([]);
 


    return (
        <EtailContext.Provider
            value={{
                activeEtailIds,
                setActiveEtailIds,
               
            }}>
            {children}
        </EtailContext.Provider>
    )
}