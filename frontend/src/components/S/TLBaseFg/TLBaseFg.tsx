import React, { useEffect, useState } from "react";
import { baseWofTI, cDate } from "../TLConfigs";
import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { cDateToGh, parseCDate, toCDate, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Evc } from "./Evc";
import { Ev } from "../TLTypes";
import { useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import TISample from "../TLTools/TISample";
import { EvGroup } from "./EvGroup";

export const TLBaseFg = () => {
    const { RhToPx, h$G_BgStart, h$G_BgEnd, dateToCDate } = useTLBaseBgHelpers();
    const { dateReal, setDateReal, zoomLv } = useTLBaseBgStore();
    const { allEvs, setAllEvs, activeId, setActiveId } = useTLBaseFgStore();
    const { filterEvs, getAllGroups, getFiveLines } = useTLBaseFgHelpers();
    const {isOver, setNodeRef} = useDroppable({ id: 'droppablex'});
    const allGroups = getAllGroups();

    useEffect(() => {
        const evsInit: Ev[] = [
            { id: '1', name: '1', type: 'war', parentId: 'learn-it', level: 1, timeStart: toCDate(2024, 12, 1, 3, 0), timeEnd: toCDate(2024, 12, 1, 7, 0) },
            { id: '2', name: '2', type: 'war', parentId: 'learn-it', level: 1, timeStart: toCDate(2024, 12, 1, 3, 0), timeEnd: toCDate(2024, 12, 1, 5, 0) },
            { id: '6', name: '6', type: 'war', parentId: 'none',     level: 1, timeStart: toCDate(2024, 12, 1, 6, 0), timeEnd: toCDate(2024, 12, 1, 9, 0) },
            { id: '3', name: '3', type: 'war', parentId: 'learn-it', level: 1, timeStart: toCDate(2024, 12, 1, 7, 0), timeEnd: toCDate(2024, 12, 1, 9, 0) },
            { id: '4', name: '4', type: 'war', parentId: 'activity', level: 1, timeStart: toCDate(2024, 12, 1, 6, 0), timeEnd: toCDate(2024, 12, 1, 10, 0) },
            { id: '5', name: '5', type: 'war', parentId: 'activity', level: 1, timeStart: toCDate(2024, 12, 1, 2, 0), timeEnd: toCDate(2024, 12, 1, 3, 0) },
        ];

        setAllEvs(evsInit);
        // getEvs()
        //     .then((data: Ev[]) => {
        //         setAllEvs(data);
        //     })

    }, []);
    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);


    // data flow: allEvs --> filterEvs --> allGroups --> EvGroup --> fiveLines --> renderEv --> Evc
    return (
        <div 
        ref={setNodeRef} 
        style={{
            // background: isOver ? 'green' : undefined,
            // ...props.sx,
                width: '100%',
                height: 373,
                flexDirection: 'column',
                gap: 1,
                position: 'absolute',
                overflowY: 'hidden',
                top: 0,
                left: 0,
                zIndex: 100,
                // transform: CSS.Transform.toString([0, 0]),
                // background: '#00000050',
            }}>
                {Object.keys(allGroups)
                    .sort((a, b) => (a === "none" ? 1 : b === "none" ? -1 : 0)) // noneParent sẽ nằm cuối
                    .map((groupKey) => <EvGroup id={groupKey} group={allGroups[groupKey]} />)}
                <DragOverlay> 
                    {activeId ? (
                        <TISample id={activeId} /> 
                    ): null}
                </DragOverlay>
        </div>
    );
}