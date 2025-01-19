import {useMainFilterDrawerStore} from "../6_Filter/Drawer/DrawerStore";
import {usePrFilterStore} from "../6_Filter/PrFilterStore";
import {pr} from "../PrConstants";

export const useFilterIconEvents = () => {
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

        selectedFilter,
        setFilterIds,
        

     } = usePrFilterStore();
         const {openMainFilterDrawer, setMainOpenFilterDrawer,mainFilterDrawerRef} = useMainFilterDrawerStore();

    const getTotalFilter = () => {
        const count = [
            fselectedParents,
            fselectedPriorities,
            fselectedStatuses,
            fselectedTypes,
            fselectedRepeatTypes,
            fselectedIsUpdatedTodays,
            ];
        
            // const fCreatedDateValue = CheckStringIsNullOrEmpty(fCreatedDate) ? 1 : 0;
            
            return (
                count.reduce((total, ids) => total + (ids?.length ?? 0), 0) 
                // +
                // fCreatedDateValue + frequestdReadyDateValue
            );
    }

    const onClickHandlerFilter = () => {
        setSelectedParents(fselectedParents ?? []);
        setSelectedPriorities(fselectedPriorities ?? []);
        setSelectedStatuses(fselectedStatuses ?? []);
        setSelectedTypes(fselectedTypes ?? []);
        setSelectedRepeatTypes(fselectedRepeatTypes ?? []);
        setSelectedIsUpdatedTodays(fselectedIsUpdatedTodays ?? []);

        if (selectedFilter) {
            switch (selectedFilter) {
                case pr.filterOption.parent:
                    setFilterIds(fselectedParents);
                    break;
                case pr.filterOption.priority:
                    setFilterIds(fselectedPriorities);
                    break;
                case pr.filterOption.status:
                    setFilterIds(fselectedStatuses);
                    break;
                case pr.filterOption.type:
                    setFilterIds(fselectedTypes);
                    break;
                case pr.filterOption.repeatType:
                    setFilterIds(fselectedRepeatTypes);
                    break;
                case pr.filterOption.isUpdatedToday:
                    setFilterIds(fselectedIsUpdatedTodays);
                    break;
                default:
                    break;  
            }
        }

        setMainOpenFilterDrawer(true);
    }

    return {
        getTotalFilter,
        onClickHandlerFilter,
    }
}