import {GridColDef} from "@mui/x-data-grid";
import {Pr} from "../PrTypes";
import {Line, Nink} from "./2ui";
import {displayCDate} from "./2he";




export const pridColumns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 20 },
    {
        field: "info",
        headerName: "Info",
        width: 300,
        renderCell: (params) => {
            const r = params.row as Pr;
            return (<div style={{display: 'flex', flexDirection: 'column', lineHeight: 'normal', justifyContent: 'center', alignItems: 'left', padding: '10px 10px 10px 0', fontSize:'12px'}} >
                {Nink(r.name, '')}
                {Line('Parent ID', r.parentId)}
                {Line('Priority', r.prioriC)}
                {Line('Status', r.statusC)}
            </div>)
        },  
    },
    {
        field: "sub-info",
        headerName: "Sub Info",
        width: 300,
        renderCell: (params) => {
            const r = params.row as Pr
            return (<div style={{display: 'flex', flexDirection: 'column', lineHeight: 'normal', justifyContent: 'center', alignItems: 'left', padding: '10px 10px 10px 0', fontSize:'12px'}} >
                {Line('Types', r.types)}
                {Line('Repeat Type', r.repeatType)}
                {Line('Time Start', displayCDate(r.timeStart))}
                {Line('Time End', displayCDate(r.timeEnd??''))}
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
        field: "desc",
        headerName: "Desc",
        width: 300,
        editable: true,
    },
];