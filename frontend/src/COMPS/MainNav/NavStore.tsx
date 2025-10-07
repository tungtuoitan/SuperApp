
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";

export interface NavigationContextData {
    sideNavigationRef: React.MutableRefObject<HTMLDivElement | null>;
    bodyWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
};

export const navContextDefaultValue: NavigationContextData = {
    sideNavigationRef: {current:null},
    bodyWrapperRef: {current:null},
    expanded: false,
    setExpanded: () => {},
};
const NavigationStore = createContext<NavigationContextData>(navContextDefaultValue);

export const useNavigationStore = () => useContext(NavigationStore);

export const NavProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const sideNavigationRef = useRef<HTMLDivElement | null>(null);
    const bodyWrapperRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <NavigationStore.Provider
            value={{
                sideNavigationRef,
                bodyWrapperRef,
                expanded,
                setExpanded,
            }}>
            {children}
        </NavigationStore.Provider>
    )
}