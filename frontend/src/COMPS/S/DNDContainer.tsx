
import { useSnackbar } from 'notistack';
import { useTLBaseBgHelpers } from './1_TLBaseBg/TLBaseBgHelpers';
import { addTime, cDateToGh, cDateToUTCDate, GhToCDate } from './3_TimeConfig/TimeHelpers';
import { TLBaseContainer } from './TLBaseContainer'
import { useTLBaseFgStore } from './2_TLBaseFg/TLBaseFgStore';
import TLToolsPopup from './7_TLTools/TLFloatTools'
import { DndContext } from '@dnd-kit/core'
import { v4 as uuid } from 'uuid';
import { useTLBaseBgStore } from './1_TLBaseBg/TLBaseBgStore';
import { iuEv } from './TLAPIs';
import { Ev, EvsResult } from './TLTypes';
import { EvStore } from './4_Ev/EvStore';
import { useTLBaseFgHelpers } from './2_TLBaseFg/TLBaseFgHelpers';

export default function DNDContainer() {

    const { allEvs, setAllEvs, activeId, setActiveId, setNewEvId } = useTLBaseFgStore();
    const { getLevelCOf, h$G_BgStart, RpxToRh } = useTLBaseBgHelpers();
    const { markEvs } = useTLBaseFgHelpers();
    const { TIList } = useTLBaseBgStore();
    const { enqueueSnackbar } = useSnackbar();
    const { setFevId } = EvStore();

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    // Xử lý khi thả
    const handleDragEnd = (event: any) => {
        const { over, active } = event;

        if (over) {
            const droppableRect = over.rect;
            const draggableRect = active.rect;
            const px$Draggable_drop = draggableRect.current.translated.left - droppableRect.left;

            let newEv;
            // drop on TLBaseFg --> create parentEv
            if (over.id === 'TLBaseFg-droppable') {
                newEv = {
                    id: 0,
                    name: '',
                    type: null,
                    parentId: null,
                    activeC: null,
                    levelC: getLevelCOf('parentEv'),
                    timeStart: addTime(TIList[0].date, 0, 0, 0, RpxToRh(px$Draggable_drop), 0),
                    timeEnd: addTime(TIList[0].date, 0, 0, 0, RpxToRh(px$Draggable_drop + 100), 0), // 100 is width of TISample
                };
            } 
            // drop on ParentEv --> create childEv
            else {
                const parentEv = allEvs.filter(ev => ev.id === over.id)[0];
                // if drop on ParentEv
                if(parentEv) {
                    newEv = {
                        id: 0,
                        name: '',
                        type: null,
                        parentId: parentEv.id,
                        activeC: null,
                        levelC: getLevelCOf('childEv'),
                        timeStart: GhToCDate(cDateToGh(parentEv.timeStart) + RpxToRh(px$Draggable_drop)),
                        timeEnd:  GhToCDate(cDateToGh(parentEv.timeStart) + RpxToRh(px$Draggable_drop + 100)), // 100 is width of TISample
                    };
                }
                // if drop on BeggerEv
                else{
                    newEv = {
                        id: 0,
                        name: '',
                        type: null,
                        parentId: null,
                        activeC: null,
                        levelC: getLevelCOf('childEv'),
                        timeStart: GhToCDate(cDateToGh(TIList[0].date) + RpxToRh(px$Draggable_drop)),
                        timeEnd:  GhToCDate(cDateToGh(TIList[0].date) + RpxToRh(px$Draggable_drop + 100)), // 100 is width of TISample
                    };

                }
            }

            const newEvs: Ev[] = structuredClone([...allEvs, newEv] as Ev[])
            setAllEvs(newEvs) // update state, to make the interactive smoother
            iuEv({ ...newEv, timeStart: cDateToUTCDate(newEv.timeStart), timeEnd: cDateToUTCDate(newEv.timeEnd) })
                .then((data: EvsResult) => {
                    const newE = markEvs(newEvs.map(ev => ev.id === 0 ? { ...ev, id: data.evs[0].id } : ev))
                    setAllEvs(newE) // update id
                    enqueueSnackbar(data.options.message ?? '', { variant: "success", autoHideDuration: 3000 });
                    setFevId(data.evs[0].id);
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

