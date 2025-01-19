import { IconButton, styled, Tooltip } from "@mui/material"
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { FC } from "react";

const ResetIconWrapper = styled('div')({
    backgroundColor: '#1976d2',
    color:'#fff',
    zIndex: 999,
    '& .MuiButtonBase-root': {
        padding: 0,
    }
})

const ResetIconButton = styled(IconButton)({
    position:'absolute',
    top:'-12px',
    left:'-10px',
    backgroundColor: '#fff'
})

interface ResetSelectedIdsIconProps {
    tooltip: string;
    onClickHandlerReset: () => void;
    hide: boolean;
}

export const ResetSelectedIdsIcon : FC<React.PropsWithChildren<React.PropsWithChildren<ResetSelectedIdsIconProps>>> = (props: ResetSelectedIdsIconProps) => {
    const {tooltip, onClickHandlerReset, hide} = props;
    return (
        <Tooltip title={tooltip}>
            <ResetIconWrapper
                style={hide ? {display: 'none'} : {}}>
                <ResetIconButton
                    onClick={onClickHandlerReset}>
                    <RestartAltOutlinedIcon />
                </ResetIconButton>
            </ResetIconWrapper>
        </Tooltip>
    )
}