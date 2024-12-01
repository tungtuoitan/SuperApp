import { timeConfig, useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { cDate, y, m, d, h, cDateOption, hper, lvList, baseWofTI, p, miliperh } from "../TLConfigs";
import { v4 as uuidv4 } from 'uuid';
import { useTLBaseBgStore } from "./TLBaseBgStore";

export const useTLBaseBgHelpers = () => {
    const { TIList, zoomLv, TLBaseFrameRef, spotRatio } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { dateReal } = useTLBaseBgStore();

    const hourPerTI = lvList[timeConfig.level].hPerUnit;
    const pxPerTI = baseWofTI * zoomLv;
    const RhPerPx = hourPerTI / pxPerTI;

    const w$Bg = baseWofTI * zoomLv * TIList.length
    const w$TLBaseFrame = TLBaseFrameRef.current ? TLBaseFrameRef.current.clientWidth : 0;
    const w$BgStart_spot = () => w$Bg * spotRatio.current; //! những value thế này, nếu viết theo kiểu hàm, thì đôi lúc nó sẽ không reset value

    const h$G_BgStart = (TIList[0] && TIList[0].date) ? cDateToGh(TIList[0].date) : 0;
    const h$G_BgEnd = h$G_BgStart + w$Bg * RhPerPx;
    const h$G_red = cDateToGh(dateToCDate(dateReal));

    const maxScrollLeft = TLBaseFrameRef.current ? (TLBaseFrameRef.current.scrollWidth - TLBaseFrameRef.current.clientWidth) : 0;

    const realCDate = dateToCDate(dateReal);
    const w$BgStart_red = (cDateToGh(realCDate) - h$G_BgStart) / RhPerPx;

    const RhToPx = (h: number) => h / RhPerPx
    const RpxToRh = (px: number) => px * RhPerPx

    return {
        h$G_BgStart,
        w$BgStart_red,
        RhPerPx,
        RhToPx,
        RpxToRh,
        maxScrollLeft,
        w$TLBaseFrame,
        w$BgStart_spot,
        h$G_BgEnd,
        dateToCDate,
        w$Bg,
        h$G_red,
    }
}
export const pad = (num: number): string => num.toString().padStart(2, '0');

export const toCDate = (y: y, m: m, d: d, h: h, p: p): cDate => {
    const year = y.toString();
    const month = pad(m);
    const day = pad(d);
    const hour = pad(h);
    const minute = pad(p);

    return `${year}-${month}-${day}T${hour}:${minute}:00.000+07:00` as cDate;
};
const dateToCDate = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const p = date.getMinutes();
    return toCDate(y, m, d, h, p);
}

export const currentYearcDate = toCDate(2024, 1, 1, 0, 0);


// 3. hàm chuyển đổi 2
export const parseCDate = (date: cDate) => parseDate(new Date(date));
export const parseDate = (date: Date) => {
    return {
        y: date.getFullYear(),
        m: date.getMonth() + 1, // Tháng bắt đầu từ 0, nên cần +1
        d: date.getDate(),
        h: date.getHours(),
        p: date.getMinutes(),
    };
};


export const cDateToGh = (date: cDate) => new Date(date).getTime() / miliperh

export const GhToCDate = (h: number) => dateToCDate(new Date(h * miliperh));

export const pxToRh = (px: number, hPerPx: number) => px * hPerPx;










// 4. lấy yearList
export const getInYearsList = (date: cDate) => {
    const { y, m, d, h } = parseCDate(date);
    const newInYearsList = [] as cDateOption[];
    for (let i = 0; i < 100; i++) {
        const year = {
            id: `inYearsVal-${i}`,
            label: `${y + i}`,
            date: `${y + i}/1/1/1` as cDate,
        } as cDateOption;
        newInYearsList.push(year);
    }
    return newInYearsList;
}


