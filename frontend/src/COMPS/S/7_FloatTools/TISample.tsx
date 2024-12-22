import { useDraggable } from "@dnd-kit/core";
import { _4cs } from "../4_ChildEv/4cs";
import {DraggableProps} from "./7ty";


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
                height: type === 'parentEv' ? 30 : 20,
                backgroundColor: _4cs.childEv.bgNormal,
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