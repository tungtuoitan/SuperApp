import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev, EvsResult } from "../TLTypes";
import GrabEdge from "./GrabEdge";
import { styled, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { EvStore, GragEdge } from "./EvStore";
import { useEvHelpers } from "./EvHelpers";
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
import {useTimeConfigStore} from "../3_TimeConfig/TimeConfigStore";
import DotGroup from "./DotGroup";

type EvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}

const WTime = styled('p')({
    position: 'absolute',
    top: 0,
    fontSize: '16px',
    color: 'black',
    fontWeight: 'bold',
})

export const ChildEv = (props: EvProps) => {
    const { childEv, parentEv, lineOrder } = props;
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { grabEdge, fevId, setFevId, cutEvId, focusTFId, setFocusTFId } = EvStore();
    const [tfValue, setTfValue] = useState(childEv.name);
    const { RhToPx } = useTLBaseBgHelpers();
    const { isPresentEv } = useEvHelpers();
    const { markEvs } = useTLBaseFgHelpers();
    const { isPast } = useTimeHelpers();
    const { enqueueSnackbar } = useSnackbar();

    const left = RhToPx(cDateToGh(childEv.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = _4css.ptOfParent + (_4css.he + _4css.gapBetweenChildren) * lineOrder;
    const width = RhToPx(
        cDateToGh(childEv.timeEnd as cDate) - cDateToGh(childEv.timeStart as cDate)
    )
    const tfSelector = helperMUIcss.getTextFieldCSSSelector('childEvName');
    const enabledTF = fevId === childEv.id && fevId !== null && childEv.statusC !== sr.status.resolved.c
    const enableLeftGrabEdge = !isPast(childEv.timeStart) && childEv.statusC !== sr.status.resolved.c
    const enableRightGrabEdge = !isPast(childEv.timeEnd) && childEv.statusC !== sr.status.resolved.c

    const getBg = () => {
         if (isPast(childEv.timeEnd) && childEv.prioriC === sr.status.resolved.c) {
            return _4css.pastBg
        } 
        else if (childEv.isOverlap) {
            return _4css.overlapBg
        }
        else if (childEv.isLateNight) {
            return _4css.latenightBg
        }
        else if(isPresentEv(childEv.timeStart as cDate, childEv.timeEnd as cDate)) {
            if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
                return _4css.dragBg
            } else {
                return _4css.presentBg
            }
        }
        else {
            if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
                return _4css.dragBg
            } 
            else if (childEv.type === 'jobtask') {
                return _4css.jobtaskBg
            } 
            else {
                return _4css.bg
            }
        }
    }

    return <>
        <div
            id={'ChildEv-' + childEv.name}
            data-name={childEv.name + parentEv.name}
            style={{
                height: _4css.he,
                width: width,
                background: getBg(),
                display: 'flex',
                transform: `translateX(${left}px)`,
                opacity: childEv.id === cutEvId ? '0.5' : '1',
                // transform: `translateY(${top}px)`,
                fontSize: _4css.fs,
                top: top,
                position: 'absolute', // static: mỗi dòng 1 TI, absolute: mỗi dòng nhiều TI k đụng nhau
                textAlign: 'left',
                padding: '5px',
                color: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50px 50px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
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
                <TextField
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
                        width: 'calc(100% - 50px)', // 50(width of 2 GrabEdges)
                        textAlign: 'center',
                        outline: 'none',
                        [`& ${tfSelector.input2}`]: {
                            fontSize: '12px',
                            textAlign: 'center',
                            color: 'white',
                            padding: '0px',
                            caretColor: enabledTF ? 'auto' : 'transparent',
                            pointerEvents: enabledTF ? 'auto' : 'none', // keep this, if drop this, the TextField will not be able to focus
                        },
                        [`& ${tfSelector.input2Disable}`]: {
                            '-webkit-text-fill-color': 'white !important',
                        },
                        [`& ${tfSelector.fieldset2}`]: {
                            display: 'none',
                        },
                    }}
                />
            </Cooltip>
            {(grabEdge.mouseenter || grabEdge.mousedownAtGE) && grabEdge.id === childEv.id && grabEdge.position === 'right' &&
                <WTime sx={{right: 0, top: parentEv.id === null || parentEv.id === 999999999 ? -50 : 10}}>{formatTime(childEv.timeEnd, sr.hour.c)}</WTime>}
        </div>
    </>
}