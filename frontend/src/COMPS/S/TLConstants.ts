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
    "month": 365.25/12*24, // trung bình
    "year": 365.25*24, // trung bình
    "decade": 365.25*10*24,
    "century": 365.25*100*24,
}
export const miliperh = 1000*60*60
export const paddingTop$TLBaseFg = 20
export const currentYearcDate = '2024-01-01T00:00:00.000+07:00'


export const clvs: Lv[] = [ // đây là array chứa các timelineLevel
    { id: 0, Clevel: 'century', status: 'on' }, 
    { id: 1, Clevel: 'decade',  status: 'on' }, 
    { id: 2, Clevel: 'year',    status: 'on' },
    { id: 3, Clevel: 'month',   status: 'on' },
    { id: 4, Clevel: 'week',    status: 'on' },
    { id: 5, Clevel: 'day',     status: 'off' },
    { id: 6, Clevel: 'hour',    status: 'off' },
]

export const childEvCSS = {
    week: {
        hour: {
            height: 6,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '10px',
        },
        day: {
            height: 20,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        week: {
            height: 40,
            background: '#00000010',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        month: {
            height: 80,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        year: {
            height: 160,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        decade: {
            height: 320,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        century: {
            height: 640,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        }
    },
    month: {
        hour: {
            height: 6,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '10px',
        },
        day: {
            height: 20,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        week: {
            height: 40,
            background: '#00000010',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
    },
    year: {
        hour: {
            height: 6,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '10px',
        },
        day: {
            height: 20,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        week: {
            height: 40,
            background: '#00000010',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        month: {
            height: 80,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        year: {
            height: 160,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        decade: {
            height: 320,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        century: {
            height: 640,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        }
    },
    decade: {
        hour: {
            height: 6,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '10px',
        },
        day: {
            height: 20,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        week: {
            height: 40,
            background: '#00000010',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        month: {
            height: 80,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        year: {
            height: 160,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        decade: {
            height: 320,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        century: {
            height: 640,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        }
    },
    century: {
        hour: {
            height: 6,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '10px',
        },
        day: {
            height: 20,
            background: 'black',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        week: {
            height: 40,
            background: '#00000010',
            backgroundDrag: 'red',
            display: 'flex',
            fontSize: '16px',
        },
        month: {
            height: 80,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        year: {
            height: 160,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        decade: {
            height: 320,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        },
        century: {
            height: 640,
            background: '#00000050',
            backgroundDrag: 'red',
            display: 'none',
            fontSize: '16px',
        }
    },
}

export const getCSS$ChildEv = (CLevel: TimeLevel, type: TimeLevel) => {
    switch (CLevel) {
        case 'week': 
            return childEvCSS.week[type as keyof typeof childEvCSS.week]
        case 'month': 
            return childEvCSS.month[type as keyof typeof childEvCSS.month]
        case 'year':
            return childEvCSS.year[type as keyof typeof childEvCSS.year]
        case 'decade':
            return childEvCSS.decade[type as keyof typeof childEvCSS.decade]
        case 'century':
            return childEvCSS.century[type as keyof typeof childEvCSS.century]
        default:
            return childEvCSS.week[type as keyof typeof childEvCSS.week]
    }
}



export const uncleEvConstant = {
    id: 999,
    name: 'Uncle',
    type: 'uncle',
    parentId: 0,
    level: 'week',
}