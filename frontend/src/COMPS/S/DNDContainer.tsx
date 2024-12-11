
import { useSnackbar } from 'notistack';
import { iuEv } from '../../FetchAPIs/TLAPIs';
import { addTime, cDateToUTCDate, dateToCDate, useTLBaseBgHelpers } from './TLBaseBg/TLBaseBgHelpers';
import { TLBaseContainer } from './TLBaseContainer'
import { useTLBaseFgStore } from './TLBaseFg/TLBaseFgStore';
import TLToolsPopup from './TLTools/TLFloatTools'
import { DndContext } from '@dnd-kit/core'
import { v4 as uuid } from 'uuid';
import { useTLBaseBgStore } from './TLBaseBg/TLBaseBgStore';
import { useTLBaseFgHelpers } from './TLBaseFg/TLBaseFgHelpers';
import { EvsResult } from './TLTypes';

export default function DNDContainer() {

    const { allEvs, setAllEvs, activeId, setActiveId, setNewEvId } = useTLBaseFgStore();
    const { dateReal } = useTLBaseBgStore();
    const { getLevelByType, h$G_BgStart, RpxToRh } = useTLBaseBgHelpers();
    const { filterEvs } = useTLBaseFgHelpers();
    const { enqueueSnackbar } = useSnackbar();

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    // Xử lý khi thả
    const handleDragEnd = (event: any) => {
        const { over, active } = event;
        
        if (over) {
            console.log("active:", active);
            console.log('activeId', activeId);
            console.log('over',over)
            const newEv = {
                id: 0,
                name: 'New Event',
                type: '',
                parentId: over.id === 'TLBaseFg-droppable' ? null : over.id,
                level: over.id === 'TLBaseFg-droppable' ? getLevelByType('parentEv') : getLevelByType('childEv'),
                timeStart: addTime(dateToCDate(dateReal), 0, 0, 0, 1, 0),
                timeEnd: addTime(dateToCDate(dateReal), 0, 0, 0, RpxToRh(250), 0),
                status: 1
            };
            const newEvs = [...allEvs, newEv];
            setAllEvs(newEvs); // update state, to make the interactive smoother
            iuEv({ ...newEv, timeStart: cDateToUTCDate(newEv.timeStart), timeEnd: cDateToUTCDate(newEv.timeEnd) })
                .then((data: EvsResult) => {
                    setAllEvs(newEvs.map(ev => ev.id === 0 ? { ...ev, id: data.evs[0].id } : ev)) // update id
                    enqueueSnackbar(data.options.message ?? '', { variant: "success", autoHideDuration: 3000 });
                })
                .catch((err: any) => {
                    console.log(err);
                    enqueueSnackbar(err.message ?? 'There is error on insertupdate Ev', { variant: "error", autoHideDuration: 3000 });
                })
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

