export type DropDownGridOptions = {
    id: string;
    code: string;
    description: string;
}

export type SelectionModel = (string | number)[];


export type UserProfile = {
    parents: string;
    priorities: string;
    statuses: string;
    types: string;
    repeatTypes: string;
    isUpdatedTodays: string;
}