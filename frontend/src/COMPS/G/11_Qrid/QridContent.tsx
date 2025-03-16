import {Button, Paper} from "@mui/material";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {useQridStore} from "./QridStore";
import {DataGrid} from "@mui/x-data-grid";
import {useGridContainerHelpers} from "../2_GridContainer/GridContainerHelpers";
import {useQridHelpers} from "./QridHelpers";
import {Fo} from "../0_Fo/FoTypes";

export function QridContent() {
    const { allPrs, setAllPrs } = useGridContainerStore();
    const { qridOn, setQridOn,reviewList, setReviewList, } = useQridStore();
    const { gridColumns } = useQridHelpers();
    const { getAllGitems } = useGridContainerHelpers();

  

    return (
        <Paper className='qridxx-container' 
        style={{
            display:qridOn ? 'flex': 'none', 
            width: '500px', height: '700px', padding: '20px', 
            position: 'absolute', top: 0, right:4, 
            zIndex: 10000000000000, 
            backgroundColor: 'white',
            boxShadow: '0 0 10px 0px rgba(0,0,0,0.8)',
        }}>
              <DataGrid
                rows={[{id:'Fo-0', name: 'Home', prioriC:'T1', level:0 } as Fo,...getAllGitems('all-folder')]}
                columns={gridColumns()}
                rowHeight={20}
                // loading={refreshGrid}
                disableRowSelectionOnClick
                hideFooter
                
                // getRowClassName={(params) => {
                //     return gAllTabIds.includes(params.id as string) ? "opening-pr-row" : "normal-pr-row";
                // }}
                sx={{
                    '& .MuiDataGrid-columnHeaders': { display: 'none' }, // Ẩn header bằng CSS
                    "& .MuiDataGrid-cell": {
                        padding: "0px", // Bỏ padding
                      },
                }} 
            />
        </Paper>
    )
}