
import { TimeConfigBar } from './3_TimeConfig/TimeConfigBar'
import DNDContainer from './DNDContainer'
import { useEffect } from 'react';
import { useTLBaseBgStore } from './1_TLBaseBg/TLBaseBgStore';

export default function TLContainer() {
    const { setFirstTimeInit } = useTLBaseBgStore();

    useEffect(() => {
        setFirstTimeInit(false);
    }, []);

    return (
        <div id ='TLContainer' // this is the biggest container if TL
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

