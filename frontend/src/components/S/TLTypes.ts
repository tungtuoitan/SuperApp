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
//   width: number,

  timeStart: cDate,
  timeEnd: cDate,
}

