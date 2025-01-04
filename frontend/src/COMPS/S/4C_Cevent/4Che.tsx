import {useAllTabsStore} from "../6_AllTabs/TLAllTabsStore";
import { cDate, Ev } from "../TLTypes";
import {_4Ccs} from "./4Ccs";
import {useChildEvStore} from "../4_ChildEv/ChildEvStore";
import {IGrabEdge} from "../4_ChildEv/4ty";
import {_4cs} from "../4_ChildEv/4cs";

// A____________________________________________________________________________________________________________________
export const use4Che = () => {
    const { allTabIds } = useAllTabsStore();
    const { fevId } = useChildEvStore();

    const getBoCevent = (childEv:Ev) => {
        if(fevId && fevId === childEv.id) return _4Ccs.cevent.boFocus
        return _4Ccs.cevent.bgTransparent
    }

    const getBgCevent = (childEv: Ev, grabEdge: IGrabEdge) => {
        if (allTabIds.includes(childEv.id)) return _4cs.childEv.bgOpeningEtail;
        if (grabEdge.id === childEv.id && grabEdge.mousedownAtGE) {
            return _4Ccs.cevent.bgDrag;
        } 
        else {
            return _4Ccs.cevent.bgTransparent
        }
    };

    return { 
        getBgCevent,
        getBoCevent,
     };
};
