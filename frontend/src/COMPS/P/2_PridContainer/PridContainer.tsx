import { DataGrid, GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { usePridContainerStore } from "./PridContainerStore";
import { usePridContainerHelpers } from "./PridContainerHelpers";
import {usePrAllTabsStore} from "../1_PrAllTabs/PrAllTabsStore";
import {toNumber} from "lodash";

export default function PridContainer() {
    const { allPrs, rowSelectionModel, setRowSelectionModel } = usePridContainerStore(); 
    const { pridColumns } = usePridContainerHelpers(); 
    const { prAllTabIds, setPrAllTabIds, curTabIndex, setCurTabIndex } = usePrAllTabsStore();

    return (
        <div id="PridContainer" style={{ width: "100%", height: "100%", fontSize: "12px" }}>
            {/* Toolbar here */}
            <div
                id="GridFrame"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <DataGrid
                    rows={allPrs}
                    columns={pridColumns}
                    rowHeight={85}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowSelectionModel={rowSelectionModel}
                    isRowSelectable={(params: GridRowParams) => !prAllTabIds.includes(toNumber(params.row.id))}
                    onRowSelectionModelChange={newX => setRowSelectionModel(newX)}
                />
            </div>
        </div>
    );
}
