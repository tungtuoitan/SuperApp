
import { TLBaseFgProvider } from './TLBaseFg/TLBaseFgStore'
import { TLBaseBgProvider } from './TLBaseBg/TLBaseBgStore'
import { TimeConfigBar } from './TimeConfig/TimeConfigBar'
import { TimeConfigProvider } from './TimeConfig/TimeConfigStore'
import DNDContainer from './DNDContainer'

export default function TLContainer() {

  return (
    <>
        <TLBaseFgProvider>
            <TLBaseBgProvider>
                <TimeConfigProvider>
                    <div id ='TLContainer' // this is the biggest container if TL
                        style={{ 
                            width: '100%',
                            padding: '10px',
                            paddingTop: '50px',
                            position: 'relative',
                            // border: '1px solid red',
                    }}>
                        <TimeConfigBar/>
                        <DNDContainer/>
                    </div>
                </TimeConfigProvider>
            </TLBaseBgProvider>
        </TLBaseFgProvider>
    </>
  )
}

