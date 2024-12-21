import { useDraggable } from "@dnd-kit/core";
import { _4css } from "../4_Ev/4css";

type DraggableProps = {
    children?: React.ReactNode;
    sx?: React.CSSProperties;
    id: string|number;
    type?: 'childEv' | 'parentEv';
}
export default function TISample(props: DraggableProps) {
    const {id, sx, type= 'childEv'} = props;
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        // id: 'TISample',
        id: id
    });
  
    return (
        <div 
            ref={setNodeRef} 
            style = {{
                // transform: CSS.Transform.toString(transform),
                ...sx,
                width: 100,
                height: 30,
                backgroundColor: _4css.bg,
                borderRadius: 50,
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                // position: 'absolute',
                alignItems: 'center',
                paddingBottom: 4,
                }}
            {...listeners} 
            {...attributes}
            >
                <p>{type === 'parentEv' ? 'New Parent' : 'New Child'}</p>
        </div>
    );
}