import React, { useEffect, useState } from "react";
import { TIc } from "../TLBaseBg/TIc";
import { baseWofTI, cDate } from "../TLConfigs";
import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { cDateToGh, parseCDate, toCDate, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Evc } from "./Evc";
import { Ev } from "../TLTypes";
import { getEvs } from "../../../FetchAPIs/TLAPIs";
import { RedLine } from "../TLBaseBg/RedLine";

export const TLBaseFg = () => {
    const { RhToPx, h$G_BgStart, h$G_BgEnd, dateToCDate } = useTLBaseBgHelpers();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { dateReal, setDateReal } = useTLBaseBgStore();

    useEffect(() => {
        const evsInit: Ev[] = [
            { id: '1', name: 'World  War I', type: 'war', level: 1, timeStart: '1914/6/28/1', timeEnd: '1918/11/11/1' },
            { id: '2', name: 'World War II', type: 'war', level: 1, timeStart: '1939/9/1/1', timeEnd: '1945/9/2/1' },
            { id: '3', name: 'VietName War', type: 'war', level: 1, timeStart: '1955/11/1/1', timeEnd: '1975/4/30/1' },
        ];
        getEvs()
            .then((data: Ev[]) => {
                setAllEvs([data[0]]);
            })

    }, []);


    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // loại bỏ Ev nằm ngoài Timeline
    const filterEvs = allEvs
        .filter(ev => {
            const Gh_timeStart = cDateToGh(ev.timeStart as cDate);
            const Gh_timeEnd = cDateToGh(ev.timeEnd as cDate);
            if (h$G_BgEnd() > Gh_timeStart && Gh_timeStart > (h$G_BgStart() ?? 0) ||
            h$G_BgEnd() > Gh_timeEnd && Gh_timeEnd > (h$G_BgStart() ?? 0)) return true;
})

return (
    <div style={{
        width: '100%',
        height: 60,

        flexDirection: 'column',
        gap: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100,
        // background: '#00000050',
    }}>
        {filterEvs?.map((ev: Ev, index) => {
            const left = RhToPx(
                cDateToGh(ev.timeStart as cDate) - (h$G_BgStart() ?? 0)
            )
            return <Evc
                key={ev.id}
                content={ev.name}
                width={RhToPx(
                    cDateToGh(ev.timeEnd as cDate) - cDateToGh(ev.timeStart as cDate)
                )}
                left={left}
            />
        })}
    </div>
);
}