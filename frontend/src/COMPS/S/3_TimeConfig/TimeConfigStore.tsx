
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { cDate } from "../TLTypes";
import {dateToCDate} from "./TimeHelpers";

export interface TimeConfigContextData {
    timeConfig: timeConfig;
    setTimeConfig: Dispatch<SetStateAction<timeConfig>>;
};

export const timeConfigInit = {
    cevelId: 5,
    timeStart: dateToCDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0))
}

export const TimeConfigContextDefaultValue: TimeConfigContextData = {
    timeConfig: timeConfigInit,
    setTimeConfig: () => {},
};
const TimeConfigStore = createContext<TimeConfigContextData>(TimeConfigContextDefaultValue);


export type timeConfig = {
    cevelId: number,
    timeStart: cDate
};
export const useTimeConfigStore = () => useContext(TimeConfigStore);
export const TimeConfigProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [timeConfig, setTimeConfig] = useState<timeConfig>(timeConfigInit);

    return (
        <TimeConfigStore.Provider
            value={{
                timeConfig,
                setTimeConfig,
            }}>
            {children}
        </TimeConfigStore.Provider>
    )
}