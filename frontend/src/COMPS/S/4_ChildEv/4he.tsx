import {useSnackbar} from "notistack";
import {useTLBaseBgHelpers} from "../1_TLBaseBg/TLBaseBgHelpers";
import {useTLBaseBgStore} from "../1_TLBaseBg/TLBaseBgStore";
import {cDateToGh, useTimeHelpers} from "../3_TimeConfig/TimeHelpers";
import {useAllTabsStore} from "../6_AllTabs/TLAllTabsStore";
import { hper, sr } from "../TLConstants";
import { cDate, CevelC, Ev } from "../TLTypes";
import { _4cs } from "./4cs";
import {IGrabEdge} from "./4ty";
import {useChildEvHelpers} from "./ChildEvHelpers";
import {useChildEvStore} from "./ChildEvStore";

// A____________________________________________________________________________________________________________________
export const use4he = () => {
    const { isPresentEv } = useChildEvHelpers();
    const { fevId } = useChildEvStore();
    const { isPast } = useTimeHelpers();
    const { allTabIds } = useAllTabsStore();
    const { TLBaseFrameScrollLeft } = useTLBaseBgStore();
    const { getLevelCOf, h$G_BgStart, RpxToRh, w$TLBaseFrame } = useTLBaseBgHelpers();

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

    const hasOutsideChild = (childEvs: Ev[], parentEv: Ev) => {
        if(parentEv.id===null||parentEv.id === 999999999) return false
        let hasOutsideChild = false
        childEvs.forEach(ev => {
            if(cDateToGh(ev.timeStart) < cDateToGh(parentEv.timeStart) || cDateToGh(ev.timeEnd) > cDateToGh(parentEv.timeEnd)) {
                hasOutsideChild = true
            }
        })
        return hasOutsideChild
    }
    const isOutSideChild = (childEv: Ev, parentEv: Ev) => {
        if(parentEv.id===null||parentEv.id === 999999999) return false
        return cDateToGh(childEv.timeStart) < cDateToGh(parentEv.timeStart) || cDateToGh(childEv.timeEnd) > cDateToGh(parentEv.timeEnd)
    }
    const getBoChild = (childEv:Ev,isOutSide: boolean) => {
            if(isOutSide) return _4cs.childEv.boOutside
            if(fevId && fevId === childEv.id) return _4cs.childEv.boFocus
            return _4cs.childEv.boTransparent
        }
    const getBoParent = (parentId: number, hasOutsideChild: boolean) => {
        if(hasOutsideChild) return _4cs.parentEv.boOutsideChild
        if(fevId && fevId === parentId) return _4cs.parentEv.boFocus
        return _4cs.parentEv.boNormal
    }

    const h$G_TLBaseFrameLeft = h$G_BgStart + RpxToRh(TLBaseFrameScrollLeft)

    const isStickEv = (ev:Ev, side: 'left'|'right' = 'left') => {
        if(side==='left') {
            return cDateToGh(ev.timeStart)<h$G_TLBaseFrameLeft && cDateToGh(ev.timeEnd)>h$G_TLBaseFrameLeft
        } else {
            const h$G_TLBaseFrameRight = h$G_TLBaseFrameLeft + RpxToRh(w$TLBaseFrame)
            return cDateToGh(ev.timeStart)<h$G_TLBaseFrameRight && cDateToGh(ev.timeEnd)>h$G_TLBaseFrameRight
        }
    }

    
    return { 
        getBgChildEv,
        isStickEv,
        hasOutsideChild,
        isOutSideChild,
        getBoParent,
        getBoChild
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