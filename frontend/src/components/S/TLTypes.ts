
export type Ev = {
  id: number,
  name: string,
  parentId: number | null,
  timeStart: cDate,
  timeEnd: cDate,

  type: string,
  level: number,
  content?: string,

  lineOrder?: number,
}

export type cDateOption = {id: string, label: string, date: cDate};
export type cDate = `${y}-${m}-${d}T${h}:${p}:00.000+07:00`;
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
export type levelName = 'month' | 'year' | '100years'
export type Lv = {
    id: number,
    levelName: levelName,
    unitName: string,
    status: 'on' | 'off',
    hPerUnit: number,
}


