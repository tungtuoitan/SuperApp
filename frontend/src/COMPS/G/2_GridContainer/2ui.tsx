import { Link } from "react-router-dom";
import {useGridContainerHelpers} from "./GridContainerHelpers";
import {useGridContainerStore} from "./GridContainerStore";
import {truncateText} from "./2he";
import {sr} from "../../S/TLConstants";
import {_4cs} from "../../S/4_ChildEv/4cs";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {FinkToProtocol} from "../../S/5_Etail/5he";
import {getIcon} from "../../MainNav/Nhe";
import {IconButton} from "@mui/material";
import {SiconProps} from "./2ty";
import {SR} from "../../S/8_SRs/8ty";
import {_2cs} from "./2cs";

export const Line = (name: string, value: any) => {
    switch(name) {
        case 'Priority':
            return (
            <div style={{ display:'inline-flex', lineHeight: "16px" }}>
                <strong>{name}: </strong>
                <div style={{background: value === sr.priority.high.c 
                    ? _4cs.dot.bgHigh
                    : value === sr.priority.medium.c
                    ? _4cs.dot.bgMedium
                    : value === sr.priority.normal.c
                    ? _4cs.dot.bgNormal
                    : value === sr.priority.low.c
                    ? _4cs.dot.bgLow
                    : 'black',
                    color: 'white', fontWeight:'bold', fontSize:'8px', height:10, width: 10, margin: '3px 0 0 2px' , borderRadius:'10px', padding: '0 4px'}}></div>
            </div>)
        case 'Status':
            return (
            <div style={{ display:'inline-flex', lineHeight: "16px" }}>
                <strong>{name}: </strong>
                <div 
                style={{background: value === sr.status.open.d 
                    ? _4cs.dot.bgOpen
                    : value === sr.status.inProgress.d
                    ? _4cs.dot.bgInProgress
                    : value === sr.status.resolved.d
                    ? _4cs.dot.bgResolved
                    : 'black', 
                     margin: '0 0 0 2px',
                     padding: '0 4px',
                     height: '14px',
                     }}
                >
                    <span style={{color: value ===sr.status.inProgress.d ? 'black': 'white', marginTop: '-4px', position:'relative', top: '-2px',
                        fontStyle: 'italic', fontWeight:'bold', fontSize:'10px'}}>{value}</span>
                </div>
            </div>)
        default:
        return (
            <span style={{ lineHeight: "16px" }}>
                <strong>{name}: </strong>
                {value as string}
            </span>
        );
    }
};

export const Nink = (id: string, type: 'Pr'|'Fo'|'Link', title: string, link?: string) => {
    const {openDetail} = useGridContainerHelpers();
    const {rowSelectionModel} = useGridContainerStore();

    return (
        <>
            {(rowSelectionModel.includes(id)||rowSelectionModel.includes(id.toString())) 
                ? <div style={{fontWeight: 'bold'}}>{truncateText(title, 66)}</div>
                : 
                <Link 
                    className="nink" 
                    to={link ?? ""} 
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                    onClick={(e) => openDetail(id, type)}
                    >
                        {truncateText(title, 66)}
                </Link>
            }
        </>
    );
};


export const ICON = (props: SiconProps) => {
    const {
        type='icon-btn',

        link='',

        iconCode='unknown-icon', 
        iconSize=20, 
        iconSx, 
        btnSize=32, 
        btnSx, 
        color='#444', 
        handle=() => {}, 
        dbHandle=() => {},
        title='Unknown Icon'
    } = props;

    const sizePx = btnSize + 'px';

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
                            height: sizePx,
                            width: sizePx,
                            ...iconSx
                            }}
                        })
            )

        case 'icon-btn':
            return (
                <Cooltip title={title} placement='top' arrow sx={{position:'absolute', right:0, top:0}}>
                    <IconButton 
                        onClick={e => handle(e)} 
                        onDoubleClick={e => dbHandle(e)}
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
        default:
            return <></>;
    }
}

type KnowLevelProps = {
    knowLevelC: string,
    sRs: SR[]
}
export const KnowLevel = (props:KnowLevelProps) => {
        const {knowLevelC, sRs} = props;
        const levels = sRs.filter((sr:SR) => sr.type === 'KnowLevel');
        const knowLevelIndex = levels.findIndex(l => l.code === knowLevelC);

        return <div style={{display:'flex', flexDirection:'row', gap: '1px'}}>
            {levels.map((level, i) => {
                const bg = i > knowLevelIndex ? '#00000020' 
                : 'black'
                return <div key={i} style={{width: '4px', height: '4px', background: bg }}>
                </div>
            })}
        </div>
    }