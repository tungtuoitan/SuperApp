import { SnackbarKey, SnackbarProvider } from "notistack"
import { LoginProvider } from "./Login/store/loginStore"
import { CloseNotiBtn } from "./Helpers/CloseNotiBtn"


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