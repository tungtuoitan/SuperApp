import {
    AppBar,
    Badge,
    BadgeProps,
    Box,
    FormControlLabel,
    FormGroup,
    IconButton,
    styled,
    Switch,
    Toolbar,
    Tooltip,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useFilterIconEvents } from "./FilterIconEvents";
import { ToolbarContainer } from "./7ui";
import TuneIcon from "@mui/icons-material/Tune";
import { Search } from "./Search";
import { useGridContainerStore } from "../2_GridContainer/GridContainerStore";
import { ICON } from "../2_GridContainer/2ui";
import { useRialogHelpers } from "../10_Rialog/RialogHelpers";
import { SourceReviewPopup } from "../10_Rialog/ReviewOptionPopup/Popup";
import { useSourceReviewPopupHelper } from "../10_Rialog/ReviewOptionPopup/PopupHelper";
import { sr } from "../../S/TLConstants";
import { Background } from "reactflow";
import { GridStatee } from "../2_GridContainer/2ty";
import { useGridContainerHelpers } from "../2_GridContainer/GridContainerHelpers";
import { color } from "framer-motion";
import {SnackbarAction, SnackbarKey, useSnackbar} from "notistack";

type ToolBarsProps = {
    hide?: boolean;
};
const NewKnowledgeBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 13,
        top: 13,
        //   border: `2px solid ${theme.palette.background.paper}`,
        //   padding: '0 5px',
        fontSize: "10px",
        background: "transparent",
        color: "gray",
    },
}));
const LearnBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 13,
        top: 13,
        //   border: `2px solid ${theme.palette.background.paper}`,
        //   padding: '0 5px',
        fontSize: "10px",
        background: "transparent",
        //   background: '#FF9E42',
        color: "gray",
    },
}));
const ReviewBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 13,
        top: 13,
        //   border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 5px",
        fontSize: "10px",
        background: "transparent",
        color: "gray",
    },
}));
export const ToolBars = (props: ToolBarsProps) => {
    const { getTotalFilter, onClickHandlerFilter } = useFilterIconEvents();
    const {
        setSearchText,
        setCurrentPage,
        setRefreshGrid,
        setLoadingGrid,
        displayDeleltedRows,
        setDisplayDeletedRows,
        setGridState,
        gridState,
    } = useGridContainerStore();
    const { openRialog } = useRialogHelpers();
    const { getAllGitems } = useGridContainerHelpers();
    const { openPopup, getList } = useSourceReviewPopupHelper();
    const { allPrs } = useGridContainerStore();
    const onChangeHandlerSearch = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
    ) => {
        if (event === undefined) return;
        setSearchText(event.target.value);
    };

    const onKeyUpHandlerSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (
            event.code === "Enter" ||
            event.nativeEvent.code === "Enter" ||
            event.code === "NumpadEnter" ||
            event.nativeEvent.code === "NumpadEnter"
        ) {
            setSearchText(event.currentTarget.value);
            setRefreshGrid(true);
            setLoadingGrid(true);
            setCurrentPage(0);
        }
    };

    const toggleDeletedRows = () => {
        setDisplayDeletedRows(!displayDeleltedRows);
    };

    const toggleBtn = (type: GridStatee) => {
        if (gridState !== type)
            setGridState(type);
        else setGridState("default");
    }
    const getTotalItem = (type: GridStatee) => {
        return getAllGitems(type).length
        ? getAllGitems(type).length
        : "0"
    }

    return (
        <ToolbarContainer
            sx={{ visibility: props.hide ? "hidden" : "visible" }}
        >
            <NewKnowledgeBadge
                badgeContent={getTotalItem("all-knowledge")}
                color="secondary"
            >
                <ICON
                    iconCode="all-knowledge"
                    title="Opening"
                    btnSize={40}
                    btnSx={{ margin: "4px" }}
                    color={
                        gridState === "all-knowledge" ? "#1976D2" : "#d3d3d3"
                    }
                    handle={() => toggleBtn("all-knowledge")}
                />
            </NewKnowledgeBadge>
            <NewKnowledgeBadge
                badgeContent={getTotalItem("open-knowledge")}
                color="secondary"
            >
                <ICON
                    iconCode="open-knowledge"
                    title="Opening"
                    btnSize={40}
                    btnSx={{ margin: "4px" }}
                    color={
                        gridState === "open-knowledge" ? "#1976D2" : "#d3d3d3"
                    }
                    handle={() => toggleBtn("open-knowledge")}
                />
            </NewKnowledgeBadge>
            <LearnBadge
                badgeContent={getTotalItem("relearn")}
                color="primary"
            >
                <ICON
                    iconCode="learn-today"
                    title="Relearn"
                    btnSize={40}
                    btnSx={{ margin: "4px" }}
                    color={gridState === "relearn" ? "#1976D2" : "#d3d3d3"}
                    handle={() => toggleBtn("relearn")}
                />
            </LearnBadge>
            <ReviewBadge
                badgeContent={getTotalItem("review-today")}
                color="error"
            >
                <ICON
                    iconCode="review"
                    title="Review today"
                    btnSize={40}
                    color={gridState === "review-today"
                            ? "#1976D2"
                            : "#d3d3d3"
                    }
                    handle={() => toggleBtn("review-today")}
                    btnSx={{ margin: "4px"}}
                />
            </ReviewBadge>
            <ICON
                    iconCode="play-review"
                    title="Play Review"
                    btnSize={40}
                    color={gridState === "review-today"
                            ? "red"
                            : "#d3d3d3"
                    }
                    handle={openPopup}
                    btnSx={{ margin: "4px 4px 4px 20px"}}
                />
            <Search
                onChangeHandlerSearch={onChangeHandlerSearch}
                onKeyUpHandlerSearch={onKeyUpHandlerSearch}
            />
            <Tooltip title="+/- Deleted rows">
                <IconButton onClick={toggleDeletedRows}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    size="small"
                                    checked={displayDeleltedRows}
                                />
                            }
                            label=""
                        />
                    </FormGroup>
                </IconButton>
            </Tooltip>

            <Tooltip title="Filter">
                <IconButton onClick={() => onClickHandlerFilter()}>
                    <Badge badgeContent={getTotalFilter()} color="primary">
                        <TuneIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <SourceReviewPopup />
        </ToolbarContainer>
    );
};
