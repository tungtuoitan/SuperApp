import { styled } from "@mui/material";
import { _1css } from "./1cs";
import {
    getDAYOfWeek,
    getMonthShortName,
    parseCDate,
} from "../3_TimeConfig/TimeHelpers";
import { cDate, CevelC } from "../TLTypes";
import { sr } from "../TLConstants";
import {useTLBaseBgHelpers} from "./TLBaseBgHelpers";
import {CellProps, ContainerTIProps, TLColumnProps} from "./1ty";


// 1
export const WTIContainer = styled("div")({
    display: "flex",
    color: _1css.TI.co,
    overflow: "visible",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    fontSize: _1css.TI.fs,
    textAlign: "center",
    position: "relative",
});

// 2
// export const WColumnContainer = styled("div")({
//     width: "100%",
//     height: "100%",
// });


// 3
export const SmallTime = function (props: {
    width: number;
    TILevel: CevelC;
    date: cDate;
}) {
    const { width, TILevel, date } = props;
    const { y, m, d, h, p } = parseCDate(date);
    return (
        <div
            style={{
                borderTop: "1px solid #bfbfbf",
                width: "100%",
                textAlign: "left",
                paddingLeft: "5px",
                height: 30,
                color: "#202020",
            }}
        >
            {(() => {
                if (width < 18) return "";
                switch (TILevel) {
                    case sr.year.c:
                        return y;
                    case sr.month.c:
                        return getMonthShortName(m);
                    case sr.week.c:
                    case sr.day.c:
                        return d;
                    case sr.hour.c:
                        return h > 11 ? (
                            <span>{h - 12}"</span>
                        ) : (
                            <span>{h}"</span>
                        );
                    default:
                        return "";
                }
            })()}
        </div>
    );
};


// 4
export const BigTime = function (props: {width: number;TILevel: CevelC;date: cDate;}) {
    const { width, TILevel, date } = props;
    const { y, m, d, h, p } = parseCDate(date);

    return (
        <div
            style={{
                width: "100%",
                textAlign: "left",
                paddingLeft: "3px",
                height: 30,
                fontSize: "16px",
                color: "#202020",
                position: "relative",
            }}
        >
            {(() => {
                let text = "";
                if (TILevel === sr.year.c) {
                    if (y % 10 === 0) text = y.toString();
                }
                if (TILevel === sr.month.c) {
                    if (m === 1) text = y.toString();
                } else if (TILevel === sr.week.c || TILevel === sr.day.c) {
                    if (d === 1) text = getMonthShortName(m);
                    if (new Date(date).getDay() === 1 && width > 18) text = "..";
                } else if (TILevel === sr.hour.c) {
                    if (h === 0)
                        text =
                            d +
                            "." +
                            getDAYOfWeek(new Date(y, m - 1, d, h, 0, 0));
                }

                return (
                    <span
                        style={{
                            fontSize: 11,
                            position: "absolute",
                            zIndex: 10,
                        }}
                    >
                        {text}
                    </span>
                );
            })()}
        </div>
    );
};






// 5
export const Cell = (props: CellProps) => {
    const { val,isMilestone = false, borderLeft, borderTop, borderBottom, borderRight } = props;
    return <div style={
        {
            borderLeft: borderLeft && isMilestone 
                ? '1px solid #bfbfbf' 
                : borderLeft && !isMilestone
                ? '1px solid #bfbfbf50'
                : '1px solid transparent ',
            borderRight: borderRight ? '1px solid #bfbfbf' : '1px solid transparent ',
            borderTop: borderTop ? '1px solid #bfbfbf' : '1px solid transparent ',
            borderBottom: borderBottom ? '1px solid #bfbfbf' : '1px solid transparent ', // TODO: create theme
            width: '100%',
            height: '30px',
            textAlign: 'left',
            paddingLeft: '4px',
            whiteSpace: 'nowrap',
            

        }}>{val}</div>
}




// 6
export const TLColumn = ({ val, val2, width, id  }: TLColumnProps) => {
    return (
        <>
            <div 
            id={id}
            style={{
                width: width,
                
            }}>
                <Cell borderLeft isMilestone={val2 !== ''} />
                <Cell borderLeft isMilestone={val2 !== ''} />
                <Cell borderLeft isMilestone={val2 !== ''} borderTop val={val} />
                <Cell val={val2} borderLeft={val2 !== ''} isMilestone={val2 !== ''} />
            </div>
        </>)
}


// 7
export const GroupColumn = ({ val, width, id }: TLColumnProps) => {
    return (<>
        <div
            style={{
                width: width,
                borderRight: '1px solid #bfbfbf',
            }}
        >
            <Cell  val={val} />
            {/* <Cell borderRight />
            <Cell borderTop borderRight />
            <Cell borderRight/> */}
        </div>
    </>)
}




// 8
export const ContainerTI = (props: ContainerTIProps) => {
    const { children,isMilestone = false, borderLeft, borderTop, borderBottom, borderRight, width } = props;
    return <div style={
        {
            borderLeft: borderLeft && isMilestone 
                ? '1px solid #bfbfbf' 
                : borderLeft && !isMilestone
                ? '1px solid #bfbfbf50'
                : '1px solid transparent ',
            borderRight: borderRight ? '1px solid #bfbfbf' : '1px solid transparent ',
            borderTop: borderTop ? '1px solid #bfbfbf' : '1px solid transparent ',
            borderBottom: borderBottom ? '1px solid #bfbfbf' : '1px solid transparent ', // TODO: create theme
           
            width: width,
            height: '100px',
            textAlign: 'left',
            paddingLeft: '4px',
            whiteSpace: 'nowrap',
            

        }}>{children}</div>
}

// 9
export const RedLine = () => {
    const { w$BgStart_red } = useTLBaseBgHelpers();

    return (
        <div
            style={{
                height: '100%',
                width: _1css.redline.w,
                background: _1css.redline.bg,
                position: 'absolute',
                left: w$BgStart_red,
            }} />
    )
}