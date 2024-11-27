// export const bilion = 1000000000
// export const milion = 1000000
export const hper = {
    h: 1,
    d: 24,
    m: 30*24,
    y: 12*30*24,
    c: 100*12*30*24,
}
export const miliperh = 1000*60*60
export const baseWofTI = 30

// export const maxWs = {
//     min: 300,
//     hour: 300,
//     day: 300,
//     month: 300,
//     year: 300,
//     century: 300,
// }

export type cDate = `${y}-${m}-${d}T${h}:${p}:00.000+07:00`;
export type y = number
export type m = number
export type d = number
export type h = number
export type p = number

export type curLv = {
    id: number,
    zoomLv: 1|2|3|4|5|6|7|8|9|10,
}
export type Lv = {
    id: number,
    levelName: levelName,
    unitName: string,
    status: 'on' | 'off',
    hPerUnit: number,
}

export type TI = { 
    id: string,
    date: cDate,
}

export type levelName = 'month' | 'year' | '100years'

export const lvList: Lv[] = [ // đây là array chứa các timelineLevel
    { id: 0, levelName: '100years',      unitName: 'year',  status:  'on', hPerUnit: hper.y }, 
    { id: 1, levelName: 'year',          unitName: 'day',   status:   'on', hPerUnit: hper.d },
    { id: 2, levelName: 'month',         unitName: 'hour',  status:  'on', hPerUnit: hper.h },
]

export type cDateOption = {id: string, label: string, date: cDate};

export const getMonthShortName = (month: number) => {
    switch (month) {
        case 1: return 'Jan'
        case 2: return 'Feb'
        case 3: return 'Mar'
        case 4: return 'Apr'
        case 5: return 'May'
        case 6: return 'Jun'
        case 7: return 'Jul'
        case 8: return 'Aug'
        case 9: return 'Sep'
        case 10: return 'Oct'
        case 11: return 'Nov'
        case 12: return 'Dec'
        default: return ''
    }
}

export const getMonthFullName = (month: number) => {
    switch (month) {
        case 1: return 'January'
        case 2: return 'February'
        case 3: return 'March'
        case 4: return 'April'
        case 5: return 'May'
        case 6: return 'June'
        case 7: return 'July'
        case 8: return 'August'
        case 9: return 'September'
        case 10: return 'October'
        case 11: return 'November'
        case 12: return 'December'
        default: return ''
    }
}
