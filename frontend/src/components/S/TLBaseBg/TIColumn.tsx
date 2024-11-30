
type CellProps = {
    val?: string,
    borderLeft?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    borderBottom?: boolean,
    isMilestone?: boolean,
}

type TLColumnProps = {
    val: string,
    id: string,
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
            borderBottom: borderBottom ? '1px solid #bfbfbf' : '1px solid transparent ', // TODO: create theme
            width: '100%',
            height: '30px',
            textAlign: 'left',
            paddingLeft: '4px',
            whiteSpace: 'nowrap',
            

        }}>{val}</div>
}

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


type ContainerTIProps = {
    borderLeft?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    borderBottom?: boolean,
    isMilestone?: boolean,
    children?: React.ReactNode,
    width: number,

}
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