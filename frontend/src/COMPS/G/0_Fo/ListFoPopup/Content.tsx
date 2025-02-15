

import { Button, styled } from "@mui/material";
import {usePopupHelper} from "./PopupHelper";
import FolderIcon from '@mui/icons-material/Folder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {useGAllTabHelpers} from "../../1_GAllTabs/GAllTabHelpers";
import {useFoStore} from "../FoStore";
import {getIcon} from "../../../MainNav/Nhe";

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
    const { closePopup } = usePopupHelper();
    const { createNewPetail, deletePrs, createNewFolder } = useGAllTabHelpers();
    const { openingFoIds, allFos, setLastFoId } = useFoStore();

    const parentId = allFos.find(fo => fo.id == openingFoIds[0])?.parentId;
    const allBrothers = allFos.filter(fo => fo.parentId == parentId);
    
    return (
        <AuditHeaderPopupRoot>
            {/* <div className="popup-header">
                <div>Create New:</div>
            </div> */}
            <div className="popup-body">
                <Row sx={{paddingLeft: '10px'}}>
                    {(allBrothers ?? []).map((fo, index) => {
                        return (
                            <Line key={index} onClick={(e) => {
                                setLastFoId(fo.id);
                                closePopup(e);
                            }}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    {getIcon({code: fo.iconId ?? 'folder', type: 'folder'})}
                                </div>
                                <div>
                                    {fo.name}
                                </div>
                            </Line>
                        )
                    })}
                </Row>
            </div>
            {/* <div className="popup-footer">
                <Button size="small" variant="contained" onClick={(e) => closePopup(e)}>Close</Button>
            </div> */}
        </AuditHeaderPopupRoot>
    )
}
