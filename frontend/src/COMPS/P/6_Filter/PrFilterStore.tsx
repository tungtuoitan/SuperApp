import { useContext, createContext, Dispatch, SetStateAction, useState } from 'react';
import {DropDownGridOptions, SelectionModel} from './6ty';

export interface SRFilterContextData {
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;

    filterRows: DropDownGridOptions[],
    setFilterRows: Dispatch<SetStateAction<DropDownGridOptions[]>>,

    filterLoading: boolean,
    setFilterLoading: Dispatch<SetStateAction<boolean>>,

    filterIds: SelectionModel,
    setFilterIds: Dispatch<SetStateAction<SelectionModel>>,

    selectedFilter: string,
    setSelectedFilter: Dispatch<SetStateAction<string>>,

    filterSearchText: string,
    setFilterSearchText: Dispatch<SetStateAction<string>>,

    parent: string,
    setParent: Dispatch<SetStateAction<string>>,
    selectedParents: SelectionModel,
    setSelectedParents: Dispatch<SetStateAction<SelectionModel>>,
    fselectedParents: SelectionModel,
    fsetSelectedParents: Dispatch<SetStateAction<SelectionModel>>,
    allParents: DropDownGridOptions[],
    setAllParents: Dispatch<SetStateAction<DropDownGridOptions[]>>,

    priority: string,
    setPriority: Dispatch<SetStateAction<string>>,
    selectedPriorities: SelectionModel,
    setSelectedPriorities: Dispatch<SetStateAction<SelectionModel>>,
    fselectedPriorities: SelectionModel,
    fsetSelectedPriorities: Dispatch<SetStateAction<SelectionModel>>,
    allPriorities: DropDownGridOptions[],
    setAllPriorities: Dispatch<SetStateAction<DropDownGridOptions[]>>,

    status: string,
    setStatus: Dispatch<SetStateAction<string>>,
    selectedStatuses: SelectionModel,
    setSelectedStatuses: Dispatch<SetStateAction<SelectionModel>>,
    fselectedStatuses: SelectionModel,
    fsetSelectedStatuses: Dispatch<SetStateAction<SelectionModel>>,
    allStatuses: DropDownGridOptions[],
    setAllStatuses: Dispatch<SetStateAction<DropDownGridOptions[]>>,


    type: string,
    setType: Dispatch<SetStateAction<string>>,
    selectedTypes: SelectionModel,
    setSelectedTypes: Dispatch<SetStateAction<SelectionModel>>,
    fselectedTypes: SelectionModel,
    fsetSelectedTypes: Dispatch<SetStateAction<SelectionModel>>,
    allTypes: DropDownGridOptions[],
    setAllTypes: Dispatch<SetStateAction<DropDownGridOptions[]>>,

    repeatType: string,
    setRepeatType: Dispatch<SetStateAction<string>>,
    selectedRepeatTypes: SelectionModel,
    setSelectedRepeatTypes: Dispatch<SetStateAction<SelectionModel>>,
    fselectedRepeatTypes: SelectionModel,
    fsetSelectedRepeatTypes: Dispatch<SetStateAction<SelectionModel>>,
    allRepeatTypes: DropDownGridOptions[],
    setAllRepeatTypes: Dispatch<SetStateAction<DropDownGridOptions[]>>,

    isUpdatedToday: string,
    setIsUpdatedToday: Dispatch<SetStateAction<string>>,
    selectedIsUpdatedTodays: SelectionModel,
    setSelectedIsUpdatedTodays: Dispatch<SetStateAction<SelectionModel>>,
    fselectedIsUpdatedTodays: SelectionModel,
    fsetSelectedIsUpdatedTodays: Dispatch<SetStateAction<SelectionModel>>,
    allIsUpdatedTodays: DropDownGridOptions[],
    setAllIsUpdatedTodays: Dispatch<SetStateAction<DropDownGridOptions[]>>,

};

