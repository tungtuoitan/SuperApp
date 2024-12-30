import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { cDateToGh } from "../3_TimeConfig/TimeHelpers";
import { sr } from "../TLConstants";
import {useAllTabsStore} from "../6_AllTabs/AllTabsStore";
import HexagonIcon from '@mui/icons-material/Hexagon';
import {Icon} from "@mui/material";
import BlackMini from "../4_ChildEv/BlackMini";
import GrabEdge from "../4_ChildEv/GrabEdge";
import {use4Che} from "./4Che";
import {_4cs} from "../4_ChildEv/4cs";
import {useChildEvStore} from "../4_ChildEv/ChildEvStore";
import {CeventProps} from "./4Cty";
import {CeventName} from "./4Cui";


export const Cevent = (props: CeventProps) => {
    const { childEv, parentEv, lineOrder } = props;
    const { grabEdge, fevId, setFevId, cutEvId, setFocusTFId } = useChildEvStore();
    const { RhToPx } = useTLBaseBgHelpers();
    const { allTabIds } = useAllTabsStore();
    const { getBoCevent } = use4Che();

    const left = RhToPx(cDateToGh(childEv.timeStart) - cDateToGh(parentEv.timeStart)) // relative to ParentEv
    const top = _4cs.parentEv.pt + (_4cs.childEv.he + _4cs.childEv.gapBetweenChildren) * lineOrder;
    const isEtailOpen = allTabIds.includes(childEv.id);
    const displayLeftGrabEdge = fevId===childEv.id  && childEv.statusC !== sr.status.resolved.c && !isEtailOpen 
    const displayBlackMini = fevId && fevId === childEv.id
    const isBegger = parentEv.id === 999999999 || parentEv.id === null
    

    return <>
        <div
            id={'ChildEv-' + childEv.name} data-name={childEv.name + parentEv.name}
            style={{
                width: 100,
                background: 'transparent',
                transform: `translateX(${left}px)`,
                opacity: childEv.id === cutEvId ? '0.5' : '1',
                top: top,
                borderTop: getBoCevent(childEv),
                borderRight: getBoCevent(childEv),
                borderBottom: getBoCevent(childEv),
                zIndex: fevId && fevId === childEv.id ? '1000' : '100',
                overflow: 'visible',  
                borderRadius: 100,
            }}
            onClick={(e) => {
                e.stopPropagation();
                if(isEtailOpen) return;
                if (!grabEdge.mouseenter) {
                    setFevId(childEv.id);
                }
            }}
            onDoubleClick={(e) => {
                if(isEtailOpen) return;
                if (fevId === childEv.id) {
                    setFocusTFId(childEv.id);
                }
            }}
        >

            <div style={{display: 'flex', flexDirection: 'row', gap:2, alignItems: 'center', justifyContent: 'start', marginLeft: -11}}>
                <Icon sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible', color: 'black'}}>
                    <HexagonIcon sx={{fontSize:16}}/>
                </Icon> 
                <CeventName childName={childEv.name} sx={{width: '80%', fontSize: 12, textAlign:'left', marginTop: -3}} />
            </div>
            {displayBlackMini && <BlackMini childId={childEv.id} isBegger={isBegger}/>}
            {displayLeftGrabEdge && <GrabEdge position='left' id={childEv.id} sx={{top:-2}} />}
        </div>
    </>
}