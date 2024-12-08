
type MiniPopupProps = {
    childId: number,
}

export default function MiniPopup (props: MiniPopupProps) {
    const {childId} = props;

    return (
        <div 
        id= {`miniPopup-${childId}`}
        onMouseDown={() => {
        }}
        // onMouseUp // k dùng mouseUp ở đây khi dragging, vì mouse dễ đi ra khỏi GrabEdge
     
        style={{
           
            borderRadius: 12,
            position: 'absolute',
            justifyContent: 'center',
            width: 200,
            height: 40,
            background: '#1E1E1E',
            zIndex: 100,
            alignItems: 'center',
            display: 'flex',
            top: 20,
        }}>
           
        </div>
    )
}