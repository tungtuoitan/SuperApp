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
import { useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { time } from "console";

export const TLBaseFg = () => {
    const { RhToPx, h$G_BgStart, h$G_BgEnd, dateToCDate } = useTLBaseBgHelpers();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { dateReal, setDateReal, zoomLv } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();

    useEffect(() => {
        const evsInit: Ev[] = [
            { id: '1', name: 'World  War I', type: 'war', level: 1, timeStart: toCDate(2030, 3, 12, 1, 0), timeEnd: toCDate(2032, 3, 12, 1, 0) },
        ];
        // setAllEvs(evsInit);
        getEvs()
            .then((data: Ev[]) => {
                setAllEvs(data);
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
            if (h$G_BgEnd > Gh_timeStart && Gh_timeStart > h$G_BgStart ||
                h$G_BgEnd > Gh_timeEnd && Gh_timeEnd > h$G_BgStart) return true;
        })

    return (
        <div style={{
            width: '100%',
            height: 0,

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
                    cDateToGh(ev.timeStart as cDate) - h$G_BgStart
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