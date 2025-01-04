
export const Line = (name:string, value: string) => {
    return <span style={{lineHeight:'16px'}}>
        <strong>{name}: </strong>
        {value}
    </span>
}