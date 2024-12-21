import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult, FilterType, Mark } from "../TLTypes";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { cDateToGh, parseCDate } from "../3_TimeConfig/TimeHelpers";
import { lateNight, sr } from "../TLConstants";

export const useTLBaseFgHelpers = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { h$G_BgStart, h$G_BgEnd, getLevelCOf } = useTLBaseBgHelpers();

    // 1. filter
    const filterEvs = (filterTypes: FilterType[], evs: Ev[] = allEvs, deepClone: boolean = true): Ev[] => {
        let newEvs: Ev[] = deepClone ? structuredClone(evs) : evs

        // 1.1
        if (filterTypes.includes('inside-TL')) {
            newEvs = newEvs.filter(ev => {
                const Gh_timeStart = cDateToGh(ev.timeStart as cDate);
                const Gh_timeEnd = cDateToGh(ev.timeEnd as cDate);
                if (Gh_timeStart >= h$G_BgEnd || Gh_timeEnd <= h$G_BgStart) return false;
                return true;
            })
        }
        if (filterTypes.includes('active')) {
            newEvs = newEvs.filter(ev => ev.activeC === null || ev.activeC === sr.active.active.c)
        }

        // 1.2
        if (filterTypes.includes('parentEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === getLevelCOf('parentEv'))
        }
        if (filterTypes.includes('childEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === getLevelCOf('childEv'))
        }

        // 1.3
        if (filterTypes.includes('hasParent')) {
            newEvs = newEvs.filter(ev => ev.parentId !== null)
        }
        if (filterTypes.includes('nonParent')) {
            newEvs = newEvs.filter(ev => ev.parentId === null || ev.parentId === 999999999)
        }

        // 1.4
        if (filterTypes.includes('centuryEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === sr.century.c)
        }
        if (filterTypes.includes('decadeEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === sr.decade.c)
        }
        if (filterTypes.includes('yearEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === sr.year.c)
        }
        if (filterTypes.includes('monthEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === sr.month.c)
        }
        if (filterTypes.includes('weekEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === sr.week.c)
        }
        if (filterTypes.includes('dayEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === sr.day.c)
        }
        if (filterTypes.includes('hourEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === sr.hour.c)
            if (filterTypes.includes('isOverlap')) {
                newEvs = newEvs.filter(ev => ev.isOverlap)
            }
            if (filterTypes.includes('isLateNight')) {
                newEvs = newEvs.filter(ev => ev.isLateNight)
            }
        }


        return newEvs;
    }

    // 2. group

    // 2.1
    const getFiveLines = (group: Ev[]): Ev[][] => {
        const allLines: Ev[][] = [];
        let remainEvs: Ev[] = group.sort((a, b) => { // sort: TI.timeStart tăng dần
            const startDiff = cDateToGh(a.timeStart) - cDateToGh(b.timeStart);
            if (startDiff !== 0) return startDiff;
            return cDateToGh(a.timeEnd) - cDateToGh(b.timeEnd);
        });

        const getLine = (remainEvs: Ev[]): Ev[] => {
            const nextLine: Ev[] = []
            for (let i = 0; i < remainEvs.length; i++) {
                if (nextLine.length === 0 || !isOverlap(nextLine[nextLine.length - 1], remainEvs[i])) {
                    nextLine.push(remainEvs[i]);
                }
            }
            return nextLine;
        }

        while (remainEvs.length > 0) { // maximun 5 lines
            if (allLines.length > 5) return [...allLines, remainEvs];
            const line = getLine(remainEvs);
            allLines.push(line);
            remainEvs = remainEvs.filter(rEv => !line.filter(e => e.id === rEv.id).length);
        }

        return allLines;
    }

    const markEvs = (evs: Ev[], marks: Mark[] = ['isLateNight', 'isOverlap']): Ev[] => {
        const newEvs = structuredClone(evs);

        const hourEvs = filterEvs(['inside-TL', 'active', 'hourEv'], newEvs, false);
        if (marks.includes('isOverlap')) {
            hourEvs.forEach(ev => ev.isOverlap = false);
            for (let i=0; i<hourEvs.length; i++) {
            for (let j=0; j<hourEvs.length; j++) {
                const ev1=hourEvs[i]; const ev2=hourEvs[j];
                if (i!==j && isOverlap(ev1, ev2, true)) ev1.isOverlap = true;
            }
            }
        }

        if (marks.includes('isLateNight')) {
            hourEvs.forEach(ev => ev.isLateNight = false);
            for (let i = 0; i < hourEvs.length; i++) {
                if (isLateNight(hourEvs[i]))
                    hourEvs[i].isLateNight = true;
            }
        }

        return newEvs;
    }



    return {
        filterEvs,
        getFiveLines,
        markEvs,
    }
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