import { IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useAllTabsStore } from "../6_AllTabs/AllTabsStore";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import {useEtailsStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/EtailType";

type MiniPopupProps = {
    childId: number,
    parentWidth?: number,
    isBeggerGang?: boolean,
}

export default function BlackMini (props: MiniPopupProps) {
    const {childId, parentWidth} = props;
    const {allTabIds, setAllTabIds, setCurTabIndex} = useAllTabsStore();
    const [etails, dispatch] = useEtailsStore();
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
                const etail: EtailForm = {
                    id: ev.id,
                    name: ev.name,
                    parentId: ev.parentId ?? null,
                    levelC: ev.levelC,
                    timeStart: ev.timeStart,
                    timeEnd: ev.timeEnd,
                    type: ev.type ?? null, 
                    activeC: ev.activeC,
                    prioriC: ev.prioriC,
                    statusC: ev.statusC,
                }
                dispatch({type: 'INSE', payload: etail})
            }}>
                <DoubleArrowIcon style={{color: 'white'}}/>
            </IconButton>
        </div>
    )
}