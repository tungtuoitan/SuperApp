import { usePrOptionGridHelper } from "./PrOptionGridHelper";
import { Paper, styled, Box } from "@mui/material";
import { usePrOptionGridEvents } from "./PrOptionGridEvents";
import {usePrFilterStore} from "../PrFilterStore";
import {DataGrid} from "@mui/x-data-grid";
import {SelectionModel} from "../6ty";

export const FilterGridRoot = styled('div')({
    backgroundColor: '#fff',
    height: '100%',
})
export const FilterGridBox = styled(Box)({
    width: '100%', 
    '& .MuiDataGrid-root .MuiDataGrid-cell': {
        borderBottom: 'unset!important',
    },
    '& .top': {
        backgroundColor: '#fff',
        zIndex: 9999,
    },
    '& .MuiPaper-root': {
        marginRight: '0!important',
    },
    "& .MuiDataGrid-main .MuiDataGrid-columnsContainer": {
        maxHeight: '40px!important',   // Unsetting max height
        minHeight: '40px!important',    // Setting minimum height
    },
    '& .MuiDataGrid-columnHeader--sortable.MuiDataGrid-columnHeader': {
        display: 'none',
    },
})

export const PrOptionGrid = () => {
    const { dropdownGridColumns } = usePrOptionGridHelper();
    const { onSelectionModelChangeHandlerFilterGrid } = usePrOptionGridEvents();
    const { filterRows, filterLoading, filterIds, filterSearchText } = usePrFilterStore();

    return (
        <div className="filter-grid-wrapper" style={{
            display: 'flex',
            flexFlow: 'column',
            height: '100%',
        }}>
            <FilterGridRoot>
                <Paper
                    sx={{ marginRight: 3, paddingRight: 0, width: "400px", height: '100%' }}
                    elevation={16}>
                    <FilterGridBox className="filter-option-grid">
                        <DataGrid
                            rows={filterRows}
                            columns={dropdownGridColumns}
                            //
                            onRowSelectionModelChange={newX => onSelectionModelChangeHandlerFilterGrid(newX as SelectionModel)}
                            rowHeight={30}
                            loading={filterLoading}
                            checkboxSelection
                            rowSelectionModel={filterIds}
                            getRowId={(row: any) => row.code}
                            hideFooter
                            getRowClassName={(params) =>  'normal-pr-option-row' }
                        />
                    </FilterGridBox>
                </Paper>
            </FilterGridRoot>
        </div>
    )
}