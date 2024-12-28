
import { useTLBaseFgStore } from './2_TLBaseFg/TLBaseFgStore'
import { TimeConfigBar } from './3_TimeConfig/TimeConfigBar'
import DNDContainer from './DNDContainer'
import { KeyboardEvent, useEffect } from 'react';
import { iuEv } from './TLAPIs';
import { useSnackbar } from 'notistack';
import { Ev, EvsResult } from './TLTypes';
import { useTLBaseFgHelpers } from './2_TLBaseFg/TLBaseFgHelpers';
import { addTime, cDateToGh, cDateToUTCDate, GhToCDate, useTimeHelpers } from './3_TimeConfig/TimeHelpers';
import { useTLBaseBgHelpers } from './1_TLBaseBg/TLBaseBgHelpers';
import { useTLBaseBgStore } from './1_TLBaseBg/TLBaseBgStore';
import { sr } from './TLConstants';
import {useChildEvStore} from './4_ChildEv/ChildEvStore';

export default function TLContainer() {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { keyboardState, setKeyboardState, TIList, setFirstTimeInit } = useTLBaseBgStore();
    const { fevId, setFevId, cutEvId, setCutEvId, focusTFId, setFocusTFId, mousedownAtGE } = useChildEvStore();
    const { enqueueSnackbar } = useSnackbar();
    const { filterEvs, markEvs } = useTLBaseFgHelpers();
    const { RpxToRh, h$G_BgStart, w$BgStart_spot, getLevelCOf } = useTLBaseBgHelpers();
    const { changeLevel, changeTimeStart } = useTimeHelpers();

    useEffect(() => {
        setFirstTimeInit(false);
    }, []);

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
                                const cutEv: Ev = newAllEvs.filter(ev => ev.id === cutEvId)[0];
                                const newTimeStart =  GhToCDate(h$G_BgStart + RpxToRh(w$BgStart_spot()))
                                const newTimeEnd = addTime(newTimeStart, 0, 0, 0, cDateToGh(cutEv.timeEnd)-cDateToGh(cutEv.timeStart), 0)
                                const parentEv = newAllEvs.filter(ev => ev.id === fevId)[0];
                                
                                // if fevId is parentEv, go on
                                if(fevId && parentEv) {
                                    if(parentEv.levelC !== getLevelCOf('parentEv') || cutEv.levelC !== getLevelCOf('childEv')) {
                                        enqueueSnackbar('Past Fail', { variant: "error" });
                                        return
                                    }
                                    // paste
                                    else if(cutEvId) {
                                        cutEv.parentId = fevId;
                                        cutEv.timeStart = newTimeStart;
                                        cutEv.timeEnd = newTimeEnd;
                                    }
                                }
                                // if fevId is BeggerGang
                                else if (fevId === null || fevId === 999999999){
                                    cutEv.parentId = null;
                                    cutEv.timeStart = newTimeStart;
                                    cutEv.timeEnd = newTimeEnd; 
                                }
                                
                                setAllEvs(markEvs(newAllEvs))
                                iuEv({ ...cutEv, timeStart: cDateToUTCDate(cutEv.timeStart), timeEnd: cDateToUTCDate(cutEv.timeEnd) })
                                .then((data: EvsResult) => {
                                    if(data.options.success) {
                                        enqueueSnackbar(data.options.message, { variant: "success"});
                                        setCutEvId(null);
                                    } else {
                                        enqueueSnackbar(data.options.message, { variant: "error"});
                                    }
                                })
                            }
                            break;
                            default:
                    }
                } 
                else {
                    if(e.key === 'ArrowUp') 
                        changeLevel('down')
                    if(e.key === 'ArrowDown')
                        changeLevel('up')
                    if(e.key === 'ArrowLeft')
                        changeTimeStart('prev')
                    if(e.key === 'ArrowRight')
                        changeTimeStart('next');
                }
            }}
            onKeyUp={(e: KeyboardEvent<HTMLDivElement>) => {
                if(e.key === 'Control')
                    setKeyboardState({...keyboardState, ctrl: false})
                if(e.key === 'Shift')
                    setKeyboardState({...keyboardState, shift: false})
                if(e.key === 'Alt')
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

