import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult } from "../TLTypes";
import {
    addTime,
    cDateToGh,
    cDateToUTCDate,
    dateToCDate,
    GhToCDate,
} from "../3_TimeConfig/TimeHelpers";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { debounce } from "lodash";
import { useTLBaseFgHelpers } from "../2_TLBaseFg/TLBaseFgHelpers";
import { getMinMaxTimeOfEv, use4he } from "./4he";

export const useChildEvHelpers = () => {
    const { TIList, dateReal, keyboardState } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { markEvs } = useTLBaseFgHelpers();

    // 3. update Ev (khi Grab)
    const debounce$UpdateEv = debounce((id, position, roundedH, roundedM) => {
        let newAllEvs = structuredClone(allEvs);
        const ev = allEvs.filter((ev) => ev.id === id)[0];
        const h$start_end = cDateToGh(ev.timeEnd) - cDateToGh(ev.timeStart);
        const newTime = addTime(TIList[0].date, 0, 0, 0, roundedH, roundedM);
        if (newTime === ev.timeStart || newTime === ev.timeEnd) return;
        let minTime = getMinMaxTimeOfEv(ev.levelC);
        if (!keyboardState.shift && 
            (position === "left" && cDateToGh(ev.timeEnd) - cDateToGh(newTime) < minTime ||
            position === "right" && cDateToGh(newTime) - cDateToGh(ev.timeStart) < minTime)) return;

        if (position === "left") {
            newAllEvs = newAllEvs.map((_ev: Ev) => {
                if (_ev.id === id) {
                    if (keyboardState.shift)
                        return {
                            ..._ev,
                            timeStart: newTime,
                            timeEnd: GhToCDate(
                                cDateToGh(newTime) + h$start_end
                            ),
                        };
                    else return { ..._ev, timeStart: newTime };
                }
                return _ev;
            });
        } else if (position === "right") {
            newAllEvs = newAllEvs.map((_ev: Ev) => {
                if (_ev.id === id) {
                    if (keyboardState.shift)
                        return {
                            ..._ev,
                            timeStart: GhToCDate(
                                cDateToGh(newTime) - h$start_end
                            ),
                            timeEnd: newTime,
                        };
                    else return { ..._ev, timeEnd: newTime };
                }
                return _ev;
            });
        }
        setAllEvs(markEvs(newAllEvs));
    }, 6);

    const isPresentEv = (timeStart: cDate, timeEnd: cDate) => {
        const Gh_timeStart = cDateToGh(timeStart);
        const Gh_timeEnd = cDateToGh(timeEnd);
        const Gh_dateReal = cDateToGh(dateToCDate(dateReal));
        return Gh_timeStart <= Gh_dateReal && Gh_dateReal <= Gh_timeEnd;
    };

    return {
        debounce$UpdateEv,
        isPresentEv,
    };
};
