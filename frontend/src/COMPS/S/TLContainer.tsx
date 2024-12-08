
import { useTLBaseFgStore } from './TLBaseFg/TLBaseFgStore'
import { TimeConfigBar } from './TimeConfig/TimeConfigBar'
import DNDContainer from './DNDContainer'
import { KeyboardEvent } from 'react';
import { iuEv } from '../../FetchAPIs/TLAPIs';
import { useSnackbar } from 'notistack';

export default function TLContainer() {
    const { allEvs, setAllEvs, fevId, setFevId } = useTLBaseFgStore();
    const { enqueueSnackbar } = useSnackbar();

  return (
        <div id ='TLContainer' // this is the biggest container if TL
            onClick={() => {
                if (fevId) {
                    setFevId(null);
                }
            }}
            tabIndex={0} // to enable onKeyDown
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
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
                               .then((data: any) => {
                                   if(data.success) {
                                       enqueueSnackbar(data.message, { variant: "success", autoHideDuration: 3000 });
                                   } else {
                                       enqueueSnackbar(data.message, { variant: "error", autoHideDuration: 3000 });
                                   }
                               })
                           }
                           break;
                       default:
                   }
                }
            }}
            style={{ 
                width: '100%',
                padding: '10px',
                paddingTop: '50px',
                position: 'relative',
        }}>
            <TimeConfigBar/>
            <DNDContainer/>
        </div>
  )
}

