
import { TLBaseFgProvider } from './2_TLBaseFg/TLBaseFgStore'
import { TLBaseBgProvider } from './1_TLBaseBg/TLBaseBgStore'
import { TimeConfigProvider } from './3_TimeConfig/TimeConfigStore'
import TLContainer from './TLContainer'
import { TLBaseEvProvider } from './4_Ev/EvStore'

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

