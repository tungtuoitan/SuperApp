

import React from 'react';
import { useDraggable } from '@dnd-kit/core';

type DraggableProps = {
    id: string;
    element?: React.ElementType;
    children?: React.ReactNode;
    sx?: React.CSSProperties;
}
export default function Draggable(props: DraggableProps) {
    const Element = props.element || 'div';
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });

    return (
        <Element ref={setNodeRef} {...listeners} {...attributes}
            style={{
                ...props.sx,
                transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,

            }}>
            {props.children}
        </Element>
    );
}