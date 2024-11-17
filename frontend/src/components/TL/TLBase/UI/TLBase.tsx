import { useEffect } from "react";
import { TLColumn, GroupColumn } from "./TIColumn";
import { useTLBaseStore } from "../Store/TLBaseStore";
import { _TLL, TI, miliPer, totalTI } from "../../TLConfigs";
import { useTLBaseHelpers } from "../TLBaseHelpers";
import { Mouse } from "@mui/icons-material";
import { MouseTooltip } from "../../UI/MouseTooltip";

export const TLBase = () => {
    const { TLBaseContainerRef, curTIList, setCurTIList, scrollByHand, TLBaseContentRef, ratio, mili$TLBaseContainer_spotlight, mili$70_spotlight, mili$TLBaseContentLeft_spotlight,
        curL, setCurL, w$TLBaseContent, px$TLBaseContainerLeft_spotlight,
        startX, startScrollX, mouseDown, setMouseDown, mouseEnter, setMouseEnter, spotlightMoment, setSpotlightMoment, setPosition } = useTLBaseStore();
    const { getNewDate, getTIValue, updateTIList$WhenTouchEdge, floorDate, mili$70_TILeft, getMili$DateA_DateB } = useTLBaseHelpers();


    // when init
    useEffect(() => {
        // set vị trí scroll khi lần đầu render
        const maxScrollLeft = (TLBaseContainerRef.current?.scrollWidth ?? 0) - (TLBaseContainerRef.current?.clientWidth ?? 0);
        if (TLBaseContainerRef.current && curTIList.length > 0) {
            TLBaseContainerRef.current.scrollLeft = maxScrollLeft / 2
        }

        // set curTIList
        const newDateLeft = floorDate(new Date(2024, 10, 17, 12, 59, 59), _TLL[curL.TILid].timeType);
        const newTIList = [] as TI[];
        for (let i = 1; i <= totalTI; i++) {
            const TI = {
                id: i.toString(),
                date: getNewDate(newDateLeft, i),
            } as TI;
            newTIList.push(TI);
        }

        setCurTIList(newTIList);
        // console.log("newTIList:", newTIList);

    }, []);

    useEffect(() => {
        if (!TLBaseContainerRef.current) return;
        if (!curL.timeTypeChange) {
            // keep spotlight (khi zoomLv tăng, TILid giữ nguyên)
            const mili$TLBaseContentLeft_spotlight = mili$70_spotlight.current  - curTIList[0]?.date?.getTime() // value này k đổi trước và sau khi zoom
            const px$TLBaseContentLeft_spotlight = mili$TLBaseContentLeft_spotlight * _TLL[curL.TILid].pxPerMili * curL.zoomLv
            TLBaseContainerRef.current.scrollLeft = px$TLBaseContentLeft_spotlight - px$TLBaseContainerLeft_spotlight.current;
        } else {
            // // 2.tính TIBaseTimeFirst và TIBaseTimeLast
            // const TIBaseTimeFirst = curTIList[0].date
            // const TIBaseTimeLast = getNewDate(TIBaseTimeFirst ?? new Date(), totalTI);
            // const time1 = (TIBaseTimeFirst?.getTime() ?? 0) / 1000 / 60;
            // const time2 = TIBaseTimeLast.getTime() / 1000 / 60;

            // // 3. // Tính thời điểm của X
            // const totalmin = time1 + (time2 - time1) * ratio.current + 24 * 60;

            // const newSpotlightMoment = new Date(totalmin * 60 * 1000);
            // console.log("newSpotlightMoment:", newSpotlightMoment);
            // // setSpotlightMoment(newSpotlightMoment);
        }


    }, [curL]);

    return (
        <div
            id="TLBaseContainerBig"
            style={{
                border: '1px solid #bfbfbf',
                width: '100%',
                height: '200px', // TODO: make this dynamic,
                display: 'flex',
            }}>
            <GroupColumn val={'Group 1'} width="100px" id="" />
            <MouseTooltip />
            <div
                id="TLBaseContainer"
                ref={TLBaseContainerRef}
                style={{
                    width: 'calc(100% - 100px)',
                    height: '200px', // TODO: make this dynamic,
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
                    const mili$TLBaseContent_spotlight = e.clientX - (TLBaseContentRef.current?.getBoundingClientRect()?.left ?? 0);
                    w$TLBaseContent.current = TLBaseContentRef.current?.getBoundingClientRect()?.width ?? 0;
                    ratio.current = mili$TLBaseContent_spotlight / w$TLBaseContent.current;

                    // 2. tính spotlightMoment
                    mili$70_spotlight.current = mili$70_TILeft + ratio.current * w$TLBaseContent.current / (_TLL[curL.TILid].pxPerMili * curL.zoomLv)


                    // 2.scroll khi mousedownmousemove
                    if (!mouseDown || !scrollByHand.current) return;
                    if (!TLBaseContainerRef.current) return;
                    const ISPosition = TLBaseContainerRef.current.getBoundingClientRect().left + window.scrollX; // toạ độ của infiniteScroll so với Screen
                    const endX = e.pageX - ISPosition;
                    TLBaseContainerRef.current.scrollLeft = startScrollX.current + (startX.current - endX);

                    // 3. update TIList
                    // updateTIList$WhenTouchEdge();
                }}
                onMouseLeave={() => {
                    setMouseDown(false);
                    setMouseEnter(false);
                }}
                onMouseEnter={() => { setMouseEnter(true) }}
                onWheel={(e: React.WheelEvent) => {
                    e.preventDefault();
                    if (curL.TILid === 0 || curL.TILid === _TLL.length - 1) return;

                    // 1.calc newL
                    let newL = { ...curL }
                    const px$TI0_TI1 = _TLL[curL.TILid].pxPerMili * curL.zoomLv * (
                                        getMili$DateA_DateB(
                                            getNewDate(curTIList[0].date ?? new Date(), 1), curTIList[0].date ?? new Date())
                    )

                    if (e.deltaY > 0) { // ~ zoom out
                        if (px$TI0_TI1 <= 50) {
                            newL.TILid -= 1;
                            newL.timeTypeChange = true
                            console.log('out1')
                        } else {
                            newL.zoomLv -= 1;
                            newL.timeTypeChange = false
                            console.log('out2', px$TI0_TI1)
                        }
                    }
                    else { // ~ zoom in
                        if (px$TI0_TI1 > 300) {
                            newL.TILid += 1;
                            newL.timeTypeChange = true
                        } else {
                            newL.zoomLv += 1;
                            newL.timeTypeChange = false

                            // lưu lại, để dùng trong useEffect (trong useEffect k có e.clientX)
                            px$TLBaseContainerLeft_spotlight.current = e.clientX - (TLBaseContainerRef.current?.getBoundingClientRect()?.left ?? 0) // value này k đổi trước và sau khi zoom
                        }
                    }

                    setCurL(newL);
                }}
            >
                <div
                    id="TLBaseContent"
                    ref={TLBaseContentRef}
                    style={{
                        display: 'flex',
                        // width: '100%',
                    }}
                >
                    {curTIList.map((TI, i) => (
                        <TLColumn
                            id={'TLColumn-' + i.toString()}
                            key={TI.id}
                            val={getTIValue(TI, curL.TILid) ?? ''}
                            val2={
                                (() => {
                                    const val = getTIValue(TI, curL.TILid) ?? '';
                                    if (_TLL[curL.TILid].timeType === 'min' && val === '0')
                                        return new Date(TI.date).getHours().toString() + 'h ' + new Date(TI.date).getDate().toString() + ' ' + new Date(TI.date).toLocaleDateString('en-US', { month: 'long' })
                                    if (_TLL[curL.TILid].timeType === 'hour' && val === '0')
                                        return new Date(TI.date).getDate().toString() + ' ' + new Date(TI.date).toLocaleDateString('en-US', { month: 'long' }) + ' ' + new Date(TI.date).getFullYear().toString();
                                    if (_TLL[curL.TILid].timeType === 'day' && val === '1')
                                        return new Date(TI.date).toLocaleDateString('en-US', { month: 'long' }) + ' ' + new Date(TI.date).getFullYear().toString();
                                    if (_TLL[curL.TILid].timeType === 'month' && val === '1')
                                        return new Date(TI.date).getFullYear().toString();
                                    if (_TLL[curL.TILid].timeType === 'year' && val[val.length - 1] === '0'
                                    ) return new Date(TI.date).getFullYear().toString();
                                    return ''
                                })()
                            }
                            width={
                                (_TLL[curL.TILid].pxPerMili * curL.zoomLv * (
                                    getMili$DateA_DateB(
                                        getNewDate(TI.date ?? new Date(), 1), TI.date ?? new Date())
                                ))
                                // (getNewDate(TI.date ?? new Date(), 1).getTime() - (TI.date ?? new Date()).getTime()) / 1000 / 60)) 
                                + 'px'}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
