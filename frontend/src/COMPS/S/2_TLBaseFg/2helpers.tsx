import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult, FilterType, Mark } from "../TLTypes";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { cDateToGh, parseCDate } from "../3_TimeConfig/TimeHelpers";
import { lateNight, sr } from "../TLConstants";

export const use2Helpers = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { h$G_BgStart, h$G_BgEnd, getLevelCOf } = useTLBaseBgHelpers();
}

export const isBetween = (x: cDate, timeStart: cDate, timeEnd: cDate) => {
    const Gh_x = cDateToGh(x);
    const Gh_timeStart = cDateToGh(timeStart);
    const Gh_timeEnd = cDateToGh(timeEnd);
    return Gh_timeStart < Gh_x && Gh_x < Gh_timeEnd;
}

// B1. check overlap
export const isOverlap = (ev1: Ev, ev2: Ev, checkBothSide: boolean = false): boolean => {
    const ev2ContainsEv1 = ev1.timeStart < ev2.timeStart && ev1.timeEnd > ev2.timeEnd
    if (checkBothSide) return isBetween(ev1.timeStart, ev2.timeStart, ev2.timeEnd) || isBetween(ev1.timeEnd, ev2.timeStart, ev2.timeEnd) || ev2ContainsEv1
    return (cDateToGh(ev1.timeEnd) > cDateToGh(ev2.timeStart))
}

export const isLateNight = (ev: Ev): boolean => {
    const { d, h, p } = parseCDate(ev.timeStart);
    const { d:d2, h:h2, p:p2 } = parseCDate(ev.timeEnd);
    const hs = h + p/60
    const he = h2 + p2/60
    return hs < lateNight.end || hs > lateNight.start || he > lateNight.start || he < lateNight.end || d !== d2
}