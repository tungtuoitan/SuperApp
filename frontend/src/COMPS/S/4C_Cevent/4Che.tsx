import {useAllTabsStore} from "../6_AllTabs/AllTabsStore";
import { Ev } from "../TLTypes";
import {_4Ccs} from "./4Ccs";
import {useChildEvStore} from "../4_ChildEv/ChildEvStore";

// A____________________________________________________________________________________________________________________
export const use4Che = () => {
    const { allTabIds } = useAllTabsStore();
    const { fevId } = useChildEvStore();

    const getBgCevent = (childEv: Ev) => {
        if (allTabIds.includes(childEv.id)) return _4Ccs.cevent.bgOpeningEtail;
        else {
            return _4Ccs.cevent.bgTransparent;
        }
    };
    const getBoCevent = (childEv:Ev) => {
        if(fevId && fevId === childEv.id) return _4Ccs.cevent.boFocus
        return _4Ccs.cevent.bgTransparent
    }

    return { 
        getBgCevent,
        getBoCevent,
     };
};
