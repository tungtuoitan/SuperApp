
import { useSnackbar } from 'notistack';
import { iuEv } from '../../FetchAPIs/TLAPIs';
import { addTime, cDateToUTCDate, GhToCDate, useTLBaseBgHelpers } from './TLBaseBg/TLBaseBgHelpers';
import { TLBaseContainer } from './TLBaseContainer'
import { useTLBaseFgStore } from './TLBaseFg/TLBaseFgStore';
import TLToolsPopup from './TLTools/TLToolsPopup'
import { DndContext } from '@dnd-kit/core'
import { v4 as uuid } from 'uuid';
import { EvsResult } from './TLTypes';

export default function DNDContainer() {

    const { allEvs, setAllEvs, setActiveId, setNewEvId } = useTLBaseFgStore();
    const { getLevelByType, h$G_BgStart, RpxToRh } = useTLBaseBgHelpers();
    const { enqueueSnackbar } = useSnackbar();

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    // Xử lý khi thả
    const handleDragEnd = (event: any) => {
        const { over } = event;

        if (over) {
            const newEv = { id: 0, name: 'New Event', type: '', parentId: null, level: getLevelByType('childEv'), timeStart: GhToCDate(h$G_BgStart), timeEnd: addTime(GhToCDate(h$G_BgStart), 0, 0, 0, RpxToRh(250), 0), status: 1 };
            const newEvs = [...allEvs, newEv];
            setAllEvs(newEvs); // update state, to make the interactive smoother
            iuEv({...newEv, timeStart: cDateToUTCDate(newEv.timeStart), timeEnd: cDateToUTCDate(newEv.timeEnd)})
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

