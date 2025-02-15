import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { useGridContainerStore } from "./GridContainerStore";
import { useGridContainerHelpers } from "./GridContainerHelpers";
import {useGAllTabsStore} from "../1_GAllTabs/GAllTabsStore";
import {toNumber} from "lodash";
import {DialogContainer} from "../../CommonHelpers/3_DialogContainer";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {ADiContent} from "../5_Adi/ADiContent";
import {truncateText} from "./2he";
import {useADiStore} from "../5_Adi/ADiStore";
import {useFoStore} from "../0_Fo/FoStore";

export default function GridContainer() {
    const { allPrs, rowSelectionModel, setRowSelectionModel, refreshGrid } = useGridContainerStore(); 
    const { aDia, setADia } = useADiStore(); 
    const { gridColumns, getAllGitems } = useGridContainerHelpers(); 
    const { gAllTabIds } = useGAllTabsStore();
    const _Dselector = helperMUIcss.getDialogCSSSelector();

    const aDiPr = allPrs.find(pr => pr.id === aDia?.pesult.prId);



    return (
        <div id="GridContainer" style={{ width: "100%", height: "100%", fontSize: "12px" }}>
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
                    rows={getAllGitems()}
                    columns={gridColumns()}
                    rowHeight={85}
                    loading={refreshGrid}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowSelectionModel={rowSelectionModel}
                    isRowSelectable={(params: GridRowParams) => !gAllTabIds.includes(toNumber(params.row.id))}
                    onRowSelectionModelChange={newX => setRowSelectionModel(newX)}
                    getRowClassName={(params) => {
                        return gAllTabIds.includes('Pr' + toNumber(params.id)) ? "opening-pr-row" : "normal-pr-row";
                    }}
                />
            </div>

            <DialogContainer
                title={truncateText('PR: ' + (aDiPr?.name ?? ''),50)}
                open={aDia?.open ?? false}
                onClose={() => setADia(null)}
                onClickClose={() => setADia(null)}

                children={<ADiContent />}
                sx={{
                    [_Dselector.div2paper]: {
                        width: '800px', height: '560px',
                    },
                }}
            ></DialogContainer>
        </div>
    );
}
