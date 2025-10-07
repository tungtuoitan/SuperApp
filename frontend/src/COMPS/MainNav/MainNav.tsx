import { useNavigationStore } from "./NavStore";
import { Route, Routes, useLocation } from "react-router-dom";
import { SideMenu } from "./SideMenu";
import { SnackbarKey, SnackbarProvider, useSnackbar } from "notistack";
import { BodyWrapper, SideNavRoot } from "./SideMenuItem";
import {KeyboardEvent, useEffect} from "react";
import {CloseNotiBtn} from "../CommonHelpers/CloseNotiBtn";
import {useAuthStore} from "../Auth/AuthStore";
import HomePage from "../Home/HomePage";
import {TopNav} from "../TopNav";

const MainNav: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<unknown>>
> = () => {
    const { bodyWrapperRef, expanded } = useNavigationStore();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation()
    const {auth, setAuth} = useAuthStore();

    return (
        <div style={{outline: 'none'}}
        tabIndex={0} // to enable onKeyDown
        >
            <TopNav />
            <SideNavRoot
                className={`side-tabs`}
                >
                <SideMenu />
                <BodyWrapper id='bodyWrapper'
                    ref={bodyWrapperRef}
                    style={{
                        width: expanded ? "calc(100% - 200px)" : "calc(100% - 48px)",
                    }}
                >
                    <SnackbarProvider
                        action={(id: SnackbarKey) => <CloseNotiBtn id={id} />}
                        autoHideDuration={3000}
                    >
                        <Routes>
                            {<Route path="/" Component={HomePage} />}
                            <Route path="/notes" Component={HomePage} />
                            {/* {!user.token && <Route path="/" Component={LoginPage} />} */}
                            {/* {!user.token && <Route path="/signup" Component={SignUpPage} />} */}
                        </Routes>
                    </SnackbarProvider>
                </BodyWrapper>
            </SideNavRoot>
        </div>
    );
};

export default MainNav;