export const PrFilterContextDefaultValue: SRFilterContextData = {
    expanded: false,
    setExpanded: () => { },
    filterRows: [],
    setFilterRows: () => { },
    filterLoading: false,
    setFilterLoading: () => { },
    filterIds: [],
    setFilterIds: () => { },
    selectedFilter: '',
    setSelectedFilter: () => { },
    filterSearchText: '',
    setFilterSearchText: () => { },

    parent: '',
    setParent: () => { },
    selectedParents: [],
    setSelectedParents: () => { },
    fselectedParents: [],
    fsetSelectedParents: () => { },
    allParents: [],
    setAllParents: () => { },

    priority: '',
    setPriority: () => { },
    selectedPriorities: [],
    setSelectedPriorities: () => { },
    fselectedPriorities: [],
    fsetSelectedPriorities: () => { },
    allPriorities: [],
    setAllPriorities: () => { },

    status: '',
    setStatus: () => { },
    selectedStatuses: [],
    setSelectedStatuses: () => { },
    fselectedStatuses: [],
    fsetSelectedStatuses: () => { },
    allStatuses: [],
    setAllStatuses: () => { },

    type: '',
    setType: () => { },
    selectedTypes: [],
    setSelectedTypes: () => { },
    fselectedTypes: [],
    fsetSelectedTypes: () => { },
    allTypes: [],
    setAllTypes: () => { },

    repeatType: '',
    setRepeatType: () => { },
    selectedRepeatTypes: [],
    setSelectedRepeatTypes: () => { },
    fselectedRepeatTypes: [],
    fsetSelectedRepeatTypes: () => { },
    allRepeatTypes: [],
    setAllRepeatTypes: () => { },

    isUpdatedToday: '',
    setIsUpdatedToday: () => { },
    selectedIsUpdatedTodays: [],
    setSelectedIsUpdatedTodays: () => { },
    fselectedIsUpdatedTodays: [],
    fsetSelectedIsUpdatedTodays: () => { },
    allIsUpdatedTodays: [],
    setAllIsUpdatedTodays: () => { },

};

export const PrFilterStore = createContext<SRFilterContextData>(PrFilterContextDefaultValue);

export const usePrFilterStore = () => useContext(PrFilterStore);

export const PrFilterStoreProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [filterRows, setFilterRows] = useState<DropDownGridOptions[]>([]);
    const [filterLoading, setFilterLoading] = useState<boolean>(false);
    const [filterIds, setFilterIds] = useState<SelectionModel>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [filterSearchText, setFilterSearchText] = useState<string>('');

    const [parent, setParent] = useState<string>('');
    const [selectedParents, setSelectedParents] = useState<SelectionModel>([]);
    const [fselectedParents, fsetSelectedParents] = useState<SelectionModel>([]);
    const [allParents, setAllParents] = useState<DropDownGridOptions[]>([]);

    const [createdDate, setCreatedDate] = useState<string>('');
    const [fCreatedDate, fsetCreatedDate] = useState<string>('');

    const [priority, setPriority] = useState<string>('');
    const [selectedPriorities, setSelectedPriorities] = useState<SelectionModel>([]);
    const [fselectedPriorities, fsetSelectedPriorities] = useState<SelectionModel>([]);
    const [allPriorities, setAllPriorities] = useState<DropDownGridOptions[]>([]);

    const [status, setStatus] = useState<string>('');
    const [selectedStatuses, setSelectedStatuses] = useState<SelectionModel>([]);
    const [fselectedStatuses, fsetSelectedStatuses] = useState<SelectionModel>([]);
    const [allStatuses, setAllStatuses] = useState<DropDownGridOptions[]>([]);

    const [type, setType] = useState<string>('');
    const [selectedTypes, setSelectedTypes] = useState<SelectionModel>([]);
    const [fselectedTypes, fsetSelectedTypes] = useState<SelectionModel>([]);
    const [allTypes, setAllTypes] = useState<DropDownGridOptions[]>([]);

    const [repeatType, setRepeatType] = useState<string>('');
    const [selectedRepeatTypes, setSelectedRepeatTypes] = useState<SelectionModel>([]);
    const [fselectedRepeatTypes, fsetSelectedRepeatTypes] = useState<SelectionModel>([]);
    const [allRepeatTypes, setAllRepeatTypes] = useState<DropDownGridOptions[]>([]);

    const [isUpdatedToday, setIsUpdatedToday] = useState<string>('');
    const [selectedIsUpdatedTodays, setSelectedIsUpdatedTodays] = useState<SelectionModel>([]);
    const [fselectedIsUpdatedTodays, fsetSelectedIsUpdatedTodays] = useState<SelectionModel>([]);
    const [allIsUpdatedTodays, setAllIsUpdatedTodays] = useState<DropDownGridOptions[]>([]);

    return (
        <PrFilterStore.Provider
            value={{
                expanded,
                setExpanded,
                filterRows,
                setFilterRows,
                filterLoading,
                setFilterLoading,
                filterIds,
                setFilterIds,
                selectedFilter,
                setSelectedFilter,
                filterSearchText,
                setFilterSearchText,

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

            }}>
            {children}
        </PrFilterStore.Provider>
    )
}