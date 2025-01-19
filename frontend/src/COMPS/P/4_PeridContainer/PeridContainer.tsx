import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { usePeridContainerHelpers } from "./PeridContainerHelpers";
import {usePridContainerStore} from "../2_PridContainer/PridContainerStore";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";

type PeridContainerProps = {
    petailId: number;
}
export default function PeridContainer(props: PeridContainerProps) {
    const { petailId } = props;
    const { allPrs } = usePridContainerStore(); 
    const { peridColumns } = usePeridContainerHelpers(); 
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find((petail:PetailForm) => petail.id === petailId) ?? ({} as PetailForm);

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
                    rows={petail?.pesults ?? []}
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
