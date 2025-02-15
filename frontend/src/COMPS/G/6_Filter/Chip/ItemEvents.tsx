import {GridRowId} from "@mui/x-data-grid";
import {usePrFilterStore} from "../PrFilterStore";
import {pr} from "../../GConstants";
import {useGridContainerStore} from "../../2_GridContainer/GridContainerStore";
interface FilterItemEventProps {
    source: string;
}

export const useFilterItemEvents = (props: FilterItemEventProps) => {
    const { source } = props;
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
    const { setPageSize, setCurrentPage, setRefreshGrid } = useGridContainerStore();
    const { filterIds, setFilterIds } = usePrFilterStore();

    const deleteId = (id: GridRowId) => {
        let newIds: any[] | undefined;
        setSelectedParents(fselectedParents ?? []);
        setSelectedPriorities(fselectedPriorities ?? []);
        setSelectedStatuses(fselectedStatuses ?? []);
        setSelectedTypes(fselectedTypes ?? []);
        setSelectedRepeatTypes(fselectedRepeatTypes ?? []);
        setSelectedIsUpdatedTodays(fselectedIsUpdatedTodays ?? []);

        if (source === pr.filterOption.priority) {
            fsetSelectedParents(prev => prev.filter((x: GridRowId) => x !== id));

            // setSelectedParents((prevState: any[]) => {
            //     newIds = prevState.filter((x: GridRowId) => x !== id);
            //     setFilterIds(newIds);
            //     const userProfile: UserProfile = {
            //         parents: selectedParents,
            //         priorities: newIds,
            //         statuses: selectedStatuses,
            //         types: selectedTypes,
            //         repeatTypes: selectedRepeatTypes,
            //         isUpdatedTodays: selectedIsUpdatedTodays
            //     }
            //     updateUserProfilePr({
            //         email: 'hoanhtungle@gmail.com',
            //         appC: pr.applicationCode,
            //         userProfileJson: JSON.stringify(userProfile)
            //     })
            //     .then(() => {
            //         runAfterUpdateFilter();
            //     })
            //     .catch(() => {
            //         console.debug('update profile from sr error');
            //     })
            //     return newIds;
            // });
        } 

            // loadKanbanData({});
        (async () => {
            // clear the selected row
            // if (newIds?.length === 0) {
            //     setFilterRows([]);
            // }
        })();
    }
    const runAfterUpdateFilter = () => {
        setPageSize(100);
        setCurrentPage(0);
        setRefreshGrid(true);
    }
    const onDeleteHandlerFilterItem = (id: GridRowId) => {
        deleteId(id);
    }

    return {
        onDeleteHandlerFilterItem
    }
}