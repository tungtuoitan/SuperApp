import { useEffect } from "react";
import { useNavigationStore } from "../store/NavigationStore";

export const useSideMenuPopupEvents = () => {
    const {menuItems,sideMenuOpen} = useNavigationStore();

    const onMouseEnterHandlerPopover = () => {
    }
    const onMouseLeaveHandlerPopover = () => {
        menuItems.map(x => {
            x.hover = false
            return x;
        });
    }
    useEffect(() => {
        if (sideMenuOpen===false){
            onMouseLeaveHandlerPopover();
        }
    },[sideMenuOpen])
    return {
        onMouseEnterHandlerPopover,
        onMouseLeaveHandlerPopover,
    }
}