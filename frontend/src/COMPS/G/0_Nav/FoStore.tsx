
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Fo} from "./FoTypes";
export interface FoContextData {
    allFos: Fo[];
    setAllFos: Dispatch<SetStateAction<any[]>>;
    refreshFo: boolean;
    setRefreshFo: Dispatch<SetStateAction<boolean>>;
    loadingFos: boolean;
    setLoadingFos: Dispatch<SetStateAction<boolean>>;
    curFoId: number;
    setCurFoId: Dispatch<SetStateAction<number>>;
    lastFoId: number;
    setLastFoId: Dispatch<SetStateAction<number>>;
};

export const FoContextDefaultValue: FoContextData = {
    allFos: [],
    setAllFos: () => { },
    refreshFo: false,
    setRefreshFo: () => { },
    loadingFos: true,
    setLoadingFos: () => { },
    curFoId: 1,
    setCurFoId: () => { },
    lastFoId: 1,
    setLastFoId: () => { },
};

const FoStore = createContext<FoContextData>(FoContextDefaultValue);
export const useFoStore = () => useContext(FoStore);

export const FoProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allFos, setAllFos] = useState<Fo[]>([]);
    const [refreshFo, setRefreshFo] = useState<boolean>(false);
    const [loadingFos, setLoadingFos] = useState<boolean>(true);
    const [curFoId, setCurFoId] = useState<number>(1);
    const [lastFoId, setLastFoId] = useState<number>(2); // 1 is the root

    return (
        <FoStore.Provider
            value={{
                allFos,
                setAllFos,
                refreshFo,
                setRefreshFo,
                loadingFos,
                setLoadingFos,
                curFoId,
                setCurFoId,
                lastFoId,
                setLastFoId,
            }}>
            {children}
        </FoStore.Provider>
    )
}