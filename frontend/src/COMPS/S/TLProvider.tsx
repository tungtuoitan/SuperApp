
import { TLBaseFgProvider } from './TLBaseFg/TLBaseFgStore'
import { TLBaseBgProvider } from './TLBaseBg/TLBaseBgStore'
import { TimeConfigProvider } from './TimeConfig/TimeConfigStore'
import TLContainer from './TLContainer'
import { TLBaseEvProvider } from './Ev/TLBaseEvStore'

export default function TLProvider() {

  return (
    <>
        <TLBaseFgProvider>
            <TLBaseBgProvider>
                <TimeConfigProvider>
                    <TLBaseEvProvider>
                        <TLContainer/>
                    </TLBaseEvProvider>
                </TimeConfigProvider>
            </TLBaseBgProvider>
        </TLBaseFgProvider>
    </>
  )
}

