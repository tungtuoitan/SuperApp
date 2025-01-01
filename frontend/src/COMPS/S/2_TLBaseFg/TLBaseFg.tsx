import { useEffect } from "react";
import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import TISample from "../7_FloatTools/TISample";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { ParentEv } from "../4_ChildEv/ParentEv";
import { getEvs } from "../TLAPIs";
import {WTLBaseFgContainer} from "./2ui";
import {use2he} from "./2he";
import {useFloatToolsStore} from "../7_FloatTools/FloatToolsStore";
import {_4cs} from "../4_ChildEv/4cs";
  
export const TLBaseFg = () => {
    const { setDateReal, TIList } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { activeId, FIIDs } = useFloatToolsStore();
    const { filterEvs, getFiveLines, markEvs } = useTLBaseFgHelpers();
    const { w$Bg, getLevelCOf } = useTLBaseBgHelpers();
    const { setNodeRef, isOver } = useDroppable({ id: 'TLBaseFg-droppable' });
    const { checkData, beggerEv, getTopsOf5ParentLines } = use2he();

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

    const childEvsOfBegger = [
        ...filterEvs(['inside-TL', 'active','type:task', 'childEv', 'nonParent']),
        ...filterEvs(['inside-TL', 'active','type:event', 'nonParent']),
    ]

    const fiveLines = getFiveLines(filterEvs(['inside-TL', 'parentEv', 'active']));
    const parentTops = getTopsOf5ParentLines();

    return (
        <WTLBaseFgContainer id='TLBaseFg' ref={activeId===FIIDs.parentEv ? setNodeRef : null} sx={{ width: w$Bg, background: isOver && activeId===FIIDs.parentEv ? _4cs.TLBaseFg.bgOver : _4cs.TLBaseFg.bgNormal }}>
            {[...fiveLines, [beggerEv]].map((line: Ev[], i) => {
                return line.map((parontEv,index) => {
                    const childEvs = filterEvs(['inside-TL', 'childEv', 'active']).filter(ev => ev.parentId === parontEv.id)
                    return <ParentEv
                        key={parontEv.id}
                        parentEv={parontEv}
                        index={index}
                        childEvs={parontEv.id === beggerEv.id || parontEv.id === null
                            ? childEvsOfBegger
                            : childEvs}
                        lineOrder={i}
                        isBeggerGang={parontEv.id === beggerEv.id}
                        top={parentTops[i]}
                    />
                })
            })
            }
            <DragOverlay>
                {activeId === FIIDs.parentEv && activeId !== null
                    ? <TISample id={FIIDs.parentEv} type={'parentEv'} /> : null}
            </DragOverlay>
            <DragOverlay>
                {activeId === FIIDs.childEv && activeId !== null
                    ? <TISample id={FIIDs.childEv} type={'childEv'} /> : null}
            </DragOverlay>
        </WTLBaseFgContainer>
    );
}