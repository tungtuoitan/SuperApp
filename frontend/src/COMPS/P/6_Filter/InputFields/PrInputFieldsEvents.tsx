import { ChangeEvent } from "react";
import {pr} from "../../PrConstants";
import {usePrFilterStore} from "../PrFilterStore";

export const usePrFilterInputFieldsEvents = () => {
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

        setFilterIds, setFilterRows, setSelectedFilter, selectedFilter, setFilterSearchText,
    } = usePrFilterStore();

    const hideGrid = (hide: boolean) => {
        var filterGridDrawer = document.querySelector<HTMLDivElement>('.filter-grid-wrapper');
        if (filterGridDrawer) {
            if (hide) {
                filterGridDrawer.style.display = 'none';
            } else {
                filterGridDrawer.style.display = 'flex';
            }
        }
    }

    const onChangeHandlerTextfieldPr = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilterSearchText(value);
        switch (name) {
            case pr.filterOption.priority:
                setParent(value);
                setFilterRows(allParents);
                break;
            default:
                break;
        }
    }

    const onClickHandlerSelectedIDsReset = (field: string) => {
        if (selectedFilter === field) setFilterIds([]);
        switch (field) {
            case pr.filterOption.priority:
                setSelectedParents([]);
                setParent('');
                break;
            default:
                break;
        }
    }

    const onClickHandlerTextfieldPr = (name: string) => {
        // toggle grids
        // if (name === constants.sRFilterOption.name.createdDate ) {
        //     hideGrid(true);
        // } else hideGrid(false);

        switch (name) {
            case pr.filterOption.parent:
                setFilterRows(allParents);
                setFilterIds(selectedParents);
                setSelectedFilter(pr.filterOption.parent);
                setFilterSearchText(parent);
                break;
            case pr.filterOption.priority:
                setFilterRows(allPriorities);
                setFilterIds(selectedPriorities);
                setSelectedFilter(pr.filterOption.priority);
                setFilterSearchText(priority);
                break;
            case pr.filterOption.status:
                setFilterRows(allStatuses);
                setFilterIds(selectedStatuses);
                setSelectedFilter(pr.filterOption.status);
                setFilterSearchText(status);
                break;
            case pr.filterOption.type:
                setFilterRows(allTypes);
                setFilterIds(selectedTypes);
                setSelectedFilter(pr.filterOption.type);
                setFilterSearchText(type);
                break;
            case pr.filterOption.repeatType:
                setFilterRows(allRepeatTypes);
                setFilterIds(selectedRepeatTypes);
                setSelectedFilter(pr.filterOption.repeatType);
                setFilterSearchText(repeatType);
                break;
            case pr.filterOption.isUpdatedToday:
                setFilterRows(allIsUpdatedTodays);
                setFilterIds(selectedIsUpdatedTodays);
                setSelectedFilter(pr.filterOption.isUpdatedToday);
                setFilterSearchText(isUpdatedToday);
                break;
            default:
                break;
        }
    }
    return {
        onChangeHandlerTextfieldPr,
        onClickHandlerTextfieldPr,
        onClickHandlerSelectedIDsReset
    }
}