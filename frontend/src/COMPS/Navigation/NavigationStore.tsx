
import { PopoverPosition } from "@mui/material";
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {SAModule} from "./Nty";
import {sitemaps} from "./Nhe";

export interface NavigationContextData {
    tabValue: number;
    setTabValue: Dispatch<SetStateAction<number>>;
    version: string;
    setVersion: Dispatch<SetStateAction<string>>;
    moduleName: string;
    setModuleName: Dispatch<SetStateAction<string>>;
    expanded: boolean | null | undefined;
    setExpanded: Dispatch<SetStateAction<boolean | null | undefined>>;
    sideMenuOpen: boolean | null | undefined;
    setSideMenuOpen: Dispatch<SetStateAction<boolean | null | undefined>>;
    sideMenuOpen2: boolean | null | undefined;
    setSideMenuOpen2: Dispatch<SetStateAction<boolean | null | undefined>>;
    popoverPosition: PopoverPosition | null;
    setPopoverPosition: Dispatch<SetStateAction<PopoverPosition | null>>;
    selectedSubMenuItem: SAModule | null | undefined;
    setSelectedSubMenuItem: Dispatch<SetStateAction<SAModule | null | undefined>>;
    menuItems: SAModule[];
    setMenuItems: Dispatch<SetStateAction<SAModule[]>>;
    currentSectionTitle: string;
    setcurrentSectionTitle: Dispatch<SetStateAction<string>>;
    isPopoverMouse: boolean | null | undefined;
    setIsPopoverMouse: Dispatch<SetStateAction<boolean | null | undefined>>;
    sideNavigationRef: React.MutableRefObject<HTMLDivElement | null>;
    topNavigationRef: React.MutableRefObject<HTMLElement | null>;
    bodyWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
    source: string;
    setSource: Dispatch<SetStateAction<string>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export const navigationContextDefaultValue: NavigationContextData = {
    tabValue: 0,
    setTabValue: () => { },
    version: '',
    setVersion: () => { },
    moduleName: '',
    setModuleName: () => { },
    expanded: false,
    setExpanded: () => { },
    sideMenuOpen: false,
    setSideMenuOpen: () => { },
    sideMenuOpen2: false,
    setSideMenuOpen2: () => { },
    popoverPosition: null,
    setPopoverPosition: () => { },
    selectedSubMenuItem: null,
    setSelectedSubMenuItem: () => { },
    menuItems: [],
    setMenuItems: () => { },
    currentSectionTitle: '',
    setcurrentSectionTitle: () => { },
    isPopoverMouse: false,
    setIsPopoverMouse: () => { },
    sideNavigationRef: {current:null},
    topNavigationRef: {current:null},
    bodyWrapperRef: {current:null},
    source: '',
    setSource: () => { },
    loading: false,
    setLoading: () => {},
};
const NavigationStore = createContext<NavigationContextData>(navigationContextDefaultValue);

export const useNavigationStore = () => useContext(NavigationStore);

export const NavigationProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [version, setVersion] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [expanded, setExpanded] = useState<boolean | null | undefined>(false);
    const [sideMenuOpen, setSideMenuOpen] = useState<boolean | null | undefined>(false);
    const [sideMenuOpen2, setSideMenuOpen2] = useState<boolean | null | undefined>(false);
    const [popoverPosition, setPopoverPosition] = useState<PopoverPosition | null>(null);
    const [selectedSubMenuItem, setSelectedSubMenuItem] = useState<SAModule | null | undefined>(null);
    const [menuItems, setMenuItems] = useState<SAModule[]>(sitemaps);
    const [currentSectionTitle, setcurrentSectionTitle] = useState('');
    const [isPopoverMouse, setIsPopoverMouse] = useState<boolean | null | undefined>(false);
    const sideNavigationRef = useRef<HTMLDivElement | null>(null);
    const topNavigationRef = useRef<HTMLDivElement | null>(null);
    const bodyWrapperRef = useRef<HTMLDivElement>(null);
    const [source, setSource] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <NavigationStore.Provider
            value={{
                tabValue,
                setTabValue,
                version,
                setVersion,
                moduleName,
                setModuleName,
                expanded,
                setExpanded,
                sideMenuOpen,
                setSideMenuOpen,
                sideMenuOpen2,
                setSideMenuOpen2,
                popoverPosition,
                setPopoverPosition,
                selectedSubMenuItem,
                setSelectedSubMenuItem,
                menuItems,
                setMenuItems,
                isPopoverMouse,
                setIsPopoverMouse,
                currentSectionTitle,
                setcurrentSectionTitle,
                sideNavigationRef,
                topNavigationRef,
                bodyWrapperRef,
                source,
                setSource,
                loading,
                setLoading,
            }}>
            {children}
        </NavigationStore.Provider>
    )
}