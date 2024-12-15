import { TLBaseEvProvider } from "./4_Ev/EvStore"
import { TimeConfigProvider } from "./3_TimeConfig/TimeConfigStore"
import { TLBaseBgProvider } from "./1_TLBaseBg/TLBaseBgStore"
import { TLBaseFgProvider } from "./2_TLBaseFg/TLBaseFgStore"
import { EtailProvider } from "./5_Etail/EtailStore"
import { TLAllTabs } from "./6_AllTabs/TLAllTabs"
import { AllTabsProvider } from "./6_AllTabs/AllTabsStore"
import { EtailFormStoreProvider } from "./5_Etail/EtailFormStore"
import { SRsProvider } from "./8_SRs/SRsStore"

export const TLProvider = () => {

    return (
        <SRsProvider>
            <AllTabsProvider>
                <TLBaseFgProvider>
                    <TLBaseBgProvider>
                        <TimeConfigProvider>
                            <TLBaseEvProvider>
                                <EtailFormStoreProvider>
                                    <EtailProvider>
                                        <TLAllTabs />
                                    </EtailProvider>
                                </EtailFormStoreProvider>
                            </TLBaseEvProvider>
                        </TimeConfigProvider>
                    </TLBaseBgProvider>
                </TLBaseFgProvider>
            </AllTabsProvider>
        </SRsProvider>
    )
}
