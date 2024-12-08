
import { TLBaseFgProvider } from './TLBaseFg/TLBaseFgStore'
import { TLBaseBgProvider } from './TLBaseBg/TLBaseBgStore'
import { TimeConfigProvider } from './TimeConfig/TimeConfigStore'
import TLContainer from './TLContainer'

export default function TLProvider() {

  return (
    <>
        <TLBaseFgProvider>
            <TLBaseBgProvider>
                <TimeConfigProvider>
                    <TLContainer/>
                </TimeConfigProvider>
            </TLBaseBgProvider>
        </TLBaseFgProvider>
    </>
  )
}

