import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev, EvsResult } from "../TLTypes";
import GrabEdge from "./GrabEdge";
import { useRef, useState } from "react";
import { EvStore, IGrabEdge } from "./EvStore";
import { cDateToGh, cDateToUTCDate, formatTime, useTimeHelpers } from "../3_TimeConfig/TimeHelpers";
import { _4css } from "./4css";
import { iuEv } from "../TLAPIs";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { useSnackbar } from "notistack";
import { helperMUIcss } from "../../CommonHelpers/5_MUIcss";
import BlackMini from "./BlackMini";
import { Cooltip } from "../../CommonHelpers/2_CoolTip";
import { clvs, sr } from "../TLConstants";
import { useTLBaseFgHelpers } from "../2_TLBaseFg/TLBaseFgHelpers";
import {ChildEvTextField, DotGroup, WChildEv, WTime} from "./4uis";
import {use4Helpers} from "./4helpers";

type EvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}



export const ChildEv = (props: EvProps) => {
    const { childEv, parentEv, lineOrder } = props;
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { grabEdge, fevId, setFevId, cutEvId, focusTFId, setFocusTFId } = EvStore();
    const [tfValue, setTfValue] = useState(childEv.name);
    const { RhToPx } = useTLBaseBgHelpers();
    const { markEvs } = useTLBaseFgHelpers();
    const { isPast } = useTimeHelpers();
    const { enqueueSnackbar } = useSnackbar();
    const { getBg } = use4Helpers();

    const left = RhToPx(cDateToGh(childEv.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = _4css.ptOfParent + (_4css.he + _4css.gapBetweenChildren) * lineOrder;
    const width = RhToPx(
        cDateToGh(childEv.timeEnd as cDate) - cDateToGh(childEv.timeStart as cDate)
    )
    const tfSelector = helperMUIcss.getTextFieldCSSSelector('childEvName');
    const enabledTF = fevId === childEv.id && fevId !== null && childEv.statusC !== sr.status.resolved.c
    const enableLeftGrabEdge = !isPast(childEv.timeStart) && childEv.statusC !== sr.status.resolved.c
    const enableRightGrabEdge = !isPast(childEv.timeEnd) && childEv.statusC !== sr.status.resolved.c

    return <>
        <WChildEv
            id={'ChildEv-' + childEv.name} data-name={childEv.name + parentEv.name}
            style={{
                width: width,
                background: getBg(childEv, grabEdge),
                transform: `translateX(${left}px)`,
                opacity: childEv.id === cutEvId ? '0.5' : '1',
                // transform: `translateY(${top}px)`,
                top: top,
                border: fevId && fevId === childEv.id ? _4css.focusBo : '2px solid transparent',
                zIndex: fevId && fevId === childEv.id ? '1000' : '100',
            }}
            onClick={(e) => {
                e.stopPropagation();
                // if (isPast(childEv.timeEnd)) return;
                if (!grabEdge.mouseenter) {
                    setFevId(childEv.id);
                }
            }}
            onDoubleClick={(e) => {
                if (fevId === childEv.id) {
                    setFocusTFId(childEv.id);
                }
            }}
        >
            {fevId && fevId === childEv.id && <BlackMini childId={childEv.id} isBeggerGang={parentEv.id===999999999 || parentEv.id===null}/>}
            <DotGroup childEv={childEv}/>
            {enableLeftGrabEdge && <GrabEdge position='left' id={childEv.id} />}
            {enableRightGrabEdge && <GrabEdge position='right' id={childEv.id} />}
            {(grabEdge.mouseenter || grabEdge.mousedownAtGE) && grabEdge.id === childEv.id && grabEdge.position === 'left' &&
                <WTime sx={{left: 0, top: parentEv.id === null || parentEv.id === 999999999 ? -50 : 10}}>{formatTime(childEv.timeStart, sr.hour.c)}</WTime>}
            
            <Cooltip title={childEv.name} placement='top' enterDelay={500} leaveDelay={200} >
                <ChildEvTextField
                    id={'childEvName' + childEv.id}
                    className={tfSelector.div0Class}
                    value={tfValue}
                    onFocus={() => {
                        setFocusTFId(childEv.id);
                    }}
                    onBlur={() => {
                        setFocusTFId(null);
                        iuEv({ ...childEv, name: tfValue, timeStart: cDateToUTCDate(childEv.timeStart), timeEnd: cDateToUTCDate(childEv.timeEnd) })
                            .then((data: EvsResult) => {
                                if (data.options.success) {
                                    enqueueSnackbar(data.options.message, { variant: "success" });
                                    setAllEvs((prev: Ev[]) => markEvs(prev.map(ev => ev.id === data.evs[0].id ? data.evs[0] : ev)))
                                    setFevId(data.evs[0].id)
                                }
                            })
                            .catch((err: any) => {
                                console.log(err);
                                enqueueSnackbar(err.message ?? 'There is error on insertupdate Ev', { variant: "error" });
                            })
                    }}
                    onChange={(e) => {
                        setTfValue(e.target.value);
                    }}
                    autoComplete='off'
                    disabled={!enabledTF}
                    variant="outlined"
                    sx={{
                        [`& ${tfSelector.input2}`]: {
                            caretColor: enabledTF ? 'auto' : 'transparent',
                            pointerEvents: enabledTF ? 'auto' : 'none', // keep this, if drop this, the TextField will not be able to focus
                        },
                    }}
                />
            </Cooltip>
            {(grabEdge.mouseenter || grabEdge.mousedownAtGE) && grabEdge.id === childEv.id && grabEdge.position === 'right' &&
                <WTime sx={{right: 0, top: parentEv.id === null || parentEv.id === 999999999 ? -50 : 10}}>{formatTime(childEv.timeEnd, sr.hour.c)}</WTime>}
        </WChildEv>
    </>
}