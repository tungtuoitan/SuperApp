import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult, FilterType } from "../TLTypes";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { cDateToGh } from "../3_TimeConfig/TimeHelpers";
import { sr } from "../TLConstants";

export const useTLBaseFgHelpers = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { h$G_BgStart, h$G_BgEnd, getLevelByType } = useTLBaseBgHelpers();

    // 1. filter
    const filterEvs = (filterTypes: FilterType[] ):Ev[] =>  {
        let newEvs = [...allEvs];

        // 1.1
        if(filterTypes.includes('inside-TL')) {
            newEvs = newEvs.filter(ev => {
                const Gh_timeStart = cDateToGh(ev.timeStart as cDate);
                const Gh_timeEnd = cDateToGh(ev.timeEnd as cDate);
                if (Gh_timeStart >= h$G_BgEnd || Gh_timeEnd <= h$G_BgStart) return false;
                return true;
            })
        }
        if(filterTypes.includes('active')) {
            newEvs = newEvs.filter(ev => ev.activeC !== sr.active.c)
        }

        // 1.2
        if(filterTypes.includes('parentEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === getLevelByType('parentEv'))
        }
        if(filterTypes.includes('childEv')) {
            newEvs = newEvs.filter(ev => ev.levelC === getLevelByType('childEv'))
        }

        // 1.3
        if(filterTypes.includes('hasParent')) {
            newEvs = newEvs.filter(ev => ev.parentId !== null)
        }
        if(filterTypes.includes('nonParent')) {
            newEvs = newEvs.filter(ev => ev.parentId === null || ev.parentId === 999999999)
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


    return {
        filterEvs,
        getFiveLines,
    }
}

// B1. check overlap
export const isOverlap = (ev1: Ev, ev2: Ev): boolean => {
    return (cDateToGh(ev1.timeEnd) > cDateToGh(ev2.timeStart))
}