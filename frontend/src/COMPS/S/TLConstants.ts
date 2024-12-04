import { EvLv, Lv } from "./TLTypes"

export const hper = {
    'hour': 1,
    'day': 24,
    'week': 7*24,
    'month': 30*24, // tạm thời làm tròn 1 tháng = 30 ngày
    'year': 360*24,
    '10years': 3600*24,
    '100years': 36000*24,
}
export const miliperh = 1000*60*60
export const baseWofTI = 30

export const currentYearcDate = '2024-01-01T00:00:00.000+07:00'


export const clvs: Lv[] = [ // đây là array chứa các timelineLevel
    { id: 0, level: '100years', TILevel: 'year', evLevel: 'some10Years', status: 'on' }, 
    { id: 1, level: 'year',     TILevel: 'day',  evLevel: 'someMonths',  status: 'on' },
    { id: 2, level: 'month',    TILevel: 'hour', evLevel: 'someDays',    status: 'on' },
]


export const EvLvList: EvLv[] = ['someHours', 'someDays', 'someWeeks', 'someMonths', 'someYears', 'some10Years']


export const evCssBy = {
    month: {
            someHours: {
                height: 6,
                background: 'black',
                backgroundDrag: 'red',
                display: 'flex',
                fontSize: '10px',
            },
            someDays: {
                height: 20,
                background: 'black',
                backgroundDrag: 'red',
                display: 'flex',
                fontSize: '16px',
            },
            someWeeks: {
                height: 40,
                background: '#00000010',
                backgroundDrag: 'red',
                display: 'flex',
                fontSize: '16px',
            },
            someMonths: {
                height: 80,
                background: '#00000050',
                backgroundDrag: 'red',
                display: 'none',
                fontSize: '16px',
            },
            someYears: {
                height: 160,
                background: '#00000050',
                backgroundDrag: 'red',
                display: 'none',
                fontSize: '16px',
            },
            some10Years: {
                height: 320,
                background: '#00000050',
                backgroundDrag: 'red',
                display: 'none',
                fontSize: '16px',
            }
        },

    }



export const uncleEvConstant = {
    id: 999,
    name: 'Uncle',
    type: 'uncle',
    parentId: 0,
    level: 'someWeeks',
}