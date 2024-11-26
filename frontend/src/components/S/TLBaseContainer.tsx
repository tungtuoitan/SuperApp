import { TLColumn, GroupColumn } from "./TLBaseBg/TIColumn";
import { useTLBaseBgStore } from "./TLBaseBg/TLBaseBgStore";
import { CircularProgress } from "@mui/material";
import { useTimeConfigStore } from "./TimeConfig/TimeConfigStore";
import { Evc } from "./TLBaseFg/Evc";
import { Ev } from "./TLTypes";
import { cDate, hper } from "./TLConfigs";
import { cDateToGh, parseCDate, useTLBaseBgHelpers } from "./TLBaseBg/TLBaseBgHelpers";
import { useEffect } from "react";
import { useTLBaseFgStore } from "./TLBaseFg/TLBaseFgStore";
import { TLBaseBg } from "./TLBaseBg/TLBaseBg";
import { TLBaseFg } from "./TLBaseFg/TLBaseFg";

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
    const { TLBaseContainerRef, mouseDown, setMouseDown, setMousePosition,
        startScrollX, scrollByHand, startX, loadingTL, zoomLv, setZoomLv, dateReal, TIList, setLoadingTL, TLBaseBgRef, w$TIList, spotRatio, w$BgLeft_spot
    } = useTLBaseBgStore();
    const { timeConfig, setTimeConfig } = useTimeConfigStore();
    const { w$R_Red, h$G_BgStart, maxScrollLeft, w$TLContainerBase, w$R_spot } = useTLBaseBgHelpers();

    useEffect(() => {
        if (TLBaseContainerRef.current) {
            if(timeConfig.period) {
                const { y, m, d, h } = parseCDate(timeConfig.period.date);
                // nếu đang có dateReal
                if(timeConfig.level === 1 && y === dateReal.getFullYear() ||
                    timeConfig.level === 2 && y === dateReal.getFullYear() && m === dateReal.getMonth() + 1){
                    TLBaseContainerRef.current.scrollLeft = w$R_Red() - w$TLContainerBase() / 2;
                }
                // nếu k có dateReal 
                else { 
                    TLBaseContainerRef.current.scrollLeft = 0
                }
            }
            // setLoadingTL(false)
        }
    }, [TIList])

    // giữ spotlight 
    useEffect(() => {
        if (TLBaseContainerRef.current) {
            TLBaseContainerRef.current.scrollLeft = w$R_spot() - w$BgLeft_spot.current
        }
    }, [zoomLv])

    return (
        <div
            id="TLBaseContainer"
            style={{
                border: '1px solid #bfbfbf',
                width: '100%',
                height: '150px', // TODO: make this dynamic,
                display: 'flex',
                position: 'relative',
            }}>
            <GroupColumn val={'zoomLv:' + zoomLv} width="100px" id="" />
            {/* { loadingTL ? <LoadingWrapper /> : <></>}  */}
            {
                <div
                    id="TLBaseContainer"
                    ref={TLBaseContainerRef}
                    style={{
                        width: 'calc(100% - 100px)',
                        // width: 'calc(400px)',
                        // height: '200px', // TODO: make this dynamic,
                        overflow: 'auto',
                        display: 'flex',
                    }}
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { // event: mousedown luôn chạy 2 lần, có thể do touchStart 
                        e.stopPropagation();
                        if (!mouseDown) {
                            setMouseDown(true)
                            scrollByHand.current = true;

                            if (!e.target) return;
                            if (!TLBaseContainerRef.current) return;

                            const ISPosition = TLBaseContainerRef.current.getBoundingClientRect().left + window.scrollX; // toạ độ của infiniteScroll so với Screen
                            startX.current = e.pageX - ISPosition;
                            startScrollX.current = TLBaseContainerRef.current.scrollLeft;
                        }
                    }}
                    onMouseUp={() => {
                        if (mouseDown) {
                            setMouseDown(false);
                        }
                    }}
                    onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        if (!TLBaseContainerRef.current) return;
                        // setMousePosition({ x: e.clientX ?? 0, y: e.clientY ?? 0 }); (dùng cho MouseTooltip)

                        // 1. tính spotRatio
                        const w$Bg_spot = e.clientX - (TLBaseBgRef.current?.getBoundingClientRect()?.left ?? 0);
                        w$TIList.current = TLBaseBgRef.current?.getBoundingClientRect()?.width ?? 0;
                        spotRatio.current = w$Bg_spot / w$TIList.current;

                        const rect = TLBaseContainerRef.current.getBoundingClientRect(); // Lấy tọa độ container
                        w$BgLeft_spot.current = e.clientX - rect.left;

                        // 2. tính spotlightMoment
                        // w$70_spot.current = w$70_Lveft + spotRatio.current * w$TIList.current / (lvList[timeConfig.level].initw * zoomLv)


                        // 2.scroll khi mousedownmousemove
                        if (!mouseDown || !scrollByHand.current) return;
                        const ISPosition = TLBaseContainerRef.current.getBoundingClientRect().left + window.scrollX; // toạ độ của infiniteScroll so với Screen
                        const endX = e.pageX - ISPosition;
                        TLBaseContainerRef.current.scrollLeft = startScrollX.current + (startX.current - endX);

                        // 3. update Lvist
                        // updateLvist$WhenTouchEdge();
                    }}
                    onMouseLeave={() => {
                        setMouseDown(false);
                    }}
                    // onMouseEnter={() => { setMouseEnter(true) }}
                    onWheel={(e: React.WheelEvent) => {
                        if(!TLBaseContainerRef.current) return;
                        e.preventDefault();
                        let newTimeConfig = { ...timeConfig };
                        let newZoomLv = zoomLv;

                        // 1.calc newL
                        // ~zoom in
                        if (e.deltaY < 0) {
                            if (zoomLv >= 6) {
                                // console.log('uplevel')
                                // uplevel nếu có thể
                                // for(let i= newTimeConfig.level+1; i<lvList.length; i++) {
                                //     if(lvList[i].status === 'on') {
                                //         newTimeConfig.level = i;
                                //         break;
                                //     }
                                // }
                                // if(lvList[newTimeConfig.level].levelName === 'year' && timeConfig.period) {
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
                                // for(let i= timeConfig.level-1; i >= 0; i--) {
                                //     if(lvList[i].status === 'on') {
                                //         newTimeConfig.level = i;
                                //         break;
                                //     }
                                // }
                            } else {
                                // console.log('downzoom')
                                newZoomLv -= 1;
                            }
                        }

                        // lưu lại, để dùng trong useEffect (trong useEffect k có e.clientX)
                        // px$TLBaseContainerLeft_spot.current = e.clientX - (TLBaseContainerRef.current?.getBoundingClientRect()?.left ?? 0) // value này k đổi trước và sau khi zoom

                        setZoomLv(newZoomLv);
                        if (newTimeConfig.level !== timeConfig.level)
                            setTimeConfig(newTimeConfig);
                    }}
                >
                    <div style={{
                        position: 'relative',
                    }}>
                        <TLBaseBg />
                        <TLBaseFg />
                    </div>
                </div>
            }
        </div>
    );
};
