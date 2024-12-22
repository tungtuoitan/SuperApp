
export type DraggableProps = {
    children?: React.ReactNode;
    sx?: React.CSSProperties;
    id: string|number;
    type?: 'childEv' | 'parentEv';
}


export type FIIDs = {
    parentEv: string;
    childEv: string;
}