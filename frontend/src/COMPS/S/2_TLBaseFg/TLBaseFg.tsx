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
import {useSnackbar} from "notistack";
import {sr} from "../TLConstants";

export const TLBaseFg = () => {
    const { setDateReal, TIList } = useTLBaseBgStore();
    const { hourPerTI } = useTLBaseBgHelpers();
    const { setAllEvs, activeId, newEvId, allEvs } = useTLBaseFgStore();
    const { filterEvs, getFiveLines, markEvs } = useTLBaseFgHelpers();
    const { w$Bg, getLevelCOf } = useTLBaseBgHelpers();
    const { setNodeRef, isOver } = useDroppable({ id: 'TLBaseFg-droppable' });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getEvs()
            .then((data: Ev[]) => {
                const markData = markEvs(data);
                setAllEvs(markEvs(markData));
            })

    }, []);

    // CHECKER
    useEffect(() => {
        allEvs.forEach(ev => {
            if(cDateToGh(ev.timeEnd) < cDateToGh(ev.timeStart)) {
                enqueueSnackbar(`Warning: EVID:${ev.id} is out of time range`, { variant: "warning" })
                return}
            if(!ev.timeEnd){
                enqueueSnackbar(`Warning: EVID:${ev.id} has no timeEnd`, { variant: "warning" })
                return
            }
            if(![sr.active.inActive.c, sr.active.active.c].includes(ev.activeC)){
                enqueueSnackbar(`Warning: EVID:${ev.id} active has problem: ${ev.activeC}`, { variant: "warning" })
                return
            }
            if(![sr.priority.low.c, sr.priority.medium.c, sr.priority.normal.c, sr.priority.high.c].includes(ev.prioriC)){
                enqueueSnackbar(`Warning: EVID:${ev.id} priority has problem: ${ev.prioriC}`, { variant: "warning" })
                return
            }
            if(![sr.status.open.c, sr.status.resolved.c, sr.status.inProgress.c].includes(ev.statusC)){
                enqueueSnackbar(`Warning: EVID:${ev.id} status has problem: ${ev.statusC}`, { variant: "warning" })
                return
            }
        });
    }, [allEvs]);
    
    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);

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
        </div>
    );
}