import { createContext, Dispatch, FC, SetStateAction, useContext, useRef, useState } from "react";
export interface MainFilterDrawerContextData {
    openMainFilterDrawer: boolean,
    setMainOpenFilterDrawer: Dispatch<SetStateAction<boolean>>,
    mainFilterDrawerRef: React.RefObject<HTMLDivElement>;
}

export const MainFilterDrawerDefaultValue: MainFilterDrawerContextData = {
    openMainFilterDrawer: false,
    setMainOpenFilterDrawer: () => {},
    mainFilterDrawerRef: {current: null}
}

export const MainFilterDrawerStore = createContext<MainFilterDrawerContextData>(MainFilterDrawerDefaultValue);

export const useMainFilterDrawerStore = () => useContext(MainFilterDrawerStore);

interface MainFilterDrawerProviderProps {
    children: React.ReactNode;
}

export const MainFilterDrawerProvider: FC<MainFilterDrawerProviderProps> = ({children}) => {
    const [openMainFilterDrawer, setMainOpenFilterDrawer] = useState<boolean>(false);
    const mainFilterDrawerRef = useRef<HTMLDivElement>(null);
    return (
        <MainFilterDrawerStore.Provider
            value={{
                openMainFilterDrawer,
                setMainOpenFilterDrawer,
                mainFilterDrawerRef
            }}>
            {children}
        </MainFilterDrawerStore.Provider>
    )
}