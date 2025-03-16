import { AppBar, Breadcrumbs, Toolbar } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import { useFoStore } from "./FoStore";
import { CHIP } from "./Chip";
import { Popup} from "../1_GAllTabs/CreateNewPopup/Popup";
import {classes} from "../../MainNav/Nhe";
import {useFoHelpers} from "./FoHelpers";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ListFoPopup} from "./ListFoPopup/Popup";
import {usePopupHelper} from "./ListFoPopup/PopupHelper";
import {useGAllTabsStore} from "../1_GAllTabs/GAllTabsStore";
import {_0cs} from "./0cs";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {useSnackbar} from "notistack";
import {Fo} from "./FoTypes";
import {useAuthStore} from "../../Auth/AuthStore";

export const TopNav = () => {
    const { setAllFos, allFos, curFoId, lastFoId, setLastFoId, setCurFoId, setOpeningFoIds, openingFoIds } = useFoStore();
    const { loadFos } = useFoHelpers();
    const { openPopup } = usePopupHelper();
    const { setCurTabIndex } = useGAllTabsStore();
    const { allPrs, rowSelectionModel, setRowSelectionModel, refreshGrid, setRefreshGrid, searchText, setGridState} = useGridContainerStore(); 
    const { enqueueSnackbar } = useSnackbar();
    const { gridState } = useGridContainerStore();
    const { auth } = useAuthStore();


    useEffect(() => {
       if (auth.userToken)
        loadFos();
    }, []);

    useEffect(() => {
        setRefreshGrid(true);
        setRowSelectionModel([]);
    }, [lastFoId]);

    const handleClick = (foId: string) => {
        setLastFoId(foId);
        setCurTabIndex(0);
        setGridState('default');
    };

    // NOTE: i created a vitural Folder thas has id = 'Fo-0' to represent the root folder
    const getFoLine = (): string[] => {
        const foLine: string[] = [];
        foLine.push(lastFoId);
        let count = 0;

        while (allFos.find((f) => f.id === foLine[0])?.parentId) {
            // prevent infinite loop
            count++;
            if (count > 100) {
                // if it's too many loops, maybe there's a row that has row.parentId === row.id
                enqueueSnackbar("Error: getFoLine() too many loops", { variant: "error" });
                break;
            }

            const fo = allFos.find((f) => f.id === foLine[0]);
            if (fo && fo.parentId) 
                foLine.unshift(fo.parentId);
        }
        if(foLine.includes('Fo-0')) 
            return foLine
        else 
            return ['Fo-0', ...foLine];
    };

    return (
        <div className="top-navigation" style={classes.root}>
            <Popup />
            <AppBar sx={classes.appBar} position="sticky">
                <Toolbar sx={{ marginLeft: -2, height: "60px" }}>
                    <div role="presentation" style={{ display: gridState === 'default' ? 'block' : 'none' }}>
                        <Breadcrumbs aria-label="breadcrumb" >
                            {getFoLine().map((foId, index) => {
                                const fo = foId  !== 'Fo-0' 
                                    ? allFos.find((f) => f.id === foId) 
                                    : { id: 'Fo-0', name: "Home", iconId: "folder", activeC: 'Act', prioriC: 'Low' } as Fo;
                                return (<>
                                    <CHIP
                                        key={index}
                                        label={fo?.name ?? "??"}
                                        // icon={getIcon(fo?.iconId ?? '', 'folder')}
                                        onClick={() => handleClick(foId)}
                                        deleteIcon={foId !== 'Fo-0' 
                                            ? <ExpandMoreIcon sx={{
                                            color: foId == lastFoId ? 'white !important' : 'black',
                                            '&:hover': {
                                                color: 'black !important'
                                            }
                                        }} /> : <></>}
                                        onDelete={(e: MouseEvent<HTMLSpanElement>)=> {
                                            if(foId !== 'Fo-0') {
                                                openPopup(e);
                                                setOpeningFoIds([...openingFoIds, foId])
                                                setCurTabIndex(0)
                                            }
                                        }}
                                        sx={{
                                            background: lastFoId !== foId ?  '#f0f0f0'
                                            : fo?.prioriC == 'T1' ? _0cs.lastchip.bgTop1 
                                            : fo?.prioriC == 'T2' ? _0cs.lastchip.bgTop2
                                            : fo?.prioriC == 'T3' ? _0cs.lastchip.bgTop3
                                            : _0cs.lastchip.bgNormal,
                                            color: lastFoId !== foId ? '#000' : _0cs.lastchip.colorNormal,
                                        }}
                                    />
                                    {openingFoIds.includes(foId) && <ListFoPopup />}
                                </>);
                            })}
                        </Breadcrumbs>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
