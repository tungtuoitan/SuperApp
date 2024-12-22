import { useEffect } from "react";
import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import TISample from "../7_TLTools/TISample";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { ParentEv } from "../4_ChildEv/ParentEv";
import { getEvs } from "../TLAPIs";
import {WTLBaseFgContainer} from "./2ui";
import {use2he} from "./2he";

export const TLBaseFg = () => {
    const { setDateReal, TIList } = useTLBaseBgStore();
    const { setAllEvs, activeId, newEvId, allEvs } = useTLBaseFgStore();
    const { filterEvs, getFiveLines, markEvs } = useTLBaseFgHelpers();
    const { w$Bg, getLevelCOf } = useTLBaseBgHelpers();
    const { setNodeRef, isOver } = useDroppable({ id: 'TLBaseFg-droppable' });
    const { checkData, beggerEv } = use2he();

    useEffect(() => {
        getEvs()
            .then((data: Ev[]) => {
                const markData = markEvs(data);
                setAllEvs(markEvs(markData));
            })

    }, []);

    useEffect(() => {
        checkData();
    }, [allEvs]);
    
    // update dateReal
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);


    const fiveLines = getFiveLines(filterEvs(['inside-TL', 'parentEv', 'active']));

    return (
        <WTLBaseFgContainer id='TLBaseFg' ref={setNodeRef} sx={{ width: w$Bg, background: isOver ? '#add8e698' : 'transparent' }}>
            {[...fiveLines, [beggerEv]].map((line: Ev[], i) => {
                return line.map(parontEv => {
                    return <ParentEv
                        key={parontEv.id}
                        parentEv={parontEv}
                        childEvs={parontEv.id === beggerEv.id || parontEv.id === null
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
        </WTLBaseFgContainer>
    );
}