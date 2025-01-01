import { BrowserRouter } from "react-router-dom";
import { TopNavigation } from "./Navigation/TopNavigation";
import SideNavAndBody from "./Navigation/SideNavAndBody";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { CloseNotiBtn } from "./CommonHelpers/1_CloseNotiBtn";
import { LoginProvider } from "./Login/store/loginStore";
import {SRsProvider} from "./S/8_SRs/SRsStore";
import {AllTabsProvider} from "./S/6_AllTabs/AllTabsStore";
import {TLBaseBgProvider} from "./S/1_TLBaseBg/TLBaseBgStore";
import {TLBaseFgProvider} from "./S/2_TLBaseFg/TLBaseFgStore";
import {FloatToolsProvider} from "./S/7_FloatTools/FloatToolsStore";
import {TimeConfigProvider} from "./S/3_TimeConfig/TimeConfigStore";
import {ChildEvProvider} from "./S/4_ChildEv/ChildEvStore";
import {EtailFormsStoreProvider} from "./S/5_Etail/EtailFormsStore";

export const Main = () => {
    return (
        <BrowserRouter>
            <div
                style={{
                    overflow: "hidden",
                    height: "100%",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    overflowX: "hidden",
                }}
            >
                <SnackbarProvider action={(id: SnackbarKey) => <CloseNotiBtn id={id} />}autoHideDuration={3000}>
                   <LoginProvider>
                        <SRsProvider>
                            <AllTabsProvider>
                                <TLBaseBgProvider>
                                    <TLBaseFgProvider>
                                        <FloatToolsProvider>
                                            <TimeConfigProvider>
                                                <ChildEvProvider>
                                                    <EtailFormsStoreProvider>
                                                        <EtailFormsStoreProvider>
                                                            <TopNavigation />
                                                            <SideNavAndBody />
                                                        </EtailFormsStoreProvider>
                                                    </EtailFormsStoreProvider>
                                                </ChildEvProvider>
                                            </TimeConfigProvider>
                                        </FloatToolsProvider>
                                    </TLBaseFgProvider>
                                </TLBaseBgProvider>
                            </AllTabsProvider>
                        </SRsProvider>
                    </LoginProvider>
                </SnackbarProvider>
            </div>
        </BrowserRouter>
    );
};
