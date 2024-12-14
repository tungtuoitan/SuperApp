import { TLBaseEvProvider } from "./4_Ev/EvStore"
import { TimeConfigProvider } from "./3_TimeConfig/TimeConfigStore"
import { TLBaseBgProvider } from "./1_TLBaseBg/TLBaseBgStore"
import { TLBaseFgProvider } from "./2_TLBaseFg/TLBaseFgStore"
import { EtailProvider } from "./5_Etail/EtailStore"
import { TLAllTabs } from "./TLAllTabs"

export const TLProvider = () => {

    return (
            <TLBaseFgProvider>
                <TLBaseBgProvider>
                    <TimeConfigProvider>
                        <TLBaseEvProvider>
                            <EtailProvider>
                                <TLAllTabs/>
                            </EtailProvider>
                        </TLBaseEvProvider>
                    </TimeConfigProvider>
                </TLBaseBgProvider>
            </TLBaseFgProvider>
    )
}
