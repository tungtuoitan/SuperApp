import { Badge, TextField } from "@mui/material"
import {usePrFilterStore} from "../PrFilterStore";
import {usePrFilterInputFieldsEvents} from "./PrInputFieldsEvents";
import {MainFilterInputFields} from "./InputFields";
import {ResetSelectedIdsIcon} from "./ResetSelectedIdsIcon";
import {pr} from "../../PrConstants";

export const SRFilterInputFields = () => {
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
    const {
        onChangeHandlerTextfieldPr,
        onClickHandlerTextfieldPr,
        onClickHandlerSelectedIDsReset
    } = usePrFilterInputFieldsEvents();

    const _selectParents = ((Array.isArray(selectedParents) && (selectedParents?.length ?? 0) === 0) || (selectedParents?.length > 0 && selectedParents[0] === ''))
    const _selectParentsLength = ((selectedParents?.length ?? 0) > 0 && selectedParents[0] !== '') ? selectedParents?.length : 0;
    const _selectPriority = ((Array.isArray(selectedPriorities) && (selectedPriorities?.length ?? 0) === 0) || (selectedPriorities?.length > 0 && selectedPriorities[0] === ''))
    const _selectPriorityLength = ((selectedPriorities?.length ?? 0) > 0 && selectedPriorities[0] !== '') ? selectedPriorities?.length : 0;
    const _selectStatus = ((Array.isArray(selectedStatuses) && (selectedStatuses?.length ?? 0) === 0) || (selectedStatuses?.length > 0 && selectedStatuses[0] === ''))
    const _selectStatusLength = ((selectedStatuses?.length ?? 0) > 0 && selectedStatuses[0] !== '') ? selectedStatuses?.length : 0;
    const _selectType = ((Array.isArray(selectedTypes) && (selectedTypes?.length ?? 0) === 0) || (selectedTypes?.length > 0 && selectedTypes[0] === ''))
    const _selectTypeLength = ((selectedTypes?.length ?? 0) > 0 && selectedTypes[0] !== '') ? selectedTypes?.length : 0;
    const _selectRepeatType = ((Array.isArray(selectedRepeatTypes) && (selectedRepeatTypes?.length ?? 0) === 0) || (selectedRepeatTypes?.length > 0 && selectedRepeatTypes[0] === ''))
    const _selectRepeatTypeLength = ((selectedRepeatTypes?.length ?? 0) > 0 && selectedRepeatTypes[0] !== '') ? selectedRepeatTypes?.length : 0;
    const _selectIsUpdatedToday = ((Array.isArray(selectedIsUpdatedTodays) && (selectedIsUpdatedTodays?.length ?? 0) === 0) || (selectedIsUpdatedTodays?.length > 0 && selectedIsUpdatedTodays[0] === ''))
    const _selectIsUpdatedTodayLength = ((selectedIsUpdatedTodays?.length ?? 0) > 0 && selectedIsUpdatedTodays[0] !== '') ? selectedIsUpdatedTodays?.length : 0;
  
    return (
        <MainFilterInputFields paperProps={{
            sx: {
                '&.MuiPaper-root': {
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100vh - 92px)!important',
                    '& .filter-textbox-short': {
                        '& .MuiInputBase-root': {
                            height: '36px',
                            fontSize: '14px'
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: '14px',
                            top: '2px'
                        }
                    },
                }
            }
        }}>
            <Badge badgeContent={_selectParentsLength} sx={{ marginTop: '12px' }} color="primary">
                <ResetSelectedIdsIcon
                    hide={_selectParents}
                    tooltip="Reset Selected Sample Request Parent"
                    onClickHandlerReset={() => onClickHandlerSelectedIDsReset(pr.filterOption.parent)} />
                <TextField
                    label="Parent"
                    // id="outlined-basic"
                    style={{ width: '240px' }}
                    variant="outlined"
                    size="small"
                    spellCheck={false}
                    autoComplete="off"
                    name={pr.filterOption.parent}
                    value={parent}
                    onChange={onChangeHandlerTextfieldPr}
                    onClick={() => onClickHandlerTextfieldPr(pr.filterOption.parent)}
                />
            </Badge>
            <Badge badgeContent={_selectPriorityLength} color="primary" sx={{ marginTop: '12px' }}>
                <ResetSelectedIdsIcon
                    hide={_selectPriority}
                    tooltip="Reset Selected Priority"
                    onClickHandlerReset={() => onClickHandlerSelectedIDsReset(pr.filterOption.priority)} />
                <TextField
                    label="Priority"
                    style={{ width: '240px' }}
                    variant="outlined"
                    size="small"
                    spellCheck={false}
                    autoComplete="off"
                    name={pr.filterOption.priority}
                    value={priority}
                    onChange={onChangeHandlerTextfieldPr}
                    onClick={() => onClickHandlerTextfieldPr(pr.filterOption.priority)}
                />
            </Badge>
            <Badge badgeContent={_selectStatusLength} color="primary" sx={{ marginTop: '12px' }}>
                <ResetSelectedIdsIcon
                    hide={_selectStatus}
                    tooltip="Reset Selected Status"
                    onClickHandlerReset={() => onClickHandlerSelectedIDsReset(pr.filterOption.status)} />
                <TextField
                    label="Status"
                    style={{ width: '240px' }}
                    variant="outlined"
                    size="small"
                    spellCheck={false}
                    autoComplete="off"
                    name={pr.filterOption.status}
                    value={status}
                    onChange={onChangeHandlerTextfieldPr}
                    onClick={() => onClickHandlerTextfieldPr(pr.filterOption.status)}
                />
            </Badge>
            <Badge badgeContent={_selectTypeLength} color="primary" sx={{ marginTop: '12px' }}>
                <ResetSelectedIdsIcon
                    hide={_selectType}
                    tooltip="Reset Selected Type"
                    onClickHandlerReset={() => onClickHandlerSelectedIDsReset(pr.filterOption.type)} />
                <TextField
                    label="Type"
                    style={{ width: '240px' }}
                    variant="outlined"
                    size="small"
                    spellCheck={false}
                    autoComplete="off"
                    name={pr.filterOption.type}
                    value={type}
                    onChange={onChangeHandlerTextfieldPr}
                    onClick={() => onClickHandlerTextfieldPr(pr.filterOption.type)}
                />
            </Badge>
            <Badge badgeContent={_selectRepeatTypeLength} color="primary" sx={{ marginTop: '12px' }}>
                <ResetSelectedIdsIcon
                    hide={_selectRepeatType}
                    tooltip="Reset Selected Repeat Type"
                    onClickHandlerReset={() => onClickHandlerSelectedIDsReset(pr.filterOption.repeatType)} />
                <TextField
                    label="Repeat Type"
                    style={{ width: '240px' }}
                    variant="outlined"
                    size="small"
                    spellCheck={false}
                    autoComplete="off"
                    name={pr.filterOption.repeatType}
                    value={repeatType}
                    onChange={onChangeHandlerTextfieldPr}
                    onClick={() => onClickHandlerTextfieldPr(pr.filterOption.repeatType)}
                />
            </Badge>

            <Badge badgeContent={_selectIsUpdatedTodayLength} color="primary" sx={{ marginTop: '12px' }}>
                <ResetSelectedIdsIcon
                    hide={_selectIsUpdatedToday}
                    tooltip="Reset Selected Is Updated Today"
                    onClickHandlerReset={() => onClickHandlerSelectedIDsReset(pr.filterOption.isUpdatedToday)} />
                <TextField
                    label="Is Updated Today"
                    style={{ width: '240px' }}
                    variant="outlined"
                    size="small"
                    spellCheck={false}
                    autoComplete="off"
                    name={pr.filterOption.isUpdatedToday}
                    value={isUpdatedToday}
                    onChange={onChangeHandlerTextfieldPr}
                    onClick={() => onClickHandlerTextfieldPr(pr.filterOption.isUpdatedToday)}
                />
            </Badge>
        </MainFilterInputFields>
    )
}