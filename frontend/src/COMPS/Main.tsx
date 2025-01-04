import { BrowserRouter } from "react-router-dom";
import SideNav from "./Nav/SideNav";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { CloseNotiBtn } from "./CommonHelpers/1_CloseNotiBtn";
import { LoginProvider } from "./Login/store/loginStore";
import {SRsProvider} from "./S/8_SRs/SRsStore";
import { TLAllTabsProvider} from "./S/6_AllTabs/TLAllTabsStore";
import {TLBaseBgProvider} from "./S/1_TLBaseBg/TLBaseBgStore";
import {TLBaseFgProvider} from "./S/2_TLBaseFg/TLBaseFgStore";
import {FloatToolsProvider} from "./S/7_FloatTools/FloatToolsStore";
import {TimeConfigProvider} from "./S/3_TimeConfig/TimeConfigStore";
import {ChildEvProvider} from "./S/4_ChildEv/ChildEvStore";
import {EtailFormsStoreProvider} from "./S/5_Etail/EtailFormsStore";
import {PRAllTabsProvider} from "./P/1_PrAllTabs/PrAllTabsStore";
import {PridContainerProvider} from "./P/2_PridContainer/PridContainerStore";
import {PetailFormsStoreProvider} from "./P/3_Petail/PetailFormsStore";

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

                            <TLAllTabsProvider>
                                <TLBaseBgProvider>
                                    <TLBaseFgProvider>
                                        <FloatToolsProvider>
                                            <TimeConfigProvider>
                                                <ChildEvProvider>
                                                    <EtailFormsStoreProvider>
                                                        <EtailFormsStoreProvider>  

                                                            <PRAllTabsProvider>
                                                                <PridContainerProvider>
                                                                    <PetailFormsStoreProvider>
                                                                        <SideNav />
                                                                    </PetailFormsStoreProvider>
                                                                </PridContainerProvider>
                                                            </PRAllTabsProvider>

                                                        </EtailFormsStoreProvider>
                                                    </EtailFormsStoreProvider>
                                                </ChildEvProvider>
                                            </TimeConfigProvider>
                                        </FloatToolsProvider>
                                    </TLBaseFgProvider>
                                </TLBaseBgProvider>
                            </TLAllTabsProvider>

                        </SRsProvider>
                    </LoginProvider>
                </SnackbarProvider>
            </div>
        </BrowserRouter>
    );
};
