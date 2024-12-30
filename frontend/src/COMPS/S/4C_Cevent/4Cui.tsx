import {Icon} from "@mui/material";

import HexagonIcon from '@mui/icons-material/Hexagon';
import {_4Ccs} from "./4Ccs";
import { CeventNameProps, IconGroupProps} from "./4Cty";


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
        <span 
            style={{
                textAlign: 'center',
                fontSize: 8,
                color: '#00000080',
                overflow: 'hidden',
                ...sx
            }}>
                {childName}
        </span>
    )
}