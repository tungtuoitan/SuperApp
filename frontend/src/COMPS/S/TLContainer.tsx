
import { useTLBaseFgStore } from './2_TLBaseFg/TLBaseFgStore'
import { TimeConfigBar } from './3_TimeConfig/TimeConfigBar'
import DNDContainer from './DNDContainer'
import { KeyboardEvent } from 'react';
import { iuEv } from '../../FetchAPIs/TLAPIs';
import { useSnackbar } from 'notistack';
import { EvsResult } from './TLTypes';
import { EvStore } from './4_Ev/EvStore';
import { useTLBaseFgHelpers } from './2_TLBaseFg/TLBaseFgHelpers';
import { addTime, cDateToUTCDate } from './3_TimeConfig/TimeHelpers';
import { useTLBaseBgHelpers } from './1_TLBaseBg/TLBaseBgHelpers';

export default function TLContainer() {
    const { allEvs, setAllEvs, } = useTLBaseFgStore();
    const { fevId, setFevId, cutEvId, setCutEvId, focusTFId, setFocusTFId } = EvStore();
    const { enqueueSnackbar } = useSnackbar();
    const { filterEvs } = useTLBaseFgHelpers();
    const { RpxToRh } = useTLBaseBgHelpers();

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
                               fEv.status = 0;
                               setAllEvs(newAllEvs);
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
                                if(fevId && filterEvs(['parentEv']).filter(ev => ev.id === fevId).length > 0) {
                                    // paste
                                    if(cutEvId) {
                                        const newAllEvs = [...allEvs]
                                        const cutEv = newAllEvs.filter(ev => ev.id === cutEvId)[0];
                                        const fEv = newAllEvs.filter(ev => ev.id === fevId)[0];
                                        cutEv.parentId = fevId;
                                        cutEv.timeStart = fEv.timeStart;
                                        cutEv.timeEnd = fEv.timeEnd; addTime(fEv.timeStart, 0, 0, 0, RpxToRh(250), 0)
                                        setAllEvs(newAllEvs);
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

                                }
                            }
                            break;





                       default:
                   }
                }
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

