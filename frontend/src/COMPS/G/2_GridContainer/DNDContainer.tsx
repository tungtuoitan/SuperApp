
import { useSnackbar } from 'notistack';
import { closestCorners, DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { v4 as uuid } from 'uuid';
import GridContainer from './GridContainer';
import {useGridContainerStore} from './GridContainerStore';
import {QridContent} from '../11_Qrid/QridContent';
import {paSid} from '../GHelpers';
import {g} from '../GConstants';
import {useFoStore} from '../0_Fo/FoStore';
import {iuFos, iuPr} from '../GAPIs';
import {FosResult} from '../0_Fo/FoTypes';
import {FotailForm} from '../9_Fotail/9ty';
import {useFoHelpers} from '../0_Fo/FoHelpers';
import {useGridContainerHelpers} from './GridContainerHelpers';
import {Pr, PrsResult} from '../GTypes';
import {useAuthStore} from '../../Auth/AuthStore';

export default function DNDContainer() {
    const { allPrs, activeId, setActiveId } = useGridContainerStore();
    const { allFos } = useFoStore();
    const { enqueueSnackbar } = useSnackbar();
    const { loadFos} = useFoHelpers();
    const { loadPrs } = useGridContainerHelpers();
    const {auth } = useAuthStore();
    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };


    // Xử lý khi thả
    const handleDragEnd = (event: any) => {
        const { over, active } = event;
        if(!over || !over.id || !active || !active.id) return;
        if(paSid(over.id).type !== g.type.fo ) return;

        if(paSid(active.id).type === g.type.fo) {
            const fo = allFos.filter(fo => fo.id === active.id)[0];
            const updatedFo = {
                ...fo,
                parentId: over.id
            }
            iuFos(auth.userToken, updatedFo).then((data: FosResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
                loadFos();
            });
        }
        else if(paSid(active.id).type === g.type.pr) {
            const pr = allPrs.filter(pr => pr.id === active.id)[0];
            if(!pr) return;
            const updatedPr = {...pr,parentId: over.id, pesults: JSON.stringify(pr.pesults)}
            iuPr(auth.userToken).then((data: PrsResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
                loadPrs();
            });

            setActiveId(null);
        }
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        >
          {/* <DragOverlay>
            {activeId ? <div style={{zIndex:100000000}}>xxx</div> : null}
        </DragOverlay> */}
          <QridContent />
          <GridContainer />
        </DndContext>
    )
}

