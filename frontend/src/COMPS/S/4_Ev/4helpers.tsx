import {useTimeHelpers} from "../3_TimeConfig/TimeHelpers";
import { sr } from "../TLConstants";
import { cDate, Ev } from "../TLTypes";
import { _4css } from "./4css";
import {useEvHelpers} from "./EvHelpers";
import { EvStore, IGrabEdge } from "./EvStore";

export const use4Helpers = () => {
    const { isPresentEv } = useEvHelpers();
    const { isPast } = useTimeHelpers();

    const getBg = (childEv: Ev, grabEdge: IGrabEdge) => {
        if (
            isPast(childEv.timeEnd) &&
            childEv.prioriC === sr.status.resolved.c
        ) {
            return _4css.pastBg;
        } else if (childEv.isOverlap) {
            return _4css.overlapBg;
        } else if (childEv.isLateNight) {
            return _4css.latenightBg;
        } else if (
            isPresentEv(childEv.timeStart as cDate, childEv.timeEnd as cDate)
        ) {
            if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
                return _4css.dragBg;
            } else {
                return _4css.presentBg;
            }
        } else {
            if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
                return _4css.dragBg;
            } else if (childEv.type === "jobtask") {
                return _4css.jobtaskBg;
            } else {
                return _4css.bg;
            }
        }
    };
    return { getBg };
};
