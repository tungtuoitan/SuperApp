import { timeConfig, useTimeConfigStore } from "../TimeConfig/TimeConfigStore";  
import { cDate, y, m, d, h, cDateOption, hper, lvList, baseWofTI } from "../TLConfigs";
import { v4 as uuidv4 } from 'uuid';
import { useTLBaseBgStore } from "./TLBaseBgStore";


export const useTLBaseHelpers = () => {
    const { TIList, zoomLv } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();

    const h$God_R = () => { // God ở đây là mốc 0, R là Root (tức gốc của TIList)
        if (TIList && TIList[0] && TIList[0].date) {
            const { y, m, d, h } = parseCDate(TIList[0].date);
            return y * hper.y + m * hper.m + d * hper.d + h;
        }
    }

    const RhPerPx = () => {
        const hourPerTI = lvList[timeConfig.level].hPerUnit;
        const pxPerTI = baseWofTI * zoomLv;
        return hourPerTI / pxPerTI;
    }

    const RhToPx = (h: number) => {
        return h / RhPerPx();
    }

    return {
        h$God_R,
        RhPerPx,
        RhToPx,
    }
}

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

// cDate ->
export const cDateToGh = (date: cDate) => {
    const { y, m, d, h } = parseCDate(date);
    const totalH = y * hper.y + m * hper.m + d * hper.d + h;
    return totalH;
}

// Gh
export const GhToCDate = (h: number) => {
    const y = Math.floor(h / hper.y);
    h = h % hper.y;
    const m = Math.floor(h / hper.m);
    h = h % hper.m;
    const d = Math.floor(h / hper.d);
    h = h % hper.d;
    return `${y}/${m}/${d}/${h}`;
}

// px -> 
export const pxToRh = (px: number, hPerPx: number) => {
    return px * hPerPx;
}






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
    const { y, m, d, h } = parseCDate('-10000/1/1/1' as cDate);
    const newIn100YearsList = [] as cDateOption[];
    for (let i = 0; i < 15; i++) {
        const year = y + i * 1000;
        if (year >= 3000) break;
        const period = {
            id: `${uuidv4()}-${i}`,
            label: `${year} -> ${y + (i + 1) * 1000}`,
            date: `${year}/1/1/1` as cDate,
        } as cDateOption;
        newIn100YearsList.push(period);
    }
    return newIn100YearsList;
}

export const getPeriodListUnit100y = () => {
    const { y, m, d, h } = parseCDate('-10000/1/1/1' as cDate);
    const periodList = [] as cDateOption[];
    for (let i = 0; i < 200; i++) {
        const year = y + i * 100;
        if (year >= 3000) break;
        const period = {
            id: `${uuidv4()}-${i}`,
            label: `${year} -> ${year + 100}`,
            date: `${year}/1/1/1` as cDate,
        } as cDateOption;
        periodList.push(period);
    }
    return periodList;
}

export const getPeriodListUnit1y = () => {
    const { y, m, d, h } = parseCDate('-10000/1/1/1' as cDate);
    const periodList = [] as cDateOption[];
    for (let i = 0; i < 14000; i++) {
        const year = y + i;
        if (year >= 3000) break;
        const period = {
            id: `${uuidv4()}-${i}`,
            label: `${year}`,
            date: `${year}/1/1/1` as cDate,
        } as cDateOption;
        periodList.push(period);
    }
    return periodList;
}


