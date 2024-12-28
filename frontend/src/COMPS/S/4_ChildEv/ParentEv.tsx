import { cDate } from "../TLTypes";
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
import {useFloatToolsStore} from "../7_FloatTools/FloatToolsStore";
import {useTLBaseBgStore} from "../1_TLBaseBg/TLBaseBgStore";
import {DotGroup, Pame} from "./4ui";

export const ParentEv = (props: ParentEvProps) => {
    const { childEvs, parentEv, lineOrder, isBeggerGang = false, top, index } = props;
    const { getFiveLines } = useTLBaseFgHelpers();
    const { setNodeRef, isOver } = useDroppable({ id: parentEv.id });
    const { RhToPx, h$G_BgStart,RpxToRh } = useTLBaseBgHelpers();
    const { setFevId, fevId } = useChildEvStore();
    const { activeId, FIIDs } = useFloatToolsStore(); 
    const { TLBaseFrameScrollLeft, TLBaseFrameRef } = useTLBaseBgStore();

    const fiveLines = getFiveLines(childEvs);

    const left = RhToPx(cDateToGh(parentEv.timeStart as cDate) - h$G_BgStart)
    // const top = _4cs.TLBaseFrame.pt + (100 + 10) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(parentEv.timeEnd as cDate) - cDateToGh(parentEv.timeStart as cDate)
    )
    const totallines = fiveLines.length>0?fiveLines.length:1
    const height =  _4cs.parentEv.pt*2 + _4cs.childEv.he * totallines + _4cs.childEv.gapBetweenChildren * (totallines - 1) + _4cs.parentEv.heOf2borders

    const h$G_TLBaseFrameLeft = h$G_BgStart + RpxToRh(TLBaseFrameScrollLeft)
    const isStickTitle = cDateToGh(parentEv.timeStart)<h$G_TLBaseFrameLeft && cDateToGh(parentEv.timeEnd)>h$G_TLBaseFrameLeft

    const displayLeftGrabEdge = fevId===parentEv.id && !isBeggerGang
    const displayRightGrabEdge = fevId===parentEv.id && !isBeggerGang
    const displayBlackMini = !isBeggerGang && fevId && fevId === parentEv.id
    const displayDotGroup = width > 30 && childEvs.length===0

    return (
        <div
            id={'ParentEv-' + parentEv.name}
            data-name={parentEv.name}
            ref={activeId===FIIDs.childEv ? setNodeRef : null}
            onClick={() => {
                setFevId(parentEv.id)
            }}
            style={{
                width: width,
                // transform: `translateX(${left}px)`, // this is better for performance, but it has problem while dropping
                left: left,
                height: height,
                top: isBeggerGang ? undefined : top,
                bottom: isBeggerGang ? 0 : undefined,
                background: isOver && activeId===FIIDs.childEv ? _4cs.parentEv.bgIsOver : _4cs.parentEv.bgNormal,
                borderRadius: isBeggerGang ? 0 : 20,
                border: fevId && fevId === parentEv.id ? _4cs.parentEv.boFocus : _4cs.parentEv.boNormal,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 1,
                zIndex: fevId === parentEv.id || childEvs.find(ev => ev.id === fevId) ? '1111' : '100',
                position: 'absolute',
            }}>
            <Pame sx={{ display: isStickTitle&&index===0? 'none': 'block', top:-8, left: 12, width: width-12*2 }}>{parentEv.name}</Pame>
            {fiveLines[0]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={0} />)}
            {fiveLines[1]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={1} />)}
            {fiveLines[2]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={2} />)}
            {fiveLines[3]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={3} />)}
            {fiveLines[4]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={4} />)}
            {fiveLines[5]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={5} />)}
            {fiveLines[6]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={6} />)}
            {fiveLines[7]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={7} />)}
            {fiveLines[8]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={8} />)}
            {fiveLines[9]?.map(c => <ChildEv key={c.id} parentEv={parentEv} childEv={c} lineOrder={9} />)}
            {displayLeftGrabEdge && <GrabEdge position='left' id={parentEv.id} type='parent' />}
            {displayRightGrabEdge && <GrabEdge position='right' id={parentEv.id} type='parent' />}
            {displayBlackMini && <BlackMini childId={parentEv.id} parentWidth={width} sx={{top: height+5}}/>}
            {displayDotGroup && <DotGroup childEv={parentEv} />}
        </div>
    );
}