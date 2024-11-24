import React, { useEffect, useState } from "react";
import { TIc } from "./TIc";
import { cDate, lvList, TI,  } from "../TLConfigs";
import { useTLBaseStore } from "./TLBaseStore";
import { parseCDate, toCDate } from "./TLBaseHelpers";
import {v4 as uuidv4} from 'uuid';
import { useSettingTimeStore } from "../SettingTime/SettingTimeStore";

export const TLBaseContent = () => {
    const [TLBaseContent, setTLBaseContent] = useState<TI[]>([]);
    const { timeConfig } = useSettingTimeStore();
    const { zoomLv, TLBaseContentRef } = useTLBaseStore();

    useEffect(() => {
        if (lvList[timeConfig.level].levelName === '1000years') {

            if (timeConfig.in1000YearsVal) {
                const newTIList = [] as TI[];
                const { y, m, d, h } = parseCDate(timeConfig.in1000YearsVal.date);
                for (let i = 0; i < 1000; i++) {
                    const TI = {
                        id: uuidv4(),
                        // lvID: 0,
                        date: toCDate(y + i, 1, 1, 0)
                    } as TI;
                    newTIList.push(TI);
                }
                setTLBaseContent(newTIList);
            }
        }
        else if (lvList[timeConfig.level].levelName === 'year') {

            if (timeConfig.inYearsVal) {
                const newTIList = [] as TI[];
                const { y, m, d, h } = parseCDate(timeConfig.inYearsVal.date);
                for (let i = 0; i < 12; i++) {
                    for (let j = 0; j < 30; j++) {
                        const TI = {
                            id: uuidv4(),
                            // lvID: 2,
                            date: toCDate(y, m + i, d + j, 0)
                        } as TI;
                        newTIList.push(TI);
                    }
                }
                setTLBaseContent(newTIList);
            }
        }
        else if (lvList[timeConfig.level].levelName === 'month') {
            if (timeConfig.inMonthsVal) {
                const newTIList = [] as TI[];
                const { y, m, d, h } = parseCDate(timeConfig.inMonthsVal.date);
                for (let i = 0; i < 30; i++) {
                    for (let j = 0; j < 24; j++) {
                        const TI = {
                            id: uuidv4(),
                            // lvID: 3,
                            date: toCDate(y, m, d + i, h + j)
                        } as TI;
                        newTIList.push(TI);
                    }
                }
                setTLBaseContent(newTIList);
            }
        }
    }, [timeConfig.level, timeConfig.in1000YearsVal, timeConfig.inYearsVal, timeConfig.inMonthsVal]);

    return (
        <div
            id="TLBaseContent"
            ref={TLBaseContentRef}
            style={{
                display: 'flex',
            }}>
            {TLBaseContent.map((TI, index) => {
                return (
                    <TIc
                        key={TI.id}
                        TI={TI}
                        index={index}
                        level={timeConfig.level}
                        zoomLv={zoomLv}
                    />
                )
            })}
        </div>
    );
}