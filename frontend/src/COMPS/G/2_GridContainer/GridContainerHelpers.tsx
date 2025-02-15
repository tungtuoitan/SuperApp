import { GridColDef } from "@mui/x-data-grid";
import { Pr, Pr2, PrsResult } from "../GTypes";
import { Line, Nink } from "./2ui";
import { displayCDate, getDayIndex, getIndexesOfFirstDayOfAllMonth } from "./2he";
import { Pesult, PetailForm } from "../3_Petail/3ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {useGridContainerStore} from "./GridContainerStore";
import {useGAllTabsStore} from "../1_GAllTabs/GAllTabsStore";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {his} from "../4_PeridContainer/4ty";
import {IconButton} from "@mui/material";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {useADiStore} from "../5_Adi/ADiStore";
import {useADiaHelpers} from "../5_Adi/ADiaHelpers";
import { dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {sr} from "../../S/TLConstants";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {iuPr} from "../GAPIs";
import {enqueueSnackbar} from "notistack";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {useFoStore} from "../0_Fo/FoStore";
import {get} from "lodash";

export const useGridContainerHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const { allPrs, setAllPrs, rowSelectionModel, currentHoveringRow, setCurrentHoveringRow } = useGridContainerStore();
    const { setADia, aDia } = useADiStore();
    const { openDia } = useADiaHelpers();
    const { gAllTabIds,setGAllTabIds,curTabIndex, setCurTabIndex} = useGAllTabsStore();
    const { sRs } = useSRsStore();
    const { allFos } = useFoStore();


    const getAllGitems = () => {
        return [...allPrs
            // , ...allFos
        ];
    }
    const openPetail = (prId: number) => {
        if (rowSelectionModel.includes(prId) || rowSelectionModel.includes(prId.toString())) return;
        if (gAllTabIds.includes('Pr-'+prId)) {
            setCurTabIndex(gAllTabIds.indexOf('Pr-'+prId));
        } 
        else {
            setGAllTabIds((prev) => {
                setCurTabIndex(prev.length); // tabIndex of that childEv is the last item on allTabIds, so it == prev.length
                return [...prev, 'Pr-'+prId];
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
            pesults: ev.pesults,
        };
        dispatch({ type: "INSE", payload: petail });
    };

    const handleClick = (pr: Pr, type:'Pass'|'Fail'|'Skip'|'Open') => {
        if(type === 'Open') {
            openDia(pr)
            return
        }
        const newPesult: Pesult = {
            id: pr.pesults.length,
            prId: pr.id, 

            pesultC: type === 'Pass' ? his.pass.c : type === 'Fail' ? his.fail.c : his.empty.c,
            feasonCs: '',
            
            activeC: sr.active.active.c,
            time: dateToCDate(new Date()),

            fink: '',
            note: '',
        }
        pr.pesults.push(newPesult as Pesult)
        const newPr = {...pr, pesults: JSON.stringify(pr?.pesults)}
        iuPr(newPr)
        .then((data: PrsResult) => {
            if (data.options.success) {
                setADia(null)
                const newPr = {...data.prs[0], pesults: JSON.parse(data.prs[0].pesults)}
                const newAllPrs = allPrs.map(pr => {
                    if(pr.id === data.prs[0].id) return newPr
                    return pr
                })
                setAllPrs(newAllPrs)
                enqueueSnackbar(data.options.message, { variant: "success" });
            } 
            else {
                enqueueSnackbar(data.options.message, { variant: "error" });
            }
        });
    }

    type EvaluationProps = {
        pr: Pr
        type: 'Pass'|'Fail'|'Skip'|'Open'
    }
    const EvaluateBtn = (props: EvaluationProps) => {
        const {pr,type} = props;
        return (
            <Cooltip title={type} placement='top' arrow sx={{position:'absolute', right:0, top:0}}>
                <IconButton 
                    onClick={_ => handleClick(pr,type)} 
                    sx={{ 
                        
                        width: '32px', 
                        height: '32px', 
                        color: type === 'Open' ? 'black' : type === 'Pass' ? 'green' : type === 'Fail' ? 'red' : 'black'}}>
                    {
                        type === 'Open' ? <OpenInNewIcon sx={{fontSize:'18px'}}/>
                        : type === 'Pass' ? <ThumbUpAltIcon sx={{fontSize:'20px'}}/>
                        : type === 'Fail' ? <ThumbDownAltIcon sx={{fontSize:'20px'}}/>
                        : <SkipNextIcon sx={{fontSize:'26px'}}/>
                    }
                </IconButton>
            </Cooltip>
        )
    }
   



    const gridColumns = ():GridColDef[] => { 
        return [
        { field: "id", headerName: "ID", width: 20 },
        {
            field: "info",
            headerName: "Info",
            width: 470,
            renderCell: (params) => {
                const r = params.row as Pr;
                const isAlreadyAdd = ():boolean => {
                    if(r.pesults.length === 0) return false;
                    const indexOfLastPesult = getDayIndex(r.pesults[r.pesults.length - 1].time)
                    const indexOfToday = getDayIndex(dateToCDate(new Date()));
                    return indexOfLastPesult >=indexOfToday
                }
                const enabled = !aDia && r.statusC === sr.status.inProgress.c && !isAlreadyAdd() && !gAllTabIds.includes('Pr-'+r.id) && currentHoveringRow == r.id;
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
                            position: 'relative',
                            // opacity: enabled ? 1 : 0.3
                        }}
                        onMouseEnter={() => setCurrentHoveringRow(r.id)}
                        onMouseLeave={() => setCurrentHoveringRow(null)}
                    >
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', height: '16px'}}>
                            {Nink(r.id, r.name, "")}
                        </div>
                            
                        {Line("Status", sRs.filter(sr => sr.code === r.statusC)[0]?.desc)}
                        {Line("Priority", sRs.filter(sr => sr.code === r.prioriC)[0]?.code)}
                        {Line("Parent ID", allPrs.filter(pr => pr.id === r.parentId)[0]?.name)}
                            {enabled && <div style={{position:'absolute', right:0, top:25}}>
                                <EvaluateBtn pr={r} type='Pass'/>
                                <EvaluateBtn pr={r} type='Fail'/>
                                <EvaluateBtn pr={r} type='Skip'/>
                                <EvaluateBtn pr={r} type='Open'/>
                            </div>}
                    </div>
                );
            },
        },
        {
            field: "sub-info",  
            headerName: "Sub Info",
            width: 200,
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
                        {Line("Types", r.types?.split(';').map(typeC => sRs.filter(sr => sr.code === typeC)[0]?.desc).join("; "))}
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
            width: 1150,
            // editable: true,
            renderCell: (params) => {
                const pr = params.row as Pr;
                const year = new Date(pr.timeStart).getFullYear();
                const indexes1 = getIndexesOfFirstDayOfAllMonth(year);
                let histories = '';
                const dayIndexs = pr.pesults.map(p => getDayIndex(p.time));
                for(let i = 0; i < 365; i++) {
                    if (dayIndexs.includes(i)) {
                        const thatPesult = pr.pesults.filter(p => getDayIndex(p.time) === i)[0];
                        if(thatPesult && thatPesult.pesultC === his.pass.c) histories += 'P';
                        else if(thatPesult && thatPesult.pesultC === his.fail.c) histories += 'F';
                        else {
                            histories += '_';
                        }
                    }
                    else {
                        histories += '_';
                    }
                }

                return <div style={{display:'flex', height: '100%', width: '100%', position:'relative'}}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', width: '100%'}}>
                        {histories.split('').map((h, i) => {
                            const color = h === his.pass.c ? '#23F51B' : h === his.fail.c ? 'red' : '#00000010';
                            return <div  key={i} style={{width:'3px', height:'10px',
                                background: indexes1.includes(i) 
                                ? `linear-gradient(to bottom, transparent 50%, ${color} 50%)`
                                : color
                            }}/>
                        })}
                    </div>
                </div>
            }
        },
    ]}

    return {
        openPetail,
        gridColumns,
        getAllGitems,
    };
};


