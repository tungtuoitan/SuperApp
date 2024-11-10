import { BrowserRouter } from "react-router-dom"
import { MainBody } from "./MainBody"
import { TopNavigation } from "./TopNavigation/TopNavigation"
import SideNavAndBody from "./SideNavigation/SideNavAndBody"


export const Main = () =>  {
    return (
        <BrowserRouter>
                <div 
                  style={{ 
                    overflow: 'hidden', 
                    height: '100%',  
                    // border: '4px solid red',
                    width: '100%', 
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                    }}>
                    <MainBody>
                        <TopNavigation />
                        <SideNavAndBody />
                    </MainBody>
                </div>
        </BrowserRouter>
    )
}