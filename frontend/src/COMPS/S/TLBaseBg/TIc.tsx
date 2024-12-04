import { clvs, baseWofTI } from "../TLConstants";
import { styled } from "@mui/styles";
import { parseCDate, numbToCDate, getMonthShortName } from "./TLBaseBgHelpers";
import { cDate } from "../TLTypes";

const ContainerTI = styled('div')({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    fontSize: '12px',
    color: '#bfbfbf',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
})

type TIcProps = {
    date: cDate;
    level: number;
    zoomLv: number;
    index: number;
}
// TIc: TI component
export const TIc = (props: TIcProps) => { // TODO: item này re-render rất nhiều, sau 
    const { date, level, zoomLv, index } = props;

    return (
        <ContainerTI
            className="TIc"
            style={{
                display: 'flex',
                width: baseWofTI * zoomLv,
                color: '#202020 !important',
                // border: '1px solid red',
            }}>
            {
                <div id='columnContainer' style={{ width: '100%', height: '100%' }}>
                    {/* //! 1. content */}
                    <div id='contentDiv'
                        style={{ 
                            height: 'calc(100% - 60px)',  // 60px is height of timeDiv
                            borderLeft: (() => {
                                    const { y, m, d, h, p } = parseCDate(date);
                                    if ((clvs[level].level === '100years' && y % 10 === 0)  ||
                                        (clvs[level].level === 'year'     && d === 1)       ||
                                        (clvs[level].level === 'month'    && h === 0 && index !== 0)) return '1px solid #00000050'
                                    return '1px solid #bfbfbf50'
                                })()
                            }}>
                        <div id='content-relative' 
                            style={{ 
                                height: '100%',  
                                position: 'relative' }}/>
                    </div>
                    {/* //* 2. time */}
                    <div id='timeDiv'
                        style={{
                            borderLeft: (() => {
                                const { y, m, d, h, p } = parseCDate(date);
                                if ((clvs[level].level === '100years' && y % 10 === 0)  ||
                                    (clvs[level].level === 'year' && d === 1)           ||
                                    (clvs[level].level === 'month' && h === 0 && index !== 0)) return '1px solid #00000050'
                                return '1px solid transparent'
                            })()
                        }}
                    >
                        <div
                            id='childTime'
                            style={{
                                borderTop: '1px solid #bfbfbf',
                                width: '100%',
                                textAlign: 'left',
                                padding: '5px',
                                height: 30,
                                color: '#202020',
                            }}>
                            {(() => {
                                const { y, m, d, h, p } = parseCDate(date);
                                switch (clvs[level].TILevel) {
                                    case 'year': return y
                                    case 'month': return getMonthShortName(m);
                                    case 'day': return d;
                                    case 'hour': return h > 11
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
                                padding: '5px',
                                height: 30,
                                fontSize: '16px',
                                color: '#202020',
                            }}
                        >
                            {
                                (() => {
                                    const { y, m, d, h } = parseCDate(date);
                                    let text = ''
                                    if (clvs[level].level === '100years' && y % 10 === 0) text = y.toString()
                                    if (clvs[level].level === 'year') {
                                        if (d === 1 && m === 1) text = y.toString() + ' ' + getMonthShortName(m)
                                        if (d === 1 && m !== 1) text = getMonthShortName(m)
                                    }
                                    if (clvs[level].level === 'month') {
                                        if (d === 1 && h === 0) text = getMonthShortName(m) + ' ' + d.toString()
                                        if (d !== 1 && h === 0) text = d.toString()
                                    }

                                    // if (text.length < 7) {
                                    //     return <span>{text}</span>
                                    // } else {
                                    return <span style={{ fontSize: 11 }}>{text}</span>
                                    // }

                                })()
                            }
                        </div>
                    </div>
                </div>
            }
        </ContainerTI>
    );
}