import { useTLBaseFgStore } from "./TLBaseFgStore";

type GrabEdgeProps = {
    id: number,
    position: 'left' | 'right'
}

export default function GrabEdge (props: GrabEdgeProps) {
    const {position, id} = props;
    const { grabEdge, setGrabEdge } = useTLBaseFgStore();
    return (
        <div 
        onMouseEnter={() => {
            if(grabEdge.mousedownAtGE) {
                // nothin
            } else {
                setGrabEdge({...grabEdge, id, position, mouseenter: true});
            }
        }}
        onMouseLeave={() => {
            if(grabEdge.mousedownAtGE){
                setGrabEdge({...grabEdge, mouseenter: false}) // ?
            } else {
                setGrabEdge({...grabEdge, id: null, mouseenter: false});
            }
        }}
        onMouseDown={() => {
            setGrabEdge({...grabEdge, id, mousedownAtGE: true});
        }}
        // onMouseUp // k dùng mouseUp ở đây khi dragging, vì mouse dễ đi ra khỏi GrabEdge
     
        style={{
            left:  position === 'left' ? -10 : 'auto',
            right: position === 'right' ? -10 : 'auto',
            borderRadius: 500,
            width: 40,
            height: 30,
            // background: 'red',
            position: 'absolute',
            cursor: grabEdge.mousedownAtGE ? 'grabbing' : 'grab',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {(grabEdge.mouseenter || grabEdge.mousedownAtGE) && grabEdge.id === id && 
                <span style={{
                    background: 'red',
                    fontWeight: 'bold',
                    width: 4,
                    height: 4,
                }}/>
            }
        </div>
    )
}