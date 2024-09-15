import { useNavigationStore } from "../store/NavigationStore";

export const useSideMenuEvents = () => {
    const {expanded,setExpanded} = useNavigationStore();
    const onClickHandlerExpander = () => {
        setExpanded(!expanded);
    }
    return {
        onClickHandlerExpander,
    }
}