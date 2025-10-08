import { useNavigationStore } from "../../contexts/NavigationContext";
import { Route, Routes } from "react-router-dom";
import { SideMenu } from "./SideMenu";
import { BodyWrapper, SideNavRoot } from "./SideMenuItem";
import HomePage from "../Home/HomePage";
import { TopNav } from "../TopNav";

const MainNav: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<unknown>>
> = () => {
    const { bodyWrapperRef, expanded } = useNavigationStore();

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
                    sx={{
                        width: expanded ? "calc(100% - 200px)" : "calc(100% - 48px)",
                    }}
                >
                    <Routes>
                        <Route path="/" Component={HomePage} />
                        <Route path="/notes" Component={HomePage} />
                    </Routes>
                </BodyWrapper>
            </SideNavRoot>
        </div>
    );
};

export default MainNav;