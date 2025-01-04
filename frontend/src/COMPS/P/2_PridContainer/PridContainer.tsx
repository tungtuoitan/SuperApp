import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {usePridStore} from "./PridContainerStore";
import {pridColumns} from "./PridContainerHelpers";


export default function PridContainer() {
    const { allPrs } = usePridStore();

    return (
        <div id="PridContainer" style={{ width: "100%", height: "100%", fontSize: "12px" }}>
            {/* toolbar here */}
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
                    rowHeight={85}
                    columns={pridColumns}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
}
