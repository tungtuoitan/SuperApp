import {useTimeHelpers} from "../3_TimeConfig/TimeHelpers";
import { sr } from "../TLConstants";
import { cDate, Ev } from "../TLTypes";
import { _4cs } from "./4cs";
import {IGrabEdge} from "./4ty";
import {useChildEvHelpers} from "./ChildEvHelpers";

// A____________________________________________________________________________________________________________________
export const use4he = () => {
    const { isPresentEv } = useChildEvHelpers();
    const { isPast } = useTimeHelpers();

    const getBg = (childEv: Ev, grabEdge: IGrabEdge) => {
        if (isPast(childEv.timeEnd) || childEv.statusC === sr.status.resolved.c) {
            return _4cs.childEv.bgPast;
        } 
        else if (childEv.isOverlap) {
            return _4cs.childEv.bgOverlap;
        } 
        else if (childEv.isLateNight) {
            return _4cs.childEv.bgLatenight;
        } 
        else if (
            isPresentEv(childEv.timeStart as cDate, childEv.timeEnd as cDate)
        ) {
            if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
                return _4cs.childEv.bgDrag;
            } else {
                return _4cs.childEv.bgPresent;
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
    return { getBg };
};

// B____________________________________________________________________________________________________________________
// 1
export const defaultGrabEdge: IGrabEdge = {id: null, position: 'left', mouseenter: false, mousedownAtGE: false};