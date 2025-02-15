import { Link } from "react-router-dom";
import {useGridContainerHelpers} from "./GridContainerHelpers";
import {useGridContainerStore} from "./GridContainerStore";
import {truncateText} from "./2he";
import {sr} from "../../S/TLConstants";
import {_4cs} from "../../S/4_ChildEv/4cs";

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

export const Nink = (id: string, type: 'Pr'|'Fo', title: string, link?: string) => {
    const {openDetail} = useGridContainerHelpers();
    const {rowSelectionModel} = useGridContainerStore();

    return (
        <>
            {(rowSelectionModel.includes(id)||rowSelectionModel.includes(id.toString())) 
                ? <div style={{fontWeight:'bold'}}>{truncateText(title, 66)}</div>
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
