import { useEffect } from "react";
import { TIc } from "./TIc";
import { clvs, tl } from "../TLConstants";
import { useTLBaseBgStore } from "./TLBaseBgStore";
import {useTLBaseBgHelpers } from "./TLBaseBgHelpers";
import { addTime, cDateToGh, dateToCDate, getDate$NextMonday, getDAYOfWeek, parseCDate, parseDate } from "../3_TimeConfig/TimeHelpers";
import { v4 as uuidv4 } from 'uuid';
import { useTimeConfigStore } from "../3_TimeConfig/TimeConfigStore";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { RedLine } from "./RedLine";
import { cDate, TI } from "../TLTypes";

export const TLBaseBg = () => {

    const { zoomLv, TLBaseBgRef, TIList, setTIList, dateReal } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { isFirstTime, setIsFirstTime } = useTLBaseFgStore();
    const { h$G_BgStart, h$G_BgEnd, h$G_red, getLevelByType, w$BaseTI } = useTLBaseBgHelpers();

    useEffect(() => {
        const newTIList = [] as TI[];
        if (!timeConfig.period) return;
        const { y, m, d, h, p } = parseCDate(timeConfig.period.date);
        if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(h) || isNaN(p)) return;

        if (clvs[timeConfig.level].Clevel === tl.century) {
            for (let i = 0; i <= 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, i, 0, 0, 0, 0) as cDate
                } as TI;
                if (new Date(TI.date).getFullYear() >= 2100) break;
                newTIList.push(TI);
            }
        }
        else if (clvs[timeConfig.level].Clevel === tl.decade) {
            for (let i = 0; i <= 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, 0, i, 0, 0, 0) as cDate // edge case: use TILevel = month in week (instead of week)
                } as TI;
                if (new Date(TI.date).getFullYear() >= y + 10) break;
                newTIList.push(TI);
            }
        }
        else if (clvs[timeConfig.level].Clevel === tl.year) {
            for (let i = 0; i <= 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, 0, 0, i, 0, 0) as cDate
                } as TI;
                if (new Date(TI.date).getFullYear() > y) break;
                newTIList.push(TI);
            }
        }
        else if (clvs[timeConfig.level].Clevel === tl.month) {
            const { y, m, d, h, p } = parseCDate(timeConfig.period.date);
            for (let i = 0; i <= 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, 0, 0, i, 0, 0) as cDate
                } as TI;
                const { y: y2, m: m2, d: d2, h: h2, p: p2 } = parseCDate(TI.date);
                if (y2 === y && m2 > m || y2 > y) break;
                newTIList.push(TI);
            }
        }
        else if (clvs[timeConfig.level].Clevel === tl.week) {
            const { y, m, d, h, p } = parseCDate(timeConfig.period.date);
            for (let i = 0; i < 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, 0, 0, 0, i, 0) as cDate
                } as TI;
                const h$Gh_nextMonday = cDateToGh(dateToCDate(getDate$NextMonday(new Date(timeConfig.period.date))))
                const h$Gh_curTI = cDateToGh(TI.date);
                if(h$Gh_curTI >= h$Gh_nextMonday) break;
                newTIList.push(TI);
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
                height: '100%',
                // border: '1px solid blue',
            }}>
            {TIList.map((TI, index) => {
                return (
                    <TIc
                        key={TI.id}
                        date={TI.date}
                        TILevel={getLevelByType('TI')}
                        width={w$BaseTI * zoomLv}
                        index={index}
                    />
                )
            })}
            {(h$G_BgStart <= h$G_red && h$G_red <= h$G_BgEnd) && <RedLine />}
        </div>
    );
}