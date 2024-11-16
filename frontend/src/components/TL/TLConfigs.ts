export const timeValue = {
    min: 1,
    hour: 60,
    day: 1440,
    week: 10080,
    month: 43800,
    quarter: 131400,
    year: 525600,
    century: 5256000,
}
export const TIWidth = {
    s1: 50,
    s2: 65,
    s3: 78,

    m1: 95,
    m2: 113,
    m3: 135,

    l1: 160,
    l2: 200,
    l3: 230,
    l4: 280,
}
export type TimeType = 'min' | 'hour' | 'day' | 'week' | 'month' | 'year' | 'century';

export type TIL = {
    id: number,
    wi: number,
    value: number,
    timeType: TimeType,
}

export type TI = { // mỗi TI là 1 Date + timeType
    id: string,
    // TILid: string,
    date: Date | null,
}
export const totalTI = 100; // hard code (tính luôn số 0 thì sẽ là 100 TI)

export const _TLL: TIL[] = [ // đây là array chứa các timelineLevel
    { id: 0, wi: TIWidth.s3, value: timeValue.min, timeType: 'min' }, // id của TI === index của chính nó
    { id: 1, wi: TIWidth.s2, value: timeValue.min, timeType: 'min' },
    { id: 2, wi: TIWidth.s1, value: timeValue.min, timeType: 'min' },

    { id: 3, wi: TIWidth.s3, value: timeValue.min * 5, timeType: 'min' },
    { id: 4, wi: TIWidth.s2, value: timeValue.min * 5, timeType: 'min' },
    { id: 5, wi: TIWidth.s1, value: timeValue.min * 5, timeType: 'min' },

    { id: 6, wi: TIWidth.s3, value: timeValue.min * 10, timeType: 'min' },
    { id: 7, wi: TIWidth.s2, value: timeValue.min * 10, timeType: 'min' },
    { id: 8, wi: TIWidth.s1, value: timeValue.min * 10, timeType: 'min' },

    { id: 9, wi: TIWidth.s3, value: timeValue.min * 15, timeType: 'min' },
    { id: 10, wi: TIWidth.s2, value: timeValue.min * 15, timeType: 'min' },
    { id: 11, wi: TIWidth.s1, value: timeValue.min * 15, timeType: 'min' },

    //
    { id: 12, wi: TIWidth.s3, value: timeValue.hour, timeType: 'hour' },
    { id: 13, wi: TIWidth.s2, value: timeValue.hour, timeType: 'hour' },
    { id: 14, wi: TIWidth.s1, value: timeValue.hour, timeType: 'hour' },

    { id: 15, wi: TIWidth.s3, value: timeValue.hour * 4, timeType: 'hour' },
    { id: 16, wi: TIWidth.s2, value: timeValue.hour * 4, timeType: 'hour' },
    { id: 17, wi: TIWidth.s1, value: timeValue.hour * 4, timeType: 'hour' },

    //
    { id: 18, wi: TIWidth.l4, value: timeValue.day, timeType: 'day' },
    { id: 19, wi: TIWidth.l3, value: timeValue.day, timeType: 'day' },
    { id: 20, wi: TIWidth.l2, value: timeValue.day, timeType: 'day' },
    { id: 21, wi: TIWidth.l1, value: timeValue.day, timeType: 'day' },
    { id: 22, wi: TIWidth.m3, value: timeValue.day, timeType: 'day' },
    { id: 23, wi: TIWidth.m2, value: timeValue.day, timeType: 'day' },
    { id: 24, wi: TIWidth.m1, value: timeValue.day, timeType: 'day' },
    { id: 25, wi: TIWidth.s3, value: timeValue.day, timeType: 'day' },
    { id: 26, wi: TIWidth.s2, value: timeValue.day, timeType: 'day' },
    { id: 27, wi: TIWidth.s1, value: timeValue.day, timeType: 'day' },

    { id: 28, wi: TIWidth.l4, value: timeValue.day * 2, timeType: 'day' },
    { id: 29, wi: TIWidth.l3, value: timeValue.day * 2, timeType: 'day' },
    { id: 30, wi: TIWidth.l2, value: timeValue.day * 2, timeType: 'day' },
    { id: 31, wi: TIWidth.l1, value: timeValue.day * 2, timeType: 'day' },
    { id: 32, wi: TIWidth.m3, value: timeValue.day * 2, timeType: 'day' },
    { id: 33, wi: TIWidth.m2, value: timeValue.day * 2, timeType: 'day' },
    { id: 34, wi: TIWidth.m1, value: timeValue.day * 2, timeType: 'day' },
    { id: 35, wi: TIWidth.s3, value: timeValue.day * 2, timeType: 'day' },
    { id: 36, wi: TIWidth.s2, value: timeValue.day * 2, timeType: 'day' },
    { id: 37, wi: TIWidth.s1, value: timeValue.day * 2, timeType: 'day' },

    //
    { id: 38, wi: TIWidth.s3, value: timeValue.month, timeType: 'month' },
    { id: 39, wi: TIWidth.s2, value: timeValue.month, timeType: 'month' },
    { id: 40, wi: TIWidth.s1, value: timeValue.month, timeType: 'month' },

    { id: 41, wi: TIWidth.s3, value: timeValue.month * 3, timeType: 'month' },
    { id: 42, wi: TIWidth.s2, value: timeValue.month * 3, timeType: 'month' },
    { id: 43, wi: TIWidth.s1, value: timeValue.month * 3, timeType: 'month' },

    //
    { id: 44, wi: TIWidth.s3, value: timeValue.year, timeType: 'year' },
    { id: 45, wi: TIWidth.s2, value: timeValue.year, timeType: 'year' },
    { id: 46, wi: TIWidth.s1, value: timeValue.year, timeType: 'year' },

    { id: 47, wi: TIWidth.s3, value: timeValue.year * 5, timeType: 'year' },
    { id: 48, wi: TIWidth.s2, value: timeValue.year * 5, timeType: 'year' },
    { id: 49, wi: TIWidth.s1, value: timeValue.year * 5, timeType: 'year' },

    { id: 50, wi: TIWidth.s3, value: timeValue.year * 10, timeType: 'year' },
    { id: 51, wi: TIWidth.s2, value: timeValue.year * 10, timeType: 'year' },
    { id: 52, wi: TIWidth.s1, value: timeValue.year * 10, timeType: 'year' },

    { id: 53, wi: TIWidth.s3, value: timeValue.year * 50, timeType: 'year' },
    { id: 54, wi: TIWidth.s2, value: timeValue.year * 50, timeType: 'year' },
    { id: 55, wi: TIWidth.s1, value: timeValue.year * 50, timeType: 'year' },

    //
    { id: 56, wi: TIWidth.s3, value: timeValue.century, timeType: 'century' },
    { id: 57, wi: TIWidth.s2, value: timeValue.century, timeType: 'century' },
    { id: 58, wi: TIWidth.s1, value: timeValue.century, timeType: 'century' },

    { id: 59, wi: TIWidth.s3, value: timeValue.century * 5, timeType: 'century' },
    { id: 60, wi: TIWidth.s2, value: timeValue.century * 5, timeType: 'century' },
    { id: 61, wi: TIWidth.s1, value: timeValue.century * 5, timeType: 'century' },
]
