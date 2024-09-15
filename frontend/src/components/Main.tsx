import { BrowserRouter } from "react-router-dom"
import SideNavigation from "./Navigation/SideNavigation"
import { MainBody } from "./Navigation/MainBody"
import { TopNavigation } from "./TopNavigation/TopNavigation"


export const Main = () =>  {
    return (
        <BrowserRouter>
                <div className="main-container" style={{ overflow: 'hidden', height: '100%', width: '100%' }}>
                    <MainBody>
                        <TopNavigation />
                        <SideNavigation />
                    </MainBody>
                </div>
        </BrowserRouter>
    )
}