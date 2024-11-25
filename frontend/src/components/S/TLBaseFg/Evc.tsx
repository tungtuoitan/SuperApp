

type EvProps = {
    content: string
    width: number
    left: number
}
export const Evc = (props: EvProps) => {
    const { content, width, left } = props;
    return (
        <div
            style={{
                height: 20,
                width: width,
                textAlign: 'left',
                padding: '5px',
                background: 'black',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50px 50px',
                position: 'absolute',
                // top: 0,
                left: left,
                // inset: 0,
                // zIndex: 100,

            }}>
                {content}</div>
    )
}