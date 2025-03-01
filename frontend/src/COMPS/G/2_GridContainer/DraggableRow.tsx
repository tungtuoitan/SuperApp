import { useDraggable } from "@dnd-kit/core";


export type DraggableProps = {
    children?: React.ReactNode;
    sx?: React.CSSProperties;
    id: string|number;
    type?: 'Fo' | 'Pr';
}

export default function DraggableRow(props: DraggableProps) {
    const {id, sx, type= 'Fo'} = props;
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id
    });
  
    return (
        <div 
            ref={setNodeRef} 
            style = {{
                // transform: CSS.Transform.toString(transform),
                ...sx,
                // display:'flex', flexDirection:'row', width: '100%', height: '100%'
                }}
            {...listeners} 
            {...attributes}
            >
              {props.children}
        </div>
    );
}