import React from 'react';
import { SnackbarKey, useSnackbar } from "notistack";
import { Box } from '@mui/material';

interface CloseNotiProps {
    id: SnackbarKey;
}

export const CloseNotiBtn: React.FC<CloseNotiProps> = ({ id }) => {
    const { closeSnackbar } = useSnackbar();
    return (
        <Box 
            sx={{
                '&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'},
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                cursor: "pointer"
            }}
            onClick={() => closeSnackbar(id)}
        >
        </Box>)  
};