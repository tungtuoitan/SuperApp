import { useEffect } from "react";
import { useTLBaseBgStore } from "../TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import { Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { EvGroup } from "./EvGroup";
import TISample from "../TLTools/TISample";
import { getEvs } from "../../../FetchAPIs/TLAPIs";
import { useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";

export const TLBaseFg = () => {
    const { setDateReal } = useTLBaseBgStore();
    const { setAllEvs, activeId } = useTLBaseFgStore();
    const { getAllEvGroups } = useTLBaseFgHelpers();
    const { w$Bg } = useTLBaseBgHelpers();
    const { setNodeRef } = useDroppable({ id: 'droppablex' });
    const allEvGroups = getAllEvGroups();

    useEffect(() => {
        // const evsInit: Ev[] = [
        //     { id: 1, name: '1', type: 'war', parentId: null, level: 1, timeStart: numbToCDate(2024, 12, 1, 3, 0), timeEnd: numbToCDate(2024, 12, 1, 7, 0) },
        //     { id: 2, name: '2', type: 'war', parentId: null, level: 1, timeStart: numbToCDate(2024, 12, 1, 3, 0), timeEnd: numbToCDate(2024, 12, 1, 5, 0) },
        //     { id: 6, name: '6', type: 'war', parentId: null,     level: 1, timeStart: numbToCDate(2024, 12, 1, 6, 0), timeEnd: numbToCDate(2024, 12, 1, 9, 0) },
        //     { id: 3, name: '3', type: 'war', parentId: null, level: 1, timeStart: numbToCDate(2024, 12, 1, 7, 0), timeEnd: numbToCDate(2024, 12, 1, 9, 0) },
        //     { id: 4, name: '4', type: 'war', parentId: null, level: 1, timeStart: numbToCDate(2024, 12, 1, 6, 0), timeEnd: numbToCDate(2024, 12, 1, 10, 0) },
        //     { id: 5, name: '5', type: 'war', parentId: null, level: 1, timeStart: numbToCDate(2024, 12, 1, 2, 0), timeEnd: numbToCDate(2024, 12, 1, 3, 0) },
        // ];
        // setAllEvs(evsInit);

        getEvs()
            .then((data: Ev[]) => {
                setAllEvs(data);
                console.log("data:", data);
            })

    }, []);
    // mỗi 1 phút cập nhật lại thời gian thực
    useEffect(() => {
        const interval = setInterval(() => setDateReal(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);


    // component flow: TLContainer --> TLBaseContainer --> TLBaseBg --> EvGroup --> Evc
    // data flow: allEvs --> filterEvs --> allEvGroups --> EvGroup --> fiveLines --> Ev
    return (
        <div
            ref={setNodeRef}
            style={{
                width: w$Bg,
                overflowX: 'hidden',
                // width: '100%',
                height: 373,
                flexDirection: 'column',
                gap: 1,
                position: 'absolute',
                overflowY: 'hidden',
                top: 0,
                left: 0,
                zIndex: 100,
            }}>
            {Object.keys(allEvGroups)
                .sort((a, b) => (a === "none" ? 1 : b === "none" ? -1 : 0)) // sort để noneParent nằm dưới cùng
                .map((groupKey) => <EvGroup key={groupKey} groupId={groupKey} groupEvs={allEvGroups[groupKey]} />)}
            <DragOverlay>
                {activeId ? (
                    <TISample id={activeId} />
                ) : null}
            </DragOverlay>
        </div>
    );
}