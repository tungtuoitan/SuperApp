import { cDate, CevelC } from "../TLTypes";
import { _1css } from "./1css";
import {_1helpers} from "./1helpers";
import { BigTime, SmallTime, WContainerTI } from "./1uis";

type TIcProps = {
    date: cDate;
    TILevel: CevelC;
    width: number;
    index: number;
}

// TIc: TI component
export const TIc = (props: TIcProps) => { // TODO: item này re-render rất nhiều, sau 
    const { date, width, index, TILevel } = props;

    return (
        <WContainerTI className="TIc" style={{width: width}}>
            <div id='column' style={{width: '100%', height: '100%'}}>
                <div id='longDiv'
                    style={{
                        height: 'calc(100% - 60px)',  // 60px is height of timeDiv
                        background: _1helpers.getTIBg(TILevel, date),
                        borderLeft: _1helpers.getBorderLeft(TILevel, date, index),
                    }}>
                    <div id='content-relative' style={{height: '100%',position: 'relative'}} />
                </div>
                <div id='shortDiv' style={{borderLeft: _1helpers.getBorderLeft(TILevel, date, index, '1px solid transparent')}}>
                    <SmallTime width={width} TILevel={TILevel} date={date}/>
                    <BigTime width={width} TILevel={TILevel} date={date}/>
                </div>
            </div>
        </WContainerTI>
    );
}