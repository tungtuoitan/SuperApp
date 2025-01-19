import { FC } from "react";
import { FilterItem } from "./Item";
import { FilterItemListContainer } from "./shareStyles";
import {usePrFilterStore} from "../PrFilterStore";
import {pr} from "../../PrConstants";

interface FilterItemListProps {
    expanded: boolean;
}

export const FilterItemList: FC<React.PropsWithChildren<React.PropsWithChildren<FilterItemListProps>>> = (props: FilterItemListProps) => {
    const { expanded } = props;
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

    let colorIndex = 0;
    const getCounter = (ctr: number) => {
        if (ctr >= pr.gradientColor.length) {
            colorIndex = 0;
            ctr = 0;
        }
        return ctr;
    }
    return (
        <FilterItemListContainer
            in={expanded}
            collapsedSize={50}>
            {fselectedParents && fselectedParents.length > 0 && fselectedParents[0] !== '' &&
                <FilterItem ids={fselectedParents}
                    list={allParents}
                    color={pr.gradientColor[getCounter(++colorIndex)]}
                    source={pr.filterOption.priority} />}

        </FilterItemListContainer>
    )
}
