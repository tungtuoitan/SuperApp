import { TLBaseEvProvider } from "./4_Ev/EvStore"
import { TimeConfigProvider } from "./3_TimeConfig/TimeConfigStore"
import { TLBaseBgProvider } from "./1_TLBaseBg/TLBaseBgStore"
import { TLBaseFgProvider } from "./2_TLBaseFg/TLBaseFgStore"
import { TLAllTabs } from "./6_AllTabs/TLAllTabs"
import { AllTabsProvider } from "./6_AllTabs/AllTabsStore"
import { SRsProvider } from "./8_SRs/SRsStore"
import {EtailFormsStoreProvider} from "./5_Etail/EtailFormsStore"

export const TLProvider = () => {

    return (
        <SRsProvider>
            <AllTabsProvider>
                <TLBaseFgProvider>
                    <TLBaseBgProvider>
                        <TimeConfigProvider>
                            <TLBaseEvProvider>
                                <EtailFormsStoreProvider>
                                    <EtailFormsStoreProvider>
                                        <TLAllTabs />
                                    </EtailFormsStoreProvider>
                                </EtailFormsStoreProvider>
                            </TLBaseEvProvider>
                        </TimeConfigProvider>
                    </TLBaseBgProvider>
                </TLBaseFgProvider>
            </AllTabsProvider>
        </SRsProvider>
    )
}
