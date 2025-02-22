import {styled} from "@mui/material";

export const ToolbarContainer = styled('div')({
    '& .MuiPaper-root': {
        backgroundColor: '#fff',
        color: '#000'
    },
    // border: '1px solid red',
    position: 'absolute',
    right: '0',
    width: '500px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    height: '100%',
    padding: '0 10px',
    
});