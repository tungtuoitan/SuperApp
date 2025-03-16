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
import {GAllTabsProvider} from "./G/1_GAllTabs/GAllTabsStore";
import {GridContainerProvider} from "./G/2_GridContainer/GridContainerStore";
import {PetailFormsStoreProvider} from "./G/3_Petail/PetailFormsStore";
import {ADiProvider} from "./G/5_Adi/ADiStore";
import {MainFilterDrawerProvider} from "./G/6_Filter/Drawer/DrawerStore";
import {PrFilterStoreProvider} from "./G/6_Filter/PrFilterStore";
import {FoProvider} from "./G/0_Fo/FoStore";
import {PopupProvider} from "./G/1_GAllTabs/CreateNewPopup/PopupStore";
import {FotailFormsStoreProvider} from "./G/9_Fotail/FotailFormsStore";
import {ListFoPopupProvider} from "./G/0_Fo/ListFoPopup/PopupStore";
import MainNav from "./MainNav/MainNav";
import { RialogProvider} from "./G/10_Rialog/RialogStore";
import {QridProvider} from "./G/11_Qrid/QridStore";
import {SourceReviewPopupProvider} from "./G/10_Rialog/PlayOptionPopup/PopupStore";
import {AuthProvider} from "./Auth/AuthStore";

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

                                                            <GAllTabsProvider>
                                                                <GridContainerProvider>
                                                                    <PetailFormsStoreProvider>
                                                                        <ADiProvider>
                                                                            <MainFilterDrawerProvider>
                                                                            <PrFilterStoreProvider>
                                                                                <FoProvider>
                                                                                    <FotailFormsStoreProvider>
                                                                                        <PopupProvider>
                                                                                            <ListFoPopupProvider>
                                                                                                <RialogProvider>
                                                                                                    <SourceReviewPopupProvider>
                                                                                                        <QridProvider>
                                                                                                            <AuthProvider>
                                                                                                            <MainNav />
                                                                                                            </AuthProvider>
                                                                                                        </QridProvider>
                                                                                                    </SourceReviewPopupProvider>
                                                                                                </RialogProvider>
                                                                                            </ListFoPopupProvider>
                                                                                        </PopupProvider>
                                                                                    </FotailFormsStoreProvider>
                                                                                </FoProvider>
                                                                            </PrFilterStoreProvider>
                                                                            </MainFilterDrawerProvider>
                                                                        </ADiProvider>
                                                                    </PetailFormsStoreProvider>
                                                                </GridContainerProvider>
                                                            </GAllTabsProvider>

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
