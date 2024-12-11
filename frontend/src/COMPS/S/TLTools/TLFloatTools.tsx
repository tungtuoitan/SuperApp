import TISample from './TISample';
import { useTLBaseFgStore } from '../TLBaseFg/TLBaseFgStore';

export default function TLFloatTools () {
    const {newEvId, activeId} = useTLBaseFgStore();
    
    return (
        <div style={{
            width: '200px',
            height: '72px', //same as Figma
            backgroundColor: 'white',
            border: '1px solid #00000050',
            borderRadius: '20px',
            position: 'absolute',
            // zIndex: 100,
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            {activeId === newEvId ? null : <TISample id= {newEvId}/>}
        </div>
    )
}