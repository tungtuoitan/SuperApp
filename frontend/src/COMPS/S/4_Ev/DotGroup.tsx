import {sr} from "../TLConstants";
import {Ev} from "../TLTypes";
import {_4css} from "./4css";
import Dot from "./Dot";


type DotGroupProps = {
    childEv: Ev;

}
export default function DotGroup (props: DotGroupProps) {
    const { childEv } = props;

    return (
        <div style={{
            display: 'flex',
            height: 4,
            gap: 2,
            width: '100%',
            padding: '0 10px',
            position: 'absolute',
            left: 0,
            // opacity: 0.5,

        }}>
            <Dot bg={
                childEv.statusC === sr.status.open.c ? _4css.dot.bgOpen
                : childEv.statusC === sr.status.inProgress.c ? _4css.dot.bgInProgress
                : childEv.statusC === sr.status.resolved.c ? _4css.dot.bgResolved
                : _4css.dot.bgOpen
            }/>
            <Dot bg={
                childEv.prioriC === sr.priority.high.c ? _4css.dot.bgHigh
                : childEv.prioriC === sr.priority.medium.c ? _4css.dot.bgMedium
                : childEv.prioriC === sr.priority.normal.c ? _4css.dot.bgNormal
                : childEv.prioriC === sr.priority.low.c ? _4css.dot.bgLow
                : _4css.dot.bgLow
            }/>
            <Dot />
        </div>
    )
    
}