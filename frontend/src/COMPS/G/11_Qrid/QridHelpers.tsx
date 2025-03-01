import {useQridStore} from "./QridStore";
import {GridColDef} from "@mui/x-data-grid";
import {DroppableRow} from "./DroppableRow";
import {Pr} from "../GTypes";


export const useQridHelpers = () => {
    const {qridOn, setQridOn} = useQridStore();
    
    
    const openQrid = (pr: Pr) => {
        setQridOn(!qridOn)
    }
        
     const gridColumns = ():GridColDef[] => { 
            return [
            {
                field: "info",
                headerName: "Info",
                width: 470,
                renderCell: (params) => {
                    const r = params.row
    
                    return (
                    <DroppableRow r={r}/>
                    )
                },
            },
        ]}
    


    return {
        openQrid,
        gridColumns
    }
}

