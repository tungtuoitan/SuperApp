import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip } from "@mui/material"
import { ChangeEvent, KeyboardEvent } from "react";
import { useFilterIconEvents } from "./FilterIconEvents";
import {ToolbarContainer} from "./7ui";
import TuneIcon from '@mui/icons-material/Tune';
import {Search} from "./Search";
import {usePridContainerStore} from "../2_PridContainer/PridContainerStore";

export const SearchAndFilter = () => {
    const { getTotalFilter, onClickHandlerFilter} = useFilterIconEvents();
    const {setSearchText, setCurrentPage, setRefreshPrid, setLoadingPrid} = usePridContainerStore();

    const onChangeHandlerSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        if (event === undefined) return;
        setSearchText(event.target.value);
    }
    
    const onKeyUpHandlerSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.code === "Enter" || event.nativeEvent.code === "Enter" || event.code === "NumpadEnter" || event.nativeEvent.code === "NumpadEnter") {
            setSearchText(event.currentTarget.value);
            setRefreshPrid(true);
            setLoadingPrid(true);
            setCurrentPage(0);
        }
    }
  return (
    <ToolbarContainer>
        <Search
            onChangeHandlerSearch={onChangeHandlerSearch}
            onKeyUpHandlerSearch={onKeyUpHandlerSearch} 
        />
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
