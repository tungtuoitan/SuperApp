
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { cDate, cDateOption } from "../TLTypes";

export interface TimeConfigContextData {
    allPeriods: cDateOption[];
    setAllPeriods: Dispatch<SetStateAction<cDateOption[]>>;

    timeConfig: timeConfig;
    setTimeConfig: Dispatch<SetStateAction<timeConfig>>;
    timeConfig2: timeConfig;
    setTimeConfig2: Dispatch<SetStateAction<timeConfig>>;
    timeFrom: cDate|null;
    setTimeFrom: Dispatch<SetStateAction<cDate|null>>;
};

export const timeConfigInit = {
    levelC: 0,
    period: {label: '-10000 -> -9000' ,id: 'period-0', date: '2024-01-01T00:00:00.000+07:00' as cDate},
}

export const TimeConfigContextDefaultValue: TimeConfigContextData = {
    allPeriods: [],
    setAllPeriods: () => {},

    timeConfig: timeConfigInit,
    setTimeConfig: () => {},
    timeConfig2: timeConfigInit,
    setTimeConfig2: () => {},
    timeFrom: null,
    setTimeFrom: () => {},
};
const TimeConfigStore = createContext<TimeConfigContextData>(TimeConfigContextDefaultValue);


export type timeConfig = {
    levelC: number,
    period: cDateOption|null,
};
export const useTimeConfigStore = () => useContext(TimeConfigStore);
export const TimeConfigProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allPeriods, setAllPeriods] = useState<cDateOption[]>([]);

    const [timeConfig, setTimeConfig] = useState<timeConfig>(timeConfigInit);
    const [timeConfig2, setTimeConfig2] = useState<timeConfig>(timeConfigInit);

    const [timeFrom, setTimeFrom] = useState<cDate|null>(null);

    return (
        <TimeConfigStore.Provider
            value={{
                allPeriods,
                setAllPeriods,

                timeConfig,
                setTimeConfig,
                timeConfig2,
                setTimeConfig2,
                timeFrom,
                setTimeFrom,
            }}>
            {children}
        </TimeConfigStore.Provider>
    )
}