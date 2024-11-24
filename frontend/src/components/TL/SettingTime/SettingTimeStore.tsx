
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { cDate, cDateOption, curLv } from "../TLConfigs";

export interface SettingTimeContextData {
    inYearsList: cDateOption[];
    setInYearsList: Dispatch<SetStateAction<cDateOption[]>>;

    timeConfig: timeConfig;
    setTimeConfig: Dispatch<SetStateAction<timeConfig>>;
};

export const timeConfigInit = {
    level: 0,
    in1000YearsVal: {label: '-10000 -> -9000' ,id: 'in1000YearsVal-0', date: '-10000/1/1/1' as cDate},
    inYearsVal: null,
    inMonthsVal: null,
}

export const SettingTimeContextDefaultValue: SettingTimeContextData = {
    inYearsList: [],
    setInYearsList: () => {},

    timeConfig: timeConfigInit,
    setTimeConfig: () => {},
};
const SettingTimeStore = createContext<SettingTimeContextData>(SettingTimeContextDefaultValue);


export type timeConfig = {
    level: number,
    in1000YearsVal: cDateOption|null,
    inYearsVal: cDateOption|null,
    inMonthsVal: cDateOption|null,
};
export const useSettingTimeStore = () => useContext(SettingTimeStore);
export const SettingTimeProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [inYearsList, setInYearsList] = useState<cDateOption[]>([]);
    const [timeConfig, setTimeConfig] = useState<timeConfig>(timeConfigInit);

    return (
        <SettingTimeStore.Provider
            value={{
                inYearsList,
                setInYearsList,

                timeConfig,
                setTimeConfig,
            }}>
            {children}
        </SettingTimeStore.Provider>
    )
}