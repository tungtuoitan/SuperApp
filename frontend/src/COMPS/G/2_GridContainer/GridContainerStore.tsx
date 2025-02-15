
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Pr} from "../GTypes";
import {GridRowSelectionModel} from "@mui/x-data-grid";
export interface GridContainerContextData {
    allPrs: Pr[];
    setAllPrs: Dispatch<SetStateAction<any[]>>;
    isFirstTime: boolean;
    setIsFirstTime: Dispatch<SetStateAction<boolean>>;
    rowSelectionModel: GridRowSelectionModel;
    setRowSelectionModel: Dispatch<SetStateAction<GridRowSelectionModel>>;
    refreshGrid: boolean;
    setRefreshGrid: Dispatch<SetStateAction<boolean>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    totalRows: number;
    setTotalRows: Dispatch<SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    loadingGrid: boolean;
    setLoadingGrid: Dispatch<SetStateAction<boolean>>;
    currentHoveringRow: string | null;
    setCurrentHoveringRow: Dispatch<SetStateAction<string | null>>;

};

export const GridContainerContextDefaultValue: GridContainerContextData = {
    allPrs: [],
    setAllPrs: () => { },
    isFirstTime: true,
    setIsFirstTime: () => { },
    rowSelectionModel: [],
    setRowSelectionModel: () => { },
    refreshGrid: false,
    setRefreshGrid: () => { },
    pageSize: 100,
    setPageSize: () => { },
    totalRows: 0,
    setTotalRows: () => { },
    currentPage: 0,
    setCurrentPage: () => { },
    searchText: '',
    setSearchText: () => { }, 
    loadingGrid: true,
    setLoadingGrid: () => { },
    currentHoveringRow: null,
    setCurrentHoveringRow: () => { },
};

const GridContainerStore = createContext<GridContainerContextData>(GridContainerContextDefaultValue);
export const useGridContainerStore = () => useContext(GridContainerStore);

export const GridContainerProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [allPrs, setAllPrs] = useState<Pr[]>([]);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    const [refreshGrid, setRefreshGrid] = useState<boolean>(false);
    
    const [pageSize, setPageSize] = useState<number>(100);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [loadingGrid, setLoadingGrid] = useState<boolean>(true);
    const [currentHoveringRow, setCurrentHoveringRow] = useState<string | null>(null);

    return (
        <GridContainerStore.Provider
            value={{
                allPrs,
                setAllPrs,
                isFirstTime,
                setIsFirstTime,
                rowSelectionModel,
                setRowSelectionModel,
                refreshGrid,
                setRefreshGrid,
                pageSize,
                setPageSize,
                totalRows,
                setTotalRows,
                currentPage,
                setCurrentPage,
                searchText,
                setSearchText,
                loadingGrid,
                setLoadingGrid,
                currentHoveringRow,
                setCurrentHoveringRow
            }}>
            {children}
        </GridContainerStore.Provider>
    )
}