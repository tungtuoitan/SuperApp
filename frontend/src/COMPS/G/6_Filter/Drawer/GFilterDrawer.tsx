import { useEffect, useContext } from "react";
import { SRFilterInputFields } from "../InputFields/PrInputFields";
import { useGFilterDrawerEvents } from "./GFilterDrawerEvents";
import {DropDownGridOptions, UserProfile} from "../6ty";
import {usePrFilterStore} from "../PrFilterStore";
import {getPrParentIds, getUserProfileJson} from "../../GAPIs";
import {FilterDrawer} from "./FilterDrawer";
import {pr} from "../../GConstants";
import {PrOptionGrid} from "../OptionGrid/PrOptionGrid";
import {useSRsStore} from "../../../S/8_SRs/SRsStore";
import {srConstants} from "../../../S/8_SRs/SRConstants";

export const GFilterDrawer = () => {
    const { onClickHandlerFilterDrawerApplySR, onClickHandlerFilterDrawerResetSR } = useGFilterDrawerEvents();
    const { sRs } = useSRsStore();
    const { 
        parent,
        setParent,
        selectedParents,
        setSelectedParents,
        fselectedParents,
        fsetSelectedParents,
        allParents,
        setAllParents,

        priority,
        setPriority,
        selectedPriorities,
        setSelectedPriorities,
        fselectedPriorities,
        fsetSelectedPriorities,
        allPriorities,
        setAllPriorities,

        status,
        setStatus,
        selectedStatuses,
        setSelectedStatuses,
        fselectedStatuses,
        fsetSelectedStatuses,
        allStatuses,
        setAllStatuses,

        type,
        setType,
        selectedTypes,
        setSelectedTypes,
        fselectedTypes,
        fsetSelectedTypes,
        allTypes,
        setAllTypes,

        repeatType,
        setRepeatType,
        selectedRepeatTypes,
        setSelectedRepeatTypes,
        fselectedRepeatTypes,
        fsetSelectedRepeatTypes,
        allRepeatTypes,
        setAllRepeatTypes,

        isUpdatedToday,
        setIsUpdatedToday,
        selectedIsUpdatedTodays,
        setSelectedIsUpdatedTodays,
        fselectedIsUpdatedTodays,
        fsetSelectedIsUpdatedTodays,
        allIsUpdatedTodays,
        setAllIsUpdatedTodays,

     } = usePrFilterStore();

    useEffect(() => {
        // if (allParents.length === 0) 
        //     getPrParentIds().then((data:number[]) => {
        //         const allParents = [...new Set(data)]
        //             .map((item) => ({ id: item?.toString() ?? '0' , code: item?.toString() ??'0', description: item?.toString()??'0' } as DropDownGridOptions));
        //         setAllParents(allParents);
        //     })
        if (allPriorities.length === 0) 
            setAllPriorities(sRs
                .filter(sr => sr.type === srConstants.type.evPriority)
                .map((item) => ({ id: item.id.toString(), code: item.code.toString(), description: item.desc.toString() } as DropDownGridOptions)));
        if (allStatuses.length === 0) 
            setAllStatuses(sRs
                .filter(sr => sr.type === srConstants.type.evStatus)
                .map((item) => ({ id: item.id.toString(), code: item.code.toString(), description: item.desc.toString() } as DropDownGridOptions)));
        if (allTypes.length === 0) 
            setAllTypes(sRs
                .filter(sr => sr.type === srConstants.type.prType)
                .map((item) => ({ id: item.id.toString(), code: item.code.toString(), description: item.desc.toString() } as DropDownGridOptions)));
        if (allIsUpdatedTodays.length === 0) 
            setAllIsUpdatedTodays(sRs
                .filter(sr => sr.type === srConstants.type.prIsUpdatedToday)
                .map((item) => ({ id: item.id.toString(), code: item.code.toString(), description: item.desc.toString() } as DropDownGridOptions)));
    }, [sRs]);

    useEffect(() => {
        getUserProfileJson({
            email: 'hoanhtungle@gmail.com',
            appC: pr.applicationCode})
        .then((userProfile: UserProfile) => {
            setSelectedParents(userProfile.parents.length>0 ? userProfile.parents?.toString()?.split(",") ?? [] : []);
            fsetSelectedParents(userProfile.parents.length>0 ? userProfile.parents?.toString()?.split(",") ?? [] : []);
            setSelectedPriorities(userProfile.priorities.length>0 ? userProfile.priorities?.toString()?.split(",") ?? [] : []);
            fsetSelectedPriorities(userProfile.priorities.length>0 ? userProfile.priorities?.toString()?.split(",") ?? [] : []);
            setSelectedStatuses(userProfile.statuses.length>0 ? userProfile.statuses?.toString()?.split(",") ?? [] : []);
            fsetSelectedStatuses(userProfile.statuses.length>0 ? userProfile.statuses?.toString()?.split(",") ?? [] : []);
            setSelectedTypes(userProfile.types.length>0 ? userProfile.types?.toString()?.split(",") ?? [] : []);
            fsetSelectedTypes(userProfile.types.length>0 ? userProfile.types?.toString()?.split(",") ?? [] : []);
            setSelectedRepeatTypes(userProfile.repeatTypes.length>0 ? userProfile.repeatTypes?.toString()?.split(",") ?? [] : []);
            fsetSelectedRepeatTypes(userProfile.repeatTypes.length>0 ? userProfile.repeatTypes?.toString()?.split(",") ?? [] : []);
            setSelectedIsUpdatedTodays(userProfile.isUpdatedTodays.length>0 ? userProfile.isUpdatedTodays?.toString()?.split(",") ?? [] : []);
            fsetSelectedIsUpdatedTodays(userProfile.isUpdatedTodays.length>0 ? userProfile.isUpdatedTodays?.toString()?.split(",") ?? [] : []);
            
        });
    },[])
                
    return (
        <FilterDrawer
            onClickHandlerFilterDrawerApply={onClickHandlerFilterDrawerApplySR}
            onClickHandlerFilterDrawerReset={onClickHandlerFilterDrawerResetSR}
            filterGrid={<PrOptionGrid />}
            filterGridToolbar={<></>}
            filterInputFields={<SRFilterInputFields />}
        />
    )
}
