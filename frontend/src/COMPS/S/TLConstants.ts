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
    { id: 0, Clevel: tl.century, status: 'on' }, 
    { id: 1, Clevel: tl.decade,  status: 'on' }, 
    { id: 2, Clevel: tl.year,    status: 'on' },
    { id: 3, Clevel: tl.month,   status: 'on' },
    { id: 4, Clevel: tl.week,    status: 'on' },
    { id: 5, Clevel: tl.day,     status: 'off' },
    { id: 6, Clevel: tl.hour,    status: 'off' },
]

export const childEvCSS = {
    height: 16,
    background: '#828282',
    pastBackground: '#82828220',
    backgroundDrag: 'red',
    backgroundJobTask: '#000000',
    display: 'flex',
    fontSize: '12px',
}

// export const getCSS$ChildEv = (CLevel: TimeLevel, evLevel: TimeLevel) => {
//     switch (CLevel) {
//         case tl.week: 
//             return childEvCSS.week[evLevel as keyof typeof childEvCSS.week]
//         case tl.month: 
//             return childEvCSS.month[evLevel as keyof typeof childEvCSS.month]
//         case tl.year:
//             return childEvCSS.year[evLevel as keyof typeof childEvCSS.year]
//         case tl.decade:
//             return childEvCSS.decade[evLevel as keyof typeof childEvCSS.decade]
//         case tl.century:
//             return childEvCSS.century[evLevel as keyof typeof childEvCSS.century]
//         default:
//             return childEvCSS.week[evLevel as keyof typeof childEvCSS.week]
//     }
// }



export const beggerEv = {
    
}