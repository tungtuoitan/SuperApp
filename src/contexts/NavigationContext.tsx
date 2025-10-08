/**
 * Navigation Context
 * Global navigation state management
 */

import { createContext, useContext, useState, useRef, PropsWithChildren } from 'react';

export interface NavigationContextData {
  sideNavigationRef: React.MutableRefObject<HTMLDivElement | null>;
  bodyWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  toggleNavigation: () => void;
}

export const navContextDefaultValue: NavigationContextData = {
  sideNavigationRef: { current: null },
  bodyWrapperRef: { current: null },
  expanded: false,
  setExpanded: () => {},
  toggleNavigation: () => {},
};

const NavigationContext = createContext<NavigationContextData>(navContextDefaultValue);

export const useNavigationStore = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationStore must be used within NavProvider');
  }
  return context;
};

export const NavProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const sideNavigationRef = useRef<HTMLDivElement | null>(null);
  const bodyWrapperRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

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
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
