import { BrowserRouter } from "react-router-dom";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { CloseNotiBtn } from "./CommonHelpers/CloseNotiBtn";
import MainNav from "./MainNav/MainNav";
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
                    <AuthProvider>
                    <MainNav />
                    </AuthProvider>
                </SnackbarProvider>
            </div>
        </BrowserRouter>
    );
};
