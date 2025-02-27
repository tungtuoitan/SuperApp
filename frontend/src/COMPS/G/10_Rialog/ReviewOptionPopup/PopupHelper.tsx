import { ChangeEvent, MouseEvent } from 'react';
import {usePopupStore} from './PopupStore';
import {Content} from './Content';
import {Pr} from '../../GTypes';
import {sr} from '../../../S/TLConstants';
import {useRialogStore} from '../RialogStore';
import {useGridContainerStore} from '../../2_GridContainer/GridContainerStore';
import {useFoStore} from '../../0_Fo/FoStore';
import {useRialogHelpers} from '../RialogHelpers';
import {useSnackbar} from 'notistack';
import {dateToCDate, isSameDate} from '../../../S/3_TimeConfig/TimeHelpers';

export const useSourceReviewPopupHelper = () => {
    const { setPopup } = usePopupStore();
        const { setReviewList, setReviewType, reviewType } = useRialogStore();
        const { allPrs } = useGridContainerStore();
        const { lastFoId } = useFoStore();
        const { openRialog } = useRialogHelpers();
        const { enqueueSnackbar } = useSnackbar();

    const openPopup = (event: MouseEvent<HTMLButtonElement> | undefined) => {
        event?.preventDefault();
        event?.stopPropagation();
        setPopup(prev => ({ ...prev, open: true, anchorEl: event?.currentTarget as HTMLButtonElement, content: <Content /> }));
    }

    const closePopup = (event: MouseEvent<HTMLButtonElement> | undefined) => {
        event?.preventDefault();
        event?.stopPropagation();
        setPopup(prev => ({ ...prev, open: false, anchorEl: null, content: null }));
    }

    const getList = (type: string) => {
        let list: Pr[] = [];
        switch (type) {
            case sr.allPr.c: 
                list = allPrs.filter(pr => !pr.types.includes(sr.knowledge.c));
                break;
            case sr.folderPr.c:
                list = allPrs.filter(pr => pr.parentId === lastFoId && !pr.types.includes(sr.knowledge.c));
                break;
            case sr.allKnowledge.c:
                list = allPrs.filter(pr => pr.types.includes(sr.knowledge.c));
                break;
            case sr.folderKnowledge.c:
                list = allPrs.filter(pr => pr.parentId === lastFoId && pr.types.includes(sr.knowledge.c));
                break;
            }
        
        list = list.filter(pr => pr.activeC === sr.active.active.c && pr.statusC === sr.status.inProgress.c && pr.desc && 
            (((pr.knowC == sr.knowledgeOnReview.c || pr.statusC === sr.knowledgeOnRelearn.c) && isSameDate(new Date(pr.pesults[pr.pesults.length - 1].time), new Date()))
            || pr.knowC == sr.newKnowledge.c))
        return list;
    }

    return {
        openPopup,
        closePopup,
        getList
    }
}