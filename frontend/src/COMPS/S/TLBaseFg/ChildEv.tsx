import { cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import GrabEdge from "./GrabEdge";
import { childEvCSS } from "../TLConstants";
import MiniPopup from "./MiniPopup";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";

type EvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}
const getTextFieldCSSSelector = (name: string, id: number|string) => {
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
    const { grabEdge, fevId, setFevId, allEvs, setAllEvs } = useTLBaseFgStore();
    const { debounceUpdateEvName } = useTLBaseFgHelpers();
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
                borderRadius: '50px 50px',

                whiteSpace: 'nowrap',        
                textOverflow: 'ellipsis',
                border: fevId && fevId === childEv.id ? '2px solid #0D99FF' : 'none',
                zIndex: fevId && fevId === childEv.id ? '1000' : '100',

            }}
            onClick={(e) => {
                e.stopPropagation();
                if(!grabEdge.mouseenter) {
                    setFevId(childEv.id);
                }

            }}
            >
            {fevId && fevId === childEv.id && <MiniPopup childId={childEv.id}/>}
            <GrabEdge position='left' id={childEv.id} />
            <GrabEdge position='right' id={childEv.id} />
            <TextField
                id= {tfSelector.inputId}
                value={tfValue}
                onChange={(e) => {
                    setTfValue(e.target.value);
                    debounceUpdateEvName({...childEv}, e.target.value);
                }}
                autoComplete='off'
                className={tfSelector.div1Class}
                variant="outlined"
                sx={{
                    width: '100%',
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