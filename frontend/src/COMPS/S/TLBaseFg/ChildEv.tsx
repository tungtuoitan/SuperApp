import { cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import GrabEdge from "./GrabEdge";
import { clvs, getCSS$ChildEv } from "../TLConstants";
import { useTimeConfigStore } from "../TimeConfig/TimeConfigStore";

type EvProps = {
    ev: Ev;
    parentEv: Ev;
    lineOrder: number;
}

export const ChildEv = (props: EvProps) => {
    const { ev, parentEv, lineOrder } = props;
    const { RhToPx, h$G_BgStart } = useTLBaseBgHelpers();
    const { timeConfig } = useTimeConfigStore();
    const { grabEdge } = useTLBaseFgStore();
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(ev.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(ev.timeEnd as cDate) - cDateToGh(ev.timeStart as cDate)
    )
    const css = getCSS$ChildEv(clvs[timeConfig.level].Clevel, ev.level)

    return <>
        <div
            data-name={ev.name}
            style={{
                height: css.height,
                width: width,
                background: grabEdge.id === ev.id && grabEdge.mousedownAtGE
                    ? css.backgroundDrag
                    : css.background,
                display: css.display,
                transform: `translateX(${left}px)`,
                fontSize: css.fontSize,
                // transform: `translateX(${left + (transform?.x ?? 0)}px)`,
                top: top,
                position: 'absolute', // static: mỗi dòng 1 TI, absolute: mỗi dòng nhiều TI k đụng nhau
                textAlign: 'left',
                padding: '5px',
                color: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50px 50px',

            }}>
            <GrabEdge position='left' id={ev.id}  />
            <GrabEdge position='right' id={ev.id} />
            {ev.name}
        </div>
    </>
}