import React, { useEffect, useState } from "react";
import { TIc } from "./TIc";
import { baseWofTI, cDate, hper, lvList, TI, } from "../TLConfigs";
import { useTLBaseBgStore } from "./TLBaseBgStore";
import { parseCDate, toCDate, useTLBaseBgHelpers } from "./TLBaseBgHelpers";
import { v4 as uuidv4 } from 'uuid';
import { useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { useTLBaseFgStore } from "../TLBaseFg/TLBaseFgStore";

export const TLBaseBg = () => {
    
    const { zoomLv, TLBaseBgRef, TIList, setTIList } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { isFirstTime, setIsFirstTime } = useTLBaseFgStore();

    useEffect(() => {
        if (!timeConfig.period) return;
        const newTIList = [] as TI[];
        const { y, m, d, h } = parseCDate(timeConfig.period.date);


        if (lvList[timeConfig.level].levelName === '100years') {
            for (let i = 0; i < 100; i++) {
                const year = y + i;
                if(year > 2100) break;
                const TI = {
                    id: uuidv4(),
                    date: toCDate(year, 1, 1, 1)} as TI;
                newTIList.push(TI);
            }
        }
        else if (lvList[timeConfig.level].levelName === 'year') {
            for (let i = 1; i <= 12; i++) {
                for (let j = 1; j <= 30; j++) {
                    const TI = {
                        id: uuidv4(),
                        date: toCDate(y, i, j, 1)
                    } as TI;
                    newTIList.push(TI);
                }
            }
        }
        else if (lvList[timeConfig.level].levelName === 'month') {
            for (let i = 1; i <= 30; i++) {
                for (let j = 1; j <= 24; j++) {
                    const TI = {
                        id: uuidv4(),
                        date: toCDate(y, m, i, j)
                    } as TI;
                    newTIList.push(TI);
                }
            }
        }


        setTIList(newTIList);
        if (isFirstTime) setIsFirstTime(false);
    }, [timeConfig]);

    return (
        <div
            id="TIList"
            ref={TLBaseBgRef}
            style={{
                display: 'flex',
            }}>
            {TIList.map((TI, index) => {
                return (
                    <TIc
                        key={TI.id}
                        date={TI.date}
                        level={timeConfig.level}
                        zoomLv={zoomLv}
                    />
                )
            })}
        </div>
    );
}