
import { useDraggable } from '@dnd-kit/core';
import GrabEdge from './GrabEdge';
import { useTLBaseFgStore } from './TLBaseFgStore';

type EvProps = {
    id: string
    content: string
    width: number
    left: number
    top: number
    height: number
}

export const Evc = (props: EvProps) => {
    const { id, content, width, left, top, height } = props;
    const { grabEdge } = useTLBaseFgStore();
    const { transform } = useDraggable({
        id: id,
    });

    return (
        <div
            // ref={setNodeRef}
            // {...listeners}
            // {...attributes}
            style={{
                height: height,
                width: width,
                background: grabEdge.id === id && grabEdge.mousedownAtGE ? 'red' : 'black',
                transform: `translateX(${left + (transform?.x ?? 0)}px)`,
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
            <GrabEdge position='left' id={id} />
            <GrabEdge position='right' id={id} />
            {content}</div>
    )
}