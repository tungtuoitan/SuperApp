import styled from "@emotion/styled"
import { useNavigationStore } from "./NavigationStore"
import { SideMenuItem } from "./SideMenuItem"
import {NavigationList, SideMenuWrapper, SideNavigationWrapper} from "./Nui";


export const SideMenu = () => {
    const {expanded,menuItems} = useNavigationStore();
    return (
        <SideMenuWrapper>
            <SideNavigationWrapper className={(expanded ?? false)===false ? 'collapsed' : 'expanded'}>
                <NavigationList>
                    {menuItems.map(item => <SideMenuItem key={item.code} item={item} />)}
                </NavigationList>
            </SideNavigationWrapper>
        </SideMenuWrapper>
    )
}
