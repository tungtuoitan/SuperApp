import { SxProps } from "@mui/material";
import type { GridApi } from "@mui/x-data-grid";
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Note } from "../../types/models";
import { DialogProps } from "../../types/common.types";

export interface NoteContextData {
    noteMasterContainerRef: React.RefObject<HTMLDivElement>;

    // Core notes data from useNotes hook
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    
    // Note detail management
    noteDetail: Note;
    setNoteDetail: Dispatch<SetStateAction<Note>>;
    noteId: number;
    setNoteId: Dispatch<SetStateAction<number>>;
    
    // Search functionality
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    searchLoading: boolean;
    setSearchLoading: Dispatch<SetStateAction<boolean>>;
    searchInputRef: React.RefObject<HTMLInputElement>;
    
    // Grid management
    loadingMasterGrid: boolean;
    setLoadingMasterGrid: Dispatch<SetStateAction<boolean>>;
    refreshMasterGrid: boolean;
    setRefreshMasterGrid: Dispatch<SetStateAction<boolean>>;
    apiRef: React.MutableRefObject<GridApi | null>;
    
    // Pagination
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    totalRows: number;
    setTotalRows: Dispatch<SetStateAction<number>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    
    // Dialog management
    openView: boolean;
    setOpenView: Dispatch<SetStateAction<boolean>>;
    previewDialogPropsNote: DialogProps;
    setPreviewDialogPropsNote: Dispatch<SetStateAction<DialogProps>>;
    isPreviewDialogLoadingNote: boolean;
    setIsPreviewDialogLoadingNote: Dispatch<SetStateAction<boolean>>;
    noteDetailDialogRef: React.RefObject<HTMLDivElement> | undefined;
    noteDetailDialogSxProps: SxProps;
    setNoteDetailDialogSxProps: Dispatch<SetStateAction<SxProps>>;
}

export const noteContextDefaultValue: NoteContextData = {
    noteMasterContainerRef: { current: null },

    // Core notes data from useNotes hook
    notes: [],
    setNotes: () => { },
    loading: false,
    setLoading: () => { },
    error: null,
    setError: () => { },
    
    // Note detail management
    noteDetail: {} as Note,
    setNoteDetail: () => { },
    noteId: 0,
    setNoteId: () => { },
    
    // Search functionality
    searchText: '',
    setSearchText: () => { },
    searchLoading: false,
    setSearchLoading: () => { },
    searchInputRef: { current: null },
    
    // Grid management
    loadingMasterGrid: false,
    setLoadingMasterGrid: () => { },
    refreshMasterGrid: false,
    setRefreshMasterGrid: () => { },
    apiRef: { current: null },
    
    // Pagination
    currentPage: 1,
    setCurrentPage: () => { },
    totalRows: 0,
    setTotalRows: () => { },
    pageSize: 100,
    setPageSize: () => { },
    
    // Dialog management
    openView: false,
    setOpenView: () => { },
    previewDialogPropsNote: {} as DialogProps,
    setPreviewDialogPropsNote: () => { },
    isPreviewDialogLoadingNote: false,
    setIsPreviewDialogLoadingNote: () => { },
    noteDetailDialogRef: { current: null },
    noteDetailDialogSxProps: {} as SxProps,
    setNoteDetailDialogSxProps: () => { },
}

export const NoteStore = createContext<NoteContextData>(noteContextDefaultValue);

export const useNoteStore = () => useContext(NoteStore);

export const NoteProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const noteMasterContainerRef = useRef<HTMLDivElement>(null);

    // Core notes data from useNotes hook
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // Note detail management
    const [noteDetail, setNoteDetail] = useState<Note>({} as Note);
    const [noteId, setNoteId] = useState<number>(0);
    
    // Search functionality
    const [searchText, setSearchText] = useState<string>('');
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Grid management
    const [loadingMasterGrid, setLoadingMasterGrid] = useState<boolean>(false);
    const [refreshMasterGrid, setRefreshMasterGrid] = useState<boolean>(false);
    const apiRef = useRef<GridApi | null>(null);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(100);
    
    // Dialog management
    const [openView, setOpenView] = useState<boolean>(false);
    const [previewDialogPropsNote, setPreviewDialogPropsNote] = useState<DialogProps>({} as DialogProps);
    const [isPreviewDialogLoadingNote, setIsPreviewDialogLoadingNote] = useState<boolean>(false);
    const noteDetailDialogRef = useRef<HTMLDivElement | null>(null);
    const [noteDetailDialogSxProps, setNoteDetailDialogSxProps] = useState<SxProps>({} as SxProps);
    
    return (
        <NoteStore.Provider
            value={{
                noteMasterContainerRef,
                
                // Core notes data from useNotes hook
                notes,
                setNotes,
                loading,
                setLoading,
                error,
                setError,
                
                // Note detail management
                noteDetail,
                setNoteDetail,
                noteId,
                setNoteId,
                
                // Search functionality
                searchText,
                setSearchText,
                searchLoading,
                setSearchLoading,
                searchInputRef,
                
                // Grid management
                loadingMasterGrid,
                setLoadingMasterGrid,
                refreshMasterGrid,
                setRefreshMasterGrid,
                apiRef,
                
                // Pagination
                currentPage,
                setCurrentPage,
                totalRows,
                setTotalRows,
                pageSize,
                setPageSize,
                
                // Dialog management
                openView,
                setOpenView,
                previewDialogPropsNote,
                setPreviewDialogPropsNote,
                isPreviewDialogLoadingNote,
                setIsPreviewDialogLoadingNote,
                noteDetailDialogRef,
                noteDetailDialogSxProps,
                setNoteDetailDialogSxProps,
            }}>
            {children}
        </NoteStore.Provider>
    );
};