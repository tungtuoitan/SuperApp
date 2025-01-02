import {Icon, styled} from "@mui/material";
import HexagonIcon from '@mui/icons-material/Hexagon';
import {_4Ccs} from "./4Ccs";
import { CeventNameProps, IconGroupProps} from "./4Cty";
import {_4cs} from "../4_ChildEv/4cs";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";


export function IconGroup (props: IconGroupProps) {
    const { childEv, sx } = props;

    return (
        <div id={'IconGroup-' + childEv.name}> 
            <Icon sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible', color: 'black'}}>
                <HexagonIcon sx={{fontSize:16}}/>
            </Icon>
        </div>
    )
}

export function CeventName (props: CeventNameProps) {
    const {childName,sx } = props;
    return (
        <Cooltip title={childName} placement='top'>
            <div 
                style={{
                    textAlign: 'center',
                    fontSize: 8,
                    color: '#00000080',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: '110px',
                    ...sx
                }}>
                    {childName}
            </div>
        </Cooltip>
    )
}

export const WCevent = styled('div')({
    fontSize: _4Ccs.cevent.fs,
    width: _4Ccs.cevent.wi,
    height: _4Ccs.cevent.he,
    display: 'flex',
    position: 'absolute', // static: mỗi dòng 1 TI, absolute: mỗi dòng nhiều TI k đụng nhau
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'visible', 
    background: 'transparent',
    borderRadius: 100,
})