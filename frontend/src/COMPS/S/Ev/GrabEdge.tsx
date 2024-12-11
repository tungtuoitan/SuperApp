import { useTLBaseEvStore } from "./TLBaseEvStore";

type GrabEdgeProps = {
    id: number,
    position: 'left' | 'right'
    type?: 'parent' | 'child'
}

export default function GrabEdge (props: GrabEdgeProps) {
    const {position, id, type = 'child'} = props;
    const { grabEdge, setGrabEdge } = useTLBaseEvStore();
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
            ...(type === 'parent' ? 
                {
                left: position === 'left' ? -50 : 'auto',
                right: position === 'right' ? -50 : 'auto',
                top: -25,
                width: 80,
                height: 50,
                // background: 'red',
            } : {
                
                left: position === 'left' ? -10 : 'auto',
                right: position === 'right' ? -10 : 'auto',
                width: 40,
                height: 30,
            }),
            borderRadius: 500,
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
                    width: type === 'parent' ? 8 : 4,
                    height: type === 'parent' ? 8 : 4,
                }}/>
            }
        </div>
    )
}