export const getPeriodListUnit1000y = () => {
    const { y, m, d, h, p } = parseCDate(currentYearcDate as cDate);
    const new100yList = [] as cDateOption[];
    for (let i = 0; i < 15; i++) {
        const year = y + i * 1000;
        if (year >= 3000) break;
        const period = {
            id: `${uuidv4()}-${i}`,
            label: `${year} -> ${y + (i + 1) * 1000}`,
            date: `${year}/1/1/1` as cDate,
        } as cDateOption;
        new100yList.push(period);
    }
    return new100yList;
}

export const getPeriodListUnit100y = () => {
    return [{ id: `0`, label: `${2024} -> 2100`, date: toCDate(2024, 1, 1, 0, 0) }] as cDateOption[];
}

export const getPeriodListUnit1y = () => {
    const { y, m, d, h } = parseCDate(currentYearcDate as cDate);
    let periodList = [] as cDateOption[];
    for (let i = 0; i < 1000; i++) {
        const year = y + i;
        if (year >= 2100) break;
        const period = {
            id: `${uuidv4()}`,
            label: `${year}`,
            date: addTime(currentYearcDate as cDate, i, 0, 0, 0, 0) as cDate,
        } as cDateOption;
        periodList.push(period);
    }
    const curYearItem = { id: `${uuidv4()}`, label: `Current Year`, date: toCDate(y, 1, 1, 0, 0) as cDate }
    periodList = [curYearItem, ...periodList];
    return periodList;
}


export const getPeriodListUnit1m = () => {
    const { y, m, d, h, p } = parseCDate(currentYearcDate as cDate);
    let periodList = [] as cDateOption[];
    for (let i = 0; i < 100; i++) {
        const year = y + i;
        if (year >= 2100) break;
        for (let _m = 0; _m < 12; _m++) {
            const period = {
                id: `${uuidv4()}-${i}`,
                label: `${year}-${_m + 1}`,
                date: toCDate(year, m + _m, 1, 0, 0) as cDate,
            } as cDateOption;
            periodList.push(period);
        }
    }
    const curMonth = { id: `${uuidv4()}`, label: `Current Month`, date: toCDate(new Date().getFullYear(), new Date().getMonth() + 1, 1, 0, 0) as cDate }
    periodList = [curMonth, ...periodList];
    return periodList;
}



export const addTime = (date: cDate, years: number, month: number, day: number, hour: number, min: number): cDate => {
    const date0 = new Date(date);
    const newDate = new Date(date);
    newDate.setFullYear(date0.getFullYear() + years);
    const newDate2 = new Date(new Date(newDate))
    newDate2.setMonth(date0.getMonth() + month);
    const newDate3 = new Date(new Date(newDate2))
    newDate3.setDate(date0.getDate() + day);
    const newDate4 = new Date(new Date(newDate3))
    newDate4.setHours(date0.getHours() + hour);
    const newDate5 = new Date(new Date(newDate4))
    newDate5.setMinutes(date0.getMinutes() + min);

    return dateToCDate(newDate5);
};



export const toLocalISOString = (date: Date): string => {
    const pad = (num: number): string => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Tháng bắt đầu từ 0
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());
    const millisecond = date.getMilliseconds().toString().padStart(3, '0');

    const timezoneOffset = -date.getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const offsetHour = pad(Math.floor(Math.abs(timezoneOffset) / 60));
    const offsetMinute = pad(Math.abs(timezoneOffset) % 60);

    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}${sign}${offsetHour}:${offsetMinute}`;
};

export const hToRoundedHM = (h: number, isRoundM? : boolean): { roundedH: number, roundedM: number } => {
    let roundedH = Math.floor(h);
    const decimalPart = h - roundedH;
    const rawMinutes = decimalPart * 60;
    let roundedM = rawMinutes;
    if (isRoundM) {
        roundedM = Math.round(rawMinutes / 15) * 15;
    } 

    // Nếu số phút là 60, đặt lại thành 0 và tăng giờ lên 1
    if (roundedM === 60) {
        roundedM = 0;
        roundedH += 1;
    }

    return { roundedH, roundedM };
};