import { useNavigationStore } from "./NavStore";
import { Drawer } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { SideMenu } from "./SideMenu";
import { SnackbarKey, SnackbarProvider, useSnackbar } from "notistack";
import { BodyWrapper, SideNavRoot } from "./Nui";
import {useTLBaseFgStore} from "../S/2_TLBaseFg/TLBaseFgStore";
import {useTLBaseBgStore} from "../S/1_TLBaseBg/TLBaseBgStore";
import {useChildEvStore} from "../S/4_ChildEv/ChildEvStore";
import {useTLBaseFgHelpers} from "../S/2_TLBaseFg/TLBaseFgHelpers";
import {useTLBaseBgHelpers} from "../S/1_TLBaseBg/TLBaseBgHelpers";
import {addTime, cDateToGh, cDateToUTCDate, GhToCDate, useTimeHelpers} from "../S/3_TimeConfig/TimeHelpers";
import {useSRsStore} from "../S/8_SRs/SRsStore";
import {useAllTabsStore} from "../S/6_AllTabs/TLAllTabsStore";
import {getSRs, iuEv} from "../S/TLAPIs";
import {KeyboardEvent, useEffect} from "react";
import {SR} from "../S/8_SRs/8ty";
import {IAutoCompleteOptions} from "../CommonHelpers/4_GenericAutoComplete";
import {getAllDescendants} from "../S/2_TLBaseFg/2he";
import {Ev, EvsResult} from "../S/TLTypes";
import {sr} from "../S/TLConstants";
import {TopNav} from "../G/0_Fo/TopNav";
import {CloseNotiBtn} from "../CommonHelpers/1_CloseNotiBtn";
import {TLAllTabs} from "../S/6_AllTabs/TLAllTabs";
import {PRAllTabs} from "../G/1_GAllTabs/GAllTabs";
import {useHandleShortCut} from "./useHandleShortCut";
import {useGridContainerStore} from "../G/2_GridContainer/GridContainerStore";
import {useRialogStore} from "../G/10_Rialog/RialogStore";
import {useQridHelpers} from "../G/11_Qrid/QridHelpers";
import {AuthContainer} from "../Auth/AuthContainer";
import {useAuthStore} from "../Auth/AuthStore";

