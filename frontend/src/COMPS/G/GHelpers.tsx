
export type IdType = 'Pr' | 'Pe'| 'Fo'

export const toSid = (type: string, id: number) =>  `${type}-${id}`;

export const paSid = (sid: string) => {
    const [type, id] = sid.split('-');
    return {id: parseInt(id), type: type as IdType};
}