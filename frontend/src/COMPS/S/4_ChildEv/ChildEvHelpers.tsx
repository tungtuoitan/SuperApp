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
import {EtailForm} from "../5_Etail/5ty";
import {useAllTabsStore} from "../6_AllTabs/AllTabsStore";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {useChildEvStore} from "./ChildEvStore";

export const useChildEvHelpers = () => {
    const { TIList, dateReal, keyboardState } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { markEvs } = useTLBaseFgHelpers();
    const {allTabIds, setAllTabIds, setCurTabIndex} = useAllTabsStore();
    const [etails, dispatch] = useEtailFormStore();
    const {fevId, setFevId, setFocusTFId} = useChildEvStore();

    // 3. update Ev (khi Grab)
    const debounce$UpdateEv = debounce((id, position, roundedH, roundedM) => {
        let newAllEvs = structuredClone(allEvs);
        const ev = allEvs.filter((ev) => ev.id === id)[0];
        const h$start_end = cDateToGh(ev.timeEnd) - cDateToGh(ev.timeStart);
        const newTime = addTime(TIList[0].date, 0, 0, 0, roundedH, roundedM);
        if (newTime === ev.timeStart || newTime === ev.timeEnd) return;
        let minTime = getMinMaxTimeOfEv(ev.levelC);
        // if (!keyboardState.shift && 
        //     (position === "left" && cDateToGh(ev.timeEnd) - cDateToGh(newTime) < minTime ||
        //     position === "right" && cDateToGh(newTime) - cDateToGh(ev.timeStart) < minTime)) return;

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

    const openEtail = (childId: number, parentWidth: number)=>{
            setFevId(null) //! khi click, FevId k dc set lại, tại saoooo ?
            setFocusTFId(null)
    
            if(allTabIds.includes(childId)) {
                setCurTabIndex(allTabIds.indexOf(childId))
            } 
            else {
                setAllTabIds(prev => {
                    setCurTabIndex(prev.length) // tabIndex of that childEv is the last item on allTabIds, so it == prev.length
                    return [...prev, childId]
                })
            }
    
            const ev = allEvs.filter(ev => ev.id === childId)[0]
            const etail: EtailForm = {
                id: ev.id,
                name: ev.name,
                parentId: ev.parentId ?? null,
                levelC: ev.levelC,
                timeStart: ev.timeStart,
                timeEnd: ev.timeEnd,
                type: ev.type ?? null, 
                activeC: ev.activeC,
                prioriC: ev.prioriC,
                statusC: ev.statusC,
                fink: ev.fink,
            }
            dispatch({type: 'INSE', payload: etail})
        }

    return {
        debounce$UpdateEv,
        isPresentEv,
        openEtail
    };
};
