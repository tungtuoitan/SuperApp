import { sitemaps } from "../../../config/sitemap";
import { useNavigationStore } from "../store/NavigationStore";
import { useSideMenuPopupEvents } from "./SideMenuPopupEvents";


export const useSideMenuSubItemEvents = () => {
    const { menuItems, setMenuItems, setcurrentSectionTitle } = useNavigationStore();
    const { onMouseLeaveHandlerPopover } = useSideMenuPopupEvents();
    const onClickHandlerSubItem = (event: React.MouseEvent<HTMLAnchorElement> | undefined, code: string) => {
        // update active
        // menuItems.map(x => {
        //     x.open = false;
        //     return x;
        // })
        setMenuItems(menuItems.map(x => {
            if ((x.items ?? []).length > 0) {
                x.open = false;
                x.items = x.items?.map(y => {
                    y.active = false;
                    if (y.code === code) {
                        y.active = true;
                        x.open = true;
                    }
                    if ((y.items ?? []).length>0){
                        y.items?.map(z => {
                            z.active = false;
                            if (z.code === code) {
                                z.active = true;
                                x.open = true;
                            }
                            return z;
                        })
                    }
                    return y;
                });
                x.active = (x.items ?? []).filter(x => x.active === true || (x.items ?? []).filter(z => z.active===true)).length > 0;
            }
            return x;
        }))

        onMouseLeaveHandlerPopover();
        getCurrentComponentMultiLevelLinks(code);
        //getCurrentComponentLinks(code);
    }
    const getCurrentComponentLinks = (link: string) => {
        var module = sitemaps.find(x => x.items?.find(e => e.link === link));
        if (module != null && module != undefined) {
            var component = module.items?.find(e => e.link === link);
            setcurrentSectionTitle(" / " + module.name + " / " + component?.name)
        }
    }
    const getCurrentComponentMultiLevelLinks = (code: string) => {
        let moduleName = '';
        let subModuleName = '';
        let subChildModuleName = '';
        let breadCrumbLabel = '';
        let found = false;

        (sitemaps ?? []).some(x => {
            moduleName = x.name;
            found = false;

            return (x.items ?? []).some(y => {
                subModuleName = y.name;
                if (y.code === code) {
                    found = true;
                    subModuleName = y.name;
                    return true; // Exit the inner loop
                }
                if (!found) {
                    return (y.items ?? []).some(z => {
                        if (z.code === code) {
                            found = true;
                            subChildModuleName = z.name;
                            return true; // Exit the innermost loop
                        }
                        return false;
                    });
                }
                return false;
            });
        });

        if (found) {
            if (moduleName !== '') breadCrumbLabel += ' / ' + moduleName;
            if (subModuleName !== '') breadCrumbLabel += ' / ' + subModuleName;
            if (subChildModuleName !== '') breadCrumbLabel += ' / ' + subChildModuleName;
            setcurrentSectionTitle(breadCrumbLabel);
        }
        
    }
    const onMouseEnterHandlerSubItem = () => {
        // if (expanded === false && isPopoverMouse === true){
        //     setIsPopoverMouse(false)
        //     menuItems.map(x => {
        //         x.hover = false
        //         return x;
        //     });
        // setSelectedSubMenuItems([] as VTComponent[]);

        // }
    }
    return {
        onClickHandlerSubItem,
        onMouseEnterHandlerSubItem,
        getCurrentComponentLinks
    }
}