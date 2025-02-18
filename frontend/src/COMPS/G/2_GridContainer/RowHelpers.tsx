import { Pr, Pr2, PrsResult } from "../GTypes";
import { JustLink, Line, Nink } from "./2ui";
import { displayCDate, getDayIndex, getIndexesOfFirstDayOfAllMonth } from "./2he";
import { Pesult, PetailForm } from "../3_Petail/3ty";
import {useGridContainerStore} from "./GridContainerStore";
import {useGAllTabsStore} from "../1_GAllTabs/GAllTabsStore";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {his} from "../4_PeridContainer/4ty";
import {Icon, IconButton, styled} from "@mui/material";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {useADiStore} from "../5_Adi/ADiStore";
import {useADiaHelpers} from "../5_Adi/ADiaHelpers";
import { dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {sr} from "../../S/TLConstants";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {getPrs, iuPr} from "../GAPIs";
import {enqueueSnackbar} from "notistack";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {useFoStore} from "../0_Fo/FoStore";
import {paSid, toSid} from "../GHelpers";
import {getIcon, iconType} from "../../MainNav/Nhe";
import {Fo} from "../0_Fo/FoTypes";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {_2cs} from "./2cs";
import LinkIcon from '@mui/icons-material/Link';
import {FinkToProtocol} from "../../S/5_Etail/5he";
import {Link} from "react-router-dom";

export const useRowHelpers = () => {
    const { allPrs, setAllPrs, rowSelectionModel, readyCuttingRows, currentHoveringRow, setCurrentHoveringRow,refreshGrid, setRefreshGrid, searchText, displayDeleltedRows} = useGridContainerStore();
    const { setADia, aDia } = useADiStore();
    const { openDia } = useADiaHelpers();
    const { gAllTabIds,setGAllTabIds,curTabIndex, setCurTabIndex} = useGAllTabsStore();
    const { sRs } = useSRsStore();
    const {allFos,setLastFoId, lastFoId} = useFoStore();

    type SiconProps = {
        type?: 'icon-link' | 'icon-btn' | 'just-icon'

        link?: string

        iconCode?: string
        handle?: (e: React.MouseEvent<HTMLButtonElement>) => void
        title?: string

        iconSize?: number
        iconSx?: any
        btnSize?: 'sm'|'md'|'lg'
        btnSx?: any
        color?: string
    }
    const Sicon = (props: SiconProps) => {
        const {
            type='icon-btn',

            link='',

            iconCode='unknown-icon', 
            iconSize=20, 
            iconSx, 
            btnSize='md', 
            btnSx, 
            color='#444', 
            handle=() => {}, 
            title='Unknown Icon'
        } = props;

        const sizePx = btnSize === 'sm' ? '24px' : btnSize === 'md' ? '32px' : '40px';

        switch (type) {
            case 'icon-link':
                return (
                    <Cooltip title={title} placement='top' arrow sx={{position:'absolute', right:0, top:0}}>
                        <Link
                        to={FinkToProtocol(link)??''} 
                        target="_self" 
                        className={'icon-button'}
                        style={{ 
                            width: sizePx, 
                            height: sizePx,
                            borderRadius: 4, 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            pointerEvents: true ? 'auto' : 'none',
                            color: color,
                            ...btnSx
                        }}>
                            {getIcon({code: iconCode, type: 'custom', props: {sx: {...iconSx, fontSize: iconSize+'px', ...iconSx}}})}
                    </Link>
                    </Cooltip>
                )
            case 'just-icon':
                return (
                    getIcon({   
                        code: iconCode,
                        type: 'custom', 
                        props: {
                            sx: {
                                fontSize: iconSize+'px',
                                color: color,
                                ...iconSx
                                }}
                            })
                )

            case 'icon-btn':
                return (
                    <Cooltip title={title} placement='top' arrow sx={{position:'absolute', right:0, top:0}}>
                        <IconButton 
                            onClick={e => handle(e)} 
                            sx={{ 
                                width: sizePx,
                                height: sizePx,
                                color: color,
                                ...btnSx
                            }}
                            >
                            {getIcon({code: iconCode, type: 'custom', props: {sx: {...iconSx, fontSize: iconSize+'px'}}})}
                        </IconButton>
                    </Cooltip>
                )
        }
    }

    const evaluatePr = (pr: Pr, type:'Pass'|'Fail'|'Skip'|'Open') => {
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

    type FolderProps = {
        fo: Fo
        }
    const FolderBtn = (props: FolderProps) => {
        const {fo} = props;
        const handleClick = (fo: Fo) => {
                setLastFoId(fo.id);
                setCurTabIndex(0);
            }
        return (
            <Sicon
                title={'Go inside'}
                iconCode='come-in'
                handle={_ => handleClick(fo)}
                color='black'
            />
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
                    width: '420px'
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
                        <Sicon 
                            title='Pass' 
                            iconCode='pass' 
                            handle={_ => evaluatePr(r,'Pass')} 
                            color='green' 
                        />
                        <Sicon 
                            title='Fail' 
                            iconCode='fail' 
                            handle={_ => evaluatePr(r,'Fail')} 
                            color='red'
                        />
                        <Sicon 
                            title='Skip' 
                            iconCode='skip' 
                            handle={_ => evaluatePr(r,'Skip')} 
                            iconSize={26}
                            color='black' 
                        />
                        <Sicon 
                            title='Open' 
                            iconCode='open-in-new' 
                            handle={_ => evaluatePr(r,'Open')} 
                            iconSize={18}
                            btnSx={{marginRight: '10px'}}
                            color='black'
                        />
                        
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

    const PrRow = (r: Pr) => {
        return (
            <>
                {Info(r)}
                {SubInfo(r)}
                {History(r)}
            </>
        )
    }

    const FolderRow = (r: Fo) => {
        const enabled = currentHoveringRow == r.id;
        const color = r.prioriC === sr.priority.top1.c ? _2cs.folderIcon.bgTop1
        : r.prioriC === sr.priority.top2.c ? _2cs.folderIcon.bgTop2
        : r.prioriC === sr.priority.top3.c ? _2cs.folderIcon.bgTop3
        : _2cs.folderIcon.bgNormal

        return (<div
            onMouseEnter={() => setCurrentHoveringRow(r.id)}
            onMouseLeave={() => setCurrentHoveringRow(null)}
            style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px', width: '400px'}}
        >
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px'}}>
                {<Sicon
                    type='just-icon'
                    iconCode='folder'
                    iconSize={20}
                    color= {color}
                    />}
                {Nink(r.id, 'Fo', r.name)}
                {enabled && <FolderBtn fo={r}/>}
            </div>  
        </div> )
    }

    const KnowledgeRow = (r: Fo) => {
        const enabled = currentHoveringRow == r.id;

        return (<div
            onMouseEnter={() => setCurrentHoveringRow(r.id)}
            onMouseLeave={() => setCurrentHoveringRow(null)}
            style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px', width: '400px'}}
        >
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px'}}>
                {<Sicon
                    type='just-icon'
                    iconCode='knowledge'
                    />}
                {Nink(r.id, 'Pr', r.name)}
                
                {enabled && <Sicon 
                    type='icon-link'
                    link={(r.fink??'')??''}
                    iconCode='link'
                />}
            </div>  
        </div> )
    }
    const JustLinkRow = (r: Fo) => {
        const enabled = currentHoveringRow == r.id;

        return (<div
            onMouseEnter={() => setCurrentHoveringRow(r.id)}
            onMouseLeave={() => setCurrentHoveringRow(null)}
            style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px', width: '400px'}}
        >
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '8px'}}>
                {JustLink(r.id, r.name)}
                {enabled && <Sicon
                    type='icon-link'
                    iconCode='link'
                    link={(r.fink??'')??''}
                    />}
            </div>  
        </div> )
    }
   
    return {
        PrRow,
        FolderRow,
        KnowledgeRow,
        JustLinkRow
    };
};


