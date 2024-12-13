import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult } from "../TLTypes";
import { addTime, cDateToGh, cDateToUTCDate, dateToCDate } from "../3_TimeConfig/TimeHelpers";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { debounce } from "lodash";
import { useCallback } from "react";
import { iuEv } from "../../../FetchAPIs/TLAPIs";

export const useEvHelpers = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();

    // 3. update Ev (khi Grab)
    const debounce$UpdateEv = debounce((id, position, roundedH, roundedM) => {
        const newTime = addTime(TIList[0].date, 0, 0, 0, roundedH, roundedM)
        const newAllEvs = allEvs.map(ev => {
            if (ev.id === id) {
                return {
                    ...ev,
                    timeStart: position === 'left' ? newTime : ev.timeStart,
                    timeEnd: position === 'right' ? newTime : ev.timeEnd
                }
            }
            return ev;
        })
        setAllEvs([...newAllEvs]);
    }, 6);

    const isPast = (timeEnd: cDate) => cDateToGh(timeEnd) < cDateToGh(dateToCDate(dateReal));

    return {
        debounce$UpdateEv,
        isPast
    }
}

// B1. check overlap
export const isOverlap = (ev1: Ev, ev2: Ev): boolean => {
    return (cDateToGh(ev1.timeEnd) > cDateToGh(ev2.timeStart))
}