import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev } from "../TLTypes";
import GrabEdge from "./GrabEdge";
import { TextField } from "@mui/material";
import { useState } from "react";
import { EvStore } from "./EvStore";
import { useEvHelpers } from "./EvHelpers";
import { cDateToGh } from "../3_TimeConfig/TimeHelpers";
import { _4css } from "./4css";
import MiniPopup from "./MiniPopup";

type EvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}


export const ChildEv = (props: EvProps) => {
    const { childEv, parentEv, lineOrder } = props;
    const { RhToPx } = useTLBaseBgHelpers();
    const { grabEdge, fevId, setFevId, cutEvId } = EvStore();
    const { debounceUpdateEvName, isPast } = useEvHelpers();
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(childEv.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(childEv.timeEnd as cDate) - cDateToGh(childEv.timeStart as cDate)
    )
    const tfSelector = _4css.getTextFieldCSSSelector('childEvName', childEv.id);
    const [tfValue, setTfValue] = useState(childEv.name);

    return <>
        <div
            data-name={childEv.name}
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
                // borderRadius: childEv.type === 'jobtask' ? '1px 1px' : '50px 50px',

                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                border: fevId && fevId === childEv.id ? '2px solid '+ _4css.focusBco : 'none',
                zIndex: fevId && fevId === childEv.id ? '1000' : '100',

            }}
            onClick={(e) => {
                e.stopPropagation();
                if(isPast(childEv.timeEnd)) return;
                if (!grabEdge.mouseenter) {
                    setFevId(childEv.id);
                }

            }}
        >
            {fevId && fevId === childEv.id && <MiniPopup childId={childEv.id} />}
            {!isPast(childEv.timeStart) && <GrabEdge position='left' id={childEv.id} />}
            {!isPast(childEv.timeEnd) && <GrabEdge position='right' id={childEv.id} />}
            <TextField
                id={tfSelector.inputId}
                value={tfValue}
                onChange={(e) => {
                    setTfValue(e.target.value);
                    debounceUpdateEvName({ ...childEv }, e.target.value);
                }}
                autoComplete='off'
                disabled={isPast(childEv.timeEnd)}
                className={tfSelector.div1Class}
                variant="outlined"
                sx={{
                    width: 'calc(100% - 50px)', // 50(width of 2 GrabEdges)
                    textAlign: 'center',
                    outline: 'none',

                    [`& ${tfSelector.div2}`]: {
                    },
                    [`& ${tfSelector.input}`]: {
                        fontSize: '12px',
                        textAlign: 'center',
                        color: 'white',
                        padding: '0px',
                    },
                    [`& ${tfSelector.fieldset}`]: {
                        display: 'none',
                    },
                }}
            />
        </div>
    </>
}