import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult } from "../TLTypes";
import { addTime, cDateToGh, cDateToUTCDate, dateToCDate, GhToCDate } from "../3_TimeConfig/TimeHelpers";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { debounce } from "lodash";
import { useTLBaseFgHelpers } from "../2_TLBaseFg/TLBaseFgHelpers";

export const useChildEvHelpers = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { markEvs } = useTLBaseFgHelpers();
    const { keyboardState } = useTLBaseBgStore();

    // 3. update Ev (khi Grab)
    const debounce$UpdateEv = debounce((id, position, roundedH, roundedM) => {
        const newTime = addTime(TIList[0].date, 0, 0, 0, roundedH, roundedM)
        const newAllEvs = structuredClone(allEvs).map((ev :Ev) => {
            if (ev.id === id) {
                const h$start_end = cDateToGh(ev.timeEnd) - cDateToGh(ev.timeStart);
                if(keyboardState.shift) {
                    return {
                            ...ev,
                            timeStart: position === 'left' ? newTime : GhToCDate(cDateToGh(newTime) - h$start_end),
                            timeEnd: position === 'right' ? newTime : GhToCDate(cDateToGh(newTime) + h$start_end)
                        }
                } 
                else {
                    return {
                        ...ev,
                        timeStart: position === 'left' ? newTime : ev.timeStart,
                        timeEnd: position === 'right' ? newTime : ev.timeEnd
                    }
                }
            }
            return ev;
        })
        setAllEvs(markEvs(newAllEvs))
    }, 6);


    const isPresentEv = (timeStart: cDate, timeEnd: cDate) => {
        const Gh_timeStart = cDateToGh(timeStart);
        const Gh_timeEnd = cDateToGh(timeEnd);
        const Gh_dateReal = cDateToGh(dateToCDate(dateReal));
        return Gh_timeStart <= Gh_dateReal && Gh_dateReal <= Gh_timeEnd;
    }

    
    return {
        debounce$UpdateEv,
        isPresentEv,
    }
}

