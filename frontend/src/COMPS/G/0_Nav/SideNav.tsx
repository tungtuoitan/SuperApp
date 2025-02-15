import { useNavigationStore } from "./NavStore";
import { Drawer } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { SideMenu } from "./SideMenu";
import { SnackbarKey, SnackbarProvider, useSnackbar } from "notistack";
import { BodyWrapper, SideNavRoot } from "./Nui";
import {useTLBaseFgStore} from "../../S/2_TLBaseFg/TLBaseFgStore";
import {useTLBaseBgStore} from "../../S/1_TLBaseBg/TLBaseBgStore";
import {useChildEvStore} from "../../S/4_ChildEv/ChildEvStore";
import {useTLBaseFgHelpers} from "../../S/2_TLBaseFg/TLBaseFgHelpers";
import {useTLBaseBgHelpers} from "../../S/1_TLBaseBg/TLBaseBgHelpers";
import {addTime, cDateToGh, cDateToUTCDate, GhToCDate, useTimeHelpers} from "../../S/3_TimeConfig/TimeHelpers";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {useAllTabsStore} from "../../S/6_AllTabs/TLAllTabsStore";
import {getSRs, iuEv} from "../../S/TLAPIs";
import {KeyboardEvent, useEffect} from "react";
import {SR} from "../../S/8_SRs/8ty";
import {IAutoCompleteOptions} from "../../CommonHelpers/4_GenericAutoComplete";
import {getAllDescendants} from "../../S/2_TLBaseFg/2he";
import {Ev, EvsResult} from "../../S/TLTypes";
import {sr} from "../../S/TLConstants";
import {TopNav} from "../8_Fo/Nav";
import {CloseNotiBtn} from "../../CommonHelpers/1_CloseNotiBtn";
import {TLAllTabs} from "../../S/6_AllTabs/TLAllTabs";
import {PRAllTabs} from "../1_GAllTabs/PrAllTabs";

