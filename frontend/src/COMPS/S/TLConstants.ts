import { CevelC, CevelD, Lv, TimeTitle } from "./TLTypes"

export const cevel = {
    hour: "hour",
    day: "day",
    week: "week",
    month: "month",
    year: "year",
    decade: "decade",
    century: "century",
}
export const hper: Record<CevelC, number> = {
    "hou": 1,
    "day": 24,
    "wee": 7*24,
    "mon": 365.25/12*24, // trung bình // TODO: [FIX BUG: lệch time ở level Decade] TIlevel = month nên bị lệch 1 tí, vì kích thước của month là không bằng nhau
    "yea": 365.25*24, // trung bình
    "dec": 365.25*10*24,
    "cen": 365.25*100*24,
}
export const miliperh = 1000*60*60
export const paddingTop$TLBaseFg = 20
export const currentYearcDate = '2024-01-01T00:00:00.000+07:00'
export const lateNight = {
    start: 23,
    end: 6,
}
export const zoomLvMax = 10;



export const sr = {
    // 1
    active: {
        c: 'Act',
        d: 'Active',
    },
    inActive: {
        c: 'InAct',
        d: 'Inactive',
    },

    // 2
    hour: {
        c: 'hou' as CevelC,
        d: 'hour' as CevelD,
    },
    day: {
        c: 'day' as CevelC,
        d: 'day' as CevelD,
    },
    week: {
        c: 'wee' as CevelC,
        d: 'week' as CevelD,
    },
    month: {
        c: 'mon' as CevelC,
        d: 'month' as CevelD,
    },
    year: {
        c: 'yea' as CevelC,
        d: 'year' as CevelD,
    },
    decade: {
        c: 'dec' as CevelC,
        d: 'decade' as CevelD,
    },
    century: {
        c: 'cen' as CevelC,
        d: 'century' as CevelD,
    },
}


export const tt = {
    beforeYesterday: 'Before YesterDay',
    yesterday: 'Yesterday',
    today: 'Today',
    tomorrow: 'Tomorrow',
    afterTomorrow: 'After Tomorrow',

    lastWeek: 'Last Week',
    thisWeek: 'This Week',
    nextWeek: 'Next Week',

    lastMonth: 'Last Month',
    thisMonth: 'This Month',
    nextMonth: 'Next Month',

    lastYear: 'Last Year',
    thisYear: 'This Year',
    nextYear: 'Next Year',

    thisDecade: 'This Decade',
}


export const clvs: Lv[] = [ // đây là array chứa các timelineLevel
    { id: 0, cevelC: sr.century.c, cevelD: sr.century.d, active: true }, 
    { id: 1, cevelC: sr.decade.c,  cevelD: sr.decade.d,  active: true }, 
    { id: 2, cevelC: sr.year.c,    cevelD: sr.year.d,    active: true },
    { id: 3, cevelC: sr.month.c,   cevelD: sr.month.d,   active: true },
    { id: 4, cevelC: sr.week.c,    cevelD: sr.week.d,    active: true },
    { id: 5, cevelC: sr.day.c,     cevelD: sr.day.d,     active: true },
    { id: 6, cevelC: sr.hour.c,    cevelD: sr.hour.d,    active: true },
]
