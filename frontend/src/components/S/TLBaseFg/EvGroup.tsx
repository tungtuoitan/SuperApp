import { baseWofTI, cDate } from "../TLConfigs";
import { cDateToGh, parseCDate, toCDate, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { Evc } from "./Evc";
import { Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { DragOverlay, useDroppable } from "@dnd-kit/core";

type GroupProps = {
    id: string; // tức id TI, mỗi group tương ứng với 1 TI lớn
    group: Ev[];
}
export const EvGroup = (props: GroupProps) => {
    const { id, group } = props;
    const { RhToPx, h$G_BgStart, h$G_BgEnd, dateToCDate } = useTLBaseBgHelpers();
    const { filterEvs, getAllGroups, getFiveLines } = useTLBaseFgHelpers();
    const { isOver, setNodeRef } = useDroppable({ id: id });

    const renderEv = (ev: Ev, index: number, lineOrder: number) => {
        const left = RhToPx(cDateToGh(ev.timeStart as cDate) - h$G_BgStart)
        const paddingTop = 20;
        const height = 20;
        const width = RhToPx(
            cDateToGh(ev.timeEnd as cDate) - cDateToGh(ev.timeStart as cDate)
        )

        const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
        return <Evc
            key={ev.id}
            id={ev.id}
            content={ev.name}
            width={width}
            left={left}
            top={top}
            height={height}
        />
    }

    const renderGroup = (group: Ev[]) => {
        const fiveLines = getFiveLines(group);
        return <>
            {fiveLines[0]?.map((ev: Ev, index) => renderEv(ev, index, 0))}
            {fiveLines[1]?.map((ev: Ev, index) => renderEv(ev, index, 1))}
            {fiveLines[2]?.map((ev: Ev, index) => renderEv(ev, index, 2))}
            {fiveLines[3]?.map((ev: Ev, index) => renderEv(ev, index, 3))}
            {fiveLines[4]?.map((ev: Ev, index) => renderEv(ev, index, 4))}
        </>
    }

    // data flow: allEvs --> filterEvs --> allGroups --> fiveLines --> renderEv --> Evc
    return (
        <div
            ref={setNodeRef}
            id={'EvGroup-' + id}
            style={{
                // background: isOver ? 'green' : undefined,
                // ...props.sx,
                width: '100%',
                height: 100,
                flexDirection: 'column',
                background: '#00000010',
                gap: 1,
                zIndex: 100,
                position: 'relative',
                // transform: CSS.Transform.toString([0, 0]),
                // background: '#00000050',
                marginBottom: 10,
            }}>
            {renderGroup(group)}
        </div>
    );
}