import { PopoverPosition } from "@mui/material";
import { useNavigationStore } from "../Store/NavigationStore";
import { useSideMenuExpanderEvents } from "./SideMenuExpanderEvents";
import { SAModule } from "../../../Config/Sitemap";


export const useSideMenuItemEvents = () => {
    const {expanded,setSideMenuOpen,setPopoverPosition,menuItems,setSelectedSubMenuItem, setMenuItems} = useNavigationStore();
    const {onClickHandlerClose,onClickHandlerOpen} = useSideMenuExpanderEvents();
    const onMouseEnterHandlerSideMenu = (event: React.MouseEvent<HTMLDivElement> | undefined, code: string) => {
        const elem = event?.currentTarget.getBoundingClientRect();
        if (expanded===false){

            const isOpened = menuItems.filter(x => x.code===code && x.open===true && x.active===true);
            if (isOpened.length===0){
                setPopoverPosition({top: elem?.top ?? 0, left: elem?.left ?? 0} as PopoverPosition)
        
                menuItems.map(x => {
                    if (x.code===code)
                        x.hover = true
                    else
                        x.hover = false
                    return x;
                });
                const items = menuItems.filter(x => x.code === code);
                setSelectedSubMenuItem(items.length>0 ? (items[0] ?? []) as SAModule : null);
                setSideMenuOpen(true);
            }
        }
    }
    const onMouseLeaveHandlerSideMenu = (event: React.MouseEvent<HTMLDivElement> | undefined, code: string) => {
        if (expanded===false){
            const isOpened = menuItems.filter(x => x.code===code && x.open===true);
            if (isOpened.length===0){
                setSideMenuOpen(false);
            }
        }
        else 
        if (expanded===true) {
            const isOpened = menuItems.filter(x => x.code===code && x.open===true);
            const menuitems = menuItems.map(x => {
                if (x.code === code) x.open = isOpened.length>0;
                return x;
            })
            setMenuItems(menuitems)
        }

    }
    const onClickHandlerSideMenu = (event: React.MouseEvent<HTMLDivElement> | undefined, code: string) => {
        if (expanded===false){
            const isOpened = menuItems.filter(x => x.code===code && x.open===true);
            if (isOpened.length===0){
                console.log(2)
                onMouseEnterHandlerSideMenu(event,code);
            }
        } else 
        if (expanded===true) {
            const isOpened = menuItems.filter(x => x.code===code && x.open===true);
            const menuitems = menuItems.map(x => {
                if (x.code === code) x.open = isOpened.length===0;
                return x;
            })
            setMenuItems(menuitems)
        }
    }
    return {
        onMouseEnterHandlerSideMenu,
        onMouseLeaveHandlerSideMenu,
        onClickHandlerSideMenu,
    }
}