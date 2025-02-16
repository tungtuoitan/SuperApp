
export type IdType = 'Pr' | 'Pe'| 'Fo'

export const toSid = (type: string, id: number) =>  `${type}-${id}`;

type paSidResult = {
    id: number,
    type: IdType
}
export const paSid = (sid: string): paSidResult => {
    const [type, id] = sid.split('-');
    return {id: parseInt(id), type: type as IdType};
}