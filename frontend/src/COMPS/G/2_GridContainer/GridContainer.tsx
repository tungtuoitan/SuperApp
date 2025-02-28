import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { useGridContainerStore } from "./GridContainerStore";
import { useGridContainerHelpers } from "./GridContainerHelpers";
import {useGAllTabsStore} from "../1_GAllTabs/GAllTabsStore";
import {DialogContainer} from "../../CommonHelpers/3_DialogContainer";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {ADiContent} from "../5_Adi/ADiContent";
import {truncateText} from "./2he";
import {useADiStore} from "../5_Adi/ADiStore";
import {useEffect} from "react";
import {RialogContent} from "../10_Rialog/RialogContent";
import {useRialogHelpers} from "../10_Rialog/RialogHelpers";
import {useRialogStore} from "../10_Rialog/RialogStore";
import {sr} from "../../S/TLConstants";
import {useSnackbar} from "notistack";

export default function GridContainer() {
    const { allPrs, rowSelectionModel, setRowSelectionModel, refreshGrid,
     } = useGridContainerStore(); 
    const { aDia, setADia } = useADiStore(); 
    const { rialog, setRialog, reviewType } = useRialogStore(); 
    const { gridColumns, getAllGitems } = useGridContainerHelpers(); 
    const { gAllTabIds } = useGAllTabsStore();
    const _Dselector = helperMUIcss.getDialogCSSSelector();
    const aDiPr = allPrs.find(pr => pr.id === aDia?.pesult.prId);


    // Check and notify
     const {enqueueSnackbar} = useSnackbar();
    
        useEffect(() => {
            if(getAllGitems('inprogress-review-today').length>0)
                enqueueSnackbar(`There are ${getAllGitems('inprogress-review-today').length} Prs you need to review today`, {
                    variant: 'error', autoHideDuration:1000000,
            })
            if(getAllGitems('inprogress-review-today').length>10)
                enqueueSnackbar(`Review List is too long!`, {variant: 'warning', autoHideDuration:10000})
        }, [allPrs]);




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
                    opacity: refreshGrid ? 0.5 : 1,
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
                    isRowSelectable={(params: GridRowParams) => !gAllTabIds.includes(params.row.id)}
                    onRowSelectionModelChange={newX =>  setRowSelectionModel(newX)}
                    
                    getRowClassName={(params) => {
                        return gAllTabIds.includes(params.id as string) ? "opening-pr-row" : "normal-pr-row";
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': { display: 'none' } // Ẩn header bằng CSS
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
            <DialogContainer
                title={truncateText(`Review: ${
                    `${
                        reviewType === sr.allPr.c ? sr.allPr.d :
                        reviewType === sr.folderPr.c ? sr.folderPr.d :
                        reviewType === sr.allKnowledge.c ? sr.allKnowledge.d :
                        reviewType === sr.folderKnowledge.c ? sr.folderKnowledge.d : ''
                    }`
                }`,50)}
                open={rialog?.open ?? false}
                onClose={() => setRialog(null)}
                onClickClose={() => setRialog(null)}

                children={<RialogContent />}
                sx={{
                    [_Dselector.div2paper]: {
                        width: '800px', height: '560px',
                    },
                }}
            ></DialogContainer>
        </div>
    );
}
