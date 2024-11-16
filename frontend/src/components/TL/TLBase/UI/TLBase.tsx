import { useEffect } from "react";
import { TLColumn, GroupColumn } from "./TIColumn";
import { useTLBaseStore } from "../Store/TLBaseStore";
import { _TLL, TI, timeValue, totalTI } from "../../TLConfigs";
import { useTLBaseHelpers } from "../TLBaseHelpers";

export const TLBase = () => {
    const { TLBaseContainerRef, curTIList, setCurTIList, scrollByHand, TLBaseContentRef, timeTypeChange, setTimeTypeChange, ratio, X$TLBaseContainer_spotlight,
        startX, startScrollX, mouseDown, setMouseDown, mouseEnter, setMouseEnter, spotlightMoment, setSpotlightMoment, curTIL, setCurTIL } = useTLBaseStore();
    const { getNewDate, getTIValue, updateTIList$WhenTouchEdge } = useTLBaseHelpers();


    // when init
    useEffect(() => {
        // set vị trí scroll khi lần đầu render
        const maxScrollLeft = (TLBaseContainerRef.current?.scrollWidth ?? 0) - (TLBaseContainerRef.current?.clientWidth ?? 0);
        if (TLBaseContainerRef.current && curTIList.length > 0) {
            TLBaseContainerRef.current.scrollLeft = maxScrollLeft / 2
        }

        // set curTIList
        const newDateLeft = new Date();
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
        if (!timeTypeChange) {
            // giữ spotlight
            const newTLBaseContentWidth = _TLL[curTIL].wi * totalTI;
            if (!TLBaseContainerRef.current) return;
            TLBaseContainerRef.current.scrollLeft = ratio.current * newTLBaseContentWidth - X$TLBaseContainer_spotlight.current //! bug: nếu giữ nguyên mouse, F5 + wheel thì spotlight sẽ sai, vì ratio sai, nhưng bug này k đáng kể, 
        }else {
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


    }, [curTIL]);

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
                    if (curTIL === 0 || curTIL === _TLL.length - 1) return;

                    // 1.calc newTIL
                    let newTIL;
                    if (e.deltaY > 0)
                        newTIL = curTIL + 1;
                    else
                        newTIL = curTIL - 1;

                    // 2. update
                    if (_TLL[curTIL].timeType !== _TLL[newTIL].timeType) {
                        setTimeTypeChange(true);
                    } 
                    else {
                        setTimeTypeChange(false);
                        X$TLBaseContainer_spotlight.current = e.clientX - (TLBaseContainerRef.current?.getBoundingClientRect()?.left ?? 0);
                    }
                    setCurTIL(newTIL);
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
                            val={getTIValue(TI, curTIL) ?? ''}
                            val2={
                                (() => {
                                    const val = getTIValue(TI, curTIL) ?? '';
                                    if (
                                        _TLL[curTIL].value === timeValue.min && val === '0' ||
                                        _TLL[curTIL].value === timeValue.min * 5 && val === '0' ||
                                        _TLL[curTIL].value === timeValue.min * 10 && val === '0' ||
                                        _TLL[curTIL].value === timeValue.min * 15 && val === '0'
                                    ) return TI.date?.getHours().toString();
                                    if (
                                        _TLL[curTIL].value === timeValue.hour && val === '00' ||
                                        _TLL[curTIL].value === timeValue.hour * 4 && val === '00'
                                    ) return TI.date?.getDate().toString();
                                    if (
                                        _TLL[curTIL].value === timeValue.day && val === '1' ||
                                        _TLL[curTIL].value === timeValue.day * 2 && val === '1'
                                    ) return TI.date?.toLocaleDateString('en-US', { month: 'long' }) + ' ' + TI.date?.getFullYear().toString();
                                    // if(
                                    //     _TLL[curTIL].value === timeValue.year    && val === '0' ||
                                    //     _TLL[curTIL].value === timeValue.year*5  && val === '0' ||
                                    //     _TLL[curTIL].value === timeValue.year*10 && val === '0' ||
                                    //     _TLL[curTIL].value === timeValue.year*50 && val === '0' 
                                    // ) return TI.date?.getMinutes().toString();
                                    return ''
                                })()
                            }
                            width={_TLL[curTIL].wi + 'px'} />
                    ))}
                </div>
            </div>
        </div>
    );
};