const SideNav: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<unknown>>
> = () => {
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

    useEffect(() => {
        getSRs()
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
    }, [])

    return (
        <div style={{outline: 'none'}}
        onClick={() => {
            if (fevId) {
                setFevId(null);
                setFocusTFId(null);
            }
        }}
        tabIndex={0} // to enable onKeyDown
        onKeyDown={async (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.ctrlKey)
                setKeyboardState({ ...keyboardState, ctrl: true });
            if (e.shiftKey)
                setKeyboardState({ ...keyboardState, shift: true });
            if (e.altKey)
                setKeyboardState({ ...keyboardState, alt: true });

            if (focusTFId) return;
            if (fevId) {
                switch (e.key) {
                    case "Escape":
                        setFevId(null);
                        break;
                    case "Delete":
                        if (fevId) {
                            // delete
                            const newAllEvs = [...allEvs];
                            const allDescendants: Ev[] =
                                getAllDescendants(newAllEvs, fevId);

                            allDescendants.forEach(
                                (ev) =>
                                    (ev.activeC = sr.active.inActive.c)
                            );
                            setAllEvs(markEvs(newAllEvs));
                            try {
                                await Promise.all(
                                    allDescendants.map((ev) => iuEv(ev))
                                ).then((data: EvsResult[]) => {
                                    const failResult = data.find(
                                        (r) => !r.options.success
                                    );
                                    if (!failResult) {
                                        enqueueSnackbar(
                                            data[0].options.message,
                                            { variant: "success" }
                                        );
                                    } else {
                                        enqueueSnackbar(
                                            failResult.options.message,
                                            { variant: "error" }
                                        );
                                    }
                                });
                            } catch {
                                enqueueSnackbar("SOMETHING WRONG!", {
                                    variant: "error",
                                });
                            }
                        }
                        break;
                    case "x":
                    case "X":
                        if (e.ctrlKey) {
                            if (
                                fevId &&
                                filterEvs(["childEv"]).filter(
                                    (ev) => ev.id === fevId
                                ).length > 0
                            ) {
                                // cut
                                setCutEvId(fevId);
                            }
                        }
                        break;
                    case "v":
                    case "V":
                        if (e.ctrlKey) {
                            if (cutEvId === null) {
                                enqueueSnackbar("Past Fail", {
                                    variant: "error",
                                });
                                return;
                            }
                            let newAllEvs = [...allEvs];
                            const cutEv: Ev = newAllEvs.filter(
                                (ev) => ev.id === cutEvId
                            )[0];
                            const newTimeStart = GhToCDate(
                                h$G_BgStart + RpxToRh(w$BgStart_spot())
                            );
                            const newTimeEnd = addTime(
                                newTimeStart,
                                0,
                                0,
                                0,
                                cDateToGh(cutEv.timeEnd) -
                                    cDateToGh(cutEv.timeStart),
                                0
                            );
                            const parentEv = newAllEvs.filter(
                                (ev) => ev.id === fevId
                            )[0];
                            const h$difference =
                                cDateToGh(newTimeStart) -
                                cDateToGh(cutEv.timeStart);
                            let allDescendants: Ev[] =
                                getAllDescendants(newAllEvs, cutEvId);

                            // if fevId is parentEv, go on
                            if (fevId && parentEv) {
                                if (
                                    parentEv.levelC !==
                                        getLevelCOf("parentEv") ||
                                    cutEv.levelC !==
                                        getLevelCOf("childEv")
                                ) {
                                    // we have to separate 2 cases, bcz of this condition
                                    enqueueSnackbar("Past Fail", {
                                        variant: "error",
                                    });
                                    return;
                                }
                                // paste
                                else if (cutEvId) {
                                    newAllEvs = newAllEvs.map(
                                        (_ev: Ev) => {
                                            if (_ev.id === cutEvId) {
                                                return {
                                                    ..._ev,
                                                    parentId: fevId,
                                                    timeStart:
                                                        newTimeStart,
                                                    timeEnd: newTimeEnd,
                                                };
                                            } else if (
                                                allDescendants.find(
                                                    (e) =>
                                                        e.id === _ev.id
                                                )
                                            ) {
                                                return {
                                                    ..._ev,
                                                    timeStart:
                                                        GhToCDate(
                                                            cDateToGh(
                                                                _ev.timeStart
                                                            ) +
                                                                h$difference
                                                        ),
                                                    timeEnd: GhToCDate(
                                                        cDateToGh(
                                                            _ev.timeEnd
                                                        ) + h$difference
                                                    ),
                                                };
                                            }
                                            return _ev;
                                        }
                                    );
                                }
                            } else if (
                                fevId === null ||
                                fevId === 999999999
                            ) {
                                // paste
                                newAllEvs = newAllEvs.map((_ev: Ev) => {
                                    if (_ev.id === cutEvId) {
                                        return {
                                            ..._ev,
                                            parentId: null,
                                            timeStart: newTimeStart,
                                            timeEnd: newTimeEnd,
                                        };
                                    } else if (
                                        allDescendants.find(
                                            (e) => e.id === _ev.id
                                        )
                                    ) {
                                        return {
                                            ..._ev,
                                            timeStart: GhToCDate(
                                                cDateToGh(
                                                    _ev.timeStart
                                                ) + h$difference
                                            ),
                                            timeEnd: GhToCDate(
                                                cDateToGh(_ev.timeEnd) +
                                                    h$difference
                                            ),
                                        };
                                    }
                                    return _ev;
                                });
                            }

                            setAllEvs(markEvs(newAllEvs));
                            allDescendants = getAllDescendants(
                                newAllEvs,
                                cutEvId
                            );
                            await Promise.all(
                                allDescendants.map((ev) =>
                                    iuEv({
                                        ...ev,
                                        timeStart: cDateToUTCDate(
                                            ev.timeStart
                                        ),
                                        timeEnd: cDateToUTCDate(
                                            ev.timeEnd
                                        ),
                                    })
                                )
                            ).then((data: EvsResult[]) => {
                                const failResult = data.find(
                                    (r) => !r.options.success
                                );
                                if (!failResult) {
                                    setCutEvId(null);
                                    enqueueSnackbar(
                                        data[0].options.message,
                                        { variant: "success" }
                                    );
                                } else {
                                    enqueueSnackbar(
                                        failResult.options.message,
                                        { variant: "error" }
                                    );
                                }
                            });
                        }
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
                            {/* <Route path="/login" Component={LoginContainer} /> */}
                            {/* <Route path="/signup" Component={LoginContainer} /> */}
                            <Route path="/schedule" Component={TLAllTabs} />
                            <Route path="/practice" Component={PRAllTabs} />
                        </Routes>
                    </SnackbarProvider>
                </BodyWrapper>
            </SideNavRoot>
        </div>
    );
};

export default SideNav;
