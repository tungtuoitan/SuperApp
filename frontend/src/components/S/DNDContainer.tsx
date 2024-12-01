
import { addTime, useTLBaseBgHelpers } from './TLBaseBg/TLBaseBgHelpers';
import { TLBaseContainer } from './TLBaseContainer'
import { useTLBaseFgStore } from './TLBaseFg/TLBaseFgStore';
import TLToolsPopup from './TLTools/TLToolsPopup'
import { closestCorners, DndContext } from '@dnd-kit/core'
import {v4 as uuid} from 'uuid';

export default function DNDContainer() {

    const {allEvs, setAllEvs, activeId, setActiveId, setNewEvId} = useTLBaseFgStore();
    const {dateToCDate} = useTLBaseBgHelpers();

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
      };
    
      // Xử lý khi thả
      const handleDragEnd = (event: any) => {
        const { over } = event;
        const timeStart = dateToCDate(new Date());
    
        if (over) {
          setAllEvs([...allEvs, {id: uuid(), name: 'New Event', type: 'war', parentId: over.id, level: 1, timeStart, timeEnd: addTime(timeStart, 0,0,0,3,0)}]);
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
        <TLToolsPopup/>
    </DndContext>
  )
}

