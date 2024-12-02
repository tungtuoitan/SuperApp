import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { cDate, Ev } from "../TLTypes";
import { addTime, cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { debounce } from "lodash";

export const useTLBaseFgHelpers = () => {
    const { TIList } = useTLBaseBgStore();
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
    const getAllEvGroups = () => {
        const parentIds = Array.from(new Set(filterEvs
            .map(ev => ev.parentId)
            .filter(parentId => typeof parentId === 'number' || parentId == null)
        ));

        const allGroups: {[key:string]: Ev[]} = {};
        parentIds.forEach(parentId => {
            if(parentId === null) {
                allGroups['null'] = filterEvs.filter(ev => ev.parentId === null);
            }
            else {
                allGroups[parentId] = filterEvs.filter(ev => ev.parentId === parentId);
            }
        })
        return allGroups;
    }

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

        while(remainEvs.length > 0 ) { // maximun 5 lines
            if(allLines.length > 5 ) return [...allLines, remainEvs];
            const line = getLine(remainEvs);
            allLines.push(line);
            remainEvs = remainEvs.filter(rEv => !line.filter(e => e.id === rEv.id).length);
        }

        return allLines;
    }

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

    return {
        filterEvs,
        getAllEvGroups,
        getFiveLines,
        debounce$UpdateEv
    }
}

// B1. check overlap
export const isOverlap = (ev1: Ev, ev2: Ev):boolean=> {
    return (cDateToGh(ev1.timeEnd) > cDateToGh(ev2.timeStart))
}