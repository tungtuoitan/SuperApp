import { Box, Button, Drawer, FormControl, Paper, styled, Typography } from "@mui/material"
import { FC, ReactNode } from "react";
import {useMainFilterDrawerStore} from "./DrawerStore";
import {useMainFilterDrawerEvents} from "./DrawerEvents";

const RootForm = styled('form')({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: '5px 15px',
    backgroundColor: '#fff',
    '& h5 ': {
        paddingLeft: '8px',
    }
});

const FilterButtons = styled('div')({
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-end',
    marginBottom: '5px',
    '& .MuiFormControl-root':{
        '& .MuiButtonBase-root':{
            color: '#fff',
            backgroundColor: '#1976d2',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
            '&:hover':{
                backgroundColor: '#1565c0'
            }
        },
        
    }
});

const FormControlButton = styled(FormControl)({
    marginLeft: '10px!important',
})

const FilterBody = styled('div')({
    display: 'flex',
    flexFlow: 'row',
})

const FilterRight = styled('div')({
    flex: 1,
    backgroundColor: '#fff',
    '& .MuiPaper-root': {
        height: '95%',
    }
})

const FilterLeft = styled('div')({
    display: 'flex',
    flexFlow: 'column',
})

const FilterFields = styled(Paper)({
    textAlign: 'center',
    padding: '20px 20px', 
    overflowY: 'auto',
    '& .MuiPaper-root': {
        height: '95%',
    }
})

export interface IMainFilterDrawerProps {
    onClickHandlerFilterDrawerApply: () => void,
    onClickHandlerFilterDrawerReset: () => void,
    filterGrid: ReactNode,
    filterGridToolbar?: ReactNode,
    filterInputFields: ReactNode,
}

export const FilterDrawer :FC<IMainFilterDrawerProps> = (props) => {
    const {onClickHandlerFilterDrawerApply,onClickHandlerFilterDrawerReset,filterGrid,filterGridToolbar,filterInputFields} = props;
    const {openMainFilterDrawer,mainFilterDrawerRef} = useMainFilterDrawerStore();
    const {onCloseHandlerMainFilterDrawer} = useMainFilterDrawerEvents();
    return (
        <Drawer 
            ref={mainFilterDrawerRef}
            anchor="right"
            open={openMainFilterDrawer}
            onClose={onCloseHandlerMainFilterDrawer}>
            <RootForm>
                <Typography variant="h5">
                    Filter
                </Typography>
                <FilterButtons>
                    <Box style={{marginTop: '20px', marginLeft: '20px'}}>
                        {filterGridToolbar && filterGridToolbar}
                    </Box>
                    
                    <Box style={{marginBottom: '5px'}}>
                        <FormControlButton>
                            <Button  
                                variant="outlined"
                                onClick={onClickHandlerFilterDrawerApply}
                                className="raised primary">
                                Apply
                            </Button>
                        </FormControlButton>
                        <FormControlButton>
                            <Button
                                variant="outlined" 
                                className="raised primary"
                                onClick={onClickHandlerFilterDrawerReset}>
                                Reset
                            </Button>
                        </FormControlButton>
                    </Box>
                </FilterButtons>
                <FilterBody>
                    <FilterLeft>
                        {filterGrid}
                    </FilterLeft>
                    <FilterRight>
                        {filterInputFields}
                    </FilterRight>
                </FilterBody>
            </RootForm>
        </Drawer>
    )
}