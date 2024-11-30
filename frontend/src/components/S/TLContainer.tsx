
import { TLBaseFgProvider } from './TLBaseFg/TLBaseFgStore'
import { TLBaseBgProvider } from './TLBaseBg/TLBaseBgStore'
import { TLBaseContainer } from './TLBaseContainer'
import { TimeConfigBar } from './TimeConfig/TimeConfigBar'
import { TimeConfigProvider } from './TimeConfig/TimeConfigStore'
import TLToolsPopup from './TLTools/TLToolsPopup'

export default function TLContainer() {

  return (
    <>
        <TLBaseFgProvider>
            <TLBaseBgProvider>
                <TimeConfigProvider>
                    <div id ='TLContainer' // this is the biggest container if TL
                        style={{ 
                            width: '100%',
                            paddingTop: '50px',
                            position: 'relative',
                            // border: '1px solid red',
                    }}>
                        <div style={{margin: '10px', display: 'flex', flexDirection: 'column', 
                            // border: '2px solid blue'
                            }}>
                            <TimeConfigBar/>
                            <TLBaseContainer />
                        </div>
                        <TLToolsPopup/>
                    </div>
                </TimeConfigProvider>
            </TLBaseBgProvider>
        </TLBaseFgProvider>
    </>
  )
}

