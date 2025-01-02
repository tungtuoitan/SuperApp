
import { PopoverPosition } from "@mui/material";
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {SAModule} from "./Nty";
import {sitemaps} from "./Nhe";

export interface NavigationContextData {
    sideNavigationRef: React.MutableRefObject<HTMLDivElement | null>;
    bodyWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const navContextDefaultValue: NavigationContextData = {
    sideNavigationRef: {current:null},
    bodyWrapperRef: {current:null},
};
const NavigationStore = createContext<NavigationContextData>(navContextDefaultValue);

export const useNavigationStore = () => useContext(NavigationStore);

export const NavProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const sideNavigationRef = useRef<HTMLDivElement | null>(null);
    const bodyWrapperRef = useRef<HTMLDivElement>(null);

    return (
        <NavigationStore.Provider
            value={{
                sideNavigationRef,
                bodyWrapperRef,
            }}>
            {children}
        </NavigationStore.Provider>
    )
}