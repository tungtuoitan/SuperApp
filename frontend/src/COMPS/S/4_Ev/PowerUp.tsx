import { IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { EtailStore } from "../5_Etail/EtailStore";

type MiniPopupProps = {
    childId: number,
}

export default function PowerUp (props: MiniPopupProps) {
    const {childId} = props;
    const {activeEtailIds, setActiveEtailIds} = EtailStore();

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
            <IconButton onClick={()=>{
                setActiveEtailIds([...activeEtailIds, childId])
                
                
            }}>
                <DoubleArrowIcon style={{color: 'white'}}/>
            </IconButton>
        </div>
    )
}