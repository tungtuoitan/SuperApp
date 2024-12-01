import { Lv } from "./TLTypes"

export const hper = {
    h: 1,
    d: 24,
    m: 30*24,
    y: 12*30*24,
    c: 100*12*30*24,
}
export const miliperh = 1000*60*60
export const baseWofTI = 30

export const currentYearcDate = '2024-01-01T00:00:00.000+07:00'


export const lvList: Lv[] = [ // đây là array chứa các timelineLevel
    { id: 0, levelName: '100years',      unitName: 'year',  status:  'on', hPerUnit: hper.y }, 
    { id: 1, levelName: 'year',          unitName: 'day',   status:   'on', hPerUnit: hper.d },
    { id: 2, levelName: 'month',         unitName: 'hour',  status:  'on', hPerUnit: hper.h },
]


