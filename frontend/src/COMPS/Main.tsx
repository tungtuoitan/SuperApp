import { BrowserRouter } from "react-router-dom"
import { TopNavigation } from "./Navigation/TopNavigation"
import SideNavAndBody from "./Navigation/SideNavAndBody"
import {SnackbarKey, SnackbarProvider} from "notistack"
import {CloseNotiBtn} from "./CommonHelpers/1_CloseNotiBtn"
import {LoginProvider} from "./Login/store/loginStore"


export const Main = () =>  {
    return (
        <BrowserRouter>
                <div 
                  style={{ 
                    overflow: 'hidden', 
                    height: '100%',  
                    width: '100%', 
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                    }}>
                    <LoginProvider>
                        <SnackbarProvider action={(id: SnackbarKey) => <CloseNotiBtn id={id} />} autoHideDuration={3000}>
                            <TopNavigation />
                            <SideNavAndBody />
                        </SnackbarProvider>
                    </LoginProvider>
                </div>
        </BrowserRouter>
    )
}