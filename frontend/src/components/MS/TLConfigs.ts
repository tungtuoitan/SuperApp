export const bilion = 1000000000
export const milion = 1000000
export const miliPer = {
    sec: 1000,
    min: 60000,
    hou: 3600000,
    day: 86400000,
}
export const val = {
    '1tby':  1000*bilion,
    '100by': 100*bilion,
    '10by':  10*bilion,
    '1by':   bilion,
    '100my': 100*milion,
    '10my':  10*milion,
    '1my':   milion,
    '100ty': 100000,
    '10ty':  10000,
    '1ty':   1000,
    century: 100,
    year:    1,
}

export const childsAmount = {
    '1tby': 10,
    '100by': 10,
    '10by': 10,
    '1by': 10,
    '100my': 10,
    '10my': 10,
    '1my': 10,
    '100ty': 10,
    '10ty': 10,
    '1ty': 10,
    century: 10,
    year: 12,
    month: 30,
    day: 24,
    hour: 60,
    min: 60,
}
export const maxWs = {
    min: 300,
    hour: 300,
    day: 300,
    month: 300,
    year: 300,
    century: 300,
}

export type cDate = `${y}/${m}/${d}`
export type y = number
export type m = number
export type d = number

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
    initw: number,
}

export type TI = { // mỗi TI là 1 Date + timeType
    id: string,
    TILid: number,
    date: cDate,
}
export const totalTI = 100; // hard code (tính luôn số 0 thì sẽ là 100 TI)
export const px$PerMili_Init = 50/60

export const initCurl : curL= {TILid: 11, timeTypeChange: false, zoomLv: 6}

export type TimeType = 'min' | 'hour' | 'day' | 'month' | 'year' | 'century' | '1ty' | '10ty' | '100ty' | '1my' | '10my' | '100my' | '1by' | '10by' | '100by' | '1tby'
export const _TLL: TIL[] = [ // đây là array chứa các timelineLevel
    { id: 0, wi: maxWs.century, timeType: '1tby', initw: 50 },

    { id: 1, wi: maxWs.century, timeType: '100by', initw: 50 },
    { id: 2, wi: maxWs.century, timeType: '10by', initw: 50 },
    { id: 3, wi: maxWs.century, timeType: '1by', initw: 50 },

    { id: 4, wi: maxWs.century, timeType: '100my', initw: 50 },
    { id: 5, wi: maxWs.century, timeType: '10my', initw: 50 },
    { id: 6, wi: maxWs.century, timeType: '1my', initw: 50 },

    { id: 7, wi: maxWs.century, timeType: '100ty', initw: 50 },
    { id: 8, wi: maxWs.century, timeType: '10ty', initw: 50 }, 
    { id: 9, wi: maxWs.century, timeType: '1ty', initw: 50 }, // = 1000 years

    { id: 10, wi: maxWs.century, timeType: 'century', initw: 50 }, // = 100 years
    { id: 11, wi: maxWs.year, timeType: 'year',       initw: 50},
    { id: 12, wi: maxWs.month, timeType: 'month',     initw: 50 },
    { id: 13, wi: maxWs.day, timeType: 'day',         initw: 50},
    { id: 14, wi: maxWs.hour, timeType: 'hour',       initw: 50 }, 
    { id: 15, wi: maxWs.min, timeType: 'min',         initw: 50 }, // id của TI === index của chính nó
]
