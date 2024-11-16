
type CellProps = {
    val?: string,
    borderLeft?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    borderBottom?: boolean,
    isMilestone?: boolean,
}

type ColumnProps = {
    val: string,
    val2?: string,
    width: string,
}

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
            borderBottom: borderBottom ? '1px solid #bfbfbf' : '1px solid transparent ',
            // border: '1px solid #bfbfbf', // TODO: create theme
            width: '100%',
            height: '30px',
            textAlign: 'left',
            paddingLeft: '4px',
            whiteSpace: 'nowrap',
            

        }}>{val}</div>
}

export const Column = ({ val, val2, width,  }: ColumnProps) => {
    return (
        <>
            <div style={{
                // border: '1px solid #bfbfbf',
                width: width, // TODO: make this dynamic, dựa vào độ zoom
            }}>
                <Cell borderLeft isMilestone={val2 !== ''} />
                <Cell borderLeft isMilestone={val2 !== ''} />
                <Cell borderLeft isMilestone={val2 !== ''} borderTop val={val} />
                <Cell val={val2} borderLeft={val2 !== ''} isMilestone={val2 !== ''} />
            </div>
        </>)
}



export const GroupColumn = ({ val, width }: ColumnProps) => {
    return (<>
        <div
            style={{
                width: '100px',
            }}
        >
            <Cell borderRight val={val} />
            <Cell borderRight />
            <Cell borderTop borderRight />
            <Cell borderRight/>
        </div>
    </>)
}
