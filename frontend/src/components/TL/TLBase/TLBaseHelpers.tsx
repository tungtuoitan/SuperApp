import { _TLL, TI, TimeType, miliPer, totalTI } from "../TLConfigs";
import { useTLBaseStore } from "./Store/TLBaseStore";

export function useTLBaseHelpers() {
    const { TLBaseContainerRef, curTIList, setCurTIList, scrollByHand, curL } = useTLBaseStore();

    const getNewDate = (baseDate: Date, plusValue: number): Date => { //plusValue: vd: plusValue = 1, thì 1 có thể là 1 phút, 1 giờ, 1 ngày, 1 tháng, 1 năm, 1 thế kỷ... tùy vào curTIL
        const newDate = new Date(baseDate);
        if (_TLL[curL.TILid].timeType === 'min') {
            newDate.setDate(newDate.getDate()         + plusValue);
        }
        if (_TLL[curL.TILid].timeType === 'hour') {
            newDate.setHours(newDate.getHours()       + plusValue);
        }
        if (_TLL[curL.TILid].timeType === 'day') {
            newDate.setDate(newDate.getDate()         + plusValue);
        }
        if (_TLL[curL.TILid].timeType === 'month') {
            newDate.setMonth(newDate.getMonth()       + plusValue);
        }
        if (_TLL[curL.TILid].timeType === 'year') {
            newDate.setFullYear(newDate.getFullYear() + plusValue);
        }
        if (_TLL[curL.TILid].timeType === 'century') {
            newDate.setFullYear(newDate.getFullYear() + plusValue * 100);
        }
        return newDate;
    }

    const getTIValue = (TI: TI, curL: number) =>  { // value ở đây là value sẽ hiển thị trên UI
        switch (_TLL[curL].timeType) {
            case 'min': 
                return new Date(TI.date).getMinutes().toString() + 'm';
            case 'hour': 
                return (new Date(TI.date).getHours()).toString() + 'h';
            case 'day': 
                return new Date(TI.date).getDate().toString();
            case 'month': 
                return (new Date(TI.date).getMonth()+1).toString();
            case 'year': 
                return new Date(TI.date).getFullYear().toString();
            case 'century': 
                return new Date(TI.date).getFullYear().toString();
            default: 
                return new Date(TI.date).toLocaleDateString();
        }
    }

    const updateTIList$WhenTouchEdge = () => {
        /// Nguyên tắc của logic: TILeft của curTIList === TIMid của new TIList, nhờ vào công thức này để tính ra newTIList 
        const maxScrollLeft = (TLBaseContainerRef.current?.scrollWidth ?? 0) - (TLBaseContainerRef.current?.clientWidth ?? 0);

        // 1.tính newDateLeft
        const newTIMid = TLBaseContainerRef.current?.scrollLeft === 0
            ? curTIList[0]
            : curTIList[curTIList.length - 1];
        const newDateLeft = getNewDate(newTIMid.date as Date, -totalTI / 2);

        // 2. tính TIList
        const newTIList: TI[] = [];
        if (TLBaseContainerRef.current?.scrollLeft === 0 ||
            TLBaseContainerRef.current?.scrollLeft === maxScrollLeft) {
                console.log('updateTIList$WhenTouchEdge');
            for (let i = 0; i <= totalTI; i++) {
                const TI = {
                    id: i.toString(),
                    date: getNewDate(newDateLeft, i),
                } as TI;
                newTIList.push(TI);
            }
            setCurTIList(newTIList);

            scrollByHand.current = false;

            // 3.set lại vị trí scroll
            if (TLBaseContainerRef.current?.scrollLeft === 0) {
                TLBaseContainerRef.current.scrollLeft = maxScrollLeft / 2 +
                    TLBaseContainerRef.current.clientWidth / 2 -
                    0.5 * _TLL[curL.TILid].wi
            }
            if (TLBaseContainerRef.current?.scrollLeft === maxScrollLeft) {
                TLBaseContainerRef.current.scrollLeft = maxScrollLeft / 2 -
                    TLBaseContainerRef.current.clientWidth / 2 +
                    0.5 * _TLL[curL.TILid].wi
            }
        }
    };

    const floorDate = (date: Date, keepLv: TimeType): Date => { // đưa các timeType nhỏ hơn keepLv về 0 hoặc 1
        let _date = new Date(date);
        if(keepLv === 'year') {
            return new Date(_date.getFullYear(), 0, 1, 0, 0, 0, 0);
        }
        if(keepLv === 'month') {
            return new Date(_date.getFullYear(), _date.getMonth(), 1, 0, 0, 0, 0);
        }
        if(keepLv === 'day') {
            return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), 0, 0, 0, 0);
        }
        if(keepLv === 'hour') {
            return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), 0, 0, 0);
        }
        if(keepLv === 'min') {
            return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), 0, 0);
        }

        return _date;

    }

    const mili$70_TILeft = curTIList[0].date?.getTime() ?? 0;
    const getMili$DateA_DateB = (dateA: Date, dateB: Date) => {
        return Math.abs(dateA.getTime() - dateB.getTime());
    }

    // đây là kích thước của 1 item TRUNG BÌNH,
    const px$TI0_TI1 = _TLL[curL.TILid].pxPerMili * curL.zoomLv * (
                                                                    getMili$DateA_DateB(
                                                                        getNewDate(curTIList[0].date ?? new Date(), 1), curTIList[1].date ?? new Date())
                                                                    )

    
return {
    getNewDate,
    getTIValue,
    updateTIList$WhenTouchEdge,
    floorDate,
    mili$70_TILeft,
    px$TI0_TI1,
    getMili$DateA_DateB,
}

}

