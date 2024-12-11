import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { cDate, Ev, EvsResult, FilterType } from "../TLTypes";
import { addTime, cDateToGh, cDateToUTCDate, dateToCDate, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { debounce } from "lodash";
import { useCallback } from "react";
import { iuEv } from "../../../FetchAPIs/TLAPIs";

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
            newEvs = newEvs.filter(ev => ev.status !== 0)
        }

        // 1.2
        if(filterTypes.includes('parentEv')) {
            newEvs = newEvs.filter(ev => ev.level === getLevelByType('parentEv'))
        }
        if(filterTypes.includes('childEv')) {
            newEvs = newEvs.filter(ev => ev.level === getLevelByType('childEv'))
        }

        // 1.3
        if(filterTypes.includes('hasParent')) {
            newEvs = newEvs.filter(ev => ev.parentId !== null)
        }
        if(filterTypes.includes('nonParent')) {
            newEvs = newEvs.filter(ev => ev.parentId === null)
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
    const debounceUpdateEvName = useCallback(debounce((curEv:Ev, value: string) => {
        iuEv({...curEv, name: value, timeStart: cDateToUTCDate(curEv.timeStart), timeEnd: cDateToUTCDate(curEv.timeEnd)})
            .then((data: EvsResult) => {
                if(data.options.success) {
                    setAllEvs(allEvs.map(ev => ev.id === ev.id ? data.evs[0] : ev));
                }
            })
            .catch((err: any) => {
                console.log(err);
            })
       
    }, 1000),[])

    const isPast = (timeEnd: cDate) => cDateToGh(timeEnd) < cDateToGh(dateToCDate(dateReal));

    return {
        filterEvs,
        getFiveLines,
        debounce$UpdateEv,
        debounceUpdateEvName,
        isPast
    }
}

// B1. check overlap
export const isOverlap = (ev1: Ev, ev2: Ev): boolean => {
    return (cDateToGh(ev1.timeEnd) > cDateToGh(ev2.timeStart))
}