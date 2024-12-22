import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "../2_TLBaseFg/TLBaseFgHelpers";
import { useDroppable } from "@dnd-kit/core";
import { ChildEv } from "./ChildEv";
import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import GrabEdge from "./GrabEdge";
import { cDateToGh } from "../3_TimeConfig/TimeHelpers";
import { _4cs } from "./4cs";
import BlackMini from "./BlackMini";
import {useChildEvStore} from "./ChildEvStore";
import {ParentEvProps} from "./4ty";


export const ParentEv = (props: ParentEvProps) => {
    const { childEvs, parentEv, lineOrder, isBeggerGang = false } = props;
    const { getFiveLines } = useTLBaseFgHelpers();
    const { setNodeRef, isOver } = useDroppable({ id: parentEv.id });
    const { RhToPx, h$G_BgStart } = useTLBaseBgHelpers();
    const { setFevId, fevId } = useChildEvStore();

    const fiveLines = getFiveLines(childEvs);

    const left = RhToPx(cDateToGh(parentEv.timeStart as cDate) - h$G_BgStart)
    const top = _4cs.TLBaseFrame.pt + (100 + 10) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
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
                height: _4cs.parentEv.pt*2 + _4cs.childEv.he * fiveLines.length + _4cs.childEv.gapBetweenChildren * (fiveLines.length - 1) + _4cs.parentEv.heOf2borders,
                top: isBeggerGang ? undefined : top,
                bottom: isBeggerGang ? 0 : undefined,
                background: isOver ? 'lightblue' : '#00000010',
                borderRadius: isBeggerGang ? 0 : 20,
                border: fevId && fevId === parentEv.id ? _4cs.childEv.he : '2px solid transparent',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 1,
                zIndex: 100,
                position: 'absolute',
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