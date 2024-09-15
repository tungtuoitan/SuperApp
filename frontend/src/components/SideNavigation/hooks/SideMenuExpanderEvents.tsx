import { useNavigationStore } from "../store/NavigationStore";

export const useSideMenuExpanderEvents = () => {
    const {menuItems,setMenuItems} = useNavigationStore();
    const onClickHandlerClose = (event: React.MouseEvent<HTMLButtonElement> | undefined, code: string) => {
        const menuitems = menuItems.map(x => {
            if (x.code === code) x.open = false;
            return x;
        })
        setMenuItems(menuitems)
    }
    const onClickHandlerOpen = (event: React.MouseEvent<HTMLButtonElement> | undefined, code: string) => {
        const menuitems = menuItems.map(x => {
            if (x.code === code) x.open = true;
            return x;
        })
        setMenuItems(menuitems)
    }
    return {
        onClickHandlerClose,
        onClickHandlerOpen,
    }
}