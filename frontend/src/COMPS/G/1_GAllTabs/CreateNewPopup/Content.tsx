

import { Button, styled } from "@mui/material";
import {usePopupHelper} from "./PopupHelper";
import FolderIcon from '@mui/icons-material/Folder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {useGAllTabHelpers} from "../GAllTabHelpers";
import LinkIcon from '@mui/icons-material/Link';
import {Link} from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

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
    const { createNewPetail, createNewFolder, createNewLink, createNewKnowledge } = useGAllTabHelpers();

    const Option = (type: 'Folder'|'Link'|'Pr'|'Knowledge') => {
        return (<Line
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                switch (type) {
                    case 'Folder': 
                        createNewFolder(e);
                        break;
                    case 'Link': 
                        createNewLink(e);
                        break;
                    case 'Pr': 
                        createNewPetail(e);
                        break;
                    case 'Knowledge': 
                        createNewKnowledge(e);
                        break;
                }
                closePopup(e);
            }}
        >
            {
                type === 'Folder' ? <FolderIcon sx={{fontSize:'18px'}} /> : 
                type === 'Link' ? <LinkIcon sx={{fontSize:'18px'}}/> :
                type === 'Pr' ? <FiberManualRecordIcon sx={{fontSize:'18px'}}/> :
                type === 'Knowledge' ? <LibraryBooksIcon sx={{fontSize:'18px'}}/>
                : null
            }
            {type}
        </Line>)

    }
    
    return (
        <AuditHeaderPopupRoot>
            <div className="popup-header">
                <div>Create New:</div>
            </div>
            <div className="popup-body">
                <Row sx={{paddingLeft: '10px'}}>
                    {Option('Folder')}
                    {Option('Link')}
                    {Option('Pr')}
                    {Option('Knowledge')}
                </Row>
            </div>
            {/* <div className="popup-footer">
                <Button size="small" variant="contained" onClick={(e) => closePopup(e)}>Close</Button>
            </div> */}
        </AuditHeaderPopupRoot>
    )
}
