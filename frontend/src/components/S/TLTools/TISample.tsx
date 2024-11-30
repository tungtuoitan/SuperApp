import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type DraggableProps = {
    children?: React.ReactNode;
    sx?: React.CSSProperties;
    id: string;

}
export default function TISample(props: DraggableProps) {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    // id: 'TISample',
    id: props.id
  });
  
  return (
    <div 
        ref={setNodeRef} 
        
        style = {{
            // transform: CSS.Transform.toString(transform),
            ...props.sx,
            width: 100,
            height: 30,
            backgroundColor: 'black',
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
            <p>New Event</p>
    </div>
  );
}