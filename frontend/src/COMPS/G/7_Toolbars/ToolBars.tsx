import { AppBar, Badge, BadgeProps, Box, FormControlLabel, FormGroup, IconButton, styled, Switch, Toolbar, Tooltip } from "@mui/material"
import { ChangeEvent, KeyboardEvent } from "react";
import { useFilterIconEvents } from "./FilterIconEvents";
import {ToolbarContainer} from "./7ui";
import TuneIcon from '@mui/icons-material/Tune';
import {Search} from "./Search";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {ICON} from "../2_GridContainer/2ui";
import {useRialogHelpers} from "../10_Rialog/RialogHelpers";
import {SourceReviewPopup} from "../10_Rialog/ReviewOptionPopup/Popup";
import {useSourceReviewPopupHelper} from "../10_Rialog/ReviewOptionPopup/PopupHelper";
import {sr} from "../../S/TLConstants";
import {Background} from "reactflow";
import {GridStatee} from "../2_GridContainer/2ty";
import {useGridContainerHelpers} from "../2_GridContainer/GridContainerHelpers";
import {color} from "framer-motion";

type ToolBarsProps = {
    hide?: boolean;
}
const NewKnowledgeBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right:13,
      top: 13,
    //   border: `2px solid ${theme.palette.background.paper}`,
    //   padding: '0 5px',
      fontSize: '10px',
      background: 'transparent',
      color: 'gray'
    },
}));
const LearnBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right:13,
      top: 13,
    //   border: `2px solid ${theme.palette.background.paper}`,
    //   padding: '0 5px',
      fontSize: '10px',
      background: 'transparent',
    //   background: '#FF9E42',
    color: 'gray',

    },
}));
  const ReviewBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right:13,
      top: 13,
    //   border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 5px',
      fontSize: '10px',
      background: 'transparent',
      color: 'gray'
    },
  }));
export const ToolBars = (props: ToolBarsProps) => {
    const { getTotalFilter, onClickHandlerFilter} = useFilterIconEvents();
    const {setSearchText, setCurrentPage, setRefreshGrid, setLoadingGrid, displayDeleltedRows, setDisplayDeletedRows, setGridState, gridState} = useGridContainerStore();
    const { openRialog } = useRialogHelpers();
    const {getAllGitems} = useGridContainerHelpers();
    const {openPopup, getList } = useSourceReviewPopupHelper();
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
        <NewKnowledgeBadge badgeContent={getAllGitems('all-knowledge').length ? getAllGitems('all-knowledge').length : '0'} color="secondary" sx={{fontSize:'10px'}}>
            <ICON iconCode='all-knowledge' title='Opening' btnSize={40} btnSx={{margin: '4px'}} color={gridState === 'all-knowledge' ? '#1976D2' : '#444'} 
            handle={()=> {
                if(gridState !== 'all-knowledge')
                    setGridState('all-knowledge' as GridStatee);
                else 
                    setGridState('default' as GridStatee);
            }} />
        </NewKnowledgeBadge>
        <NewKnowledgeBadge badgeContent={getAllGitems('open-knowledge').length ? getAllGitems('open-knowledge').length : '0'} color="secondary" sx={{fontSize:'10px'}}>
            <ICON iconCode='open-knowledge' title='Opening' btnSize={40} btnSx={{margin: '4px'}} color={gridState === 'open-knowledge' ? 'green' : '#444'} 
            handle={()=> {
                if(gridState !== 'open-knowledge')
                    setGridState('open-knowledge' as GridStatee);
                else 
                    setGridState('default' as GridStatee);
            }} />
        </NewKnowledgeBadge>
         <LearnBadge badgeContent={getAllGitems('relearn').length ? getAllGitems('relearn').length : '0' } color="primary" sx={{fontSize:'10px'}}>
            <ICON iconCode='learn-today' title='Relearn' btnSize={40} btnSx={{margin: '4px'}} color={gridState === 'relearn' ? '#FF9E42' : '#444'} 
            handle={()=> {
                if(gridState !== 'relearn')
                    setGridState('relearn' as GridStatee);
                else 
                    setGridState('default' as GridStatee);
            }} />
        </LearnBadge>
        <ReviewBadge badgeContent={getList(sr.allKnowledge.c).length ? getList(sr.allKnowledge.c).length : '0' } color="error" sx={{fontSize:'10px'}}  >
            <ICON iconCode='review' title='Review today' btnSize={40} btnSx={{margin: '4px'}} color={gridState === 'review-today' ? 'red' : '#444'}
            dbHandle={openPopup}
            handle={()=> {
                if(gridState !== 'review-today')
                    setGridState('review-today' as GridStatee);
                else 
                    setGridState('default' as GridStatee);
            }}
                 />
        </ReviewBadge>
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
        <SourceReviewPopup />
    </ToolbarContainer>
  )
}
