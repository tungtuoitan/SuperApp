/**
 * Navigation Context
 * Global navigation state management for sidebar navigation, body wrapper, 
 * and selected menu items across the application
 */

import { createContext, useContext, useState, useRef } from 'react';
import type { PropsWithChildren } from 'react';

/**
 * Navigation context interface defining the shape of navigation state and actions
 */
export interface NavigationContextValue {
    sideNavigationRef: React.MutableRefObject<HTMLDivElement | null>;
    bodyWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    toggleNavigation: () => void;
    selectedItemId: string | null;
    setSelectedItemId: (id: string) => void;
}

export const NAVIGATION_CONTEXT_DEFAULT_VALUE: NavigationContextValue = {
    sideNavigationRef: { current: null },
    bodyWrapperRef: { current: null },
    expanded: false,
    setExpanded: () => {},
    toggleNavigation: () => {},
    selectedItemId: null,
    setSelectedItemId: () => {},
};

const NavigationContext = createContext<NavigationContextValue>(
    NAVIGATION_CONTEXT_DEFAULT_VALUE
);

/**
 * Custom hook to access navigation context
 * @throws {Error} When used outside of NavProvider
 * @returns {NavigationContextValue} Navigation context value with state and actions
 */
export const useNavigationStore = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigationStore must be used within NavProvider');
    }
    return context;
};

/**
 * Navigation provider component that manages navigation state for the entire application
 * Provides sidebar expansion state, navigation references, and selected menu item tracking
 */
export const NavProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const sideNavigationRef = useRef<HTMLDivElement | null>(null);
    const bodyWrapperRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const toggleNavigation = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <NavigationContext.Provider
            value={{
                sideNavigationRef,
                bodyWrapperRef,
                expanded,
                setExpanded,
                toggleNavigation,
                selectedItemId,
                setSelectedItemId,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};
