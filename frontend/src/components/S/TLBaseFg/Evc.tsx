
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
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
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                height: height,
                width: width,
                textAlign: 'left',
                padding: '5px',
                background: 'black',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50px 50px',
                position: 'absolute',
                top: top,
                left: left,
                transform: CSS.Transform.toString(transform),

            }}>
            {content}</div>
    )
}