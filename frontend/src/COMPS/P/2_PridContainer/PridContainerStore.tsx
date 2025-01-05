
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Pr} from "../PrTypes";
import {GridRowSelectionModel} from "@mui/x-data-grid";
export interface PridContainerContextData {
    allPrs: Pr[];
    setAllPrs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
    rowSelectionModel: GridRowSelectionModel;
    setRowSelectionModel: Dispatch<SetStateAction<GridRowSelectionModel>>;
};

export const PridContainerContextDefaultValue: PridContainerContextData = {
    allPrs: [],
    setAllPrs: () => { },
    isFirstTime: true,
    setIsFirstTime: () => { },
    rowSelectionModel: [],
    setRowSelectionModel: () => { },
};

const PridContainerStore = createContext<PridContainerContextData>(PridContainerContextDefaultValue);
export const usePridContainerStore = () => useContext(PridContainerStore);

export const PridContainerProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allPrs, setAllPrs] = useState<Pr[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    return (
        <PridContainerStore.Provider
            value={{
                allPrs,
                setAllPrs,
                isFirstTime,
                setIsFirstTime,
                rowSelectionModel,
                setRowSelectionModel,
            }}>
            {children}
        </PridContainerStore.Provider>
    )
}