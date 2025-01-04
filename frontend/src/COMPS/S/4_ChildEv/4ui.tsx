import {styled, TextField} from "@mui/material";
import {sr} from "../TLConstants";
import {_4cs} from "./4cs";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {DotGroupProps, DotProps, MiNimeProps} from "./4ty";
import {useTLBaseBgHelpers} from "../1_TLBaseBg/TLBaseBgHelpers";
import {useTLBaseFgHelpers} from "../2_TLBaseFg/TLBaseFgHelpers";
import {use2he} from "../2_TLBaseFg/2he";
import {cDateToGh} from "../3_TimeConfig/TimeHelpers";
import {Ev} from "../TLTypes";
import {use4he} from "./4he";
import BlackMini from "./BlackMini";
import {useChildEvStore} from "./ChildEvStore";


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
    const { childEv, sx } = props;

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
            zIndex: 102,
            pointerEvents: 'none',
            left: -6,
            ...sx
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
    [`& ${tfSelector.div1}`]: {
        justifyContent: 'right',
    },
    [`& ${tfSelector.input2}`]: {
        textAlign: 'center',
        color: 'white',
        padding: '0',
    },
    [`& ${tfSelector.input2Disable}`]: {
        WebkitTextFillColor: 'white !important',
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
    zIndex: 103,
    alignItems: 'center',
    display: 'flex',
})

export const ParentTitle = styled('span')({
    position: 'absolute', 
    whiteSpace: 'nowrap',
    overflow: 'visible',
    top: -20, color: 'gray'
})

export const Pame = styled('span')({
    position:'absolute', 
    left: 4,
    zIndex: 101,
    top:-8, 
    fontSize: 8, 
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    pointerEvents: 'none',
})
export const Came = styled('span')({
    position:'absolute', 
    left: 20,
    zIndex: 101,
    top:0, 
    fontSize: 8, 
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    pointerEvents: 'none',
    color: 'white',
    width: '100%',
})

export function StickLayer () {
    const { getTopsOf5ParentLines } = use2he();
    const { isStickEv } = use4he();
    const { filterEvs, getFiveLines } = useTLBaseFgHelpers();
    const { h$G_TLBaseFrameLeft, RhToPx } = useTLBaseBgHelpers();
    const fivePines = getFiveLines(filterEvs(['inside-TL', 'parentEv', 'active']));
    const parentTops = getTopsOf5ParentLines();
    const {fevId } = useChildEvStore();

    return <>
        {[...fivePines].map((pine: Ev[], i) => {
            const stickPEv = pine.find(ev => isStickEv(ev))
            if(!stickPEv) return null;
            const childEvs = filterEvs(['inside-TL', 'childEv', 'active']).filter(ev => ev.parentId === stickPEv.id)
            const fiveCines = getFiveLines(childEvs);
            const displayBlackMini = fevId && stickPEv && fevId === stickPEv.id
            const displayDotGroup = childEvs.length===0&&stickPEv
            const isBegger = stickPEv.parentId === 999999999 || stickPEv.parentId === null 
            const top$BlackMini = parentTops[i] + (childEvs.length||1)*_4cs.childEv.he + ((childEvs.length||1)-1)*_4cs.childEv.gapBetweenChildren + _4cs.parentEv.heOf2borders + _4cs.parentEv.pt*2 + 6
                
            return <>
                {stickPEv && <Pame sx={{top: parentTops[i]-6}}>{stickPEv.name}</Pame>}
                {displayDotGroup && <DotGroup childEv={stickPEv} sx={{top: parentTops[i]+20}} />}
                {displayBlackMini && <BlackMini childId={stickPEv.id} isBegger={isBegger} sx={{top: top$BlackMini}}/>}

                {fiveCines.map((cine: Ev[], j) => {
                    const stickCEv = cine.find(ev => isStickEv(ev))
                    if(!stickCEv) return null;
                    const w = RhToPx(cDateToGh(stickCEv.timeEnd)-h$G_TLBaseFrameLeft)
                    const displayBlackMini2 = fevId && fevId === stickCEv.id && stickCEv
                    const isBegger2 = stickCEv.parentId === 999999999 || stickCEv.parentId === null
                    return <>
                        {stickCEv && <Came sx={{top: (parentTops[i]+(w>100?13:16)) + j*22, fontSize: w>100?12:8,width: w-30>0?w-30:0}}>
                            {stickCEv.name}</Came>}
                        {stickCEv && <DotGroup childEv={stickCEv} sx={{top: (parentTops[i]+20) + j*22}} />}
                        {displayBlackMini2 && <BlackMini childId={stickCEv.id} isBegger={isBegger2} sx={{top: parentTops[i] + j*22 +34}}/>}
                    </>})}
            </>
        })}
    </>
}


export function MiniCame (props: MiNimeProps) {
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