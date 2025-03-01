import {Fo} from "../0_Fo/FoTypes";
import {useDroppable} from "@dnd-kit/core";
import {useFoStore} from "../0_Fo/FoStore";

type DroppableRowProps = {
    r: Fo
}
export const DroppableRow = (props: DroppableRowProps)=> {
    const {r} = props;
    const { setAllFos, allFos, curFoId, lastFoId, setLastFoId, setCurFoId, setOpeningFoIds, openingFoIds } = useFoStore();
    const { setNodeRef, isOver } = useDroppable({ id: r.id });
    const goInside = () => {
        setLastFoId(r.id);
    }
    
    return (
        <div 
            style={{
                paddingLeft: `${(r.level??0) * 20}px`, 
                background: isOver ? 'green': lastFoId === r.id ? '#0066ff': '',
                color: isOver ? 'white': lastFoId === r.id ? 'white': '',
            }} 
            ref={setNodeRef} 
            onClick={()=>goInside()}
        >
        {r.name}
    </div>
)
}
