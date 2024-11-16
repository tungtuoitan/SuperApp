import { useEffect } from "react";
import { Column, GroupColumn } from "./Column";
import { useTLBaseStore } from "../Store/TLBaseStore";
import { _TLL, TI, timeValue, totalTI } from "../../TLConfigs";
import { useTLBaseHelpers } from "../TLBaseHelpers";

export const TLBase = () => {
    const { TLBaseContainerRef, curTIList, setCurTIList, scrollByHand,
        startX, startScrollX, mouseDown, setMouseDown, mouseEnter, setMouseEnter, spotlightMoment, setSpotlightMoment, curTIL, setCurTIL } = useTLBaseStore();
    const { getNewDate, getTIValue, updateTIList } = useTLBaseHelpers();
   

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
        for (let i = 0; i <= totalTI; i++) {
            const TI = {
                id: i.toString(),
                date: getNewDate(newDateLeft, i),
            } as TI;
            newTIList.push(TI);
        }

        setCurTIList(newTIList);
    }, []);

    useEffect(() => {

        console.log("curTIL:", curTIL);
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
            <GroupColumn val={'Group 1'} width="" />
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
                    // pageX:      Tọa độ X của chuột so với screen, 
                    // offsetLeft: Tọa độ X của con   so với cha

                    if (!mouseDown || !scrollByHand.current) return;
                    if (!TLBaseContainerRef.current) return;
                    const ISPosition = TLBaseContainerRef.current.getBoundingClientRect().left + window.scrollX; // toạ độ của infiniteScroll so với Screen
                    const endX = e.pageX - ISPosition;

                    TLBaseContainerRef.current.scrollLeft = startScrollX.current + (startX.current - endX);
                    // TLBaseContainerRef.current.scrollLeft = startScrollX.current + 2*(startX.current - endX); // nếu muốn tăng tốc độ cuộn
                }}
                onMouseLeave={() => {
                    setMouseDown(false);
                    setMouseEnter(false);
                }}
                onMouseEnter={() => { setMouseEnter(true) }}
                onWheel={(e: React.WheelEvent) => {
                    e.preventDefault();
                    if (e.deltaY > 0) {
                        setCurTIL(curTIL + 1 < _TLL.length ? curTIL + 1 : 0);
                    }
                    else {
                        setCurTIL(curTIL - 1 >= 0 ? curTIL - 1 : _TLL.length - 1);
                    }
                }}
                onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
                    updateTIList();
                }
                }
            >
                <div
                    id="TLBaseContent"
                    style={{
                        display: 'flex',
                        // width: '100%',
                    }}
                >
                    {curTIList.map((TI, index) => (
                        <Column
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
