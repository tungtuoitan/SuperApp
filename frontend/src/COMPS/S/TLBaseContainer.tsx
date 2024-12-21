import { useTLBaseBgStore } from "./1_TLBaseBg/TLBaseBgStore";
import { CircularProgress } from "@mui/material";
import { useTimeConfigStore } from "./3_TimeConfig/TimeConfigStore";
import { useTLBaseBgHelpers } from "./1_TLBaseBg/TLBaseBgHelpers";
import { addTime, cDateToUTCDate, hToRoundedHM, parseCDate } from "./3_TimeConfig/TimeHelpers";
import { useEffect, useLayoutEffect } from "react";
import { useTLBaseFgStore } from "./2_TLBaseFg/TLBaseFgStore";
import { TLBaseBg } from "./1_TLBaseBg/TLBaseBg";
import { TLBaseFg } from "./2_TLBaseFg/TLBaseFg";
import { iuEv } from "./TLAPIs";
import { useSnackbar } from "notistack";
import { cDate, EvsResult } from "./TLTypes";
import { EvStore } from "./4_Ev/EvStore";
import { useEvHelpers } from "./4_Ev/EvHelpers";
import { zoomLvMax } from "./TLConstants";

const LoadingWrapper = () => (
    <div style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'white',
        position: 'absolute',
        zIndex: 100000,
    }}>
        <div
            className="loadingWrapper"
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
            <CircularProgress size={16} sx={{ color: 'red' }} />
        </div>
    </div>
);
export const TLLoading = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        />
    );
}
export const TLBaseContainer = () => {
    const { TLBaseFrameRef, mouseDown, setMouseDown, frameScrollLeft, setFrameScrollLeft,
        startScrollX, scrollByHand, startX, loadingTL, zoomLv, setZoomLv, dateReal, TIList, setLoadingTL, TLBaseBgRef, spotRatio, w$FrameLeft_spot
    } = useTLBaseBgStore();
    const { timeConfig, setTimeConfig } = useTimeConfigStore();
    const { w$BgStart_red, w$TLBaseFrame, w$BgStart_spot, w$Bg, RpxToRh } = useTLBaseBgHelpers();
    const { debounce$UpdateEv } = useEvHelpers();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { grabEdge, setGrabEdge } = EvStore();
    const { enqueueSnackbar } = useSnackbar();


    // reload scrollLeft
    useEffect(() => {
        if (TLBaseFrameRef.current && timeConfig.timeStart) 
            TLBaseFrameRef.current.scrollLeft = frameScrollLeft
            // if (timeConfig.timeStart) {
                // const { y, m, d, h } = parseCDate(timeConfig.timeStart);
                // // nếu đang có dateReal
                // if (timeConfig.cevelId === 1 && y === dateReal.getFullYear() ||
                //     timeConfig.cevelId === 2 && y === dateReal.getFullYear() && m === dateReal.getMonth() + 1) {
                //     TLBaseFrameRef.current.scrollLeft = w$BgStart_red - w$TLBaseFrame / 2;
                // }
                // // nếu k có dateReal 
                // else {
                //     TLBaseFrameRef.current.scrollLeft = 0
                // }
            // }
            // setLoadingTL(false)
        
    }, [TIList])

    // giữ spotlight 
    useLayoutEffect(() => { // khi wheeling hơi bị giật, nên phải dùng useLayoutEffect
        if (TLBaseFrameRef.current) {
            TLBaseFrameRef.current.scrollLeft = w$BgStart_spot() - w$FrameLeft_spot.current
        }
    }, [zoomLv])

    return (
        <div
            id="TLBaseContainer"
            style={{
                border: '1px solid #bfbfbf',
                width: '100%',
                height: '650px', //^ modify height of content here,
                display: 'flex',
                position: 'relative',
                paddingBottom: zoomLv === 1 ? '15px' : '0', // giữ cho Frame khỏi rung vì display/hide scrollbar
            }}>
            {/* <GroupColumn val={'zoomLv:' + zoomLv} width="100px" id="" /> */}
            {/* { loadingTL ? <LoadingWrapper /> : <></>}  */}
            {
                <div
                    id="TLBaseFrame"
                    ref={TLBaseFrameRef}
                    style={{
                        width: 'calc(100%)',
                        // width: 'calc(400px)',
                        // height: '200px', // TODO: make this dynamic,
                        overflowX: zoomLv === 1 ? 'hidden' : 'auto', // force hide scrollbar
                        overflowY: 'hidden',
                        display: 'flex',
                    }}
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { // event: mousedown luôn chạy 2 lần, có thể do touchStart 
                        e.stopPropagation();
                        if (!mouseDown) {
                            setMouseDown(true)
                            scrollByHand.current = true;

                            if (!e.target) return;
                            if (!TLBaseFrameRef.current) return;

                            const ISPosition = TLBaseFrameRef.current.getBoundingClientRect().left + window.scrollX; // toạ độ của infiniteScroll so với Screen
                            startX.current = e.pageX - ISPosition;
                            startScrollX.current = TLBaseFrameRef.current.scrollLeft;
                        }
                    }}
                    onMouseUp={() => {
                        if(grabEdge.mousedownAtGE) {
                            const { id, position } = grabEdge;
                            const { roundedH, roundedM } = hToRoundedHM(RpxToRh(w$BgStart_spot()), true)
                            const newTime = addTime(TIList[0].date, 0, 0, 0, roundedH, roundedM)
                            const newEv = allEvs.filter(ev => ev.id === id)[0];
                            iuEv({...newEv, 
                                timeStart: cDateToUTCDate(position === 'left' ? newTime : newEv.timeStart), 
                                timeEnd: cDateToUTCDate(position === 'right' ? newTime : newEv.timeEnd)}
                            ).then((data: EvsResult) => {
                                if(data.options.success) {
                                    enqueueSnackbar(data.options.message ?? '', { variant: "success", autoHideDuration: 3000 });
                                } else {
                                    enqueueSnackbar(data.options.message ?? '', { variant: "error", autoHideDuration: 3000 });
                                }
                            })

                            setGrabEdge({ ...grabEdge, id: null, mousedownAtGE: false }); // phải set mousedownAtGE = false tại đây, vì  khi dragging, mouse có thể k nằm trong GE nữa
                        }
                        if (mouseDown) {
                            setMouseDown(false);
                            setFrameScrollLeft(TLBaseFrameRef?.current?.scrollLeft??0)
                        }
                    }}
                    onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        if (!TLBaseFrameRef.current) return;

                        // 1. tính spotRatio
                        const w$Bg_spot = e.clientX - (TLBaseBgRef.current?.getBoundingClientRect()?.left ?? 0);
                        spotRatio.current = w$Bg_spot / w$Bg;

                        const rect = TLBaseFrameRef.current.getBoundingClientRect();
                        w$FrameLeft_spot.current = e.clientX - rect.left;

                        // 2.scroll khi mousedownmousemove
                        if (mouseDown && scrollByHand.current && !grabEdge.mousedownAtGE) {
                            const ISPosition = TLBaseFrameRef.current.getBoundingClientRect().left + window.scrollX; // toạ độ của infiniteScroll so với Screen
                            const endX = e.pageX - ISPosition;
                            TLBaseFrameRef.current.scrollLeft = startScrollX.current + (startX.current - endX);
                        }

                        // 3. resize TI
                        if (mouseDown && scrollByHand.current && grabEdge.mousedownAtGE) {
                            const { id, position } = grabEdge;
                            const { roundedH, roundedM } = hToRoundedHM(RpxToRh(w$BgStart_spot()), true)
                            debounce$UpdateEv(id, position, roundedH, roundedM);
                        }

                    }}
                    onMouseLeave={() => {
                        setMouseDown(false);
                    }}
                    // onMouseEnter={() => { setMouseEnter(true) }}
                    onWheel={(e: React.WheelEvent) => {
                        if (!TLBaseFrameRef.current) return;
                        // e.preventDefault();
                        let newTimeConfig = { ...timeConfig };
                        let newZoomLv = zoomLv;

                        // 1.calc newL
                        // ~zoom in
                        if (e.deltaY < 0) {
                            if (zoomLv >= zoomLvMax) {
                                // console.log('uplevel')
                                // uplevel nếu có thể
                                // for(let i= newTimeConfig.levelC+1; i<clvs.length; i++) {
                                //     if(clvs[i].status === 'on') {
                                //         newTimeConfig.levelC = i;
                                //         break;
                                //     }
                                // }
                                // if(clvs[newTimeConfig.levelC].levelC === sr.year && timeConfig.period) {
                                //     const newInYearsList = getInYearsList(timeConfig.period.date);
                                //     newTimeConfig.inYearsVal = newInYearsList[0];
                                // }

                                // newZoomLv = 1;
                            } else {
                                // console.log('upzoom')
                                newZoomLv += 1;

                            }
                        }

                        // ~zoom out
                        if (e.deltaY > 0) {
                            if (zoomLv <= 1) {
                                // console.log('downlevel')
                                // newZoomLv = 6;

                                // downlevel nếu có thể
                                // for(let i= timeConfig.cevelId-1; i >= 0; i--) {
                                //     if(clvs[i].status === 'on') {
                                //         newTimeConfig.levelC = i;
                                //         break;
                                //     }
                                // }
                            } else {
                                // console.log('downzoom')
                                newZoomLv -= 1;
                            }
                        }

                        setZoomLv(newZoomLv);
                        if (newTimeConfig.cevelId !== timeConfig.cevelId)
                            setTimeConfig(newTimeConfig);
                    }}
                >
                    <div id='FgBgContainer' style={{
                        position: 'relative'
                    }}>
                        <TLBaseFg />
                        <TLBaseBg />
                    </div>
                </div>
            }
        </div>
    );
};
