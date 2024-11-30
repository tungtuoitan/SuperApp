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


export const TLBaseFg = () => {
    const { RhToPx, h$G_BgStart, h$G_BgEnd, dateToCDate } = useTLBaseBgHelpers();
    const { dateReal, setDateReal, zoomLv } = useTLBaseBgStore();
    const { allEvs, setAllEvs, activeId, setActiveId } = useTLBaseFgStore();
    const { filterEvs, getAllLines } = useTLBaseFgHelpers();
    const {isOver, setNodeRef} = useDroppable({ id: 'droppablex'});
    
    const allLines : Ev[][] = getAllLines();

    useEffect(() => {
        const evsInit: Ev[] = [
            { id: '1', name: '1', type: 'war', level: 1, timeStart: toCDate(2024, 11, 30, 1, 0), timeEnd: toCDate(2024, 11, 30, 5, 0) },
            { id: '2', name: '2', type: 'war', level: 1, timeStart: toCDate(2024, 11, 30, 1, 0), timeEnd: toCDate(2024, 11, 30, 3, 0) },
            { id: '3', name: '3', type: 'war', level: 1, timeStart: toCDate(2024, 11, 30, 5, 0), timeEnd: toCDate(2024, 11, 30, 7, 0) },
            { id: '4', name: '4', type: 'war', level: 1, timeStart: toCDate(2024, 11, 30, 4, 0), timeEnd: toCDate(2024, 11, 30, 8, 0) },
            { id: '5', name: '5', type: 'war', level: 1, timeStart: toCDate(2024, 11, 30, 0, 0), timeEnd: toCDate(2024, 11, 30, 1, 0) },
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

    const renderEv = (ev: Ev, index: number, lineOrder: number) => {
        const left = RhToPx(cDateToGh(ev.timeStart as cDate) - h$G_BgStart)
        const paddingTop = 20;
        const height = 20;

        const top = paddingTop + (20 + 2)*lineOrder; // 20 là height của Ev, 2 là gap giữa các line
        return <Evc
            key={ev.id}
            id={ev.id}
            content={ev.name}
            width={RhToPx(
                cDateToGh(ev.timeEnd as cDate) - cDateToGh(ev.timeStart as cDate)
            )}
            left={left}
            top={top}
            height={height}
        />
    }

    // data flow: allEvs --> filterEvs --> allLines --> renderEv --> Evc
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
                top: 0,
                left: 0,
                zIndex: 100,
                // transform: CSS.Transform.toString([0, 0]),
                // background: '#00000050',
            }}>
                {allLines[0]?.map((ev: Ev, index) => renderEv(ev, index, 0))}
                {allLines[1]?.map((ev: Ev, index) => renderEv(ev, index, 1))}
                {allLines[2]?.map((ev: Ev, index) => renderEv(ev, index, 2))}
                {allLines[3]?.map((ev: Ev, index) => renderEv(ev, index, 3))}
                {allLines[4]?.map((ev: Ev, index) => renderEv(ev, index, 4))}
                {allLines[5]?.map((ev: Ev, index) => renderEv(ev, index, 5))}
                <DragOverlay> 
                    {activeId ? (
                        <TISample id={activeId} /> 
                    ): null}
                </DragOverlay>
        </div>
    );
}