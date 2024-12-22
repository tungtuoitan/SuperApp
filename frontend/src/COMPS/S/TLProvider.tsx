import { TimeConfigProvider } from "./3_TimeConfig/TimeConfigStore"
import { TLBaseBgProvider } from "./1_TLBaseBg/TLBaseBgStore"
import { TLBaseFgProvider } from "./2_TLBaseFg/TLBaseFgStore"
import { TLAllTabs } from "./6_AllTabs/TLAllTabs"
import { AllTabsProvider } from "./6_AllTabs/AllTabsStore"
import { SRsProvider } from "./8_SRs/SRsStore"
import {EtailFormsStoreProvider} from "./5_Etail/EtailFormsStore"
import {ChildEvProvider} from "./4_ChildEv/ChildEvStore"

export const TLProvider = () => {

    return (
        <SRsProvider>
            <AllTabsProvider>
                <TLBaseFgProvider>
                    <TLBaseBgProvider>
                        <TimeConfigProvider>
                            <ChildEvProvider>
                                <EtailFormsStoreProvider>
                                    <EtailFormsStoreProvider>
                                        <TLAllTabs />
                                    </EtailFormsStoreProvider>
                                </EtailFormsStoreProvider>
                            </ChildEvProvider>
                        </TimeConfigProvider>
                    </TLBaseBgProvider>
                </TLBaseFgProvider>
            </AllTabsProvider>
        </SRsProvider>
    )
}
