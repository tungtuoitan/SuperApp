import { _1css } from "./1cs";
import {_1he} from "./1he";
import {TIcProps} from "./1ty";
import { BigTime, SmallTime, WTIContainer } from "./1ui";


// TIc: TI component
export const TIc = (props: TIcProps) => { // TODO: item này re-render rất nhiều, sau 
    const { date, width, index, TILevel } = props;

    return (
        <WTIContainer className="TIc" style={{width: width}}>
            <div id='column' style={{width: '100%', height: '100%'}}>
                <div id='longDiv'
                    style={{
                        height: 'calc(100% - 16px)',  // 60px is height of timeDiv
                        background: _1he.getTIBg(TILevel, date),
                        borderLeft: _1he.getBorderLeft(TILevel, date, index),
                    }}>
                    <div id='content-relative' style={{height: '100%',position: 'relative'}} />
                </div>
                <div id='shortDiv' style={{borderLeft: _1he.getBorderLeft(TILevel, date, index, '1px solid transparent')}}>
                    <SmallTime width={width} TILevel={TILevel} date={date}/>
                    {/* <BigTime width={width} TILevel={TILevel} date={date}/> */}
                </div>
            </div>
        </WTIContainer>
    );
}