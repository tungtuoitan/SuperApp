
export type Ev = {
  id: number,
  name: string,
  parentId: number | null,
  timeStart: cDate,
  timeEnd: cDate,

  status: 0 | 1
  type?: string,
  level: TimeLevel,

  lineOrder?: number,
}

export type cDateOption = {id: string, label: string, date: cDate};
export type cDate = `${y}-${m}-${d}T${h}:${p}:00.000`; // we dont need to specify the timezone, bcz when push cDate to new Date(), it will automatically convert to local timezone WITHOUT CHANGING ANY VALUE
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
    cevel: TimeLevel,
    isActive: boolean,
}

export type SelectField = 'level' | 'parentId'

export type TimeLevel = 'hour' | 'day' | 'week' | 'month' | 'year' | 'decade' | 'century'
export type FilterType = 'inside-TL' | 'active' | 'parentEv' | 'childEv' | 'hasParent' | 'nonParent'

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