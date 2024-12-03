import { cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import GrabEdge from "./GrabEdge";
import { evCssBy, lvList } from "../TLConstants";

type EvProps = {
    ev: Ev;
    lineOrder: number;
}

export const Evc = (props: EvProps) => {
    const { ev, lineOrder } = props;
    const { RhToPx, h$G_BgStart } = useTLBaseBgHelpers();
    const { grabEdge } = useTLBaseFgStore();
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(ev.timeStart as cDate) - h$G_BgStart)
    const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const width = RhToPx(
        cDateToGh(ev.timeEnd as cDate) - cDateToGh(ev.timeStart as cDate)
    )

    return <>
        <div
            style={{
                height: evCssBy['month'][ev.level].height,
                width: width,
                background: grabEdge.id === ev.id && grabEdge.mousedownAtGE 
                    ? evCssBy['month'][ev.level].backgroundDrag 
                    : evCssBy['month'][ev.level].background,
                display: evCssBy['month'][ev.level].display,
                transform: `translateX(${left}px)`,
                fontSize: evCssBy['month'][ev.level].fontSize,
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
            <GrabEdge position='left' id={ev.id} />
            <GrabEdge position='right' id={ev.id} />
            {ev.name}
        </div>
    </>
}