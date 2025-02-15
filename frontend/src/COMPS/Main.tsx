import { BrowserRouter } from "react-router-dom";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { CloseNotiBtn } from "./CommonHelpers/1_CloseNotiBtn";
import {SRsProvider} from "./S/8_SRs/SRsStore";
import { TLAllTabsProvider} from "./S/6_AllTabs/TLAllTabsStore";
import {TLBaseBgProvider} from "./S/1_TLBaseBg/TLBaseBgStore";
import {TLBaseFgProvider} from "./S/2_TLBaseFg/TLBaseFgStore";
import {FloatToolsProvider} from "./S/7_FloatTools/FloatToolsStore";
import {TimeConfigProvider} from "./S/3_TimeConfig/TimeConfigStore";
import {ChildEvProvider} from "./S/4_ChildEv/ChildEvStore";
import {EtailFormsStoreProvider} from "./S/5_Etail/EtailFormsStore";
import {PRAllTabsProvider} from "./G/1_GAllTabs/PrAllTabsStore";
import {PridContainerProvider} from "./G/2_GridContainer/PridContainerStore";
import {PetailFormsStoreProvider} from "./G/3_Petail/PetailFormsStore";
import {ADiProvider} from "./G/5_Adi/ADiStore";
import {MainFilterDrawerProvider} from "./G/6_Filter/Drawer/DrawerStore";
import {PrFilterStoreProvider} from "./G/6_Filter/PrFilterStore";
import {FoProvider} from "./G/8_Fo/FoStore";
import {PopupProvider} from "./G/1_GAllTabs/CreateNewPopup/PopupStore";
import SideNav from "./G/0_Nav/SideNav";

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
                                                                        <ADiProvider>
                                                                            <MainFilterDrawerProvider>
                                                                            <PrFilterStoreProvider>
                                                                                <FoProvider>
                                                                                    <PopupProvider>
                                                                                        <SideNav />
                                                                                    </PopupProvider>
                                                                                </FoProvider>
                                                                            </PrFilterStoreProvider>
                                                                            </MainFilterDrawerProvider>
                                                                        </ADiProvider>
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
                </SnackbarProvider>
            </div>
        </BrowserRouter>
    );
};
