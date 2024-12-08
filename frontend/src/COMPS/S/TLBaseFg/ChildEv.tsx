import { cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import GrabEdge from "./GrabEdge";
import { childEvCSS } from "../TLConstants";
import MiniPopup from "./MiniPopup";

type EvProps = {
    childEv: Ev;
    parentEv: Ev;
    lineOrder: number;
}

export const ChildEv = (props: EvProps) => {
    const { childEv, parentEv, lineOrder } = props;
    const { RhToPx } = useTLBaseBgHelpers();
    const { grabEdge, fevId, setFevId } = useTLBaseFgStore();
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(childEv.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(childEv.timeEnd as cDate) - cDateToGh(childEv.timeStart as cDate)
    )
    const css = childEvCSS

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
            {childEv.name}
        </div>
    </>
}