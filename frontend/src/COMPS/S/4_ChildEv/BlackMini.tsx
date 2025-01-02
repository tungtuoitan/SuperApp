import { IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {WBlackMini} from "./4ui";
import {BlackMiniProps} from "./4ty";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {useChildEvHelpers} from "./ChildEvHelpers";
import {FigmaButton} from "../5L_Laper/5Lui";
import {useTLBaseFgStore} from "../2_TLBaseFg/TLBaseFgStore";
import {Link} from "react-router-dom";
import {FinkToProtocol} from "../5_Etail/5he";

export default function BlackMini (props: BlackMiniProps) {
    const {childId, parentWidth, isBegger,sx} = props;
    const {openEtail} = useChildEvHelpers();
    const {allEvs} = useTLBaseFgStore();
    const childEv = allEvs.find(ev => ev.id === childId);

    return (
        <WBlackMini id= {`blackmini-${childId}`}
            // onMouseUp // k dùng mouseUp ở đây khi dragging, vì mouse dễ đi ra khỏi GrabEdge
            sx={{
                top: isBegger ? -50 : 20,
                left: 0,
                ...sx
            }}>
            <Cooltip title='Open Etail' placement='top'>
                <IconButton onClick={()=>openEtail(childId, parentWidth??0)}>
                    <DoubleArrowIcon style={{color: 'white'}}/>
                </IconButton>
            </Cooltip>
            {childEv?.fink && 
                <Cooltip title='Open FigJam' placement='top'>
                    <Link 
                        to={FinkToProtocol(childEv?.fink??'')??''} 
                        target="_self" 
                        style={{paddingTop:4}}
                        >
                        <img src={'/figma-icon.png'} alt="Figma Icon" style={{ width: 20, height: 20 }} />
                    </Link>
                </Cooltip>
            }
        </WBlackMini>
    )
}