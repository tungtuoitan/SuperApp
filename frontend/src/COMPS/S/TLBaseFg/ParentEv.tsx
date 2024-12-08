import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { useDroppable } from "@dnd-kit/core";
import { ChildEv } from "./ChildEv";
import { cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import GrabEdge from "./GrabEdge";

type ParentEvProps = {
    childEvs: Ev[];
    parentEv: Ev;
    lineOrder: number;
    isBeggerGang?: boolean;
}
export const ParentEv = (props: ParentEvProps) => {
    const { childEvs, parentEv, lineOrder, isBeggerGang = false } = props;
    const { getFiveLines } = useTLBaseFgHelpers();
    const { setNodeRef } = useDroppable({ id: parentEv.id });

    const fiveLines = getFiveLines(childEvs);

    const { RhToPx, h$G_BgStart } = useTLBaseBgHelpers();
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(parentEv.timeStart as cDate) - h$G_BgStart)
    const top = paddingTop + (100 + 10) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(parentEv.timeEnd as cDate) - cDateToGh(parentEv.timeStart as cDate)
    )

    return (
        <div
            id={'ParentEv-' + parentEv.name}
            data-name={parentEv.name}
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
                borderRadius: isBeggerGang ? 0 : 20,
                // borderLeft: '10px solid transparent', // for beauty when child in parentEv
                // borderRight: '10px solid transparent',
            }}>
            <span style={{ position: 'absolute', left: 4, top: -20, color: 'gray' }}>{parentEv.name}</span>
            {fiveLines[0]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={0} />)}
            {fiveLines[1]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={1} />)}
            {fiveLines[2]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={2} />)}
            {fiveLines[3]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={3} />)}
            {fiveLines[4]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={4} />)}
            {!isBeggerGang && <GrabEdge position='left' id={parentEv.id} type='parent' />}
            {!isBeggerGang && <GrabEdge position='right' id={parentEv.id} type='parent' />}
        </div>
    );
}