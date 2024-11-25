import { cDate } from "./TLConfigs";


export type Ev = {
  id: string,
  name: string,
  type: string,
  level: number,
  shortDesc?: string,
  linkMainPage?: string,
  content?: string,
//   width: number,

  timeStart: Date | number | cDate,
  timeEnd?: Date | number | cDate,
}

