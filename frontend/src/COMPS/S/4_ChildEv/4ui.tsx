import {styled, TextField} from "@mui/material";
import {sr} from "../TLConstants";
import {_4cs} from "./4cs";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {DotGroupProps, DotProps, MiNimeProps} from "./4ty";
import {useTLBaseBgStore} from "../1_TLBaseBg/TLBaseBgStore";
import {useTLBaseBgHelpers} from "../1_TLBaseBg/TLBaseBgHelpers";
import {useTLBaseFgHelpers} from "../2_TLBaseFg/TLBaseFgHelpers";
import {use2he} from "../2_TLBaseFg/2he";
import {cDateToGh} from "../3_TimeConfig/TimeHelpers";
import {Ev} from "../TLTypes";


export function Dot (props: DotProps) {
    const { bg = _4cs.dot.bgLow } = props;
    return (
        <div style={{
            height: _4cs.dot.he,
            width: _4cs.dot.wi,
            borderRadius: _4cs.dot.br,
            background: bg,
            flexShrink: 0,
        }}>
        </div>
    )
    
}


export function DotGroup (props: DotGroupProps) {
    const { childEv } = props;

    return (
        <div id={'DotGroup-' + childEv.name}
        style={{
            display: 'flex',
            height: 4,
            gap: 2,
            width: '100%',
            padding: '0 0 0 10px',
            position: 'absolute',
            flex: 1,
            left: -6,
        }}>
            <Dot bg={
                childEv.statusC === sr.status.open.c ? _4cs.dot.bgOpen
                : childEv.statusC === sr.status.inProgress.c ? _4cs.dot.bgInProgress
                : childEv.statusC === sr.status.resolved.c ? _4cs.dot.bgResolved
                : _4cs.dot.bgOpen
            }/>
            <Dot bg={
                childEv.prioriC === sr.priority.high.c ? _4cs.dot.bgHigh
                : childEv.prioriC === sr.priority.medium.c ? _4cs.dot.bgMedium
                : childEv.prioriC === sr.priority.normal.c ? _4cs.dot.bgNormal
                : childEv.prioriC === sr.priority.low.c ? _4cs.dot.bgLow
                : _4cs.dot.bgLow
            }/>
            {/* <Dot /> */}
        </div>
    )
    
}


export const WChildEv = styled('div')({
    fontSize: _4cs.childEv.fs,
    height: _4cs.childEv.he,
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
    width: '100%', 
    textAlign: 'center',
    outline: 'none',
    [`& ${tfSelector.input2}`]: {
        textAlign: 'center',
        color: 'white',
        padding: '0 20px',
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
    background: _4cs.blackMini.bg,
    zIndex: 101,
    alignItems: 'center',
    display: 'flex',
})

export const ParentTitle = styled('span')({
    position: 'absolute', 
    whiteSpace: 'nowrap',
    overflow: 'visible',
    top: -20, color: 'gray'
})

export const StickTitle = styled('span')({
    position:'absolute', 
    left: 4,
    zIndex: 101,
    top:-8, 
    fontSize: 8, 
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left'
})

export function StickParentTitles () {
     const { TLBaseFrameScrollLeft} = useTLBaseBgStore();
        const { RpxToRh, h$G_BgStart } = useTLBaseBgHelpers();
        const { getTopsOf5ParentLines } = use2he();
        const { filterEvs, getFiveLines, markEvs } = useTLBaseFgHelpers();
        const fiveLines = getFiveLines(filterEvs(['inside-TL', 'parentEv', 'active']));
        const parentTops = getTopsOf5ParentLines();

        return <>
            {fiveLines.map((line: Ev[], i) => {
                const h$G_TLBaseFrameLeft = h$G_BgStart + RpxToRh(TLBaseFrameScrollLeft)
                const isStickTitle = cDateToGh(line[0].timeStart)<h$G_TLBaseFrameLeft && cDateToGh(line[0].timeEnd)>h$G_TLBaseFrameLeft
                return line.map((parontEv, index) =>  <StickTitle id={'stickTitle'+i} sx={{display:isStickTitle&&index===0?'block':'none', top: parentTops[i]-6}}>{parontEv.name}</StickTitle>)
            })}
        </>
}


export function MiNime (props: MiNimeProps) {
    const { width, childName } = props;
    return (
        <span 
            style={{
                textAlign: 'center',
                fontSize: 8,
                color: '#00000080',
                position: 'relative',
                top: -14,
                width: width,
                overflow: 'hidden',
            }}>
                {childName}
        </span>
    )
}