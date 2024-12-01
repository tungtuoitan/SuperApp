import { timeConfig, useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { cDate, y, m, d, h, cDateOption, hper, lvList, baseWofTI, p, miliperh } from "../TLConfigs";
import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { Ev } from "../TLTypes";
import { addTime, cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { debounce } from "lodash";

export const useTLBaseFgHelpers = () => {
    const { TIList, zoomLv, TLBaseFrameRef, spotRatio } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { dateReal } = useTLBaseBgStore();
    const {allEvs, setAllEvs} = useTLBaseFgStore();
    const {RhToPx, h$G_BgStart, h$G_BgEnd, dateToCDate} = useTLBaseBgHelpers();

    // 1. filter
    const filterEvs = allEvs // loại bỏ Event nằm ngoài timeline
        .filter(ev => {
            const Gh_timeStart = cDateToGh(ev.timeStart as cDate);
            const Gh_timeEnd = cDateToGh(ev.timeEnd as cDate);
            if (h$G_BgEnd > Gh_timeStart && Gh_timeStart > h$G_BgStart ||
                h$G_BgEnd > Gh_timeEnd && Gh_timeEnd > h$G_BgStart) return true;
        })

    // 2. group
    const getAllGroups = () => {
        const parentIds = Array.from(new Set(filterEvs
            .map(ev => ev.parentId)
            .filter(parentId => typeof parentId === 'string' && parentId !== '' && parentId !== undefined)
        ));

        const allGroups: {[key:string]: Ev[]} = {};
        parentIds.forEach(parentId => {
            if(!parentId) return;
            allGroups[parentId] = filterEvs.filter(ev => ev.parentId === parentId);
        })
        return allGroups;
    }

    // 3. lấy fiveLines
    const getFiveLines = (group: Ev[]): Ev[][] => {
        const allLines: Ev[][] = [];
        let remainEvs: Ev[] = group.sort((a, b) => { // sort: TI.timeStart increase
                                            const startDiff = cDateToGh(a.timeStart) - cDateToGh(b.timeStart);
                                            if (startDiff !== 0) return startDiff;
                                            return cDateToGh(a.timeEnd) - cDateToGh(b.timeEnd);
                                        });

        const getNextLine = (remainEvs: Ev[]): Ev[] => {
            const nextLine: Ev[] = []
            for (let i = 0; i < remainEvs.length; i++) {
                if (nextLine.length === 0 || !isOverlap(nextLine[nextLine.length - 1], remainEvs[i])) {
                    nextLine.push(remainEvs[i]);
                }
            }
            return nextLine;
        }

        while(remainEvs.length > 0 ) { // maximun 5 lines
            if(allLines.length > 5 ) return [...allLines, remainEvs];
            const line = getNextLine(remainEvs);
            allLines.push(line);
            remainEvs = remainEvs.filter(rEv => !line.filter(e => e.id === rEv.id).length);
        }

        return allLines;
    }

    // 4. update Ev (khi Grab)
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

    return {
        filterEvs,
        getAllGroups,
        getFiveLines,
        debounce$UpdateEv
    }
}

export const isOverlap = (ev1: Ev, ev2: Ev):boolean=> {
    return (cDateToGh(ev1.timeEnd) > cDateToGh(ev2.timeStart))
}