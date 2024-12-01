import { cDate } from "./TLConfigs";


export type Ev = {
  id: string,
  name: string,
  type: string,
  level: number,
  shortDesc?: string,
  linkMainPage?: string,
  content?: string,
  lineOrder?: number,
  parentId: string,

  timeStart: cDate,
  timeEnd: cDate,
}

