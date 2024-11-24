// export const bilion = 1000000000
// export const milion = 1000000
// export const miliPer = {
//     sec: 1000,
//     min: 60000,
//     hou: 3600000,
//     day: 86400000,
// }
// export const val = {
//     // '1tby':  1000*bilion,
//     // '100by': 100*bilion,
//     // '10by':  10*bilion,
     
//     // '1by':   bilion,
//     // '100my': 100*milion,
//     // '10my':  10*milion,
//     // '1my':   milion,
//     // '100ty': 100000,
//     // '10ty':  10000,
//     '1ty':   1000,
//     century: 100,
//     year:    1,
// }

// export const childsAmount = {
//     // '1tby': 10,
//     // '100by': 10,
//     // '10by': 10,
//     // '1by': 10,
//     // '100my': 10,
//     // '10my': 10,
//     // '1my': 10,
//     // '100ty': 10,
//     // '10ty': 10,
//     in1000YearsVal: 10,
//     century: 10,
//     year: 12,
//     month: 30,
//     day: 24,
//     hour: 60,
//     min: 60,
// }
// export const maxWs = {
//     min: 300,
//     hour: 300,
//     day: 300,
//     month: 300,
//     year: 300,
//     century: 300,
// }

// export const bigLevelOptions: BigLevelOption[] = [ 
//     {label: 'day', id: 'day', unitName: 'min'}, 
//     {label: 'month', id: 'month', unitName: 'hour'}, 
//     {label: 'year', id: 'year', unitName: 'date'}, 
//     {label: 'century', id: 'century', unitName: 'month'}, 
//     {label: 'in1000YearsVal', id: 'in1000YearsVal', unitName: 'year'}
// ]

export type cDate = `${y}/${m}/${d}/${h}`
export type y = number
export type m = number
export type d = number
export type h = number

export type curLv = {
    id: number,
    zoomLv: 1|2|3|4|5|6|7|8|9|10,
}
export type Lv = {
    id: number,
    levelName: levelName,
    unitName: string,
    status: 'on' | 'off',
}

export type TI = { // mỗi TI là 1 Date + levelName
    id: string,
    // lvID: number,
    date: cDate,
}

export type BigLevelOption = {label: string, id: string, unitName: string}

export type levelName = 'hour' | 'day' | 'month' | 'year' | 'century' | '1000years'

export const lvList: Lv[] = [ // đây là array chứa các timelineLevel
    { id: 0, levelName: '1000years',     unitName: 'year', status: 'on' }, 
    { id: 1, levelName: 'century',       unitName: 'month', status: 'off' }, 
    { id: 2, levelName: 'year',          unitName: 'day', status: 'on' },
    { id: 3, levelName: 'month',         unitName: 'hour', status: 'off' },
    { id: 4, levelName: 'day',           unitName: 'min', status: 'off' },
]

export type cDateOption = {id: string, label: string, date: cDate};
export const in1000YearsList = [
        {label: '-10000 -> -9000' ,id: 'in1000YearsVal-0', date: '-10000/1/1/1' as cDate} as cDateOption,
        {label: '-9000 -> -8000', id: 'in1000YearsVal-1', date: '-9000/1/1/1' as cDate}, 
        {label: '-8000 -> -7000', id: 'in1000YearsVal-2', date: '-8000/1/1/1' as cDate},
        {label: '-7000 -> -6000', id: 'in1000YearsVal-3', date: '-7000/1/1/1' as cDate},
        {label: '-6000 -> -5000', id: 'in1000YearsVal-4', date: '-6000/1/1/1' as cDate},
        {label: '-5000 -> -4000', id: 'in1000YearsVal-5', date: '-5000/1/1/1' as cDate},
        {label: '-4000 -> -3000', id: 'in1000YearsVal-6', date: '-4000/1/1/1' as cDate},
        {label: '-3000 -> -2000', id: 'in1000YearsVal-7', date: '-3000/1/1/1' as cDate},
        {label: '-2000 -> -1000', id: 'in1000YearsVal-8', date: '-2000/1/1/1' as cDate},
        {label: '-1000 -> 0',     id: 'in1000YearsVal-9', date: '-1000/1/1/1' as cDate},
        {label: '0 -> 1000',      id: 'in1000YearsVal-10', date: '0/1/1/1'    as cDate},
        {label: '1000 -> 2000',   id: 'in1000YearsVal-11', date: '1000/1/1/1' as cDate},
        {label: '2000 -> 3000',   id: 'in1000YearsVal-12', date: '2000/1/1/1' as cDate},
]

export const inMonthsList = [
    {label: 'January', id: 'inMonth-0',  date: '0/1/1/0' as cDate} as cDateOption,
    {label: 'February', id: 'inMonth-1', date: '0/2/1/0' as cDate},
    {label: 'March', id: 'inMonth-2',    date: '0/3/1/0' as cDate},
    {label: 'April', id: 'inMonth-3',    date: '0/4/1/0' as cDate},
    {label: 'May', id: 'inMonth-4',      date: '0/5/1/0' as cDate},
    {label: 'June', id: 'inMonth-5',     date: '0/6/1/0' as cDate},
    {label: 'July', id: 'inMonth-6',     date: '0/7/1/0' as cDate},
    {label: 'August', id: 'inMonth-7',   date: '0/8/1/0' as cDate},
    {label: 'September', id: 'inMonth-8', date: '0/9/1/0' as cDate},
    {label: 'October', id: 'inMonth-9',  date: '0/10/1/0' as cDate},
    {label: 'November', id: 'inMonth-10', date: '0/11/1/0' as cDate},
    {label: 'December', id: 'inMonth-11', date: '0/12/1/0' as cDate}
]