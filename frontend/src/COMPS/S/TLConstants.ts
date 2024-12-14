import { IAutoCompleteOptions } from "../Helpers/GenericAutoComplete"
import { TimeLevel, Lv } from "./TLTypes"

export const tl: {[key: string]: TimeLevel} = {
    hour: "hour",
    day: "day",
    week: "week",
    month: "month",
    year: "year",
    decade: "decade",
    century: "century",
}
export const hper = {
    "hour": 1,
    "day": 24,
    "week": 7*24,
    "month": 365.25/12*24, // trung bình // TODO: [FIX BUG: lệch time ở level Decade] TIlevel = month nên bị lệch 1 tí, vì kích thước của month là không bằng nhau
    "year": 365.25*24, // trung bình
    "decade": 365.25*10*24,
    "century": 365.25*100*24,
}
export const miliperh = 1000*60*60
export const paddingTop$TLBaseFg = 20
export const currentYearcDate = '2024-01-01T00:00:00.000+07:00'


export const clvs: Lv[] = [ // đây là array chứa các timelineLevel
    { id: 0, cevel: tl.century, isActive: true }, 
    { id: 1, cevel: tl.decade,  isActive: true }, 
    { id: 2, cevel: tl.year,    isActive: true },
    { id: 3, cevel: tl.month,   isActive: true },
    { id: 4, cevel: tl.week,    isActive: true },
    { id: 5, cevel: tl.day,     isActive: false },
    { id: 6, cevel: tl.hour,    isActive: false },
]

export const levelOptions: IAutoCompleteOptions[] = [ 
    { id: 0, label: tl.century, isActive: true }, 
    { id: 1, label: tl.decade,  isActive: true }, 
    { id: 2, label: tl.year,    isActive: true },
    { id: 3, label: tl.month,   isActive: true },
    { id: 4, label: tl.week,    isActive: true },
    { id: 5, label: tl.day,     isActive: true },
    { id: 6, label: tl.hour,    isActive: true },
]