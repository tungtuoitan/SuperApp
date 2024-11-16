import { _TLL, TI, timeValue, totalTI } from "../TLConfigs";
import { useTLBaseStore } from "./Store/TLBaseStore";

export function useTLBaseHelpers() {
    const { TLBaseContainerRef, curTIList, setCurTIList, scrollByHand, curTIL } = useTLBaseStore();

    const getNewDate = (baseDate: Date, plusValue: number): Date => {
        const newDate = new Date(baseDate);
        if (_TLL[curTIL].value === timeValue.min) {
            newDate.setDate(newDate.getDate() + plusValue);
        } else if (_TLL[curTIL].value === timeValue.min * 5) {
            newDate.setDate(newDate.getDate() + plusValue * 5);
        } else if (_TLL[curTIL].value === timeValue.min * 15) {
            newDate.setDate(newDate.getDate() + plusValue * 15);
        } else if (_TLL[curTIL].value === timeValue.hour) {
            newDate.setHours(newDate.getHours() + plusValue);
        } else if (_TLL[curTIL].value === timeValue.hour * 4) {
            newDate.setHours(newDate.getHours() + plusValue * 4);
        } else if (_TLL[curTIL].value === timeValue.day) {
            newDate.setDate(newDate.getDate() + plusValue);
        } else if (_TLL[curTIL].value === timeValue.day * 2) {
            newDate.setDate(newDate.getDate() + plusValue * 2);
        } else if (_TLL[curTIL].value === timeValue.month) {
            newDate.setMonth(newDate.getMonth() + plusValue);
        } else if (_TLL[curTIL].value === timeValue.month * 3) {
            newDate.setMonth(newDate.getMonth() + plusValue * 3);
        } else if (_TLL[curTIL].value === timeValue.year) {
            newDate.setFullYear(newDate.getFullYear() + plusValue);
        } else if (_TLL[curTIL].value === timeValue.year * 5) {
            newDate.setFullYear(newDate.getFullYear() + plusValue * 5);
        } else if (_TLL[curTIL].value === timeValue.year * 10) {
            newDate.setFullYear(newDate.getFullYear() + plusValue * 10);
        } else if (_TLL[curTIL].value === timeValue.year * 50) {
            newDate.setFullYear(newDate.getFullYear() + plusValue * 50);
        } else if (_TLL[curTIL].value === timeValue.century) {
            newDate.setFullYear(newDate.getFullYear() + plusValue * 100);
        } else if (_TLL[curTIL].value === timeValue.century * 5) {
            newDate.setFullYear(newDate.getFullYear() + plusValue * 500);
        }
        return newDate;
    }

    const getTIValue = (TI: TI, curTIL: number) =>  { // value ở đây là value sẽ hiển thị trên UI
        switch (_TLL[curTIL].value) {
            case timeValue.min: 
            case timeValue.min*5:
            case timeValue.min*15: 
                return TI.date?.getMinutes().toString();
            case timeValue.hour: 
            case timeValue.hour*4: 
                return TI.date?.getHours().toString();
            case timeValue.day: 
            case timeValue.day*2: 
                return TI.date?.getDate().toString();
            case timeValue.month: 
            case timeValue.month*3: 
                return TI.date?.getMonth().toString();
            case timeValue.year: 
            case timeValue.year*5: 
            case timeValue.year*10: 
            case timeValue.year*50: 
                return TI.date?.getFullYear().toString();
            case timeValue.century: 
            case timeValue.century*5: 
                return TI.date?.getFullYear().toString();
            default: 
                return TI.date?.toLocaleDateString();
        }
    }

    const updateTIList = () => {
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
                    0.5 * _TLL[curTIL].wi
            }
            if (TLBaseContainerRef.current?.scrollLeft === maxScrollLeft) {
                TLBaseContainerRef.current.scrollLeft = maxScrollLeft / 2 -
                    TLBaseContainerRef.current.clientWidth / 2 +
                    0.5 * _TLL[curTIL].wi
            }
        }
    };

    

return {
    getNewDate,
    getTIValue,
    updateTIList,
}

}

