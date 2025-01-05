import { GridColDef } from "@mui/x-data-grid";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {usePrAllTabsStore} from "../1_PrAllTabs/PrAllTabsStore";
import {useSRsStore} from "../../S/8_SRs/SRsStore";

export const usePeridContainerHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const { prAllTabIds,setPrAllTabIds,curTabIndex, setCurTabIndex} = usePrAllTabsStore();
    const { sRs } = useSRsStore();

    const openPetail = (prId: number) => {
        // if (rowSelectionModel.includes(prId) || rowSelectionModel.includes(prId.toString())) return;
        // if (prAllTabIds.includes(prId)) {
        //     setCurTabIndex(prAllTabIds.indexOf(prId));
        // } 
        // else {
        //     setPrAllTabIds((prev) => {
        //         setCurTabIndex(prev.length); // tabIndex of that childEv is the last item on allTabIds, so it == prev.length
        //         return [...prev, prId];
        //     });
        // }

        // const ev = allPrs.filter((pr) => pr.id === prId)[0];
        // const petail: PetailForm = {
        //     id: ev.id,
        //     name: ev.name,
        //     parentId: ev.parentId ?? null,
        //     timeStart: ev.timeStart,
        //     timeEnd: ev.timeEnd,
        //     activeC: ev.activeC,
        //     prioriC: ev.prioriC,
        //     statusC: ev.statusC,
        //     fink: ev.fink,
        //     desc: ev.desc,
        //     types: ev.types,
        //     repeatType: ev.repeatType,
        //     history: ev.history,
        // };
        // dispatch({ type: "INSE", payload: petail });
    };

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
            width: 200,
        },
        {
            field: "pesult",
            headerName: "Pesult",
            width: 200,
            editable: true,
            renderCell: (params) => <strong>{params.value}</strong>,
        },
    
        {
            field: "note",
            headerName: "Note",
            width: 500,
            editable: true,
        },
    ];

    return {
        openPetail,
        peridColumns,
    };
};


