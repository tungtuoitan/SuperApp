import { AppBar, Breadcrumbs, Toolbar } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import { useFoStore } from "./FoStore";
import { CHIP } from "./Chip";
import { Popup} from "../1_GAllTabs/CreateNewPopup/Popup";
import {classes, getIcon} from "../../MainNav/Nhe";
import {toSid} from "../GHelpers";
import {useFoHelpers} from "./FoHelpers";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ListFoPopup} from "./ListFoPopup/Popup";
import {usePopupHelper} from "./ListFoPopup/PopupHelper";
import {useGAllTabsStore} from "../1_GAllTabs/GAllTabsStore";
import {_0cs} from "./0cs";

export const TopNav = () => {
    const { setAllFos, allFos, curFoId, lastFoId, setLastFoId, setCurFoId, setOpeningFoIds, openingFoIds } = useFoStore();
    const { loadFos } = useFoHelpers();
    const { openPopup } = usePopupHelper();
    const { setCurTabIndex } = useGAllTabsStore();

    useEffect(() => {
        loadFos();
    }, []);

    const handleClick = (foId: string) => {
        setLastFoId(foId);
        setCurTabIndex(0);
    };

    const getFoLine = (): string[] => {
        const foLine: string[] = [];
        if (lastFoId === toSid("Fo", 1)) {
            return [toSid("Fo", 1)];
        } 
        else {
            foLine.push(lastFoId);
        }

        while (allFos.find((f) => f.id === foLine[0])?.parentId) {
            const fo = allFos.find((f) => f.id === foLine[0]);
            if (fo && fo.parentId) 
                foLine.unshift(fo.parentId);
        }
        return foLine;
    };

    return (
        <div className="top-navigation" style={classes.root}>
            <Popup />
            <AppBar sx={classes.appBar} position="sticky">
                <Toolbar sx={{ marginLeft: -2, height: "60px" }}>
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                            {getFoLine().map((foId, index) => {
                                const fo = allFos.find((f) => f.id === foId);
                                return (<>
                                    <CHIP
                                        key={index}
                                        label={fo?.name ?? "??"}
                                        // icon={getIcon(fo?.iconId ?? '', 'folder')}
                                        onClick={() => handleClick(foId)}
                                        deleteIcon={<ExpandMoreIcon />}
                                        onDelete={(e: MouseEvent<HTMLSpanElement>)=> {
                                            openPopup(e)
                                            setOpeningFoIds([...openingFoIds, foId])
                                            setCurTabIndex(0)
                                        }}
                                        sx={{
                                            background: lastFoId !== foId ?  '#f0f0f0'
                                            : fo?.prioriC == 'T1' ? _0cs.lastchip.bgTop1 
                                            : fo?.prioriC == 'T2' ? _0cs.lastchip.bgTop2
                                            : fo?.prioriC == 'T3' ? _0cs.lastchip.bgTop3
                                            : _0cs.lastchip.bgNormal,
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
