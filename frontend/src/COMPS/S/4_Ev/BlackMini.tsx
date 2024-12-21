import { IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useAllTabsStore } from "../6_AllTabs/AllTabsStore";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import {EtailForm} from "../5_Etail/EtailType";
import {WBlackMini} from "./4uis";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";

type MiniPopupProps = {
    childId: number,
    parentWidth?: number,
    isBeggerGang?: boolean,
}

export default function BlackMini (props: MiniPopupProps) {
    const {childId, parentWidth} = props;
    const {allTabIds, setAllTabIds, setCurTabIndex} = useAllTabsStore();
    const [etails, dispatch] = useEtailFormStore();
    const {allEvs, setAllEvs} = useTLBaseFgStore();

    return (
        <WBlackMini id= {`miniPopup-${childId}`}
        // onMouseUp // k dùng mouseUp ở đây khi dragging, vì mouse dễ đi ra khỏi GrabEdge
        sx={{
            left: parentWidth ? parentWidth / 2 - 100 : 0, // in parent, we have to center it ourselves
        }}>
            <IconButton onClick={()=>{
                if(allTabIds.includes(childId)) {
                    setCurTabIndex(allTabIds.indexOf(childId))
                } else {
                    setAllTabIds(prev => {
                        setCurTabIndex(prev.length) // tabIndex of that childEv is the last item on allTabIds, so it == prev.length
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
        </WBlackMini>
    )
}