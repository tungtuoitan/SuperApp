import { IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useAllTabsStore } from "../6_AllTabs/AllTabsStore";
import { useEtailFormStore } from "../5_Etail/EtailFormStore";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";

type MiniPopupProps = {
    childId: number,
    parentWidth?: number,
}

export default function BlackMini (props: MiniPopupProps) {
    const {childId, parentWidth} = props;
    const {allTabIds, setAllTabIds, setCurTabIndex} = useAllTabsStore();
    const [etailForm, setEtailForm] = useEtailFormStore();
    const {allEvs, setAllEvs} = useTLBaseFgStore();


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
            bottom: -50,
            left: parentWidth ? parentWidth / 2 - 100 : 0, // in parent, we have to center it ourselves
        }}>
            <IconButton onClick={()=>{
                if(allTabIds.includes(childId)) {
                    setCurTabIndex(allTabIds.indexOf(childId))
                } else {
                    setAllTabIds(prev => {
                        setCurTabIndex(prev.length)
                        return [...prev, childId]
                    })
                }
    
                const ev = allEvs.filter(ev => ev.id === childId)[0]
                setEtailForm({
                    id: ev.id,
                    name: ev.name,
                    parentId: ev.parentId ?? null,
                    levelC: ev.levelC,
                    timeStart: ev.timeStart,
                    timeEnd: ev.timeEnd,
                    type: ev.type, 
                })
            }}>
                <DoubleArrowIcon style={{color: 'white'}}/>
            </IconButton>
        </div>
    )
}