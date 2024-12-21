import {isWeekend} from "date-fns"
import {parseCDate} from "../3_TimeConfig/TimeHelpers"
import {cDate, CevelC} from "../TLTypes"
import {lateNight, sr} from "../TLConstants"


export const _1helpers = {
    getTIBg: (TILevel: CevelC, date: cDate) => {
        const lightPink = 'rgb(231, 226, 224)'
        const mediumPink = 'rgb(230, 215, 212)'
        const lightGray = '#00000005'
        const mediumGray = '#00000010'
        const transparent = 'transparent'
    
        const { y, m, d, h, p } = parseCDate(date);
        
        switch (TILevel) {
            case sr.hour.c:
                if(h >= lateNight.start || h < lateNight.end) { // night
                    return isWeekend(date) ? mediumPink : mediumGray
                } else { // day
                    return isWeekend(date) ? lightPink : transparent
                }
            case sr.day.c:
                    return isWeekend(date) 
                    ? `linear-gradient(to right, ${mediumPink} 0%, ${mediumPink} 20.83%, rgb(231, 226, 224) 20.83%, rgb(231, 226, 224) 95.83%, ${mediumPink} 95.83%)`
                    : `linear-gradient(to right, ${lightGray} 0%, ${lightGray} 20.83%, ${transparent} 20.83%, ${transparent} 95.83%, ${lightGray} 95.83%)`
            default: 
                return transparent
        }
    },
    getBorderLeft: (TILevel: CevelC, date: cDate, index: number, defaultBorderLeft: string = '1px solid #bfbfbf50') => {
        const { y, m, d, h, p } = parseCDate(date);
        if (index === 0) return ''
        if (TILevel === sr.year.c && y % 10 === 0 ||
            TILevel === sr.month.c && m === 1 ||
            TILevel === sr.week.c && d === 1 ||
            TILevel === sr.day.c && d === 1 ||
            TILevel === sr.day.c && new Date(date).getDay() === 1 ||  // ~ Monday
            TILevel === sr.hour.c && h === 0) return '1px solid #00000050'
        return defaultBorderLeft
    },
}
