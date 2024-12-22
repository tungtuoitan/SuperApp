import { TimeConfigProvider } from "./3_TimeConfig/TimeConfigStore";
import { TLBaseBgProvider } from "./1_TLBaseBg/TLBaseBgStore";
import { TLBaseFgProvider } from "./2_TLBaseFg/TLBaseFgStore";
import { TLAllTabs } from "./6_AllTabs/TLAllTabs";
import { AllTabsProvider } from "./6_AllTabs/AllTabsStore";
import { SRsProvider } from "./8_SRs/SRsStore";
import { EtailFormsStoreProvider } from "./5_Etail/EtailFormsStore";
import { ChildEvProvider } from "./4_ChildEv/ChildEvStore";
import { FloatToolsProvider } from "./7_FloatTools/FloatToolsStore";

export const TLProvider = () => {
    return (
        <SRsProvider>
            <AllTabsProvider>
                <TLBaseBgProvider>
                    <TLBaseFgProvider>
                        <FloatToolsProvider>
                            <TimeConfigProvider>
                                <ChildEvProvider>
                                    <EtailFormsStoreProvider>
                                        <EtailFormsStoreProvider>
                                            <TLAllTabs />
                                        </EtailFormsStoreProvider>
                                    </EtailFormsStoreProvider>
                                </ChildEvProvider>
                            </TimeConfigProvider>
                        </FloatToolsProvider>
                    </TLBaseFgProvider>
                </TLBaseBgProvider>
            </AllTabsProvider>
        </SRsProvider>
    );
};
