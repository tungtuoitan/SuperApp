import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult, FilterType, Mark } from "../TLTypes";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { cDateToGh, GhToCDate, parseCDate } from "../3_TimeConfig/TimeHelpers";
import { lateNight, sr } from "../TLConstants";
import {useSnackbar} from "notistack";

// A
export const use2he = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { h$G_BgStart, h$G_BgEnd, getLevelCOf, hourPerTI } = useTLBaseBgHelpers();
    const { enqueueSnackbar } = useSnackbar();

    // 1
    const checkData = () => {
        allEvs.forEach(ev => {
            if(cDateToGh(ev.timeEnd) < cDateToGh(ev.timeStart)) {
                enqueueSnackbar(`Warning: EVID:${ev.id} is out of time range`, { variant: "warning" })
                return}
            if(!ev.timeEnd){
                enqueueSnackbar(`Warning: EVID:${ev.id} has no timeEnd`, { variant: "warning" })
                return
            }
            if(![sr.active.inActive.c, sr.active.active.c].includes(ev.activeC)){
                enqueueSnackbar(`Warning: EVID:${ev.id} active has problem: ${ev.activeC}`, { variant: "warning" })
                return
            }
            if(![sr.priority.low.c, sr.priority.medium.c, sr.priority.normal.c, sr.priority.high.c].includes(ev.prioriC)){
                enqueueSnackbar(`Warning: EVID:${ev.id} priority has problem: ${ev.prioriC}`, { variant: "warning" })
                return
            }
            if(![sr.status.open.c, sr.status.resolved.c, sr.status.inProgress.c].includes(ev.statusC)){
                enqueueSnackbar(`Warning: EVID:${ev.id} status has problem: ${ev.statusC}`, { variant: "warning" })
                return
            }
        });
    }

    const beggerEv = TIList.length > 0
        ? {
            id: 999999999,
            name: 'Begger Gang',
            parentId: null,
            levelC: getLevelCOf('parentEv'),
            timeStart: TIList[0].date,
            timeEnd: GhToCDate(cDateToGh(TIList[TIList.length - 1].date) + hourPerTI)
        } as Ev : {} as Ev;


    return {
        checkData,
        beggerEv
    }
}

// B____________________________________________________________________
// 1
export const isBetween = (x: cDate, timeStart: cDate, timeEnd: cDate) => {
    const Gh_x = cDateToGh(x);
    const Gh_timeStart = cDateToGh(timeStart);
    const Gh_timeEnd = cDateToGh(timeEnd);
    return Gh_timeStart < Gh_x && Gh_x < Gh_timeEnd;
}

// 2
export const isOverlap = (ev1: Ev, ev2: Ev, checkBothSide: boolean = false): boolean => {
    const ev2ContainsEv1 = ev1.timeStart < ev2.timeStart && ev1.timeEnd > ev2.timeEnd
    if (checkBothSide) return isBetween(ev1.timeStart, ev2.timeStart, ev2.timeEnd) || isBetween(ev1.timeEnd, ev2.timeStart, ev2.timeEnd) || ev2ContainsEv1
    return (cDateToGh(ev1.timeEnd) > cDateToGh(ev2.timeStart))
}

// 3
export const isLateNight = (ev: Ev): boolean => {
    const { d, h, p } = parseCDate(ev.timeStart);
    const { d:d2, h:h2, p:p2 } = parseCDate(ev.timeEnd);
    const hs = h + p/60
    const he = h2 + p2/60
    return hs < lateNight.end || hs > lateNight.start || he > lateNight.start || he < lateNight.end || d !== d2
}