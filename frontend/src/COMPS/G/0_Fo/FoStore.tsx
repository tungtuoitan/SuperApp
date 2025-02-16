
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Fo} from "./FoTypes";
import {toSid} from "../GHelpers";
export interface FoContextData {
    allFos: Fo[];
    setAllFos: Dispatch<SetStateAction<any[]>>;
    refreshFo: boolean;
    setRefreshFo: Dispatch<SetStateAction<boolean>>;
    loadingFos: boolean;
    setLoadingFos: Dispatch<SetStateAction<boolean>>;
    curFoId: string;
    setCurFoId: Dispatch<SetStateAction<string>>;
    lastFoId: string;
    setLastFoId: Dispatch<SetStateAction<string>>;
    openingFoIds: string[];
    setOpeningFoIds: Dispatch<SetStateAction<string[]>>;
};

export const FoContextDefaultValue: FoContextData = {
    allFos: [],
    setAllFos: () => { },
    refreshFo: false,
    setRefreshFo: () => { },
    loadingFos: true,
    setLoadingFos: () => { },
    curFoId: toSid('Fo', 1),
    setCurFoId: () => { },
    lastFoId: toSid('Fo', 1),
    setLastFoId: () => { },
    openingFoIds: [],
    setOpeningFoIds: () => { },
};

const FoStore = createContext<FoContextData>(FoContextDefaultValue);
export const useFoStore = () => useContext(FoStore);

export const FoProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allFos, setAllFos] = useState<Fo[]>([]);
    const [refreshFo, setRefreshFo] = useState<boolean>(false);
    const [loadingFos, setLoadingFos] = useState<boolean>(true);
    const [curFoId, setCurFoId] = useState<string>(toSid('Fo', 1));
    const [lastFoId, setLastFoId] = useState<string>(toSid('Fo', 0));
    const [openingFoIds, setOpeningFoIds] = useState<string[]>([]);

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
                openingFoIds,
                setOpeningFoIds,
            }}>
            {children}
        </FoStore.Provider>
    )
}