const MainNav: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<unknown>>
> = () => {
    const { click, deleteEv, cutEv, pasteEv, pasteRow, cutRow, deleteRows, toNextKnowledge, closeRialog} = useHandleShortCut();
    const {sideNavigationRef, bodyWrapperRef } = useNavigationStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { keyboardState, setKeyboardState, TIList, setFirstTimeInit } = useTLBaseBgStore();
    const {fevId,setFevId,cutEvId,setCutEvId,focusTFId,setFocusTFId} = useChildEvStore();
    const { enqueueSnackbar } = useSnackbar();
    const { filterEvs, markEvs } = useTLBaseFgHelpers();
    const { RpxToRh, h$G_BgStart, w$BgStart_spot, getLevelCOf } =useTLBaseBgHelpers();
    const { changeLevel, changeTimeStart } = useTimeHelpers();
    const { sRs, setSRs, setLevelOptions, setRepeatTypeOptions } = useSRsStore();
    const { allTabIds, setAllTabIds, curTabIndex, setCurTabIndex } = useAllTabsStore();
    const location = useLocation()
    const { allPrs, setAllPrs, readyCuttingRows, currentHoveringRow, setCurrentHoveringRow } = useGridContainerStore();
    const {rialog } = useRialogStore();
    const { openQrid } = useQridHelpers();
    const {auth, setAuth} = useAuthStore();

    useEffect(() => {
        setAuth({ ...auth, userToken: localStorage.getItem('userToken') ?? '' });

    },[])

    useEffect(() => {
        if(auth.userToken)
            getSRs(auth.userToken)
                .then((srs: SR[]) => {
                    setSRs(srs);
                    const levelOptions = srs.filter(sr => sr.type === 'Cevel');
                    setLevelOptions(levelOptions.map(sr => (
                        { id: sr.id, code: sr.code.toLowerCase(), desc: sr.desc, active: (sr.active === 1 || sr.active === null) ? true : false } as IAutoCompleteOptions
                    )));
                    const repeatTypeOptions = srs.filter(sr => sr.type === 'PrRepeatType');
                    setRepeatTypeOptions(repeatTypeOptions.map(sr => (
                        { id: sr.id, code: sr.code.toLowerCase(), desc: sr.desc, active: (sr.active === 1 || sr.active === null) ? true : false } as IAutoCompleteOptions
                    )));

                })
    }, [auth])

    return (
        <div style={{outline: 'none'}}
        onClick={click}
        tabIndex={0} // to enable onKeyDown
        onKeyDown={async (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.ctrlKey)
                setKeyboardState({ ...keyboardState, ctrl: true });
            if (e.shiftKey)
                setKeyboardState({ ...keyboardState, shift: true });
            if (e.altKey)
                setKeyboardState({ ...keyboardState, alt: true });

            // S
            if (focusTFId) return;
            if (fevId) {
                switch (e.key) {
                    case "Escape":
                        setFevId(null);
                        break;
                    case "Delete":
                        deleteEv();
                        break;
                    case "x":
                    case "X":
                        cutEv(e);
                        break;
                    case "v":
                    case "V":
                        console.log('hi')
                        if(location.pathname === '/schedule')
                            pasteEv(e)
                        break;
                    default:
                }
            } 
            else if(location.pathname === '/schedule' && curTabIndex === 0) { 
                if (e.key === "ArrowUp") changeLevel("down");
                if (e.key === "ArrowDown") changeLevel("up");
                if (e.key === "ArrowLeft") changeTimeStart("prev");
                if (e.key === "ArrowRight") changeTimeStart("next");
            }

            // G
            if (location.pathname === '/practice' && curTabIndex === 0) {
                switch (e.key) {
                    // case "Escape":
                    //     setFevId(null);
                    //     break;
                    case "Delete":
                        deleteRows(e);
                        break;
                    case "x":
                    case "X":
                        cutRow(e);
                        break;
                    case "v":
                    case "V":
                        if(readyCuttingRows.length > 0)
                            pasteRow(e)
                        break;
                    case " ": // space
                        if(rialog)
                            toNextKnowledge();
                        break;
                    case 'Escape':  
                        if(rialog)
                            closeRialog();
                        break;
                    case "Tab":
                        e.preventDefault();
                        openQrid(allPrs[0]);
                        break;
                    default:
                }
            } 

        }}
        onKeyUp={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Control")
                setKeyboardState({ ...keyboardState, ctrl: false });
            if (e.key === "Shift")
                setKeyboardState({ ...keyboardState, shift: false });
            if (e.key === "Alt")
                setKeyboardState({ ...keyboardState, alt: false });
        }}
        
        >
            <TopNav />
            <SideNavRoot
                className={`side-tabs`}
                >
                {auth.userToken &&
    
                    <Drawer
                        ref={sideNavigationRef}
                        variant="permanent"
                        className={`side-navigation ${ "collapsed"
                            // (expanded ?? false) === true ? "expanded" : "collapsed"
                        }`}
                        style={{
                            transitionDuration: "500ms",
                            position: "relative",
                            whiteSpace: "nowrap",
                            //width: '227px',
                            paddingBottom: "40px",
                            backgroundColor: "#36454f",
                            zIndex: 1,
                            display: "flex",
                        }}
                    >
                        <SideMenu />
                    </Drawer>
                }
                <BodyWrapper id='bodyWrapper'
                    ref={bodyWrapperRef}
                    style={{
                        // width: expanded
                        //     ? "calc(100% - 200px)"
                        //     : "calc(100% - 48px)",
                        // border: '4px solid blue',
                    }}
                >
                    <SnackbarProvider
                        action={(id: SnackbarKey) => <CloseNotiBtn id={id} />}
                        autoHideDuration={3000}
                    >
                        <Routes>
                            {!auth.userToken && <Route path="/" Component={AuthContainer} />}
                            {auth.userToken &&  <Route path="/schedule" Component={TLAllTabs} />}
                            {auth.userToken &&  <Route path="/practice" Component={PRAllTabs} />}
                        </Routes>
                    </SnackbarProvider>
                </BodyWrapper>
            </SideNavRoot>
        </div>
    );
};

export default MainNav;