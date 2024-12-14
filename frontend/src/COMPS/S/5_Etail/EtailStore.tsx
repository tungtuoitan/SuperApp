
import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from "react";
import { EtailForm } from "./EtailType";
import { addTime, dateToCDate } from "../3_TimeConfig/TimeHelpers";

export const initEtailForm: EtailForm = {
    id: 0,
    parentId: 0,
    name: '',
    level: '',
    timeStart: dateToCDate(new Date()),
    timeEnd: addTime(dateToCDate(new Date()), 0, 0, 0, 10, 0),
    type: null
};

export interface EtailContextData {
    etailForm: EtailForm;
    setEtailForm: Dispatch<Partial<EtailForm>>;
    
};

export const EtailContextDefaultValue: EtailContextData = {
    etailForm: initEtailForm,
    setEtailForm: () => {},
};

const EtailContext = createContext<EtailContextData>(EtailContextDefaultValue);
export const EtailStore = () => useContext(EtailContext);

export const EtailProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [etailForm, setEtailForm] = useReducer(
        (state: EtailForm, newState: Partial<EtailForm>) => ({ ...state, ...newState }),
        initEtailForm
    );

    return (
        <EtailContext.Provider
            value={{
                etailForm,
                setEtailForm,

               
            }}>
            {children}
        </EtailContext.Provider>
    )
}