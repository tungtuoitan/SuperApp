
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
import {getAllDescendants} from './2_TLBaseFg/2he';

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
            onKeyDown={async (e: KeyboardEvent<HTMLDivElement>) => { 
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
                                const allDescendants:Ev[] = getAllDescendants(newAllEvs, fevId)
                                
                                allDescendants.forEach(ev=> ev.activeC = sr.active.inActive.c)
                                setAllEvs(markEvs(newAllEvs))
                                try {
                                    await Promise.all(allDescendants.map(ev => iuEv(ev)))
                                    .then((data: EvsResult[])=> {
                                        const failResult = data.find(r => !r.options.success)
                                        if(!failResult) {
                                            enqueueSnackbar(data[0].options.message, { variant: "success"});
                                        } else {
                                            enqueueSnackbar(failResult.options.message, { variant: "error"})
                                        }
                                    })
                                }
                                catch {
                                    enqueueSnackbar('SOMETHING WRONG!', { variant: "error"})
                                }
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
                                if(cutEvId === null) {
                                    enqueueSnackbar('Past Fail', { variant: "error" });
                                    return
                                }
                                let newAllEvs = [...allEvs]
                                const cutEv:Ev = newAllEvs.filter(ev => ev.id === cutEvId)[0];
                                const newTimeStart =  GhToCDate(h$G_BgStart + RpxToRh(w$BgStart_spot()))
                                const newTimeEnd = addTime(newTimeStart, 0, 0, 0, cDateToGh(cutEv.timeEnd)-cDateToGh(cutEv.timeStart), 0)
                                const parentEv = newAllEvs.filter(ev => ev.id === fevId)[0];
                                const h$difference = cDateToGh(newTimeStart) - cDateToGh(cutEv.timeStart); 
                                let allDescendants:Ev[] = getAllDescendants(newAllEvs, cutEvId)
                                
                                // if fevId is parentEv, go on
                                if(fevId && parentEv) {
                                    if(parentEv.levelC !== getLevelCOf('parentEv') || cutEv.levelC !== getLevelCOf('childEv')) { // we have to separate 2 cases, bcz of this condition
                                        enqueueSnackbar('Past Fail', { variant: "error" });
                                        return
                                    }
                                    // paste
                                    else if(cutEvId) {
                                        newAllEvs = newAllEvs.map((_ev: Ev) => {
                                            if (_ev.id === cutEvId) {
                                                return { ..._ev, parentId: fevId, timeStart: newTimeStart, timeEnd: newTimeEnd };
                                            } else if (allDescendants.find(e => e.id === _ev.id)) {
                                                return { 
                                                    ..._ev, 
                                                    timeStart: GhToCDate(cDateToGh(_ev.timeStart) + h$difference), 
                                                    timeEnd: GhToCDate(cDateToGh(_ev.timeEnd) + h$difference) 
                                                };
                                            }
                                            return _ev;
                                        });
                                    }
                                }
                                else if(fevId === null || fevId === 999999999){
                                    // paste
                                    newAllEvs = newAllEvs.map((_ev: Ev) => {
                                        if (_ev.id === cutEvId) {
                                            return { ..._ev, parentId: null, timeStart: newTimeStart, timeEnd: newTimeEnd };
                                        } else if (allDescendants.find(e => e.id === _ev.id)) {
                                            return { 
                                                ..._ev, 
                                                timeStart: GhToCDate(cDateToGh(_ev.timeStart) + h$difference), 
                                                timeEnd: GhToCDate(cDateToGh(_ev.timeEnd) + h$difference) 
                                            };
                                        }
                                        return _ev;
                                    });
                                }
                                
                                setAllEvs(markEvs(newAllEvs))
                                allDescendants = getAllDescendants(newAllEvs, cutEvId)
                                await Promise.all(allDescendants.map(ev => iuEv({ ...ev, timeStart: cDateToUTCDate(ev.timeStart), timeEnd: cDateToUTCDate(ev.timeEnd)})))
                                .then((data: EvsResult[])=> {
                                    const failResult = data.find(r => !r.options.success)
                                    if(!failResult) {
                                        setCutEvId(null);
                                        enqueueSnackbar(data[0].options.message, { variant: "success"});
                                    } else {
                                        enqueueSnackbar(failResult.options.message, { variant: "error"})
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

