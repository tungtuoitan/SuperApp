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