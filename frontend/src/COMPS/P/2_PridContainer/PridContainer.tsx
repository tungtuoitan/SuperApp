import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {usePridStore} from "./PridContainerStore";
import {displayCDate} from "./2he";
import {Line} from "./2ui";


const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 20 },
    {
        field: "info",
        headerName: "Info",
        width: 300,
        renderCell: (params) => {
            const r = params.row;
            return (<div style={{display: 'flex', flexDirection: 'column', lineHeight: 'normal', justifyContent: 'center', alignItems: 'left', padding: '10px 10px 10px 0', fontSize:'12px'}} >
                <span style={{fontWeight:'bold', fontSize:'13px', marginBottom: '4px'}}>Name: {r.name}</span>
                {Line('ID', r.id)}
                {Line('Parent ID', r.parentId)}
                {Line('Description', r.description)}
            </div>)
        },
    },
    {
        field: "sub-info",
        headerName: "Sub Info",
        width: 300,
        renderCell: (params) => {
            const r = params.row;
            return (<div style={{display: 'flex', flexDirection: 'column', lineHeight: 'normal', justifyContent: 'center', alignItems: 'left', padding: '10px 10px 10px 0', fontSize:'12px'}} >
                {Line('Pype', r.pypes)}
                {Line('Repeat Type', r.repeatType)}
                {Line('Time Start', displayCDate(r.timeStart))}
                {Line('Time End', displayCDate(r.timeEnd??''))}
                {Line('Priority', r.prioriC)}
            </div>)
        },
    },
    {
        field: "history",
        headerName: "History",
        width: 800,
        editable: true,
        renderCell: (params) => <strong>{params.value}</strong>,
    },
    

    {
        field: "note",
        headerName: "Notes",
        width: 300,
        editable: true,
        renderCell: (params) => <strong>{params.value}</strong>,
    },

];

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
                    rowHeight={100}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
}
