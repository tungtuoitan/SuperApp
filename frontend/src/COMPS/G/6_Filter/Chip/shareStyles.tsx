import { Collapse, styled } from "@mui/material"
import {PChip} from "./PChip";

interface StyledPChipProps {
    color: string;
}
export const StyledChip = styled(PChip)((props: StyledPChipProps) => ({
    color: `${props.color}!important`,
}))

export const FilterItemListContainer = styled(Collapse)({
    '& .MuiCollapse-wrapperInner': {
        paddingTop: '12px',
        paddingLeft: '15px',
        paddingRight: '20px',
        height: '200px',
        display: 'flex',
        flexFlow: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflowY: 'auto',
        verticalAlign: 'middle',
        alignContent: 'flex-start',
        backgroundColor: '#fff',
        maxWidth: 'calc(100% - 35px)',
    }
})

export const SelectedItem = styled('div')({
    height: '30px',
    maxHeight: '30px',
    fontSize: '.8em',
    margin: '3px 5px'
})

export const ResetIconWrapper = styled('div')({
    position: 'relative'
})