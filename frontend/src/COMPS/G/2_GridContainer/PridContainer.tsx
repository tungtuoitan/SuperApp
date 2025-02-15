import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { usePridContainerStore } from "./PridContainerStore";
import { usePridContainerHelpers } from "./PridContainerHelpers";
import {usePrAllTabsStore} from "../1_GAllTabs/PrAllTabsStore";
import {toNumber} from "lodash";
import {DialogContainer} from "../../CommonHelpers/3_DialogContainer";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {ADiContent} from "../5_Adi/ADiContent";
import {truncateText} from "./2he";
import {useADiStore} from "../5_Adi/ADiStore";

export default function PridContainer() {
    const { allPrs, rowSelectionModel, setRowSelectionModel, refreshPrid } = usePridContainerStore(); 
    const { aDia, setADia } = useADiStore(); 
    const { pridColumns } = usePridContainerHelpers(); 
    const { prAllTabIds } = usePrAllTabsStore();
    const _Dselector = helperMUIcss.getDialogCSSSelector();
    const aDiPr = allPrs.find(pr => pr.id === aDia?.pesult.prId);

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
                    columns={pridColumns()}
                    rowHeight={85}
                    loading={refreshPrid}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowSelectionModel={rowSelectionModel}
                    isRowSelectable={(params: GridRowParams) => !prAllTabIds.includes(toNumber(params.row.id))}
                    onRowSelectionModelChange={newX => setRowSelectionModel(newX)}
                    getRowClassName={(params) => {
                        return prAllTabIds.includes('Pr' + toNumber(params.id)) ? "opening-pr-row" : "normal-pr-row";
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
