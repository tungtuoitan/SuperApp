import { timeConfig, useTimeConfigStore } from "../TimeConfig/TimeConfigStore";
import { cDate, y, m, d, h, cDateOption, hper, lvList, baseWofTI } from "../TLConfigs";
import { v4 as uuidv4 } from 'uuid';
import { useTLBaseBgStore } from "./TLBaseBgStore";


export const useTLBaseBgHelpers = () => {
    const { TIList, zoomLv, TLBaseContainerRef, TLBaseBgRef, spotRatio } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { dateReal } = useTLBaseBgStore();

    // 1.Khoảng cách tính sẵn
    const h$G_BgStart = () => { 
        if (TIList && TIList[0] && TIList[0].date) {
            const { y, m, d, h } = parseCDate(TIList[0].date);
            return d + y * hper.y + m * hper.m + d * hper.h;
        }
    }
    const h$G_BgEnd = () => {
        return (h$G_BgStart() ?? 0) + w$Bg() * RhPerPx();
    }

    const w$R_Red = () => {
        const realCDate = dateToCDate(dateReal);
        return RhToPx(
            cDateToGh(realCDate) - (h$G_BgStart() ?? 0)
        )
    }
    const w$TLContainerBase = () => {
        if (!TLBaseContainerRef.current) return 0;
        return TLBaseContainerRef.current?.clientWidth;
    }
    const w$Bg = () => {
        if (!TLBaseBgRef.current) return 0;
        return TLBaseBgRef.current.clientWidth;
    }
    const w$R_spot = () => w$Bg() * spotRatio.current;

    
    const maxScrollLeft = () => {
        if (!TLBaseContainerRef.current) return 0;
        return TLBaseContainerRef.current?.scrollWidth - TLBaseContainerRef.current?.clientWidth;
    }







    // 2. hàm chuyển đổi
    const RhPerPx = () => {
        const hourPerTI = lvList[timeConfig.level].hPerUnit;
        const pxPerTI = baseWofTI * zoomLv;
        return hourPerTI / pxPerTI;
    }

    const RhToPx = (h: number) => {
        return h / RhPerPx();
    }

    const dateToCDate = (date: Date) => {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const h = Number((date.getHours() + date.getMinutes() / 60).toFixed(2));
        return toCDate(y, m, d, h);
    }

    






  

    return {
        h$G_BgStart,
        w$R_Red,
        RhPerPx,
        RhToPx,
        maxScrollLeft,
        w$TLContainerBase,
        w$R_spot,
        h$G_BgEnd,
        dateToCDate,
    }
}


// 3. hàm chuyển đổi 2
export const parseCDate = (date: cDate): { y: y, m: m, d: d, h: h } => {
    const [year, month, day, hour, min] = date.split('/').map(Number);
    return {
        y: year as y,
        m: month as m,
        d: day as d,
        h: hour as h,
    };
};
export const toCDate = (y: y, m: m, d: d, h: h): cDate => `${y}/${m}/${d}/${h}` as cDate;

export const cDateToGh = (date: cDate) => {
    const { y, m, d, h } = parseCDate(date);
    const totalH = y * hper.y + m * hper.m + d * hper.d + h;
    return totalH;
}

export const GhToCDate = (h: number) => {
    const y = Math.floor(h / hper.y);
    h = h % hper.y;
    const m = Math.floor(h / hper.m);
    h = h % hper.m;
    const d = Math.floor(h / hper.d);
    h = h % hper.d;
    return `${y}/${m}/${d}/${h}`;
}

export const pxToRh = (px: number, hPerPx: number) => {
    return px * hPerPx;
}









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
    const { y, m, d, h } = parseCDate('2024/1/1/1' as cDate);
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
    return [{ id: `0`, label: `${2024} -> 2100`, date: `${2024}/1/1/1` }] as cDateOption[];
}

export const getPeriodListUnit1y = () => {
    const { y, m, d, h } = parseCDate('2024/1/1/1' as cDate);
    let periodList = [] as cDateOption[];
    for (let i = 0; i < 100; i++) {
        const year = y + i;
        if (year >= 2100) break;
        const period = {
            id: `${uuidv4()}`,
            label: `${year}`,
            date: `${year}/1/1/1` as cDate,
        } as cDateOption;
        periodList.push(period);
    }
    const curYearItem = { id: `${uuidv4()}`, label: `Current Year`, date: `${(new Date()).getFullYear()}/1/1/1` as cDate }
    periodList = [curYearItem, ...periodList];
    return periodList;
}


export const getPeriodListUnit1m = () => {
    const { y, m, d, h } = parseCDate('2024/1/1/1' as cDate);
    let periodList = [] as cDateOption[];
    for (let i = 0; i < 100; i++) {
        const year = y + i;
        if (year >= 2100) break;
        for (let j = 1; j <= 12; j++) {
            const period = {
                id: `${uuidv4()}-${i}`,
                label: `${year}-${j}`,
                date: `${year}/${j}/1/1` as cDate,
            } as cDateOption;
            periodList.push(period);
        }
    }
    // const curMonth = { id: `${uuidv4()}`, label: `Current Month`, date: `${(new Date()).getMonth() + 1}/1/1/1` as cDate }
    // periodList = [curMonth, ...periodList];
    return periodList;
}
