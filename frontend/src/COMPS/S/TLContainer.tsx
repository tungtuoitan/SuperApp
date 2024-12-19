
import { useTLBaseFgStore } from './2_TLBaseFg/TLBaseFgStore'
import { TimeConfigBar } from './3_TimeConfig/TimeConfigBar'
import DNDContainer from './DNDContainer'
import { KeyboardEvent } from 'react';
import { iuEv } from './TLAPIs';
import { useSnackbar } from 'notistack';
import { EvsResult } from './TLTypes';
import { EvStore } from './4_Ev/EvStore';
import { useTLBaseFgHelpers } from './2_TLBaseFg/TLBaseFgHelpers';
import { addTime, cDateToUTCDate, useTimeHelpers } from './3_TimeConfig/TimeHelpers';
import { useTLBaseBgHelpers } from './1_TLBaseBg/TLBaseBgHelpers';
import { useTLBaseBgStore } from './1_TLBaseBg/TLBaseBgStore';
import { sr } from './TLConstants';

export default function TLContainer() {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { keyboardState, setKeyboardState } = useTLBaseBgStore();
    const { fevId, setFevId, cutEvId, setCutEvId, focusTFId, setFocusTFId } = EvStore();
    const { enqueueSnackbar } = useSnackbar();
    const { filterEvs, markEvs } = useTLBaseFgHelpers();
    const { RpxToRh } = useTLBaseBgHelpers();
    const { TIList } = useTLBaseBgStore();
    const { changeLevel, changeTimeStart } = useTimeHelpers();

  return (
        <div id ='TLContainer' // this is the biggest container if TL
            onClick={() => {
                if (fevId) {
                    setFevId(null);
                    setFocusTFId(null)
                }
            }}
            tabIndex={0} // to enable onKeyDown
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => { 
                if(e.ctrlKey)
                    setKeyboardState({...keyboardState, ctrl: true})
                if(e.shiftKey)
                    setKeyboardState({...keyboardState, shift: true})
                if(e.altKey)
                    setKeyboardState({...keyboardState, alt: true})
                if(e.key === 'ArrowUp') 
                    changeLevel('down')
                if(e.key === 'ArrowDown')
                    changeLevel('up')
                if(e.key === 'ArrowLeft')
                    changeTimeStart('prev')
                if(e.key === 'ArrowRight')
                    changeTimeStart('next');

                if(focusTFId) return;
                if (fevId) {
                    switch (e.key) {          
                        case 'Escape':
                            setFevId(null);
                            break;
                        case 'Delete':
                            if (fevId) {
                               // delete
                                const newAllEvs = [...allEvs]
                                const fEv = newAllEvs.filter(ev => ev.id === fevId)[0];
                                fEv.activeC = sr.active.inActive.c;
                                setAllEvs(markEvs(newAllEvs))
                                iuEv(fEv)
                                .then((data: EvsResult) => {
                                    if(data.options.success) {
                                        enqueueSnackbar(data.options.message, { variant: "success", autoHideDuration: 3000 });
                                    } else {
                                        enqueueSnackbar(data.options.message, { variant: "error", autoHideDuration: 3000 });
                                    }
                               })
                           }
                           break;
                        case 'x': 
                        case 'X': 
                            if(e.ctrlKey) {
                                if (fevId && filterEvs(['childEv']).filter(ev => ev.id === fevId).length > 0) {
                                    // cut
                                    setCutEvId(fevId);

                                }
                            }
                            break;
                        case 'v':
                        case 'V':
                            if(e.ctrlKey) {
                                const newAllEvs = [...allEvs]
                                const cutEv = newAllEvs.filter(ev => ev.id === cutEvId)[0];
                                // if fevId is parentEv, go on
                                if(fevId && filterEvs(['parentEv']).filter(ev => ev.id === fevId).length > 0) {
                                    // paste
                                    if(cutEvId) {
                                        const fEv = newAllEvs.filter(ev => ev.id === fevId)[0];
                                        cutEv.parentId = fevId;
                                        cutEv.timeStart = fEv.timeStart;
                                        cutEv.timeEnd = addTime(fEv.timeStart, 0, 0, 0, RpxToRh(250), 0)
                                    }
                                }
                                // if fevId is BeggerGang
                                else if (fevId === null || fevId === 999999999){
                                    cutEv.parentId = null;
                                    cutEv.timeStart = TIList[0].date;
                                    cutEv.timeEnd = addTime(TIList[0].date, 0, 0, 0, RpxToRh(250), 0)
                                }
                                
                                setAllEvs(markEvs(newAllEvs))
                                iuEv({ ...cutEv, timeStart: cDateToUTCDate(cutEv.timeStart), timeEnd: cDateToUTCDate(cutEv.timeEnd) })
                                .then((data: EvsResult) => {
                                    if(data.options.success) {
                                        enqueueSnackbar(data.options.message, { variant: "success", autoHideDuration: 3000 });
                                        setCutEvId(null);
                                    } else {
                                        enqueueSnackbar(data.options.message, { variant: "error", autoHideDuration: 3000 });
                                    }
                                })
                            }
                            break;
                            default:
                    }
                } 
            }}
            onKeyUp={(e: KeyboardEvent<HTMLDivElement>) => {
                if(e.ctrlKey)
                    setKeyboardState({...keyboardState, ctrl: false})
                if(e.shiftKey)
                    setKeyboardState({...keyboardState, shift: false})
                if(e.altKey)
                    setKeyboardState({...keyboardState, alt: false})
            }}
            style={{ 
                width: '100%',
                height: '100%',
                padding: '0 10px 10px 10px',
                position: 'relative',
                outline: 'none',
        }}>
            <TimeConfigBar/>
            <DNDContainer/>
        </div>
  )
}

