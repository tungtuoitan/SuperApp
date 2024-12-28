import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult, FilterType, Mark } from "../TLTypes";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { cDateToGh, GhToCDate, parseCDate } from "../3_TimeConfig/TimeHelpers";
import { lateNight, sr } from "../TLConstants";
import {useSnackbar} from "notistack";
import {useTLBaseFgHelpers} from "./TLBaseFgHelpers";
import {_4cs} from "../4_ChildEv/4cs";

// A
export const use2he = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { h$G_BgStart, h$G_BgEnd, getLevelCOf, hourPerTI } = useTLBaseBgHelpers();
    const { enqueueSnackbar } = useSnackbar();
    const { filterEvs, getFiveLines, markEvs } = useTLBaseFgHelpers();

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

    const getTopsOf5ParentLines = ():number[]=> {
        const fiveParentLines = getFiveLines(filterEvs(['inside-TL', 'parentEv', 'active']));
        const fiveMaxH: number[] = [];
        fiveParentLines.forEach(line => {
            let h$Line = 0;
            line.forEach(paront => {
                const childEvs = filterEvs(['inside-TL', 'active']).filter(childEv => childEv.parentId === paront.id);
                const totalChildEvs = getFiveLines(childEvs).length;
                const h$Parent = totalChildEvs * _4cs.childEv.he + (totalChildEvs - 1) * _4cs.childEv.gapBetweenChildren + _4cs.parentEv.heOf2borders + _4cs.parentEv.pt*2
                if(h$Parent > h$Line) h$Line = h$Parent;
            })
            if(h$Line > 0) fiveMaxH.push(h$Line);
        })
        const fiveTops: number[] = fiveMaxH.map((h, i) => {
            if(i===0) return _4cs.TLBaseFrame.pt;
            if(i===1) return _4cs.TLBaseFrame.pt + fiveMaxH[i-1] + 10*i
            if(i===2) return _4cs.TLBaseFrame.pt + fiveMaxH[i-1] + fiveMaxH[i-2] + 10*i
            if(i===3) return _4cs.TLBaseFrame.pt + fiveMaxH[i-1] + fiveMaxH[i-2] + fiveMaxH[i-3] + 10*i
            if(i===4) return _4cs.TLBaseFrame.pt + fiveMaxH[i-1] + fiveMaxH[i-2] + fiveMaxH[i-3] + fiveMaxH[i-4] + 10*i
            if(i===5) return _4cs.TLBaseFrame.pt + fiveMaxH[i-1] + fiveMaxH[i-2] + fiveMaxH[i-3] + fiveMaxH[i-4] + fiveMaxH[i-5]  + 10*i
            if(i===6) return _4cs.TLBaseFrame.pt + fiveMaxH[i-1] + fiveMaxH[i-2] + fiveMaxH[i-3] + fiveMaxH[i-4] + fiveMaxH[i-5] + fiveMaxH[i-6] + 10*i
            if(i===7) return _4cs.TLBaseFrame.pt + fiveMaxH[i-1] + fiveMaxH[i-2] + fiveMaxH[i-3] + fiveMaxH[i-4] + fiveMaxH[i-5] + fiveMaxH[i-6] + fiveMaxH[i-7] + 10*i

            return 0;
        })
        return fiveTops;
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
        beggerEv,
        getTopsOf5ParentLines
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