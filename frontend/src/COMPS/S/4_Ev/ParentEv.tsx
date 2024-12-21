import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "../2_TLBaseFg/TLBaseFgHelpers";
import { useDroppable } from "@dnd-kit/core";
import { ChildEv } from "./ChildEv";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import GrabEdge from "./GrabEdge";
import { cDateToGh } from "../3_TimeConfig/TimeHelpers";
import { EvStore } from "./EvStore";
import { _4css } from "./4css";
import BlackMini from "./BlackMini";

type ParentEvProps = {
    childEvs: Ev[];
    parentEv: Ev;
    lineOrder: number;
    isBeggerGang?: boolean;
}
export const ParentEv = (props: ParentEvProps) => {
    const { childEvs, parentEv, lineOrder, isBeggerGang = false } = props;
    const { getFiveLines } = useTLBaseFgHelpers();
    const { setNodeRef, isOver } = useDroppable({ id: parentEv.id });
    const { RhToPx, h$G_BgStart } = useTLBaseBgHelpers();
    const { setFevId, fevId } = EvStore();

    const fiveLines = getFiveLines(childEvs);

    const left = RhToPx(cDateToGh(parentEv.timeStart as cDate) - h$G_BgStart)
    const top = _4css.ptOfTLBaseFrame + (100 + 10) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(parentEv.timeEnd as cDate) - cDateToGh(parentEv.timeStart as cDate)
    )

    return (
        <div
            id={'ParentEv-' + parentEv.name}
            data-name={parentEv.name}
            ref={setNodeRef}
            onClick={() => {
                setFevId(parentEv.id)
            }}
            style={{
                width: width,
                // transform: `translateX(${left}px)`, // this is better for performance, but it has problem while dropping
                left: left,
                display: 'flex',
                justifyContent: 'center',
                height: _4css.ptOfParent*2 + _4css.he * fiveLines.length + _4css.gapBetweenChildren * (fiveLines.length - 1) + _4css.heOf2BordersOfParent,
                top: isBeggerGang ? undefined : top,
                bottom: isBeggerGang ? 0 : undefined,
                flexDirection: 'column',
                background: isOver ? 'lightblue' : '#00000010',
                gap: 1,
                zIndex: 100,
                position: 'absolute',
                borderRadius: isBeggerGang ? 0 : 20,
                border: fevId && fevId === parentEv.id ? _4css.focusBo : '2px solid transparent',
            }}>
            <span style={{ position: 'absolute', left: 4, top: -20, color: 'gray' }}>{parentEv.name}</span>
            {fiveLines[0]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={0} />)}
            {fiveLines[1]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={1} />)}
            {fiveLines[2]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={2} />)}
            {fiveLines[3]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={3} />)}
            {fiveLines[4]?.map((childEv: Ev, i) => <ChildEv key={childEv.id} parentEv={parentEv} childEv={childEv} lineOrder={4} />)}
            {!isBeggerGang && <GrabEdge position='left' id={parentEv.id} type='parent' />}
            {!isBeggerGang && <GrabEdge position='right' id={parentEv.id} type='parent' />}
            {!isBeggerGang && fevId && fevId === parentEv.id && <BlackMini childId={parentEv.id} parentWidth={width}/>}
        </div>
    );
}