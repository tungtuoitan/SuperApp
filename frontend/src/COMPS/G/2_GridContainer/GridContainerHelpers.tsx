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
import {paSid, toSid} from "../GHelpers";
import {g} from "../GConstants";
import {getIcon} from "../../MainNav/Nhe";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {Fo} from "../0_Fo/FoTypes";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {_2cs} from "./2cs";

export const useGridContainerHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const [fotails, dispatchFo] = useFotailFormStore();
    const { allPrs, setAllPrs, rowSelectionModel, currentHoveringRow, setCurrentHoveringRow } = useGridContainerStore();
    const { setADia, aDia } = useADiStore();
    const { openDia } = useADiaHelpers();
    const { gAllTabIds,setGAllTabIds,curTabIndex, setCurTabIndex} = useGAllTabsStore();
    const { sRs } = useSRsStore();
    const {allFos,setLastFoId, lastFoId} = useFoStore();


    const getAllGitems = () => {
        return [
            ...allFos.filter(fo => fo.parentId === lastFoId),
            ...allPrs.filter(pr => pr.parentId === lastFoId)
        ];
    }
    const openDetail = (rowId: string, type: 'Pr'|'Fo') => {
        if (rowSelectionModel.includes(rowId) || rowSelectionModel.includes(rowId.toString())) return;
        if (gAllTabIds.includes(rowId)) {
            setCurTabIndex(gAllTabIds.indexOf(rowId));
        } 
        else {
            setGAllTabIds((prev) => {
                setCurTabIndex(prev.length); // tabIndex of that childEv is the last item on allTabIds, so it == prev.length
                return [...prev, rowId];
            });
        }

        if(type === 'Pr') {
            const ev = allPrs.filter((pr) => pr.id === rowId)[0];
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
        }
        else if (type==='Fo'){
            const fo = allFos.filter((fo) => fo.id === rowId)[0];
            const fotail: FotailForm = {
                id: fo.id,
                name: fo.name,
                shortName: fo.shortName,
                parentId: fo.parentId,
                iconId: fo.iconId,

                activeC: fo.activeC,
                prioriC: fo.prioriC,
                description: fo.description,
                pinIndex: fo.pinIndex,
            };
            dispatchFo({ type: "INSE", payload: fotail });
        }
    };

    const handleClick = (pr: Pr, type:'Pass'|'Fail'|'Skip'|'Open') => {
        if(type === 'Open') {
            openDia(pr)
            return
        }
        const newPesult: Pesult = {
            id: toSid('Pe', pr.pesults.length),
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

    type FolderProps = {
        fo: Fo
        type: 'GoInside'
    }
    const FolderBtn = (props: FolderProps) => {
        const {fo,type} = props;
        const handleClick = (fo: Fo, type: 'GoInside') => {
            switch (type) {
                case 'GoInside': 
                    setLastFoId(fo.id);
                    setCurTabIndex(0);
            }
        }
        return (
            <Cooltip title={type=='GoInside' ? 'Go inside' : ''} placement='top' arrow sx={{position:'absolute', right:0, top:0}}>
                <IconButton 
                    onClick={_ => handleClick(fo,type)} 
                    sx={{ 
                        
                        width: '32px', 
                        height: '32px', 
                        // color: type === 'Open' ? 'black' : type === 'Pass' ? 'green' : type === 'Fail' ? 'red' : 'black'
                    }}
                        >
                    {
                        type === 'GoInside' ? <ArrowForwardIcon sx={{fontSize:'18px'}}/>
                        : null
                    }
                </IconButton>
            </Cooltip>
        )
    }
   

    const Info = (r: Pr) => {
        const isAlreadyAdd = ():boolean => {
            if(r.pesults.length === 0) return false;
            const indexOfLastPesult = getDayIndex(r.pesults[r.pesults.length - 1].time)
            const indexOfToday = getDayIndex(dateToCDate(new Date()));
            return indexOfLastPesult >=indexOfToday
        }
        const enabled = !aDia && r.statusC === sr.status.inProgress.c && !isAlreadyAdd() && !gAllTabIds.includes(r.id) && currentHoveringRow == r.id;
        
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
                    width: '320px'
                }}
                onMouseEnter={() => setCurrentHoveringRow(r.id)}
                onMouseLeave={() => setCurrentHoveringRow(null)}
            >
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', height: '16px'}}>
                    {Nink(r.id,'Pr', r.name)}
                </div>
                    
                {Line("Status", sRs.filter(sr => sr.code === r.statusC)[0]?.desc)}
                {Line("Priority", sRs.filter(sr => sr.code === r.prioriC)[0]?.code)}
                {Line("ID", r.id)}
                    {enabled && <div style={{position:'absolute', right:0, top:25}}>
                        <EvaluateBtn pr={r} type='Pass'/>
                        <EvaluateBtn pr={r} type='Fail'/>
                        <EvaluateBtn pr={r} type='Skip'/>
                        <EvaluateBtn pr={r} type='Open'/>
                    </div>}
            </div>
        );

    }

    const SubInfo = (r: Pr) => {
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
                    width: '200px'
                }}
            >
                {Line("Types", r.types?.split(';').map(typeC => sRs.filter(sr => sr.code === typeC)[0]?.desc).join("; "))}
                {Line("Repeat Type", sRs.filter(sr => sr.code === r.repeatType)[0]?.desc)}
                {Line("Time Start", displayCDate(r.timeStart))}
                {Line("Time End", r.timeEnd ? displayCDate(r.timeEnd) : null)}
            </div>
        );
    }

    const History = (r: Pr) => {
        const year = new Date(r.timeStart).getFullYear();
        const indexes1 = getIndexesOfFirstDayOfAllMonth(year);
        let histories = '';
        const dayIndexs = r.pesults.map(p => getDayIndex(p.time));
        for(let i = 0; i < 365; i++) {
            if (dayIndexs.includes(i)) {
                const thatPesult = r.pesults.filter(p => getDayIndex(p.time) === i)[0];
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

        return <div style={{display:'flex', height: '100%', width: '1150px', position:'relative'}}>
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


    const gridColumns = ():GridColDef[] => { 
        return [
        // { field: "id", headerName: "ID", width: 80 },
        {
            field: "info",
            headerName: "Info",
            width: 1700,
            renderCell: (params) => {
                const r = params.row
                const enabled = currentHoveringRow == r.id;

                return <div style={{display:'flex', flexDirection:'row', width: '100%', height: '100%'}}
                >
                    {paSid(r.id).type === g.type.pr 
                    ? 
                        <>
                            {Info(r)}
                            {SubInfo(r)} 
                            {History(r)}
                        </>
                    : paSid(r.id).type === g.type.fo
                    ?
                        <div
                            onMouseEnter={() => setCurrentHoveringRow(r.id)}
                            onMouseLeave={() => setCurrentHoveringRow(null)}
                            style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px', width: '400px'}}
                        >
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px'}}>
                                {getIcon({   
                                        code: 'folder', 
                                        type: 'custom', 
                                        props: {
                                            sx: {
                                                fontSize:20, 
                                                color: r.prioriC === sr.priority.top1.c ? _2cs.folderIcon.bgTop1
                                                    : r.prioriC === sr.priority.top2.c ? _2cs.folderIcon.bgTop2
                                                    : r.prioriC === sr.priority.top3.c ? _2cs.folderIcon.bgTop3
                                                    : _2cs.folderIcon.bgNormal,
                                                }}
                                            })}
                                {Nink(r.id, 'Fo', r.name)}
                                {enabled && <FolderBtn fo={r} type='GoInside'/>}
                            </div>  
                        </div>  
                    : null  
                }
                </div>
            },
        },
    ]}

    return {
        openDetail,
        gridColumns,
        getAllGitems,
    };
};


