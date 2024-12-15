import { useEffect } from "react";
import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Ev } from "../TLTypes";
import { isOverlap, useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import TISample from "../7_TLTools/TISample";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { ParentEv } from "../4_Ev/ParentEv";
import { getEvs } from "../TLAPIs";
import { cDateToGh, GhToCDate } from "../3_TimeConfig/TimeHelpers";

export const TLBaseFg = () => {
    const { setDateReal, TIList } = useTLBaseBgStore();
    const { hourPerTI } = useTLBaseBgHelpers();
    const { setAllEvs, activeId, newEvId, allEvs } = useTLBaseFgStore();
    const { filterEvs, getFiveLines, markEvs } = useTLBaseFgHelpers();
    const { w$Bg, getLevelCOf } = useTLBaseBgHelpers();
    const { setNodeRef, isOver } = useDroppable({ id: 'TLBaseFg-droppable' });

    useEffect(() => {
        getEvs()
            .then((data: Ev[]) => {
                setAllEvs(markEvs(data));
            })

    }, []);
    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // console.log('allEvs', allEvs);
    }, [allEvs, TIList]);

    const beggerEv = TIList.length > 0
        ? {
            id: 999999999,
            name: 'Begger Gang',
            parentId: null,
            levelC: getLevelCOf('parentEv'),
            timeStart: TIList[0].date,
            timeEnd: GhToCDate(cDateToGh(TIList[TIList.length - 1].date) + hourPerTI)
        } as Ev : {} as Ev;

    const fiveLines = getFiveLines(filterEvs(['inside-TL', 'parentEv', 'active']));
    return (
        <div
            id='TLBaseFg'
            ref={setNodeRef}
            style={{
                width: w$Bg,
                // border: isOver ? '4px solid lightblue' : '4px solid transparent',
                background: isOver ? '#add8e698' : 'transparent',
                overflowX: 'hidden',
                overflowY: 'hidden',
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
                            ? filterEvs(['inside-TL', 'active', 'childEv', 'nonParent'])
                            : filterEvs(['inside-TL', 'active']).filter(ev => ev.parentId === parontEv.id)}
                        lineOrder={i}
                        isBeggerGang={parontEv.id === beggerEv.id}
                    />
                })
            })
            }
            <DragOverlay>
                {activeId === newEvId
                    ? <TISample id={activeId} type={isOver ? 'parentEv' : 'childEv'} />
                    : null}
            </DragOverlay>
        </div>
    );
}