import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev, EvsResult } from "../TLTypes";
import GrabEdge from "./GrabEdge";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import { EvStore } from "./EvStore";
import { useEvHelpers } from "./EvHelpers";
import { cDateToGh, cDateToUTCDate } from "../3_TimeConfig/TimeHelpers";
import { _4css } from "./4css";
import MiniPopup from "./MiniPopup";
import { iuEv } from "../../../FetchAPIs/TLAPIs";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { useSnackbar } from "notistack";

type EvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}


export const ChildEv = (props: EvProps) => {
    const { childEv, parentEv, lineOrder } = props;
    const { RhToPx } = useTLBaseBgHelpers();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { grabEdge, fevId, setFevId, cutEvId, focusTFId, setFocusTFId } = EvStore();
    const { isPast } = useEvHelpers();
    const [tfValue, setTfValue] = useState(childEv.name);
    const { enqueueSnackbar } = useSnackbar();

    const paddingTop = 20;
    const left = RhToPx(cDateToGh(childEv.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(childEv.timeEnd as cDate) - cDateToGh(childEv.timeStart as cDate)
    )
    const tfSelector = _4css.getTextFieldCSSSelector('childEvName', childEv.id);
    const enabled = !isPast(childEv.timeEnd) && fevId === childEv.id && fevId !== null

    return <>
        <div
            data-name={childEv.name + parentEv.name}
            style={{
                height: _4css.height,
                width: width,
                background: grabEdge.id === childEv.id && grabEdge.mousedownAtGE
                    ? _4css.backgroundDrag
                    : childEv.type === 'jobtask'
                        ? _4css.backgroundJobTask
                        : isPast(childEv.timeEnd as cDate)
                            ? _4css.pastBackground
                            : _4css.background,
                display: _4css.display,
                transform: `translateX(${left}px)`,
                opacity: childEv.id === cutEvId ? '0.5' : '1',
                // transform: `translateY(${top}px)`,
                fontSize: _4css.fontSize,
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
                border: fevId && fevId === childEv.id ? '2px solid ' + _4css.focusBco : 'none',
                zIndex: fevId && fevId === childEv.id ? '1000' : '100',
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (isPast(childEv.timeEnd)) return;
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
            {fevId && fevId === childEv.id && <MiniPopup childId={childEv.id} />}
            {!isPast(childEv.timeStart) && <GrabEdge position='left' id={childEv.id} />}
            {!isPast(childEv.timeEnd) && <GrabEdge position='right' id={childEv.id} />}
            <TextField
                id={tfSelector.inputId}
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
                                setAllEvs((prev: Ev[]) => prev.map(ev => ev.id === data.evs[0].id ? data.evs[0] : ev))
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
                disabled={!enabled}
                className={tfSelector.div1Class}
                variant="outlined"
                sx={{
                    width: 'calc(100% - 50px)', // 50(width of 2 GrabEdges)
                    textAlign: 'center',
                    outline: 'none',
                    [`& ${tfSelector.input}`]: {
                        fontSize: '12px',
                        textAlign: 'center',
                        color: 'white',
                        padding: '0px',
                        caretColor: enabled ? 'auto' : 'transparent',
                        pointerEvents: enabled ? 'auto' : 'none', // keep this, if drop this, the TextField will not be able to focus
                    },
                    [`& ${tfSelector.inputDisable}`]: {
                        '-webkit-text-fill-color': 'white !important',
                    },
                    [`& ${tfSelector.fieldset}`]: {
                        display: 'none',
                    },
                }}
            />
        </div>
    </>
}