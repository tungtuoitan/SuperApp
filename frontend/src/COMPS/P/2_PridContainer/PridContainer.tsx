import { DataGrid } from "@mui/x-data-grid";
import {usePridContainerStore} from "./PridContainerStore";
import { usePridContainerHelpers} from "./PridContainerHelpers";


export default function PridContainer() {
    const { allPrs } = usePridContainerStore();
    const { pridColumns } = usePridContainerHelpers();

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
                    columns={pridColumns}
                    //
                    rowHeight={85}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
}
