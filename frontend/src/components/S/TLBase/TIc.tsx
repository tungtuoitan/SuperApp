import { lvList, TI, cDate, getMonthShortName, baseWofTI } from "../TLConfigs";
import { styled } from "@mui/styles";
import { parseCDate, toCDate } from "./TLBaseHelpers";
import { useTLBaseFgStore } from "../TLBaseFg/TLBaseFgStore";
import { get } from "http";
import { Evc } from "../TLBaseFg/Evc";
import { Ev } from "../TLTypes";

const ContainerTI = styled('div')({
    // borderRight: '1px solid #bfbfbf',
    // width: '100%',
    height: '100%',
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    fontSize: '12px',
    color: '#bfbfbf',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
})

// TIc: TI component
export const TIc = (props: {date: cDate, index: number, level: number, zoomLv: number, evs?: Ev[]|null }) => { // TODO: item này re-render rất nhiều, sau 
    const { date, index, level, zoomLv, evs } = props;

    return (
        <ContainerTI
            className="TIc"
            style={{
                display: 'flex',
                width: baseWofTI * zoomLv,
                color: '#202020 !important',

                borderLeft: (() => {
                    const { y, m, d, h } = parseCDate(date);
                    if ((lvList[level].levelName === '100years' && y % 100 === 0) ||
                        (lvList[level].levelName === 'year' && d === 1)) return '1px solid #00000050'
                    return '1px solid transparent'
                })()
            }}>
            {
                <div style={{width: '100%',height: '100%'}}>
                    <div style={{borderLeft: '1px solid #bfbfbf50'}}>
                        {/* //! 1.content */}   
                        <div style={{ height: 60, position: 'relative' }}></div>
                        {/* //! 2.time */}
                        <div
                            style={{
                                borderTop: '1px solid #bfbfbf',
                                width: '100%',
                                textAlign: 'left',
                                padding: '5px',
                                height: 30,
                                color: '#202020',
                            }}>
                            {(() => {
                                const { y, m, d, h } = parseCDate(date);
                                switch (lvList[level].unitName) {
                                    case 'year': return y
                                    case 'month': return getMonthShortName(m);
                                    case 'day': return d;
                                    case 'hour': return h > 12 ? <span>{h-12}</span> : <span >{h}</span>;
                                    default: return '';
                                }
                            })()}
                        </div>
                    </div>
                    {/* //! 3.father time */}
                    <div
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
                                if (lvList[level].levelName === '100years' && y % 10 === 0) text = y.toString()
                                if (lvList[level].levelName === 'year') {
                                    if(d === 1 && m === 1) text = y.toString() + ' ' + getMonthShortName(m)
                                    if(d === 1 && m !== 1) text = getMonthShortName(m)
                                }
                                if (lvList[level].levelName === 'month') {
                                    if(d === 1 && h === 1) text = getMonthShortName(m) + ' ' + d.toString()
                                    if(d !== 1 && h === 1) text = d.toString()}
                              

                                // if (text.length < 7) {
                                //     return <span>{text}</span>
                                // } else {
                                    return <span style={{ fontSize: 11 }}>{text}</span>
                                // }

                            })()
                        }
                    </div>
                </div>
            }
        </ContainerTI>
    );
}