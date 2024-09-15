import { SnackbarKey, SnackbarProvider } from "notistack"
import { CloseNotiBtn } from "./helper/CloseNotiBtn"
import { LoginProvider } from "./Login/store/loginStore"


export const MainBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <LoginProvider>
            <SnackbarProvider action={(id: SnackbarKey) => <CloseNotiBtn id={id} />}
                autoHideDuration={3000}>
                    <>
                        {children}
                    </>
            </SnackbarProvider>
        </LoginProvider>
    )
}