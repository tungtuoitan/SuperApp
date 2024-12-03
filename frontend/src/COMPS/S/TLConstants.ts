import { EvLv, Lv } from "./TLTypes"

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
    { id: 0, levelName: '100years',      unitName: 'year',  status:  'on', hPerUnit: hper.y, evLv: 'some10Years' }, 
    { id: 1, levelName: 'year',          unitName: 'day',   status:  'on', hPerUnit: hper.d, evLv: 'someMonths' },
    { id: 2, levelName: 'month',         unitName: 'hour',  status:  'on', hPerUnit: hper.h, evLv: 'someDays' },
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