import TISample from './TISample';
import { useTLBaseFgStore } from '../2_TLBaseFg/TLBaseFgStore';
import {FloatContainer} from './7ui';

export default function FloatTools () {
    const {newEvId, activeId} = useTLBaseFgStore();
    
    return (
        <FloatContainer>
            {activeId === newEvId ? null : <TISample id= {newEvId}/>}
        </FloatContainer>
    )
}