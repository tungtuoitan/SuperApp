

import { Button, styled } from "@mui/material";
import {useRialogStore} from "../RialogStore";
import {useGridContainerStore} from "../../2_GridContainer/GridContainerStore";
import {useFoStore} from "../../0_Fo/FoStore";
import {sr} from "../../../S/TLConstants";
import {useSourceReviewPopupHelper} from "./PopupHelper";
import {useRialogHelpers} from "../RialogHelpers";
import {Pr} from "../../GTypes";
import {get, set} from "lodash";
import {srConstants} from "../../../S/8_SRs/SRConstants";
import {useSnackbar} from "notistack";
import {dateToCDate, isSameDate} from "../../../S/3_TimeConfig/TimeHelpers";

export const AuditHeaderPopupRoot = styled('div')({
    display: 'flex',
    flexFlow: 'column',
    padding: '10px',
    
    '& .popup-header': {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '10px',
        marginBottom: '10px',
    },
    '& .popup-body': {
        display: 'flex',
        flexFlow: 'column',
        padding: '10px',
        '& .popup-body-row': {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
            marginBottom: '10px',
        },
    },
    '& .popup-footer': {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'flex-end',
        borderTop: '1px solid #e0e0e0',
        paddingTop: '10px',
        marginTop: '10px',
    },

})


export const Line = styled(Button)({
    lineHeight: '20px',
    width: '100%',
    height: '30px',
    whiteSpace: 'wrap',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '4px',
    alignItems: 'center',
    fontSize: '12px',

})

export const Row = styled('div')({
    display: 'flex',
    lineHeight: '20px',
    flexFlow: 'column', minWidth: '200px', maxWidth: '400px'
})


export const Content = () => {
    const { closePopup } = useSourceReviewPopupHelper();
    const { setReviewList, setReviewType, reviewType } = useRialogStore();
    const { allPrs } = useGridContainerStore();
    const { lastFoId } = useFoStore();
    const { openRialog } = useRialogHelpers();
    const { enqueueSnackbar } = useSnackbar();


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
        
        list = list.filter(pr => pr.activeC === sr.active.active.c && pr.desc && 
            (((pr.knowC == sr.knowledgeOnReview.c || pr.statusC === sr.knowledgeOnRelearn.c) && (new Date(pr.pesults[pr.pesults.length-1].time)).getTime() < (new Date()).getTime())
            || pr.knowC == sr.newKnowledge.c))
        return list;
    }

    const Option = (type: string) => {
        let list:Pr[] = getList(type);
        return (<Line
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                switch (type) {
                    case sr.allPr.c: 
                        setReviewType(sr.allPr.c);
                        break;
                    case sr.folderPr.c:
                        setReviewType(sr.folderPr.c);
                        break;
                    case sr.allKnowledge.c:
                        setReviewType(sr.allKnowledge.c);
                        break;
                    case sr.folderKnowledge.c:
                        setReviewType(sr.folderKnowledge.c);
                        break;
                    }
                setReviewList(list);
                openRialog(list[0], type);
                closePopup(e);
            }}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
            disabled={list.length === 0}
        >
            <div>
                {
                    type === sr.allPr.c ? sr.allPr.d :
                    type === sr.folderPr.c ? sr.folderPr.d :
                    type === sr.allKnowledge.c ? sr.allKnowledge.d :
                    type === sr.folderKnowledge.c ? sr.folderKnowledge.d :
                    null
                }
            </div>
            <div>{list.length}</div>
        </Line>)


}
    return (
        <AuditHeaderPopupRoot>
            <div className="popup-header">
                <div>Review:</div>
            </div>
            <div className="popup-body">
                <Row sx={{paddingLeft: '10px'}}>
                    {/* {Option('allPr')}
                    {Option('folderPr')} */}
                    {Option(sr.allKnowledge.c)}
                    {Option(sr.folderKnowledge.c)}
                </Row>
            </div>
        </AuditHeaderPopupRoot>
    )
}
