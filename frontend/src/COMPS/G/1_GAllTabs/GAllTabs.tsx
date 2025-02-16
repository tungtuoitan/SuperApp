import { Button, IconButton, styled, Tab } from "@mui/material";
import { SetStateAction, useState, MouseEvent, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ViewListIcon from '@mui/icons-material/ViewList';
import GContainer from "../GContainer";
import {useGAllTabsStore} from "./GAllTabsStore";
import {a11yProps} from "../../S/6_AllTabs/6he";
import {WBadge, WTabBar, WTabsContainer} from "./1ui";
import Petail from "../3_Petail/Petail";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import AddIcon from "@mui/icons-material/Add";
import {useGAllTabHelpers} from "./GAllTabHelpers";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {ToolBars} from "../7_Toolbars/ToolBars";
import {usePopupHelper} from "./CreateNewPopup/PopupHelper";
import {PopupProvider} from "./CreateNewPopup/PopupStore";
import Fotail from "../9_Fotail/Fotail";
import {paSid} from "../GHelpers";
import {g} from "../GConstants";
import {useFoStore} from "../0_Fo/FoStore";
import {get} from "lodash";


export const PRAllTabs = () => {
    const { gAllTabIds, setGAllTabIds, curTabIndex, setCurTabIndex } =
        useGAllTabsStore();
    const [hoverId, setHoverId] = useState<number | string | null>(null);
    const { allPrs, rowSelectionModel } = useGridContainerStore();
    const { allFos } = useFoStore();
    const [petails, dispatch] = usePetailFormStore();
    const { createNewPetail } = useGAllTabHelpers();
    const { openPopup } = usePopupHelper();

    const closeTab = (event: MouseEvent<HTMLButtonElement> | undefined, id: any) => {
        event?.preventDefault();
        event?.stopPropagation();

        setGAllTabIds(prev => {
            dispatch({ type: 'REMO', payload: {id} });
            const newAllTabIds = prev.filter(tabId => tabId !== id)
            if (curTabIndex === gAllTabIds.indexOf(id)) {
                setCurTabIndex(prev => prev-1);
            } else {
                const newCurTabIndex = newAllTabIds.indexOf(gAllTabIds[curTabIndex]);
                setCurTabIndex(newCurTabIndex);
            }

            return newAllTabIds;
        })
    }
    const curTabId = gAllTabIds.filter((id, index) => index === curTabIndex)[0];

    const getTabName = (id: string) => {
        const pr = allPrs.filter(pr => pr.id === id)[0];
        const fo = allFos.filter(fo => fo.id === id)[0];
        
        if(paSid(id).type === g.type.pr){
            return (pr && pr.name.length>35 ? pr.name.slice(0, 32) + "..." : pr?.name) ?? "New Pr"
        }
        if(paSid(id).type === g.type.fo){
            return (fo && fo.name.length>35 ? fo.name.slice(0, 32) + "..." : fo?.name) ?? "New Folder"
        }
        return '-__-';
    }

    return (
        <WTabsContainer id='PRAllTabs'>
            <WTabBar
                id='tabBar'
                value={curTabIndex}
                onChange={(e: any, newTabIndex: SetStateAction<number>) => setCurTabIndex(newTabIndex)}
                aria-label="tabs">
                {gAllTabIds.map((id: string, index: number) => {
                    
                    if (id === 'GeneralGrid') 
                        return <Tab key={index} icon={<ViewListIcon />} {...a11yProps(index)} sx={{ height: '48px',minHeight: '48px'}} />
                   
                    return (
                        <Tab
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurTabIndex(index);
                            }}
                            onMouseEnter={() => setHoverId(id)}
                            onMouseLeave={() => setHoverId(null)}
                            label={getTabName(id)}
                            icon={index > 0 ?
                                <IconButton id='closeTabBtn' onClick={(e) => closeTab(e, id)} sx={{ margin: '0 !important', opacity: hoverId === id ? 1 : 0 }}>
                                    <CloseIcon sx={{fontSize:12}} />
                                </IconButton> : <></>}
                            {...a11yProps(index)}
                            style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                gap: 10,
                                padding: "0 0 0 16px",
                                height: "48px",
                                minHeight: "48px",
                            }}
                        />
                    );
                })}
                {!(gAllTabIds.includes('Pr-0') || gAllTabIds.includes('Fo-0')) &&
                    <IconButton onClick={(event: MouseEvent<HTMLButtonElement>)=> openPopup(event)} sx={{width: '40px', height: '40px', marginTop: '4px'}}>
                        <AddIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                }
                {/* {rowSelectionModel.length>0 && curTabIndex===0 &&
                    <IconButton onClick={deleteRows} sx={{width: '40px', height: '40px', marginTop: '4px'}}>
                        <RemoveCircleIcon sx={{ fontSize: 16, color: 'red' }} />
                    </IconButton>
                } */}
                <ToolBars hide={curTabIndex!==0} />
            </WTabBar>

            <div id='tabContent' style={{ width: '100%', height: 'calc(100% - 50px)'}}>
                {curTabId === "GeneralGrid" ? 
                    <GContainer />
                : curTabId.toString().includes('Pr-') ?
                    <Petail petailId={gAllTabIds[curTabIndex] as string} />
                : curTabId.toString().includes('Fo-') ?
                    <Fotail fotailId={gAllTabIds[curTabIndex] as string} />
                : <></>
            }
            </div>
        </WTabsContainer>
    )
}