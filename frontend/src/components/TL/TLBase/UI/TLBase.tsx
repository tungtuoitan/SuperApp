import { useEffect } from "react";
import { TLColumn, GroupColumn } from "./TIColumn";
import { useTLBaseStore } from "../Store/TLBaseStore";
import { _TLL, TI, timeValue, totalTI } from "../../TLConfigs";
import { useTLBaseHelpers } from "../TLBaseHelpers";

export const TLBase = () => {
    const { TLBaseContainerRef, curTIList, setCurTIList, scrollByHand, TLBaseContentRef, ratio, X$TLBaseContainer_spotlight,
        curL, setCurL,
        startX, startScrollX, mouseDown, setMouseDown, mouseEnter, setMouseEnter, spotlightMoment, setSpotlightMoment } = useTLBaseStore();
    const { getNewDate, getTIValue, updateTIList$WhenTouchEdge, floorDate, mili$TLBaseContentLeft_TILeft } = useTLBaseHelpers();


    // when init
    useEffect(() => {
        // set vị trí scroll khi lần đầu render
        const maxScrollLeft = (TLBaseContainerRef.current?.scrollWidth ?? 0) - (TLBaseContainerRef.current?.clientWidth ?? 0);
        if (TLBaseContainerRef.current && curTIList.length > 0) {
            TLBaseContainerRef.current.scrollLeft = maxScrollLeft / 2
        }

        // set curTIList
        const newDateLeft = floorDate(new Date(2024, 10, 17, 12, 59), _TLL[curL.TILid].timeType);
        const newTIList = [] as TI[];
        for (let i = 0; i < totalTI; i++) {
            const TI = {
                id: i.toString(),
                date: getNewDate(newDateLeft, i),
            } as TI;
            newTIList.push(TI);
        }

        setCurTIList(newTIList);

    }, []);

    useEffect(() => {
        if (!curL.timeTypeChange) {
            // giữ spotlight
            const newTLBaseContentWidth = _TLL[curL.TILid].wi * totalTI;
            if (!TLBaseContainerRef.current) return;
            TLBaseContainerRef.current.scrollLeft = ratio.current * newTLBaseContentWidth - X$TLBaseContainer_spotlight.current //! bug: nếu giữ nguyên mouse, F5 + wheel thì spotlight sẽ sai, vì ratio sai, nhưng bug này k đáng kể, 
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


    }, [curL.TILid]);

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
                    // 1. tính ratio
                    const X$TLBaseContent_spotlight = e.clientX - (TLBaseContentRef.current?.getBoundingClientRect()?.left ?? 0);
                    const TLBaseContentWidth = TLBaseContentRef.current?.getBoundingClientRect()?.width ?? 0;
                    ratio.current = X$TLBaseContent_spotlight / TLBaseContentWidth;

                    // 2. tính spotlightMoment
                    console.log(new Date(mili$TLBaseContentLeft_TILeft))


                    // 2.scroll khi mousedownmousemove
                    if (!mouseDown || !scrollByHand.current) return;
                    if (!TLBaseContainerRef.current) return;
                    const ISPosition = TLBaseContainerRef.current.getBoundingClientRect().left + window.scrollX; // toạ độ của infiniteScroll so với Screen
                    const endX = e.pageX - ISPosition;
                    TLBaseContainerRef.current.scrollLeft = startScrollX.current + (startX.current - endX);

                    // 3. update TIList
                    updateTIList$WhenTouchEdge();
                }}
                onMouseLeave={() => {
                    setMouseDown(false);
                    setMouseEnter(false);
                }}
                onMouseEnter={() => { setMouseEnter(true) }}
                onWheel={(e: React.WheelEvent) => {
                    e.preventDefault();
                    if (curL.TILid === 0 || curL.TILid === _TLL.length - 1) return;

                    // 1.calc newTIL
                    let newL = {...curL}
                    if (e.deltaY > 0)
                        newL.TILid = curL.TILid + 1;
                    else
                        newL.TILid = curL.TILid - 1;

                    // 2. update
                    if (_TLL[curL.TILid].timeType !== _TLL[newL.TILid].timeType) {
                        newL.timeTypeChange = true;
                    }
                    else {
                        newL.timeTypeChange = false;
                        X$TLBaseContainer_spotlight.current = e.clientX - (TLBaseContainerRef.current?.getBoundingClientRect()?.left ?? 0);
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
                    {curTIList.map((TI, index) => (
                        <TLColumn
                            id={'TLColumn-' + index.toString()}
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
                            width={_TLL[curL.TILid].wi + 'px'} />
                    ))}
                </div>
            </div>
        </div>
    );
};
 