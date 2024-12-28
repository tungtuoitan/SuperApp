

export type Ev = {
  id: number,
  name: string,
  type: string|null,
  levelC: CevelC,

  timeStart: cDate,
  timeEnd: cDate,
  parentId: number|null,

  activeC: string,
  statusC: string,
  prioriC: string,
  fink: string|null,


  // for orderUI
  lineOrder?: number,

  // these twos are just used for hourEv
  isOverlap: boolean, 
  isLateNight: boolean,
}

export type cDateOption = {id: string, label: string, date: cDate};
export type cDate = `${y}-${m}-${d}T${h}:${p}:00`; // we dont need to specify the timezone, bcz when push cDate to new Date(), it will automatically convert to local timezone WITHOUT CHANGING ANY VALUE
export type y = number
export type m = number
export type d = number
export type h = number
export type p = number


export type TI = { 
    id: string,
    date: cDate,
}

// 
export type curLv = {
    id: number,
    zoomLv: 1|2|3|4|5|6|7|8|9|10,
}
export type Lv = {
    id: number,
    cevelC: CevelC,
    cevelD: CevelD,
    active: boolean,
}

export type SelectField = 'level' | 'parentId'
export type Mark = 'isOverlap' | 'isLateNight'

export type CevelD = 'hour' | 'day' | 'week' | 'month' | 'year' | 'decade' | 'century'
export type CevelC = 'hou' | 'day' | 'wee' | 'mon' | 'yea' | 'dec' | 'cen'
export type EvStatusC = 'Ope' | 'Inp' |'Res'
export type FilterType = 
    'inside-TL' | 'active' | 'parentEv' | 'childEv' | 'hasParent' | 'nonParent' | 
    'hourEv' | 'dayEv' | 'weekEv' | 'monthEv' | 'yearEv' | 'decadeEv' | 'centuryEv' |
    'isOverlap' | 'isLateNight' 

export type TimeTitle =  'Before YesterDay' | 'Yesterday' | 'Today' | 'Tomorrow' | 'After Tomorrow' |
    'Last Week' | 'This Week' | 'Next Week' | 
    'Last Month' | 'This Month' | 'Next Month' |
     'Last Year' | 'This Year' | 'Next Year' | 
     'Last Decade' | 'This Decade' | 'Next Decade' 




export type ResultOptions = {
        success: boolean;
        message?: string;
        reference?: string;
        reference2?: string;
        reference3?: string;
        reference4?: string;
        reference5?: string;
        object?: any;
        status?: number;
}

export type EvsResult = {
    evs: Ev[];
    options: ResultOptions;
}