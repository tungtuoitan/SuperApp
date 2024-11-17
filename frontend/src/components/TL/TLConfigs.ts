export const timeValue = {
    min: 1,
    hour: 60,
    day: 1440,
}
export const px$initTI = 50
export const maxWs = {
    min: 300,
    hour: 300,
    day: 300,
    month: 300,
    year: 300,
    century: 300,
}
export type TimeType = 'min' | 'hour' | 'day' | 'week' | 'month' | 'year' | 'century';

export type curL = {
    TILid: number,
    timeTypeChange: boolean,
}
export type TIL = {
    id: number,
    wi: number,
    // value: number,
    timeType: TimeType,
}

export type TI = { // mỗi TI là 1 Date + timeType
    id: string,
    // TILid: string,
    date: Date,
}
export const totalTI = 100; // hard code (tính luôn số 0 thì sẽ là 100 TI)

export const _TLL: TIL[] = [ // đây là array chứa các timelineLevel
    { id: 0, wi: maxWs.min, timeType: 'min' }, // id của TI === index của chính nó
    { id: 1, wi: maxWs.hour, timeType: 'hour' },
    { id: 2, wi: maxWs.day, timeType: 'day' },
    { id: 3, wi: maxWs.month, timeType: 'month' },
    { id: 4, wi: maxWs.year, timeType: 'year' },
    { id: 5, wi: maxWs.century, timeType: 'century' },
]
