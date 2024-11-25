import React, { useEffect, useState } from "react";
import { TIc } from "../TLBaseBg/TIc";
import { baseWofTI, cDate, hper, lvList, TI, } from "../TLConfigs";
import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { cDateToGh, parseCDate, toCDate, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { v4 as uuidv4 } from 'uuid';
import { useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Evc } from "./Evc";
import { Ev } from "../TLTypes";
import { getEvs } from "../../../FetchAPIs/TLAPIs";
import { RedLine } from "../TLBaseBg/RedLine";

export const TLBaseFg = () => {
    const { RhToPx, h$God_R } = useTLBaseBgHelpers();
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
                setAllEvs(data);
            })

    }, []);


    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60*1000);
        return () => clearInterval(interval);
    }, []);

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
            {allEvs?.map((ev: Ev, index) => {
                return <Evc
                    key={ev.id}
                    content={ev.name}
                    width={RhToPx(
                        cDateToGh(ev.timeEnd as cDate) - cDateToGh(ev.timeStart as cDate)
                    )}
                    left={RhToPx(
                        cDateToGh(ev.timeStart as cDate) - (h$God_R() ?? 0)
                    )}
                />
            })}
            <RedLine />
        </div>
    );
}