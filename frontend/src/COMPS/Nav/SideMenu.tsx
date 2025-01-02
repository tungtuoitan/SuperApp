import {NavigationList, SideMenuItem, SideMenuWrapper, SideNavigationWrapper} from "./Nui";
import {sitemaps} from "./Nhe";


export const SideMenu = () => {
    return (
        <SideMenuWrapper>
            <SideNavigationWrapper className={'collapsed'}
            // className={(expanded ?? false)===false ? 'collapsed' : 'expanded'}
            >
                <NavigationList>
                    {sitemaps.map(item => <SideMenuItem key={item.code} item={item} />)}
                </NavigationList>
            </SideNavigationWrapper>
        </SideMenuWrapper>
    )
}
