
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
    refreshPrid: boolean;
    setRefreshPrid: Dispatch<SetStateAction<boolean>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    totalRows: number;
    setTotalRows: Dispatch<SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    loadingPrid: boolean;
    setLoadingPrid: Dispatch<SetStateAction<boolean>>;
    currentHoveringRow: number | null;
    setCurrentHoveringRow: Dispatch<SetStateAction<number | null>>;

};

export const PridContainerContextDefaultValue: PridContainerContextData = {
    allPrs: [],
    setAllPrs: () => { },
    isFirstTime: true,
    setIsFirstTime: () => { },
    rowSelectionModel: [],
    setRowSelectionModel: () => { },
    refreshPrid: false,
    setRefreshPrid: () => { },
    pageSize: 100,
    setPageSize: () => { },
    totalRows: 0,
    setTotalRows: () => { },
    currentPage: 0,
    setCurrentPage: () => { },
    searchText: '',
    setSearchText: () => { },
    loadingPrid: true,
    setLoadingPrid: () => { },
    currentHoveringRow: null,
    setCurrentHoveringRow: () => { },
};

const PridContainerStore = createContext<PridContainerContextData>(PridContainerContextDefaultValue);
export const usePridContainerStore = () => useContext(PridContainerStore);

export const PridContainerProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allPrs, setAllPrs] = useState<Pr[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    const [refreshPrid, setRefreshPrid] = useState<boolean>(false);
    
    const [pageSize, setPageSize] = useState<number>(100);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [loadingPrid, setLoadingPrid] = useState<boolean>(true);
    const [currentHoveringRow, setCurrentHoveringRow] = useState<number | null>(null);

    return (
        <PridContainerStore.Provider
            value={{
                allPrs,
                setAllPrs,
                isFirstTime,
                setIsFirstTime,
                rowSelectionModel,
                setRowSelectionModel,
                refreshPrid,
                setRefreshPrid,
                pageSize,
                setPageSize,
                totalRows,
                setTotalRows,
                currentPage,
                setCurrentPage,
                searchText,
                setSearchText,
                loadingPrid,
                setLoadingPrid,
                currentHoveringRow,
                setCurrentHoveringRow
            }}>
            {children}
        </PridContainerStore.Provider>
    )
}