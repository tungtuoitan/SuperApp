import { TLColumn, GroupColumn } from "../TLBase/UI/TIColumn";
import { useTLBaseStore } from "../TLBase/Store/TLBaseStore";
import { _TLL, TI, miliPer, totalTI } from "../TLConfigs";
import { TL1TBY } from "./TL1TBY";

export const TLCont2 = () => {
    const {TLBaseContainerRef, TLBaseContentRef, mouseEnter, setMouseEnter, mouseDown,setMouseDown, setPosition, position, w$TLBaseContent, ratio,
        curL, setCurL, px$TLBaseContainerLeft_spotlight, mili$70_spotlight, 
        startScrollX, scrollByHand, startX,
    } = useTLBaseStore();


    return (
        <div
            id="TLCont2"
            style={{
                border: '1px solid #bfbfbf',
                width: '100%',
                // height: '200px', // TODO: make this dynamic,
                display: 'flex',
            }}>
            <GroupColumn val={_TLL[curL.TILid].timeType + ' z:' + curL.zoomLv} width="100px" id="" />
            {/* <MouseTooltip /> */}
            <div 
                id="TLCont2"
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
                    const mili$TLBaseContent_spotlight = e.clientX - (TLBaseContentRef.current?.getBoundingClientRect()?.left ?? 0);
                    w$TLBaseContent.current = TLBaseContentRef.current?.getBoundingClientRect()?.width ?? 0;
                    ratio.current = mili$TLBaseContent_spotlight / w$TLBaseContent.current;

                    // 2. tính spotlightMoment
                    // mili$70_spotlight.current = mili$70_TILeft + ratio.current * w$TLBaseContent.current / (_TLL[curL.TILid].initw * curL.zoomLv)


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
                // onMouseEnter={() => { setMouseEnter(true) }}
                onWheel={(e: React.WheelEvent) => {
                    e.preventDefault();
                    if (curL.TILid === 0 || curL.TILid === _TLL.length - 1) return;

                    // 1.calc newL
                    let newL = { ...curL }
                    // const px$TI0_TI1 = _TLL[curL.TILid].initw * curL.zoomLv * (
                    //     getMili$DateA_DateB(
                    //         getNewDate(curTIList[0].date ?? new Date(), 1), curTIList[0].date ?? new Date())
                    // )

                    if (e.deltaY > 0) { // ~ zoom out
                        if (newL.zoomLv <= 1) {
                            newL.zoomLv = 6;
                            newL.TILid = newL.TILid > 0 ? newL.TILid - 1 : newL.TILid;
                            newL.timeTypeChange = true
                            console.log('out1')
                        } else {
                            newL.zoomLv -= 1;
                            newL.timeTypeChange = false
                            console.log('out2')
                        }
                    }
                    else { // ~ zoom in
                        if (newL.zoomLv >= 6) {
                            newL.TILid = newL.TILid < 6 ? newL.TILid + 1 : newL.TILid;
                            newL.zoomLv = 1; 
                            newL.timeTypeChange = true
                            console.log('in1')
                        } else {
                            newL.zoomLv += 1;
                            newL.timeTypeChange = false
                            console.log('in2')
                        }
                    }

                    // lưu lại, để dùng trong useEffect (trong useEffect k có e.clientX)
                    px$TLBaseContainerLeft_spotlight.current = e.clientX - (TLBaseContainerRef.current?.getBoundingClientRect()?.left ?? 0) // value này k đổi trước và sau khi zoom

                    setCurL(newL);
                }}
            >
                <div
                    id="TLBaseContent"
                    ref={TLBaseContentRef}
                    style={{
                        display: 'flex',
                        // border: '1px solid red',
                        // width: '100%',
                    }}
                >
                    <TL1TBY />
                </div>
            </div>
        </div>
    );
};
