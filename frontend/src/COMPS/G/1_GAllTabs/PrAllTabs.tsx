import { Button, IconButton, styled, Tab } from "@mui/material";
import { SetStateAction, useState, MouseEvent, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ViewListIcon from '@mui/icons-material/ViewList';
import PRContainer from "../GContainer";
import {usePrAllTabsStore} from "./PrAllTabsStore";
import {a11yProps} from "../../S/6_AllTabs/6he";
import {WBadge, WTabBar, WTabsContainer} from "./1ui";
import Petail from "../3_Petail/Petail";
import {usePridContainerStore} from "../2_GridContainer/PridContainerStore";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import AddIcon from "@mui/icons-material/Add";
import {usePrAllTabHelpers} from "./PrAllTabHelpers";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {SearchAndFilter} from "../7_Toolbars/SearchAndFilter";
import {usePopupHelper} from "./CreateNewPopup/PopupHelper";
import {PopupProvider} from "./CreateNewPopup/PopupStore";
import Fotail from "../9_Fotail/Fotail";


export const PRAllTabs = () => {
    const { prAllTabIds, setPrAllTabIds, curTabIndex, setCurTabIndex } =
        usePrAllTabsStore();
    const [hoverId, setHoverId] = useState<number | string | null>(null);
    const { allPrs, rowSelectionModel } = usePridContainerStore();
    const [petails, dispatch] = usePetailFormStore();
    const { createNewPetail, deletePrs } = usePrAllTabHelpers();
    const { openPopup } = usePopupHelper();


    const closeTab = (event: MouseEvent<HTMLButtonElement> | undefined, id: any) => {
        event?.preventDefault();
        event?.stopPropagation();

        let nid = Number(id.split("-")[1]);
        setPrAllTabIds(prev => {
            dispatch({ type: 'REMO', payload: {id:nid} });
            const newAllTabIds = prev.filter(tabId => tabId !== id)
            if (curTabIndex === prAllTabIds.indexOf(id)) {
                setCurTabIndex(prev => prev-1);
            } else {
                const newCurTabIndex = newAllTabIds.indexOf(prAllTabIds[curTabIndex]);
                setCurTabIndex(newCurTabIndex);
            }

            return newAllTabIds;
        })
    }
    const curTabId = prAllTabIds.filter((id, index) => index === curTabIndex)[0];

    return (
        <WTabsContainer id='PRAllTabs'>
            <WTabBar
                id='tabBar'
                value={curTabIndex}
                onChange={(e: any, newTabIndex: SetStateAction<number>) => setCurTabIndex(newTabIndex)}
                aria-label="tabs">
                {prAllTabIds.map((id: number | string, index: number) => {
                    if (id === 'GeneralGrid') 
                        return <Tab key={index} icon={<ViewListIcon />} {...a11yProps(index)} sx={{ height: '48px',minHeight: '48px'}} />

                    const nid = Number(id.toString().split("-")[1]);
                    const pr = allPrs.filter(pr => pr.id === nid)[0];
                    return (
                        <Tab
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurTabIndex(index);
                            }}
                            onMouseEnter={() => setHoverId(nid)}
                            onMouseLeave={() => setHoverId(null)}
                            label={
                                <WBadge color="primary" max={99}>
                                    {(pr && pr.name.length > 35 ? pr.name.slice(0, 32) + "..." : pr?.name) ?? "New Pr"}
                                </WBadge>}
                            icon={index > 0 ?
                                <IconButton id='closeTabBtn' onClick={(e) => closeTab(e, id)} sx={{ margin: '0 !important', opacity: hoverId === nid ? 1 : 0 }}>
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
                {!prAllTabIds.includes('Pr-0') &&
                    <IconButton onClick={(event: MouseEvent<HTMLButtonElement>)=> openPopup(event)} sx={{width: '40px', height: '40px', marginTop: '4px'}}>
                        <AddIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                }
                {rowSelectionModel.length > 0 &&
                    <IconButton onClick={deletePrs} sx={{width: '40px', height: '40px', marginTop: '4px'}}>
                        <RemoveCircleIcon sx={{ fontSize: 16, color: 'red' }} />
                    </IconButton>
                }
                <SearchAndFilter hide={curTabIndex!==0} />
            </WTabBar>

            <div id='tabContent' style={{ width: '100%', height: 'calc(100% - 50px)'}}>
                {curTabId === "GeneralGrid" ? 
                    <PRContainer />
                : curTabId.toString().includes('Pr-') ?
                    <Petail petailId={Number((prAllTabIds[curTabIndex] as string).replace('Pr-', '') as unknown)} />
                : curTabId.toString().includes('Fo-') ?
                    <Fotail petailId={Number((prAllTabIds[curTabIndex] as string).replace('Fo-', '') as unknown)} />
                : <></>
            }
            </div>
        </WTabsContainer>
    )
}