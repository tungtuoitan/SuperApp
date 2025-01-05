import { GridColDef } from "@mui/x-data-grid";
import {displayCDate} from "../2_PridContainer/2he";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {his} from "./4ty";import CancelIcon from '@mui/icons-material/Cancel';

export const usePeridContainerHelpers = () => {

    const peridColumns: GridColDef[] = [
        // { field: "id", headerName: "ID", width: 20 },
        {
            field: "id",
            headerName: "ID",
            width: 50,
        },
        {
            field: "time",
            headerName: "Time",
            width: 100,
            renderCell: (params) => {
                return <div>{displayCDate(params.row.time)}</div>
            }
        },
        {
            field: "pesult",
            headerName: "Pesult",
            width: 80,
            editable: false,
            renderCell: (params) => {
                return <div style={{display:'flex', alignItems:'center', height:'100%'}}>{params.row.pesultC === his.pass.c 
                        ? <CheckCircleIcon sx={{color:'green'}}/> 
                        : <CancelIcon sx={{color:'red'}}/>
                    }</div>
            },
        },
    
        {
            field: "note",
            headerName: "Note",
            width: 500,
            // editable: true,
            renderCell: (params) => {
                return <div style={{fontSize:'12px', lineHeight:'18px', width: '100%', height: '100%', whiteSpace: 'normal', display:'flex', alignContent: 'center'}}>
                        <p style={{fontSize:'12px', lineHeight:'18px', width: '100%', margin:0, whiteSpace: 'normal', display:'inline', alignContent: 'center'}}>
                            {params.row.note} 
                        </p>
                    </div>
            }
        },
    ];

    return {
        peridColumns,
    };
};


