import {Fo} from "../0_Fo/FoTypes";
import {useDroppable} from "@dnd-kit/core";
import {useFoStore} from "../0_Fo/FoStore";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {SR} from "../../S/8_SRs/8ty";
import {sr} from "../../S/TLConstants";

type DroppableRowProps = {
    r: Fo
}
export const DroppableRow = (props: DroppableRowProps)=> {
    const {r} = props;
    const { setAllFos, allFos, curFoId, lastFoId, setLastFoId, setCurFoId, setOpeningFoIds, openingFoIds } = useFoStore();
    const { setNodeRef, isOver } = useDroppable({ id: r.id });
    const {sRs } = useSRsStore(); 
    const goInside = () => {
        setLastFoId(r.id);
    }
    let priorityIndex = 1
    const allPriorities = sRs.filter(x => x.type='EvPriority')
    if(allPriorities && allPriorities.find(x => x.code === r.prioriC)) {
        priorityIndex = allPriorities.indexOf(allPriorities.find(x => x.code === r.prioriC) as SR)
    }
    
    return (
        <div 
            style={{
                paddingLeft: `${ (r.id==='Fo-0' ? 0 : ((r.level??0) * 20+20)) + 10}px`, 
                background: isOver ? 'green': lastFoId === r.id ? '#0066ff': '',
                color: isOver ? 'white': lastFoId === r.id ? 'white': '',
                opacity: r.prioriC=== sr.priority.top1.c
                ? 1
                : r.prioriC=== sr.priority.top2.c
                ? 0.8
                : r.prioriC=== sr.priority.top3.c
                ? 0.6
                : r.prioriC=== sr.priority.high.c
                ? 0.4 : 0.2,
                fontWeight: r.prioriC=== sr.priority.top1.c|| r.prioriC=== sr.priority.top2.c|| r.prioriC=== sr.priority.top3.c ? 'bold': 'normal',
            }} 
            ref={setNodeRef} 
            onClick={()=>goInside()}
        >
        {r.name}
    </div>
)
}
