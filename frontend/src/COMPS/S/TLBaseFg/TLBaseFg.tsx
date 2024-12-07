import { useEffect } from "react";
import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import TISample from "../TLTools/TISample";
import { cDateToGh, GhToCDate, numbToCDate, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { uncleEvConstant } from "../TLConstants";
import { ParentEv } from "./ParentEv";

export const TLBaseFg = () => {
    const { setDateReal, TIList } = useTLBaseBgStore();
    const { hourPerTI } = useTLBaseBgHelpers();
    const { setAllEvs, activeId } = useTLBaseFgStore();
    const { filterEvs, getFiveLines } = useTLBaseFgHelpers();
    const { w$Bg, getLevelByTimeConfig } = useTLBaseBgHelpers();
    const { setNodeRef } = useDroppable({ id: 'droppablex' });

    const allParentEvs = filterEvs.filter(ev => ev.level === getLevelByTimeConfig('parentEv'));

    useEffect(() => {
        const evsInit: Ev[] = [
            { id: 12, name: 'cen2', type: 'war', parentId: null, level: 'century', timeStart: numbToCDate(2024, 1, 1, 0, 0), timeEnd: numbToCDate(1099, 1, 1, 0, 0) },
            { id: 13, name: 'de20', type: 'war', parentId: null, level: 'decade', timeStart: numbToCDate(2024, 1, 1, 0, 0), timeEnd: numbToCDate(2030, 1, 1, 0, 0) },
            { id: 14, name: 'de', type: 'war', parentId: null, level: 'decade', timeStart: numbToCDate(2030, 1, 1, 0, 0), timeEnd: numbToCDate(2036, 1, 1, 0, 0) },
          
            { id: 1, name: 'm1', type: 'war', parentId: null, level: 'month', timeStart: numbToCDate(2024, 12, 1, 0, 0), timeEnd: numbToCDate(2025, 2, 1, 0, 0) },

            { id: 2, name: 'm1-w1', type: 'war', parentId: 1, level: 'week', timeStart: numbToCDate(2024, 12, 2, 0, 0), timeEnd: numbToCDate(2024, 12, 15, 0, 0) },
            { id: 3, name: 'm1-w2', type: 'war', parentId: 1, level: 'week', timeStart: numbToCDate(2024, 12, 12, 0, 0), timeEnd: numbToCDate(2024, 12, 30, 0, 0) },
            { id: 12, name: 'm1-w3', type: 'war', parentId: 1, level: 'week', timeStart: numbToCDate(2024, 12, 17, 0, 0), timeEnd: numbToCDate(2024, 12, 28, 0, 0) },

            { id: 4, name: 'm1-w1-d1', type: 'war', parentId: 2, level: 'day', timeStart: numbToCDate(2024, 12, 2, 0, 0), timeEnd: numbToCDate(2024, 12, 3, 0, 0) },
            { id: 5, name: 'm1-w1-d2', type: 'war', parentId: 2, level: 'day', timeStart: numbToCDate(2024, 12, 3, 0, 0), timeEnd: numbToCDate(2024, 12, 6, 0, 0) },
            { id: 6, name: 'm1-w2-d1', type: 'war', parentId: 3, level: 'day', timeStart: numbToCDate(2024, 12, 13, 0, 0), timeEnd: numbToCDate(2024, 12, 20, 0, 0) },
            { id: 7, name: 'm1-w2-d2', type: 'war', parentId: 12, level: 'day', timeStart: numbToCDate(2024, 12, 17, 0, 0), timeEnd: numbToCDate(2024, 12, 24, 0, 0) },

            { id: 8, name: 'm1-w1-d1-h1', type: 'war', parentId: 4, level: 'day', timeStart: numbToCDate(2024, 12, 1, 0, 0), timeEnd: numbToCDate(2024, 12, 22, 2, 0) },
            { id: 9, name: 'm1-w1-d1-h2', type: 'war', parentId: 4, level: 'day', timeStart: numbToCDate(2024, 12, 2, 0, 0), timeEnd: numbToCDate(2024, 12, 22, 18, 0) },
            { id: 10, name: 'm1-w1-d2-h1', type: 'war', parentId: 5, level: 'day', timeStart: numbToCDate(2024, 12, 3, 4, 0), timeEnd: numbToCDate(2024, 12, 3, 10, 0) },
            { id: 11, name: 'm1-w1-d2-h2', type: 'war', parentId: 5, level: 'day', timeStart: numbToCDate(2024, 12, 3, 12, 0), timeEnd: numbToCDate(2024, 12, 3, 20, 0) },
       
        ];
        setAllEvs(evsInit);

        // getEvs()
        //     .then((data: Ev[]) => {
        //         setAllEvs(data);
        //         // console.log("data:", data);
        //     })

    }, []);
    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const uncleEv = TIList.length > 0
        ? {
            ...uncleEvConstant,
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
                height: 373,
                flexDirection: 'column',
                gap: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 100,
            }}>
            {[...fiveLines].map((line: Ev[], i) => {
                // {[...fiveLines, [uncleEv]].map((line: Ev[], i) => {
                return line.map(parontEv => {
                    return <ParentEv
                        key={parontEv.id}
                        parentEv={parontEv}
                        childEvs={parontEv.id === uncleEv.id
                            ? filterEvs.filter(ev => ev.level === getLevelByTimeConfig('childEv'))
                            : filterEvs.filter(ev => ev.parentId === parontEv.id)}
                        lineOrder={i}
                        isUncle={parontEv.id === uncleEv.id}
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