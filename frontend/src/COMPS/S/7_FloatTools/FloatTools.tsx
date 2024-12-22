import TISample from './TISample';
import {FloatContainer} from './7ui';
import {useFloatToolsStore} from './FloatToolsStore';

export default function FloatTools () {
    const { activeId, FIIDs} = useFloatToolsStore();
    
    return (
        <FloatContainer>
            {activeId === FIIDs.parentEv ? null : 
                <TISample id= {FIIDs.parentEv} type='parentEv'/>}
            {activeId === FIIDs.childEv ? null : 
                <TISample id= {FIIDs.childEv}/>}
        </FloatContainer>
    )
}