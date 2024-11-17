export const miliPer = {
    sec: 1000,
    min: 60000,
    hou: 3600000,
    day: 86400000,
}
export const maxWs = {
    min: 300,
    hour: 300,
    day: 300,
    month: 300,
    year: 300,
    century: 300,
}
export type TimeType = 'min' | 'hour' | 'day' | 'month' | 'year' | 'century';

export type curL = {
    TILid: number,
    timeTypeChange: boolean,
    zoomLv: 1|2|3|4|5|6|7|8|9|10,
}
export type TIL = {
    id: number,
    wi: number,
    // value: number,
    timeType: TimeType,
    pxPerMili: number,
}

export type TI = { // mỗi TI là 1 Date + timeType
    id: string,
    // TILid: string,
    date: Date,
}
export const totalTI = 100; // hard code (tính luôn số 0 thì sẽ là 100 TI)
export const px$PerMili_Init = 50/60
export const _TLL: TIL[] = [ // đây là array chứa các timelineLevel
    { id: 0, wi: maxWs.century, timeType: 'century', pxPerMili: 50/miliPer.hou },
    { id: 1, wi: maxWs.day, timeType: 'day',         pxPerMili: 50/miliPer.hou },
    { id: 2, wi: maxWs.year, timeType: 'year',       pxPerMili: 50/miliPer.hou },
    { id: 3, wi: maxWs.month, timeType: 'month',     pxPerMili: 50/miliPer.hou/500 },
    { id: 4, wi: maxWs.hour, timeType: 'hour',       pxPerMili: 50/miliPer.hou }, 
    { id: 5, wi: maxWs.min, timeType: 'min',         pxPerMili: 50/miliPer.hou }, // id của TI === index của chính nó
]
