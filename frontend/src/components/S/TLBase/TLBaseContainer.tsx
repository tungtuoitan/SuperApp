import { TLColumn, GroupColumn } from "./TIColumn";
import { useTLBaseBgStore } from "./TLBaseBgStore";
import { CircularProgress } from "@mui/material";
import { useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { Evc } from "../TLBaseFg/Evc";
import { Ev } from "../TLTypes";
import { cDate, hper } from "../TLConfigs";
import { cDateToGh, parseCDate, useTLBaseHelpers } from "./TLBaseHelpers";
import { useEffect } from "react";
import { useTLBaseFgStore } from "../TLBaseFg/TLBaseFgStore";
import { TLBaseBg } from "./TLBaseBg";
import { TLBaseFg } from "../TLBaseFg/TLBaseFg";

const LoadingWrapper = () => (
    <div style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'transparent',
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
        >

        </div>
    );
}
export const TLBaseContainer = () => {
    const { TLBaseContainerRef, mouseDown, setMouseDown, setPosition,
        startScrollX, scrollByHand, startX, loadingTL, zoomLv, setZoomLv
    } = useTLBaseBgStore();
    const { timeConfig, setTimeConfig } = useTimeConfigStore();
    const {RhToPx, h$God_R} = useTLBaseHelpers();
    

    return (
        <div
            id="TLBaseContainer"
            style={{
                border: '1px solid #bfbfbf',
                width: '100%',
                height: '150px', // TODO: make this dynamic,
                display: 'flex',
            }}>
            <GroupColumn val={'zoomLv:' + zoomLv} width="100px" id="" />
            {
                loadingTL ? <LoadingWrapper /> :
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
                            setPosition({ x: e.clientX ?? 0, y: e.clientY ?? 0 });
                            // 1. tính ratio
                            // const mili$TLBaseBackground_spotlight = e.clientX - (TLBaseBackgroundRef.current?.getBoundingClientRect()?.left ?? 0);
                            // w$TIList.current = TLBaseBackgroundRef.current?.getBoundingClientRect()?.width ?? 0;
                            // ratio.current = mili$TLBaseBackground_spotlight / w$TIList.current;

                            // 2. tính spotlightMoment
                            // mili$70_spotlight.current = mili$70_Lveft + ratio.current * w$TIList.current / (lvList[timeConfig.level].initw * zoomLv)


                            // 2.scroll khi mousedownmousemove
                            if (!mouseDown || !scrollByHand.current) return;
                            if (!TLBaseContainerRef.current) return;
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
                            e.preventDefault();
                            let newTimeConfig = { ...timeConfig };
                            let newZoomLv = zoomLv;
                            
                            // 1.calc newL
                            // ~zoom in
                            if(e.deltaY < 0) { 
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
                            if(e.deltaY > 0) {
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

                            // // lưu lại, để dùng trong useEffect (trong useEffect k có e.clientX)
                            // px$TLBaseContainerLeft_spotlight.current = e.clientX - (TLBaseContainerRef.current?.getBoundingClientRect()?.left ?? 0) // value này k đổi trước và sau khi zoom

                            setZoomLv(newZoomLv);
                            // console.log("newZoomLv:", newZoomLv);
                            if(newTimeConfig.level !== timeConfig.level)
                                setTimeConfig(newTimeConfig);
                        }}
                    >
                        <div style={{
                            // border: '1px solid red',
                            position: 'relative',
                        }}>
                            <TLBaseBg/>
                            <TLBaseFg/>
                        </div>
                    </div>
            }
        </div>
    );
};
