import { cDate, y, m, d, h, cDateOption } from "../TLConfigs";

    export const parseCDate = (date: cDate): { y: y, m: m, d: d, h: h } => {
        const [year, month, day, hour, min] = date.split('/').map(Number);
        return {
            y: year as y,
            m: month as m,
            d: day as d,
            h: hour as h,
        };
    };

   export const toCDate = (y: y, m: m, d: d, h: h): cDate =>  `${y}/${m}/${d}/${h}` as cDate;


    export const getInYearsList = (date: cDate) => {
        const { y, m, d, h } = parseCDate(date);
        const newInYearsList = [] as cDateOption[];
        for (let i = 0; i < 1000; i++) {
            const year = {
                id: `inYearsVal-${i}`,
                label: `${y + i}`,
                date: `${y + i}/1/1/1` as cDate,
            } as cDateOption;
            newInYearsList.push(year);
        }
        return newInYearsList;
    }