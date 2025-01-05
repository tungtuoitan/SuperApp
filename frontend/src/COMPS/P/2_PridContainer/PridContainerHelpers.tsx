import { GridColDef } from "@mui/x-data-grid";
import { Pr } from "../PrTypes";
import { Line, Nink } from "./2ui";
import { displayCDate } from "./2he";
import { PetailForm } from "../3_Petail/3ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {usePridContainerStore} from "./PridContainerStore";
import {usePrAllTabsStore} from "../1_PrAllTabs/PrAllTabsStore";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {his} from "../4_PeridContainer/4ty";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {useADiStore} from "../5_Adi/ADiStore";
import {useADiaHelpers} from "../5_Adi/ADiaHelpers";


const fakeHistory = 'FPPPP____FP_F_P_________________PPPP_FFPPFPPPP____FP_F_P_________________PPPP_FPP____FP_F_P_________'
+ 'FPPPP____FP_F_P_________________PPPP_FFPPFPPPP____FP_F_P_________________PPPP_FPP____FP_F_P_________'
+ 'FPPPP____FP_F_P_________________PPPP_FFPPFPPPP____FP_F_P_________________PPPP_FPP____FP_F_P_________'
+ 'FPPPP____FP_F_P_________________P_FPP____FP_F_P_________'
export const usePridContainerHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const { allPrs, rowSelectionModel } = usePridContainerStore();
    const { setADia, aDia } = useADiStore();
    const { openDia } = useADiaHelpers();
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
            pesults: [],
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
            renderCell: (params) => <div style={{display:'flex', height: '100%', width: '100%', position:'relative'}}>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', width: '100%'}}>
                    {fakeHistory.split('').map((c, i) => {
                        return <div style={{width:'2px', height:'6px', overflow:'hidden',
                            background: c === his.pass.c ? 'green' : c === his.fail.c ? 'red' : '#00000050',
                        }}>.</div>
                    })}
                </div>
                {!aDia &&
                    <Cooltip title='Add Pesult' placement='top' arrow sx={{position:'absolute', right:0}}>
                        <IconButton onClick={() => openDia(params.row as Pr)}
                             sx={{ width: '32px', height: '32px', marginTop: '25px'}}
                            >
                            <AddIcon></AddIcon>
                        </IconButton>
                    </Cooltip>
                }
            </div>
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


