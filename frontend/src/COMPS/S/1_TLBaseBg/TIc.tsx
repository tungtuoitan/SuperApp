import { styled } from "@mui/styles";
import { parseCDate, getMonthShortName, getDAYOfWeek } from "../3_TimeConfig/TimeHelpers";
import { cDate, CevelC, CevelD } from "../TLTypes";
import { sr } from "../TLConstants";
import { _1css } from "./1css";
import { isWeekend } from "date-fns";

const WContainerTI = styled('div')({
    display: 'flex',
    color: _1css.TI.co,
    overflow: 'visible',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    fontSize: _1css.TI.fs,
    textAlign: 'center',
    position: 'relative',
})

type TIcProps = {
    date: cDate;
    TILevel: CevelC;
    width: number;
    index: number;
}
const getTIBg = (TILevel: CevelC, date: cDate) => {
    const lightPink = 'rgb(231, 226, 224)'
    const mediumPink = 'rgb(230, 215, 212)'
    const lightGray = '#00000005'
    const mediumGray = '#00000010'
    const transparent = 'transparent'

    const { y, m, d, h, p } = parseCDate(date);
    
    switch (TILevel) {
        case sr.hour.c:
            if(h > 22 || h < 5) { // night
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
}
const getBorderLeft = (TILevel: CevelC, date: cDate, index: number, defaultBorderLeft: string = '1px solid #bfbfbf50') => {
    const { y, m, d, h, p } = parseCDate(date);
    if (index === 0) return ''
    if (TILevel === sr.year.c && y % 10 === 0 ||
        TILevel === sr.month.c && m === 1 ||
        TILevel === sr.week.c && d === 1 ||
        TILevel === sr.day.c && d === 1 ||
        TILevel === sr.day.c && new Date(date).getDay() === 1 ||  // ~ Monday
        TILevel === sr.hour.c && h === 0) return '1px solid #00000050'
    return defaultBorderLeft
}
const WColumnContainer = styled('div')({
    width: '100%',
    height: '100%',
})

// TIc: TI component
export const TIc = (props: TIcProps) => { // TODO: item này re-render rất nhiều, sau 
    const { date, width, index, TILevel } = props;
    const { y, m, d, h, p } = parseCDate(date);


    return (
        <WContainerTI
            className="TIc"
            style={{
                width: width,
            }}>
            {
                <WColumnContainer id='columnContainer'>
                    {/* //! 1. content */}
                    <div id='contentDiv'
                        style={{
                            background: getTIBg(TILevel, date),
                            height: 'calc(100% - 60px)',  // 60px is height of timeDiv
                            borderLeft: getBorderLeft(TILevel, date, index),
                        }}>
                        <div id='content-relative'
                            style={{
                                height: '100%',
                                position: 'relative'
                            }} />
                    </div>
                    {/* //* 2. time */}
                    <div id='timeDiv'
                        style={{
                            borderLeft: getBorderLeft(TILevel, date, index, '1px solid transparent'),
                        }}
                    >
                        <div
                            id='childTime'
                            style={{
                                borderTop: '1px solid #bfbfbf',
                                width: '100%',
                                textAlign: 'left',
                                paddingLeft: '5px',
                                height: 30,
                                color: '#202020',
                            }}>
                            {(() => {
                                if (width < 18) return ''
                                switch (TILevel) {
                                    case sr.year.c: return y
                                    case sr.month.c: return getMonthShortName(m)
                                    case sr.week.c:
                                    case sr.day.c:
                                        return d;
                                    case sr.hour.c:
                                        return h > 11
                                            ? <span>{h - 12}"</span>
                                            : <span>{h}"</span>
                                    default: return '';
                                }
                            })()}
                        </div>
                        <div
                            id='fatherTime'
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                paddingLeft: '3px',
                                height: 30,
                                fontSize: '16px',
                                color: '#202020',
                                position: 'relative',
                            }}
                        >
                            {
                                (() => {
                                    let text = ''
                                    if (TILevel === sr.year.c) {
                                        if (y % 10 === 0) text = y.toString()
                                    }
                                    if (TILevel === sr.month.c) {
                                        if (m === 1) text = y.toString()
                                    }
                                    else if (TILevel === sr.week.c || TILevel === sr.day.c) {
                                        if (d === 1) text = getMonthShortName(m)
                                        if (new Date(date).getDay() === 1 && width > 18) text = 'M'
                                        
                                    }
                                    else if (TILevel === sr.hour.c) {
                                        if (h === 0) text = d + '.' + getDAYOfWeek(new Date(y, m - 1, d, h, 0, 0))
                                    }

                                    return <span style={{ fontSize: 11, position: 'absolute', zIndex: 10 }}>{text}</span>
                                })()
                            }
                        </div>
                    </div>
                </WColumnContainer>
            }
        </WContainerTI>
    );
}