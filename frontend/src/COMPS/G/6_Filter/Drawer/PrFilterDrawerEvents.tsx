import {usePridContainerStore} from "../../2_GridContainer/PridContainerStore";
import {useMainFilterDrawerStore} from "./DrawerStore";
import {usePrFilterStore} from "../PrFilterStore";
import {updateUserProfilePr} from "../../GAPIs";
import {pr} from "../../GConstants";
import {UserProfile} from "../6ty";

export const usePrFilterDrawerEvents = () => {
    const { setMainOpenFilterDrawer } = useMainFilterDrawerStore();
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
     } = usePrFilterStore();

    const { setPageSize, setCurrentPage, setRefreshPrid, setLoadingPrid } = usePridContainerStore();
    const { searchText } = usePridContainerStore();

    const onClickHandlerFilterDrawerApplySR = () => {
        // close drawer

        setMainOpenFilterDrawer(false);

        fsetSelectedParents(selectedParents);
        fsetSelectedPriorities(selectedPriorities);
        fsetSelectedStatuses(selectedStatuses);
        fsetSelectedTypes(selectedTypes);
        fsetSelectedRepeatTypes(selectedRepeatTypes);
        fsetSelectedIsUpdatedTodays(selectedIsUpdatedTodays);

        const userProfile: UserProfile = {
            parents: selectedParents.join(','),
            priorities: selectedPriorities.join(','),
            statuses: selectedStatuses.join(','),
            types: selectedTypes.join(','),
            repeatTypes: selectedRepeatTypes.join(','),
            isUpdatedTodays: selectedIsUpdatedTodays.join(','),
        }
        // update profile
        updateUserProfilePr({
            email: 'hoanhtungle@gmail.com',
            appC: pr.applicationCode,
            userProfileJson: JSON.stringify(userProfile)
        })
        .then(() => {
            setPageSize(100);
            setCurrentPage(0);
            setRefreshPrid(true);
        })
        .catch(() => {
            console.log('plm-SampleRequest-apply, error');
            setLoadingPrid(false);
        });
    }

    const onClickHandlerFilterDrawerResetSR = () => {
        setFilterIds([]);
        setParent('');
        setPriority('');
        setStatus('');
        setType('');
        setRepeatType('');
        setIsUpdatedToday('');

        setSelectedParents([]);
        setSelectedPriorities([]);
        setSelectedStatuses([]);
        setSelectedTypes([]);
        setSelectedRepeatTypes([]);
        setSelectedIsUpdatedTodays([]);
    }
    return {
        onClickHandlerFilterDrawerApplySR,
        onClickHandlerFilterDrawerResetSR,
    }
}
