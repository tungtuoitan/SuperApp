import {useTLBaseBgHelpers} from "../1_TLBaseBg/TLBaseBgHelpers";
import {useTimeHelpers} from "../3_TimeConfig/TimeHelpers";
import {useAllTabsStore} from "../6_AllTabs/AllTabsStore";
import { hper, sr } from "../TLConstants";
import { cDate, CevelC, Ev } from "../TLTypes";
import { _4cs } from "./4cs";
import {IGrabEdge} from "./4ty";
import {useChildEvHelpers} from "./ChildEvHelpers";

// A____________________________________________________________________________________________________________________
export const use4he = () => {
    const { isPresentEv } = useChildEvHelpers();
    const { isPast } = useTimeHelpers();
    const { allTabIds } = useAllTabsStore();
    const { getLevelCOf } = useTLBaseBgHelpers();

    const getBgChildEv = (childEv: Ev, grabEdge: IGrabEdge) => {
        if (allTabIds.includes(childEv.id)) return _4cs.childEv.bgOpeningEtail;
        if (isPast(childEv.timeEnd) || childEv.statusC === sr.status.resolved.c) {
            return _4cs.childEv.bgPast;
        } 
        else if (childEv.isOverlap) {
            return _4cs.childEv.bgOverlap;
        } 
        else if (childEv.isLateNight) {
            return _4cs.childEv.bgLatenight;
        } 
        else if (isPresentEv(childEv.timeStart as cDate, childEv.timeEnd as cDate)) {
            if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
                return _4cs.childEv.bgDrag;
            } 
            else if (getLevelCOf('childEv') === sr.hour.c) {
                return _4cs.childEv.bgPresent;
            }
            else {
                return _4cs.childEv.bgNormal;
            }
        } 
        else {
            if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
                return _4cs.childEv.bgDrag;
            } else if (childEv.type === "jobtask") {
                return _4cs.childEv.bgJobtask;
            } else {
                return _4cs.childEv.bgNormal;
            }
        }
    };

    
    return { 
        getBgChildEv,
     };
};

// B____________________________________________________________________________________________________________________
// 1
export const defaultGrabEdge: IGrabEdge = {id: null, position: 'left', mouseenter: false, mousedownAtGE: false};

// 2

export const getMinMaxTimeOfEv = (levelCOfEv: CevelC, getMin: boolean = true): number => {
    if(getMin) {
        switch(levelCOfEv) {
            case sr.century.c:
                return hper.yea*100
            case sr.year.c:
                return hper.yea
            case sr.month.c:
                return hper.mon
            case sr.week.c:
                return hper.wee
            case sr.day.c:
                return hper.day/2
            case sr.hour.c:
                return hper.hou/4
            default:
                return hper.hou/4
        }
    } else {
        switch(levelCOfEv) {
            // case sr.year.c:
            //     return hper.yea
            // case sr.month.c:
            //     return hper.mon
            // case sr.week.c:
            //     return hper.wee
            // case sr.day.c:
            //     return hper.day/2
            // case sr.hour.c:
            //     return hper.hou/4
            default:
                return hper.hou*24
        }
    }
}

// export const getBaseW = (CevelC: CevelC): number => {
//     switch(CevelC) {
//         case sr.century.c:
//             return hper.yea*6
//         case sr.decade.c:
//             return hper.mon*8
//         case sr.year.c:
//             return hper.day*20
//         case sr.month.c:
//             return hper.day*3
//         case sr.week.c:
//             return hper.hou*20
//         case sr.day.c:
//             return getMinMaxTimeOfEv(cevelC)
//         default:
//             return hper.hou/4
//     }
// } 