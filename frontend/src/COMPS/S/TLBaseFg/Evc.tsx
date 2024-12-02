import { cDateToGh, useTLBaseBgHelpers } from "../TLBaseBg/TLBaseBgHelpers";
import { cDate, Ev } from "../TLTypes";
import { useTLBaseFgStore } from "./TLBaseFgStore";
import GrabEdge from "./GrabEdge";

type EvProps = {
    ev: Ev;
    lineOrder: number;
}

export const Evc = (props: EvProps) => {
    const { ev, lineOrder } = props;
    const { RhToPx, h$G_BgStart } = useTLBaseBgHelpers();
    const { grabEdge } = useTLBaseFgStore();
    // const { transform } = useDraggable({ id: ev.id });
    const paddingTop = 20;
    const left = RhToPx(cDateToGh(ev.timeStart as cDate) - h$G_BgStart)
    const top = paddingTop + (20 + 2) * lineOrder; // 20 là height của Ev, 2 là gap giữa các line
    const height = 20;
    const width = RhToPx(
        cDateToGh(ev.timeEnd as cDate) - cDateToGh(ev.timeStart as cDate)
    )

    return <>
        <div
            style={{
                height: height,
                width: width,
                background: grabEdge.id === ev.id && grabEdge.mousedownAtGE ? 'red' : 'black',
                transform: `translateX(${left}px)`,
                // transform: `translateX(${left + (transform?.x ?? 0)}px)`,
                top: top,
                position: 'absolute', // static: mỗi dòng 1 TI, absolute: mỗi dòng nhiều TI k đụng nhau
                textAlign: 'left',
                padding: '5px',
                color: 'white',
                display: 'flex',
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