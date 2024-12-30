import {GrabEdgeProps} from "./4ty";
import {useChildEvStore} from "./ChildEvStore";

export default function GrabEdge (props: GrabEdgeProps) {
    const {position, id, type = 'child', sx} = props;
    const { grabEdge, setGrabEdge } = useChildEvStore();

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
                
                left: position === 'left' ? -20 : 'auto',
                right: position === 'right' ? -20 : 'auto',
                width: 40,
                height: 30,
            }),
            cursor: grabEdge.mousedownAtGE ? 'grabbing' : 'grab',
            borderRadius: 500,
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 102,
            ...sx
        }}>
            {/* {(grabEdge.mouseenter || grabEdge.mousedownAtGE) && grabEdge.id === id && 
                <span style={{
                    background: 'red',
                    fontWeight: 'bold',
                    width: type === 'parent' ? 8 : 4,
                    height: type === 'parent' ? 8 : 16,
                    borderRadius: 500,
                    // position: 'absolute',
                    // ...(type === 'parent' ? 
                    //     {
                    //     left: position === 'left' ? -50 : 'auto',
                    //     right: position === 'right' ? -50 : 'auto',
                    // } :
                    // {
                    //     left: position === 'left' ? -20 : 'auto',
                    //     right: position === 'right' ? -20 : 'auto',
                    // })
                }}/>
            } */}
        </div>
    )
}