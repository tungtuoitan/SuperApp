import { lvList, TI, inMonthsList } from "../TLConfigs";
import { styled } from "@mui/styles";
import { parseCDate, toCDate } from "./TLBaseHelpers";
import { useTLStore } from "../TLStore";

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


export const TIc = (props: { TI: TI, index: number, level: number, zoomLv: number }) => {
    const { TI, index, level, zoomLv } = props;

    return (
        <ContainerTI
            className="TIc"
            style={{
                display: 'flex',
                width: 60 * zoomLv,
                color: '#202020 !important',

                borderLeft: (() => {
                        const { y, m, d, h } = parseCDate(TI.date);
                        if ((lvList[level].levelName === '1000years' && y % 100 === 0) || 
                            (lvList[level].levelName === 'year' && d === 1)) return '1px solid #00000050'
                        return '1px solid transparent'
                    })()
            }}>
            {
                <div
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {/* //! 1.content */}
                    <div style={{
                        borderLeft: '1px solid #bfbfbf50',
                    }}>
                        <div style={{height: 60}}>
                            {/* content */}
                        </div>
                        {/* //! 2.time */}
                        <div
                            style={{
                                borderTop: '1px solid #bfbfbf',
                                width: '100%',
                                textAlign: 'left',
                                padding: '5px',
                                height: 30,
                                color: '#202020',
                            }}
                        >
                            {(() => {
                                const { y, m, d, h } = parseCDate(TI.date);
                                switch (lvList[level].unitName) {
                                    case 'year': return y
                                    case 'month': return m;
                                    case 'day': return d;
                                    case 'hour': return h > 12 ? (h - 12) + 'pm' : h + 'am';
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
                                const { y, m, d, h } = parseCDate(TI.date);
                                let text = ''
                                if (lvList[level].levelName === '1000years' && y % 100 === 0) text = y.toString()
                                // if (lvList[level].levelName === 'century' && y % 10 === 0) return y
                                if (lvList[level].levelName === 'year' && d === 1) text = y + '.' + inMonthsList[m - 1].label
                                // if (lvList[level].levelName === 'month' && d === 1) {
                                //     return y + inMonthsList[m - 1]?.label
                                // }

                                if(text.length < 10) {
                                    return <span>{text}</span>
                                } else {
                                    return <span style={{fontSize: 11}}>{text}</span>
                                }
                                
                            })()
                        }
                    </div>
                </div>
            }
        </ContainerTI>
    );
}