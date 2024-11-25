
import { TLBaseFgProvider } from './TLBaseFg/TLBaseFgStore'
import { TLBaseBgProvider } from './TLBaseBg/TLBaseBgStore'
import { TLBaseContainer } from './TLBaseContainer'
import { TimeConfigBar } from './TimeConfig/TimeConfigBar'
import { TimeConfigProvider } from './TimeConfig/TimeConfigStore'

export default function TLContainer() {

  return (
    <div style={{
      width: '100%',
      marginTop: '50px',
    }}>
      <TLBaseFgProvider>
        <TLBaseBgProvider>
            <TimeConfigProvider>
                <div style={{margin: '10px', display: 'flex', flexDirection: 'column'}}>
                    <TimeConfigBar/>
                    <TLBaseContainer />
                </div>
            </TimeConfigProvider>
        </TLBaseBgProvider>
      </TLBaseFgProvider>
    </div>
  )
}

