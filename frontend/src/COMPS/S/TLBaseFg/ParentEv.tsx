import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { useDroppable } from "@dnd-kit/core";
import { Evc } from "./Evc";
import { cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";

type ParentEvProps = {
    parentId: number; // tức id TI, mỗi evs tương ứng với 1 TI lớn
    evs: Ev[];
    parentEv: Ev;
    lineOrder: number;
    isUncle?: boolean;
}
export const ParentEv = (props: ParentEvProps) => {
    const { parentId, evs, parentEv, lineOrder, isUncle = false } = props;
    const { getFiveLines } = useTLBaseFgHelpers();
    const { setNodeRef } = useDroppable({ id: parentId });

    const fiveLines = getFiveLines(evs);

    const { RhToPx, h$G_BgStart } = useTLBaseBgHelpers();
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(parentEv.timeStart as cDate) - h$G_BgStart)
    const top = paddingTop + (100 + 10) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(parentEv.timeEnd as cDate) - cDateToGh(parentEv.timeStart as cDate)
    )
   
    // ParentEv --> MainEv --> ChildEv
    // data flow: allEvs --> filterEvs --> allGroups --> fiveLines --> renderEv --> Evc
    return (
        <div
            id={'ParentEv-' + parentId}
            ref={setNodeRef}
            style={{
                width: width,
                transform: `translateX(${left}px)`,
                height: 100,
                top: top,
                flexDirection: 'column',
                background: '#00000010',
                gap: 1,
                zIndex: 100,
                position: 'absolute',
                marginBottom: 10,
                borderRadius: isUncle ? 0 : 100,
            }}>
            {fiveLines[0]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={0} />)}
            {fiveLines[1]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={1} />)}
            {fiveLines[2]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={2} />)}
            {fiveLines[3]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={3} />)}
            {fiveLines[4]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={4} />)}
        </div>
    );
}