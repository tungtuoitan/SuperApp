import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { usePeridContainerHelpers } from "./PeridContainerHelpers";
import {usePridContainerStore} from "../2_PridContainer/PridContainerStore";

type PeridContainerProps = {
    petailId: number;
}
export default function PeridContainer(props: PeridContainerProps) {
    const { allPrs } = usePridContainerStore(); 
    const { peridColumns } = usePeridContainerHelpers(); 
    const pr = allPrs.find(pr => pr.id === props.petailId);

    return (
        <div id="PeridContainer" style={{ width: "100%", height: "100%", fontSize: "12px" }}>
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
                    rows={pr?.pesults ?? []}
                    columns={peridColumns}
                    rowHeight={67}
                    // checkboxSelection
                    // disableRowSelectionOnClick
                    // rowSelectionModel={rowSelectionModel}
                    // isRowSelectable={(params: GridRowParams) => !prAllTabIds.includes(toNumber(params.row.id))}
                    // onRowSelectionModelChange={newX => setRowSelectionModel(newX)}
                />
            </div>
        </div>
    );
}
