import { useEffect } from "react";
import { TIc } from "./TIc";
import { lvList } from "../TLHardcode";
import { useTLBaseBgStore } from "./TLBaseBgStore";
import { addTime, parseCDate, useTLBaseBgHelpers } from "./TLBaseBgHelpers";
import { v4 as uuidv4 } from 'uuid';
import { useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { useTLBaseFgStore } from "../TLBaseFg/TLBaseFgStore";
import { RedLine } from "./RedLine";
import { cDate, TI } from "../TLTypes";

export const TLBaseBg = () => {

    const { zoomLv, TLBaseBgRef, TIList, setTIList, dateReal } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { isFirstTime, setIsFirstTime } = useTLBaseFgStore();
    const { h$G_BgStart, h$G_BgEnd, h$G_red } = useTLBaseBgHelpers();

    useEffect(() => {
        const newTIList = [] as TI[];
        if (!timeConfig.period) return;
        const { y, m, d, h, p } = parseCDate(timeConfig.period.date);
        if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(h) || isNaN(p)) return;


        if (lvList[timeConfig.level].levelName === '100years') {
            for (let i = 0; i <= 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, i, 0, 0, 0, 0) as cDate
                } as TI;
                if (new Date(TI.date).getFullYear() >= 2100) break;
                newTIList.push(TI);
            }
        }
        else if (lvList[timeConfig.level].levelName === 'year') {
            for (let i = 0; i <= 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, 0, 0, i, 0, 0) as cDate
                } as TI;
                if (new Date(TI.date).getFullYear() > y) break;
                newTIList.push(TI);
            }
        }
        else if (lvList[timeConfig.level].levelName === 'month') {
            const { y, m, d, h, p } = parseCDate(timeConfig.period.date);
            for (let i = 0; i <= 1000; i++) {
                const TI = {
                    id: uuidv4(),
                    date: addTime(timeConfig.period.date, 0, 0, 0, i, 0) as cDate
                } as TI;
                if (new Date(TI.date).getMonth() + 1 > m) break;
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
                        level={timeConfig.level}
                        zoomLv={zoomLv}
                        index={index}
                    />
                )
            })}
            {(h$G_BgStart <= h$G_red && h$G_red <= h$G_BgEnd) && <RedLine />}
        </div>
    );
}