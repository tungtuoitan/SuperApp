import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev } from "../TLTypes";
import GrabEdge from "./GrabEdge";
import MiniPopup from "./MiniPopup";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useTLBaseFgHelpers } from "../2_TLBaseFg/TLBaseFgHelpers";
import { useTLBaseEvStore } from "./TLBaseEvStore";
import { useTLBaseEvHelpers } from "./TLBaseEvHelpers";
import { cDateToGh } from "../3_TimeConfig/TimeHelpers";
import { childEvCSS } from "./4css";

type EvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}
const getTextFieldCSSSelector = (name: string, id: number | string) => {
    return {
        inputId: `TFInput-${name}-${id}`,
        div1Class: `TFContainer-${name}-${id}`,

        div1: `TFContainer-${name}-${id}`, // relative ContainerDiv, and no need to use this, write directly in sx instead
        div2: `TFContainer-${name}-${id} div`,
        input: `#TFInput-${name}-${id}`,
        fieldset: `div fieldset`,
        legend: `div fieldset legend`,
        span: `div fieldset legend span`,
    }
}

export const ChildEv = (props: EvProps) => {
    const { childEv, parentEv, lineOrder } = props;
    const { RhToPx } = useTLBaseBgHelpers();
    const { grabEdge, fevId, setFevId } = useTLBaseEvStore();
    const { debounceUpdateEvName, isPast } = useTLBaseEvHelpers();
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(childEv.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(childEv.timeEnd as cDate) - cDateToGh(childEv.timeStart as cDate)
    )
    const css = childEvCSS
    const tfSelector = getTextFieldCSSSelector('childEvName', childEv.id);
    const [tfValue, setTfValue] = useState(childEv.name);

    return <>
        <div
            data-name={childEv.name}
            style={{
                height: css.height,
                width: width,
                background: grabEdge.id === childEv.id && grabEdge.mousedownAtGE
                    ? css.backgroundDrag
                    : childEv.type === 'jobtask'
                        ? css.backgroundJobTask
                        : isPast(childEv.timeEnd as cDate)
                        ? css.pastBackground
                        : css.background,
                display: css.display,
                transform: `translateX(${left}px)`,
                // transform: `translateY(${top}px)`,
                fontSize: css.fontSize,
                top: top,
                position: 'absolute', // static: mỗi dòng 1 TI, absolute: mỗi dòng nhiều TI k đụng nhau
                textAlign: 'left',
                padding: '5px',
                color: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: childEv.type === 'jobtask' ? '1px 1px' : '50px 50px',

                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                border: fevId && fevId === childEv.id ? '2px solid #0D99FF' : 'none',
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