

export type PrType = 'doit' | 'task' 
// export type EvSubType = 'normalTask' | 'habitTask' | 'truthActive' | 'repeatTask' | 'normalEvent' | 'repeatEvent' | 'note' | 'myMood' | 'reminder'
// export const evType: Record<EvType, EvType> = {
//     task: 'task',
//     event: 'event',
// }
// export const evSubType = {
//     task: {
//         normalTask: 'normalTask',
//         habitTask: 'habitTask',
//         truthActive: 'truthActive',
//         repeatTask: 'repeatTask',
//     },
//     event: {
//         normalEvent: 'normalEvent',
//         repeatEvent: 'repeatEvent',
//         note: 'note',
//         myMood: 'myMood',
//         reminder: 'reminder',
//     }
// }


export const pr = {
    applicationCode: 'pr',
    gradientColor: [
        'rgb(48 63 70 / 100%)',
        'rgb(48 63 70 / 80%)',
        'rgb(48 63 70 / 60%)',
        'rgb(48 63 70 / 50%)',
        'rgb(48 63 70 / 35%)'
    ],
    filterOption: {
        parent: 'parent',
        priority: 'priority',
        status: 'status',
        type: 'type',
        repeatType: 'repeatType',
        isUpdatedToday: 'isUpdatedToday',
    },
}

export const g = {
    type: {
        pr: 'Pr',
        fo: 'Fo',
    }
}