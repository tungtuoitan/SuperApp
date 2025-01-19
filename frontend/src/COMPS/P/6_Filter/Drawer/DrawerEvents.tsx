import {useMainFilterDrawerStore} from "./DrawerStore";

export const useMainFilterDrawerEvents = () => {
    const {setMainOpenFilterDrawer} = useMainFilterDrawerStore();
    const onCloseHandlerMainFilterDrawer = () => {
        setMainOpenFilterDrawer(false);
    }
    return {
        onCloseHandlerMainFilterDrawer,
    }
}