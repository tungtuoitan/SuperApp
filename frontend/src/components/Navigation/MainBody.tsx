import { SnackbarKey, SnackbarProvider } from "notistack"
import { CloseNotiBtn } from "../helper/CloseNotiBtn"


export const MainBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <SnackbarProvider action={(id: SnackbarKey) => <CloseNotiBtn id={id} />}
            autoHideDuration={3000}>
                <>
                    {children}
                    {/* <PanelDialog /> */}
                </>
        </SnackbarProvider>
    )
}