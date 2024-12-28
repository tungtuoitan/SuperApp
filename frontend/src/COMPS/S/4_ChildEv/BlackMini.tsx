import { IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {WBlackMini} from "./4ui";
import {BlackMiniProps} from "./4ty";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {useChildEvHelpers} from "./ChildEvHelpers";

export default function BlackMini (props: BlackMiniProps) {
    const {childId, parentWidth, isBegger,sx} = props;
    const {openEtail} = useChildEvHelpers();

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
        </WBlackMini>
    )
}