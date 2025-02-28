import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {cDate} from "../../S/TLTypes";
import {Pr} from "../GTypes";

export type AdiIdsProps = {
    pesultId: number;
};
export type AdiLevelProps = {
    pesultId: number;
};
export type AdiNameProps = {
    pesultId: number;
};
export type AdiTypeProps = {
    pesultId: number;
};
export type AdiFinkProps = {
    pesultId: number;
};
export type AdiPriorityProps = {
    pesultId: number;
};
export type AdiStatusProps = {
    pesultId: number;
};
export type AdiTimeEndProps = {
    pesultId: number;
};
export type AdiFeasonsProps = {
    pesultId: number;
};


export type Kesult = {
    id: string;
    prId: string;
    time: cDate;
    nextReview?: cDate;
    grade?: number;
    interval: number; // Khoảng cách ôn tập hiện tại (ngày)
    easeFactor: number; // Hệ số dễ nhớ (EF)
    repetitions: number; // Số lần ôn tập liên tiếp thành công
}


export type GradeNumb = 0 | 1 | 2 | 3 | 4 | 5;

// Hàm tính khoảng cách ôn tập mới
export function calculateNextReview(data: Kesult, grade: GradeNumb) {
    let { interval, easeFactor, repetitions } = data;

    // Nếu user quên (grade < 3), reset interval và repetitions
    // khi user quên, ngày hôm sau chắc chắn sẽ ôn lại
    if (grade < 3) {
        return { ...data, interval: 1, easeFactor: Math.max(1.3, easeFactor - 0.2), repetitions: 0 };
    } else {
        if (repetitions === 0) {
            interval = 1; // Lần ôn đầu tiên
        } else if (repetitions === 1) {
            interval = 6; // Lần ôn thứ hai
        } else {
            interval = Math.round(interval * easeFactor); // Tăng dần theo EF
        }
        repetitions++;

        // Cập nhật hệ số dễ nhớ (EF)
        easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
        easeFactor = Math.max(1.3, easeFactor); // EF không thấp hơn 1.3
    }

    return { interval, easeFactor, repetitions };
}

// export type ReviewType = 'AllPr' | 'curPr' | 'allKnowledge'| 'curKnowledge';
export type Rialog = {open: boolean, pesult: Kesult, reviewType: string};



export type ReviewItem = Pr & {
    done: boolean;
}