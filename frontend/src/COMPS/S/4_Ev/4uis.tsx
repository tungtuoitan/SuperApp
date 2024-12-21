import {styled, TextField} from "@mui/material";
import {sr} from "../TLConstants";
import {Ev} from "../TLTypes";
import {_4css} from "./4css";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";

type DotProps = {
    bg?: string;
}
export function Dot (props: DotProps) {
    const { bg = _4css.dot.bgLow } = props;
    return (
        <div style={{
            height: _4css.dot.he,
            width: _4css.dot.wi,
            borderRadius: _4css.dot.br,
            background: bg,
        }}>
        </div>
    )
    
}

type DotGroupProps = {
    childEv: Ev;
}
export function DotGroup (props: DotGroupProps) {
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


export const WChildEv = styled('div')({
    fontSize: _4css.fs,
    height: _4css.he,
    display: 'flex',
    position: 'absolute', // static: mỗi dòng 1 TI, absolute: mỗi dòng nhiều TI k đụng nhau
    textAlign: 'left',
    padding: '5px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50px 50px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

})


const tfSelector = helperMUIcss.getTextFieldCSSSelector('childEvName');
export const ChildEvTextField = styled(TextField)({
    width: 'calc(100% - 50px)', // 50(width of 2 GrabEdges)
    textAlign: 'center',
    outline: 'none',
    [`& ${tfSelector.input2}`]: {
        fontSize: '12px',
        textAlign: 'center',
        color: 'white',
        padding: '0px',
    },
    [`& ${tfSelector.input2Disable}`]: {
        '-webkit-text-fill-color': 'white !important',
    },
    [`& ${tfSelector.fieldset2}`]: {
        display: 'none',
    },

})


export const WTime = styled('p')({
    position: 'absolute',
    top: 0,
    fontSize: '16px',
    color: 'black',
    fontWeight: 'bold',
})

export const WBlackMini = styled('div')({
    borderRadius: 12,
    position: 'absolute',
    justifyContent: 'center',
    width: 200,
    height: 40,
    background: '#1E1E1E',
    zIndex: 100,
    alignItems: 'center',
    display: 'flex',
    bottom: -50,
})