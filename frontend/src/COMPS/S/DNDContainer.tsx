
import { iuEv } from '../../FetchAPIs/TLAPIs';
import { addTime, useTLBaseBgHelpers } from './TLBaseBg/TLBaseBgHelpers';
import { TLBaseContainer } from './TLBaseContainer'
import { useTLBaseFgStore } from './TLBaseFg/TLBaseFgStore';
import TLToolsPopup from './TLTools/TLToolsPopup'
import { DndContext } from '@dnd-kit/core'
import { v4 as uuid } from 'uuid';

export default function DNDContainer() {

    const { allEvs, setAllEvs, activeId, setActiveId, setNewEvId } = useTLBaseFgStore();
    const { dateToCDate, getLevelByType, hourPerTI } = useTLBaseBgHelpers();

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    // Xử lý khi thả
    const handleDragEnd = (event: any) => {
        const { over } = event;
        const timeStart = dateToCDate(new Date());

        if (over) {
            const newEv = {id: 0, name: 'New Event', type: '', parentId: null, level: getLevelByType('childEv'), timeStart, timeEnd: addTime(timeStart, 0, 0, 0, hourPerTI * 20, 0) }
            setAllEvs([...allEvs, newEv]); // update state, to make the interactive smoother
            iuEv(null, newEv)
                .then((data: any) => {
                    setAllEvs(allEvs.map(ev => ev.id === 0 ? { ...ev, id: data.reference } : ev)) // update id
                })
                .catch((err: any) => console.log(err))
        }

        setActiveId(null);
        setNewEvId(uuid());
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        // collisionDetection={closestCorners}
        >
            <TLBaseContainer />
            <TLToolsPopup />
        </DndContext>
    )
}

