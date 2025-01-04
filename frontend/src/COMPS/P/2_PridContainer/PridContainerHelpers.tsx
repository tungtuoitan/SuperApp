import { GridColDef } from "@mui/x-data-grid";
import { Pr } from "../PrTypes";
import { Line, Nink } from "./2ui";
import { displayCDate } from "./2he";
import { PetailForm } from "../3_Petail/3ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {usePridContainerStore} from "./PridContainerStore";
import {usePrAllTabsStore} from "../1_PrAllTabs/PrAllTabsStore";
import {useSRsStore} from "../../S/8_SRs/SRsStore";

export const usePridContainerHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const { allPrs, rowSelectionModel } = usePridContainerStore();
    const { prAllTabIds,setPrAllTabIds,curTabIndex, setCurTabIndex} = usePrAllTabsStore();
    const { sRs } = useSRsStore();

    const openPetail = (prId: number) => {
        if (rowSelectionModel.includes(prId) || rowSelectionModel.includes(prId.toString())) return;
        if (prAllTabIds.includes(prId)) {
            setCurTabIndex(prAllTabIds.indexOf(prId));
        } 
        else {
            setPrAllTabIds((prev) => {
                setCurTabIndex(prev.length); // tabIndex of that childEv is the last item on allTabIds, so it == prev.length
                return [...prev, prId];
            });
        }

        const ev = allPrs.filter((pr) => pr.id === prId)[0];
        const petail: PetailForm = {
            id: ev.id,
            name: ev.name,
            parentId: ev.parentId ?? null,
            timeStart: ev.timeStart,
            timeEnd: ev.timeEnd,
            activeC: ev.activeC,
            prioriC: ev.prioriC,
            statusC: ev.statusC,
            fink: ev.fink,
            desc: ev.desc,
            types: ev.types,
            repeatType: ev.repeatType,
            history: ev.history,
        };
        dispatch({ type: "INSE", payload: petail });
    };

    const pridColumns: GridColDef[] = [
        // { field: "id", headerName: "ID", width: 20 },
        {
            field: "info",
            headerName: "Info",
            width: 300,
            renderCell: (params) => {
                const r = params.row as Pr;
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            lineHeight: "normal",
                            justifyContent: "center",
                            alignItems: "left",
                            padding: "10px 10px 10px 0",
                            fontSize: "12px",
                        }}
                    >
                        {Nink(r.id, r.name, "")}
                        {Line("Parent ID", allPrs.filter(pr => pr.id === r.parentId)[0]?.name)}
                        {Line("Priority", sRs.filter(sr => sr.code === r.prioriC)[0]?.desc)}
                        {Line("Status", sRs.filter(sr => sr.code === r.statusC)[0]?.desc)}
                    </div>
                );
            },
        },
        {
            field: "sub-info",
            headerName: "Sub Info",
            width: 300,
            renderCell: (params) => {
                const r = params.row as Pr;
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            lineHeight: "normal",
                            justifyContent: "center",
                            alignItems: "left",
                            padding: "10px 10px 10px 0",
                            fontSize: "12px",
                        }}
                    >
                        {Line("Types", r.types?.split(',').map(t => sRs.filter(sr => sr.code === t)[0]?.desc).join(", "))}
                        {Line("Repeat Type", sRs.filter(sr => sr.code === r.repeatType)[0]?.desc)}
                        {Line("Time Start", displayCDate(r.timeStart))}
                        {Line("Time End", r.timeEnd ? displayCDate(r.timeEnd) : null)}
                    </div>
                );
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

    return {
        openPetail,
        pridColumns,
    };
};


