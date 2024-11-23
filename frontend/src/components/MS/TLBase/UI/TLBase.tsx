import React, { useEffect } from "react";
import { _TLL, bilion, cDate, childsAmount, TI, TimeType, totalTI, val } from "../../TLConfigs";
import { styled } from "@mui/styles";
import { parseCDate, toCDate } from "../TLBaseHelpers2";

const ContainerTI = styled('div')({
    borderRight: '1px solid #bfbfbf',
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
let count = 0;



export const TLBase = React.memo((props: { TIid: string, TILid: number, TIDate: cDate, index: number, curLId: number, zoomLv: number }) => {
    const { TIid, TILid, TIDate, index, curLId, zoomLv } = props;
    count++;

    const list = [] as TI[];
    for (let i = 0; i < childsAmount[_TLL[TILid].timeType]; i++) {
        const { y, m, d } = parseCDate(TIDate);
        // console.log('level '+ TILid + ': ',date, y, m, d);
        const newTI = {
            id: 'mileniumList-' + i.toString(),
            TILid: TILid + 1,
            date: (() => {
                if (_TLL[TILid].timeType === '1tby') return toCDate(y + i * val['100by'], 1, 1);
                if (_TLL[TILid].timeType === '100by') return toCDate(y + i * val['10by'], 1, 1);
                if (_TLL[TILid].timeType === '10by') return toCDate(y + i * val['1by'], 1, 1);
                if (_TLL[TILid].timeType === '1by') return toCDate(y + i * val['100my'], 1, 1);
                if (_TLL[TILid].timeType === '100my') return toCDate(y + i * val['10my'], 1, 1);
                if (_TLL[TILid].timeType === '10my') return toCDate(y + i * val['1my'], 1, 1);
                if (_TLL[TILid].timeType === '1my') return toCDate(y + i * val['100ty'], 1, 1);
                if (_TLL[TILid].timeType === '100ty') return toCDate(y + i * val['10ty'], 1, 1);
                if (_TLL[TILid].timeType === '10ty') return toCDate(y + i * val['1ty'], 1, 1);

                if (_TLL[TILid].timeType === '1ty') return toCDate(y + i * 100, 1, 1);
                if (_TLL[TILid].timeType === 'century') return toCDate(y + i * 10, 1, 1);
                if (_TLL[TILid].timeType === 'year') return toCDate(y + i, 1, 1);
                if (_TLL[TILid].timeType === 'month') return toCDate(y, m + i, 1);
                if (_TLL[TILid].timeType === 'day') return toCDate(y, m, d + i);
                return 'xxx'
            })()
        } as TI;

        list.push(newTI);
    }
    if (count < 1000) {
    }



    console.log("TILid === curLId:", TILid , curLId);
    return (
        <ContainerTI
            className="TLBase"
            style={{
                display: 'flex',
                minWidth: TILid === curLId ? 60 * zoomLv * 2 : 'auto',
                // border: TILid === curLId ? '1px solid red' : '',

                // for testing
                // border: `${TILid === 9
                //     ? '10px solid black'
                //     : TILid === 10
                //         ? '8px solid red'
                //         : TILid === 11
                //             ? '6px solid blue'
                //             : TILid === 12
                //                 ? '4px solid green' : '1px solid #bfbfbf'
                //     }`,
            }}>
            {TILid >= curLId
                ?
                <div
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {/* //! 1.content */}
                    <div
                        style={{
                            height: 60
                        }}
                    >
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
                        }}
                    >
                        {(() => {
                            const { y, m, d } = parseCDate(TIDate);
                            // console.log(TI.date, y, m, d)
                            switch (_TLL[curLId].timeType) {
                                case '1tby': return y / bilion + 'tỉ năm';
                                case '100by': return y / bilion + 'tỉ năm';
                                case '10by': return y / bilion + 'tỉ năm';
                                case '1by': return y / bilion + 'tỉ năm';
                                case '100my': return y / bilion + 'triệu năm';
                                case '10my': return '10my:' + y;
                                case '1my': return '1my:' + y;
                                case '100ty': return '100ty:' + y;
                                case '10ty': return '10ty:' + y;

                                case '1ty': return y + 'ty'
                                case 'century': return y + 'c'
                                case 'year': return y + 'y'
                                case 'month': return 'm:' + m;
                                case 'day': return 'd:' + d;
                                default: return '';
                            }
                        })()}
                    </div>
                    {/* //! 3.father time */}
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '5px',
                            height: 30,
                            fontSize: '16px',
                        }}
                    >
                        {index === 0
                            ?
                            (() => {
                                const { y, m, d } = parseCDate(TIDate);
                                switch (_TLL[curLId].timeType) {
                                    case '1tby': return y / bilion + 'tỉ năm';
                                    case '100by': return y / bilion + 'tỉ năm';
                                    case '10by': return y / bilion + 'tỉ năm';
                                    case '1by': return y / bilion + 'tỉ năm';
                                    case '100my': return y / bilion + 'triệu năm';
                                    case '10my':
                                    case '1my':
                                    case '100ty':
                                    case '10ty':

                                    case '1ty':
                                    case 'century':
                                    case 'year': return y;
                                    case 'month': return 'm:' + m;
                                    case 'day': return 'd:' + d;
                                    default: return '';
                                }
                            })()
                            :
                            ''}
                    </div>
                </div>
                :
                list.map((ti, i) => (
                    <TLBase
                        TIid={ti.id} TILid={ti.TILid} TIDate={ti.date} key={i} index={i} curLId={curLId} zoomLv={zoomLv}
                    />
                ))
            }
        </ContainerTI>
    );
})