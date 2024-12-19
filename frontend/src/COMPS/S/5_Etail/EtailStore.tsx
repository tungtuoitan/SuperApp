
import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from "react";


export interface EtailContextData {
    
};

export const EtailContextDefaultValue: EtailContextData = {
};

const EtailContext = createContext<EtailContextData>(EtailContextDefaultValue);
export const EtailStore = () => useContext(EtailContext);

export const EtailProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
  

    return (
        <EtailContext.Provider
            value={{
               
            }}>
            {children}
        </EtailContext.Provider>
    )
}