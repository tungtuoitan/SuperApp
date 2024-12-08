import { useEffect } from "react";
import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import TISample from "../TLTools/TISample";
import { cDateToGh, GhToCDate, numbToCDate, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { ParentEv } from "./ParentEv";
import { getEvs } from "../../../FetchAPIs/TLAPIs";

export const TLBaseFg = () => {
    const { setDateReal, TIList } = useTLBaseBgStore();
    const { hourPerTI } = useTLBaseBgHelpers();
    const { setAllEvs, activeId } = useTLBaseFgStore();
    const { filterEvs, getFiveLines } = useTLBaseFgHelpers();
    const { w$Bg, getLevelByType } = useTLBaseBgHelpers();
    const { setNodeRef } = useDroppable({ id: 'droppablex' });

    const allParentEvs = filterEvs.filter(ev => ev.level === getLevelByType('parentEv'));

    useEffect(() => {
        // const evsInit: Ev[] = [
        //     { id: 12, name: 'Happy', type: 'war', parentId: null, level: 'century', timeStart: numbToCDate(2024, 1, 1, 0, 0), timeEnd: numbToCDate(1099, 1, 1, 0, 0) },
          
        //     { id: 13, name: 'Health', type: 'war', parentId: 12, level: 'decade', timeStart: numbToCDate(2024, 1, 1, 0, 0), timeEnd: numbToCDate(2042, 1, 1, 0, 0) },
        //     { id: 20, name: 'Family', type: 'war', parentId: 12, level: 'decade', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
        //     { id: 14, name: 'Career', type: 'war', parentId: 12, level: 'decade', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
        //     { id: 21, name: '...', type: 'war', parentId: null, level: 'decade', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
        //     { id: 22, name: '...', type: 'war', parentId: null, level: 'year', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
        //     { id: 23, name: '...', type: 'war', parentId: null, level: 'month', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
        //     { id: 24, name: '...', type: 'war', parentId: null, level: 'week', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
        //     { id: 25, name: '...', type: 'war', parentId: null, level: 'day', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
        //     { id: 26, name: '...', type: 'war', parentId: null, level: 'hour', timeStart: numbToCDate(2040, 1, 1, 0, 0), timeEnd: numbToCDate(2062, 1, 1, 0, 0) },
            
        //     { id: 15, name: 'archive Middle lv', type: 'war', parentId: 14, level: 'year', timeStart: numbToCDate(2024, 8, 1, 0, 0), timeEnd: numbToCDate(2026, 8, 1, 0, 0) },
          
        //     { id: 16, name: 'Xchedule Project', type: 'war', parentId: 15, level: 'month', timeStart: numbToCDate(2024, 12, 1, 0, 0), timeEnd: numbToCDate(2025, 4, 1, 0, 0) },
        //     { id: 17, name: 'Next Project', type: 'war', parentId: 15, level: 'month', timeStart: numbToCDate(2025, 4, 1, 0, 0), timeEnd: numbToCDate(2025, 8, 1, 0, 0) },

        //     { id: 2, name: 'basic UI', type: 'war', parentId: 16, level: 'week', timeStart: numbToCDate(2024, 12, 2, 0, 0), timeEnd: numbToCDate(2024, 12, 15, 0, 0) },
        //     { id: 27, name: 'add Begging Gang', type: 'war', parentId: 16, level: 'hour', timeStart: numbToCDate(2024, 12, 2, 0, 0), timeEnd: numbToCDate(2024, 12, 15, 0, 0) },
         
        //     { id: 19, name: 'mua Hạt Dưa đãi mấy ac  ', type: '', parentId: null, level: 'hour', timeStart: numbToCDate(2024, 12, 3, 12, 0), timeEnd: numbToCDate(2024, 12, 3, 20, 0) },
       
        // ];
        // setAllEvs(evsInit);

        getEvs()
            .then((data: Ev[]) => {
                setAllEvs(data);
                // console.log("data:", data);
            })

    }, []);
    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const beggerEv = TIList.length > 0
        ? {
            id: 999,
            name: 'Begger Gang',
            parentId: null,
            level: getLevelByType('parentEv'),
            timeStart: TIList[0].date,
            timeEnd: GhToCDate(cDateToGh(TIList[TIList.length - 1].date) + hourPerTI)
        } as Ev : {} as Ev;

    const fiveLines = getFiveLines(allParentEvs);
    return (
        <div
            ref={setNodeRef}
            id='TLBaseFg'
            style={{
                width: w$Bg,
                overflowX: 'hidden',
                overflowY: 'hidden',
                // width: '100%',
                height: 573,
                flexDirection: 'column',
                gap: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 100,
            }}>
                {[...fiveLines, [beggerEv]].map((line: Ev[], i) => {
                return line.map(parontEv => {
                    return <ParentEv
                        key={parontEv.id}
                        parentEv={parontEv}
                        childEvs={parontEv.id === beggerEv.id
                            ? filterEvs.filter(ev => ev.level === getLevelByType('childEv') && ev.parentId === null)
                            : filterEvs.filter(ev => ev.parentId === parontEv.id)}
                        lineOrder={i}
                        isBeggerGang={parontEv.id === beggerEv.id}
                    />
                })
            })
            }
            <DragOverlay>
                {activeId ? (
                    <TISample id={activeId} />
                ) : null}
            </DragOverlay>
        </div>
    );
}