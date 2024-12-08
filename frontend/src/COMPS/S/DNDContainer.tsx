
import { useSnackbar } from 'notistack';
import { iuEv } from '../../FetchAPIs/TLAPIs';
import { addTime, useTLBaseBgHelpers } from './TLBaseBg/TLBaseBgHelpers';
import { TLBaseContainer } from './TLBaseContainer'
import { useTLBaseFgStore } from './TLBaseFg/TLBaseFgStore';
import TLToolsPopup from './TLTools/TLToolsPopup'
import { DndContext } from '@dnd-kit/core'
import { v4 as uuid } from 'uuid';

export default function DNDContainer() {

    const { allEvs, setAllEvs, setActiveId, setNewEvId } = useTLBaseFgStore();
    const { dateToCDate, getLevelByType, hourPerTI } = useTLBaseBgHelpers();
    const { enqueueSnackbar } = useSnackbar();

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    // Xử lý khi thả
    const handleDragEnd = (event: any) => {
        const { over } = event;
        const timeStart = dateToCDate(new Date());

        if (over) {
            const newEv = { id: 0, name: 'New Event', type: '', parentId: null, level: getLevelByType('childEv'), timeStart, timeEnd: addTime(timeStart, 0, 0, 0, hourPerTI * 20, 0), status: 1 };
            const newEvs = [...allEvs, newEv];
            setAllEvs(newEvs); // update state, to make the interactive smoother
            iuEv(newEv)
                .then((data: any) => {
                    setAllEvs(newEvs.map(ev => ev.id === 0 ? {...ev, id: data.reference} : ev)) // update id
                    enqueueSnackbar(data.message, { variant: "success", autoHideDuration: 3000 });
                })
                .catch((err: any) => {
                    console.log(err);
                    enqueueSnackbar(err.message, { variant: "error", autoHideDuration: 3000 });
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

