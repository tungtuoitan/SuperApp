
import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from "react";


export interface EtailsContextData {
    
};

export const EtailsContextDefaultValue: EtailsContextData = {
};

const EtailsContext = createContext<EtailsContextData>(EtailsContextDefaultValue);
export const useEtailsStore = () => useContext(EtailsContext);

export const EtailsProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
  

    return (
        <EtailsContext.Provider
            value={{
               
            }}>
            {children}
        </EtailsContext.Provider>
    )
}