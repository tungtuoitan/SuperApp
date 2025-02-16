import { AppBar, Badge, Box, FormControlLabel, FormGroup, IconButton, Switch, Toolbar, Tooltip } from "@mui/material"
import { ChangeEvent, KeyboardEvent } from "react";
import { useFilterIconEvents } from "./FilterIconEvents";
import {ToolbarContainer} from "./7ui";
import TuneIcon from '@mui/icons-material/Tune';
import {Search} from "./Search";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

type ToolBarsProps = {
    hide?: boolean;
}
export const ToolBars = (props: ToolBarsProps) => {
    const { getTotalFilter, onClickHandlerFilter} = useFilterIconEvents();
    const {setSearchText, setCurrentPage, setRefreshGrid, setLoadingGrid, displayDeleltedRows, setDisplayDeletedRows} = useGridContainerStore();

    const onChangeHandlerSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        if (event === undefined) return;
        setSearchText(event.target.value);
    }
    
    const onKeyUpHandlerSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.code === "Enter" || event.nativeEvent.code === "Enter" || event.code === "NumpadEnter" || event.nativeEvent.code === "NumpadEnter") {
            setSearchText(event.currentTarget.value);
            setRefreshGrid(true);
            setLoadingGrid(true);
            setCurrentPage(0);
        }
    }

    const toggleDeletedRows = () => {
        setDisplayDeletedRows(!displayDeleltedRows);
    }

  return (
    <ToolbarContainer sx={{visibility: props.hide ? 'hidden' : 'visible'}}>
        <Search
            onChangeHandlerSearch={onChangeHandlerSearch}
            onKeyUpHandlerSearch={onKeyUpHandlerSearch} 
        />
        <Tooltip title="+/- Deleted rows"
         >
            <IconButton onClick={toggleDeletedRows}
                >
                <FormGroup>
                    <FormControlLabel  
                    control={<Switch size="small" checked={displayDeleltedRows} />} 
                    label="" 
                    />
                </FormGroup>
            </IconButton>
        </Tooltip>

        <Tooltip title="Filter" >
            <IconButton onClick={() => onClickHandlerFilter()}>
                <Badge badgeContent={getTotalFilter()} color="primary">
                        <TuneIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    </ToolbarContainer>
  )
}
