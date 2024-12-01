
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { cDate, cDateOption } from "../TLTypes";

export interface TimeConfigContextData {
    allPeriods: cDateOption[];
    setAllPeriods: Dispatch<SetStateAction<cDateOption[]>>;

    timeConfig: timeConfig;
    setTimeConfig: Dispatch<SetStateAction<timeConfig>>;
    timeConfig2: timeConfig;
    setTimeConfig2: Dispatch<SetStateAction<timeConfig>>;
};

export const timeConfigInit = {
    level: 0,
    period: {label: '-10000 -> -9000' ,id: 'period-0', date: '2024-01-01T00:00:00.000+07:00' as cDate},
}

export const TimeConfigContextDefaultValue: TimeConfigContextData = {
    allPeriods: [],
    setAllPeriods: () => {},

    timeConfig: timeConfigInit,
    setTimeConfig: () => {},
    timeConfig2: timeConfigInit,
    setTimeConfig2: () => {},
};
const TimeConfigStore = createContext<TimeConfigContextData>(TimeConfigContextDefaultValue);


export type timeConfig = {
    level: number,
    period: cDateOption|null,
};
export const useTimeConfigStore = () => useContext(TimeConfigStore);
export const TimeConfigProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allPeriods, setAllPeriods] = useState<cDateOption[]>([]);

    const [timeConfig, setTimeConfig] = useState<timeConfig>(timeConfigInit);
    const [timeConfig2, setTimeConfig2] = useState<timeConfig>(timeConfigInit);

    return (
        <TimeConfigStore.Provider
            value={{
                allPeriods,
                setAllPeriods,

                timeConfig,
                setTimeConfig,
                timeConfig2,
                setTimeConfig2,
            }}>
            {children}
        </TimeConfigStore.Provider>
    )
}