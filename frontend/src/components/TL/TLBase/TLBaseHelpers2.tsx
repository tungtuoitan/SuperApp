import { _TLL, TI, TimeType, miliPer, totalTI, cDate, y, m, d } from "../TLConfigs";

    export const parseCDate = (date: cDate): { y: y, m: m, d: d } => {
        const [year, month, day] = date.split('/').map(Number);
        return {
            y: year as y,
            m: month as m,
            d: day as d
        };
    };

   export const toCDate = (y: y, m: m, d: d): cDate =>  `${y}/${m}/${d}` as cDate;


