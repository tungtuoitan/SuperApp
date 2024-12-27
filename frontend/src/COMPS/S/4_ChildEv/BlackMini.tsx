import { IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {WBlackMini} from "./4ui";
import {BlackMiniProps} from "./4ty";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {useChildEvHelpers} from "./ChildEvHelpers";

export default function BlackMini (props: BlackMiniProps) {
    const {childId, parentWidth, isBeggerGang,sx} = props;
    const {openEtail} = useChildEvHelpers();

    return (
        <WBlackMini id= {`miniPopup-${childId}`}
            // onMouseUp // k dùng mouseUp ở đây khi dragging, vì mouse dễ đi ra khỏi GrabEdge
            sx={{
                left: parentWidth ? parentWidth / 2 - 100 : 0, // in parent, we have to center it ourselves
                top: isBeggerGang ? -50 : 20,
                ...sx
            }}>
            <Cooltip title='Open Etail' placement='top'>
                <IconButton onClick={()=>openEtail(childId, parentWidth??0)}>
                    <DoubleArrowIcon style={{color: 'white'}}/>
                </IconButton>
            </Cooltip>
        </WBlackMini>
    )
}