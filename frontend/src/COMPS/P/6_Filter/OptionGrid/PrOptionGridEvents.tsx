import {pr} from "../../PrConstants";
import {SelectionModel} from "../6ty";
import {usePrFilterStore} from "../PrFilterStore";

export const usePrOptionGridEvents = () => {
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

        setFilterIds, 
        selectedFilter

     } = usePrFilterStore();
    const onSelectionModelChangeHandlerFilterGrid = (selectionModel: SelectionModel) => {
        setFilterIds(selectionModel);
        switch (selectedFilter) {
            case pr.filterOption.parent:
                setSelectedParents(selectionModel);
                break;
            case pr.filterOption.priority:
                setSelectedPriorities(selectionModel);
                break;
            case pr.filterOption.status:
                setSelectedStatuses(selectionModel);
                break;
            case pr.filterOption.type:
                setSelectedTypes(selectionModel);
                break;
            case pr.filterOption.repeatType:
                setSelectedRepeatTypes(selectionModel);
                break;
            case pr.filterOption.isUpdatedToday:
                setSelectedIsUpdatedTodays(selectionModel);
                break;
            
            default:
                break;
        }
    }
    return {
        onSelectionModelChangeHandlerFilterGrid
    }
}