import {useSnackbar} from "notistack";
import { IAutoCompleteOptions } from "../../CommonHelpers/4_GenericAutoComplete";
import {addTime, dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {KnowCType, sr} from "../../S/TLConstants";
import {SelectField} from "../../S/TLTypes";
import {getPrs, iuPr} from "../GAPIs";
import {toSid} from "../GHelpers";
import {Pr, Pr2, PrsResult} from "../GTypes";
import {countWords} from "./10he";
import {calculateNextReview, GradeNumb, Kesult, ReviewItem} from "./10ty";
import {useRialogStore} from "./RialogStore";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {useGridContainerHelpers} from "../2_GridContainer/GridContainerHelpers";

export const useRialogHelpers = () => {
    const { levelOptions } = useSRsStore();
    const {rialog, setRialog, reviewStart, setReviewStart, firstTime, setFirstTime, usedTime, reviewList, setReviewList, curReviewIndex, setCurReviewIndex } = useRialogStore();
    const { enqueueSnackbar } = useSnackbar();
    const { allPrs, setAllPrs } = useGridContainerStore();
    const { loadPrs } = useGridContainerHelpers();
    const curReviewItem = reviewList[curReviewIndex]


    const getSelectedOption = (option: SelectField, id: number): IAutoCompleteOptions | null => {
        let result: IAutoCompleteOptions | null = null;
        switch (option) {
            case 'level':
                result = levelOptions.filter((item) => item.id === id)[0];
                break;
            default:
                result = { id: 0, desc: '' } as IAutoCompleteOptions;
                break;
        }
        return result;
    };

    const handleChange = (fieldName: string, value: any) => {
        if(rialog) {
            setRialog({...rialog, open: rialog.open, pesult: {...rialog.pesult, [fieldName]: value }});
        }
    }

    const openRialog = (pr: Pr, reviewType: string) => {
        const newResult:Kesult = {
            id: toSid('Ke', pr?.pesults?.length??0),
            prId: pr.id, 
            time: dateToCDate(new Date()),
            interval: 1,
            easeFactor: 2.5,
            repetitions: 0,
        }
        setRialog({open:true, pesult: newResult, reviewType});
    }

    const getAnswerTime = (curPr: Pr): number => {
        const wordCountPerSecond = 3
        const totalWords = countWords(curPr.desc??'')
        const bonusPercent = 10/100
        return totalWords/wordCountPerSecond * (1 + bonusPercent)
    }

    const getReviewGrade = (curPr:Pr): GradeNumb => {
        const answerTime = getAnswerTime(curPr)
        if (usedTime <= answerTime * 0.5) return 5;
        if (usedTime < answerTime * 0.6) return 4;
        if (usedTime < answerTime) return 3;
        if (usedTime >= answerTime && usedTime <= answerTime * 2) return 2;
        return 1;
    };

    const getKnowC = (grade: GradeNumb): KnowCType => {
        switch (grade) {
            case 5:
                return 'kOnReview'
            case 4:
                return 'kOnReview'
            case 3:
                return 'kOnReview'
            case 2:
                return 'kOnRelearn'
            case 1:
                return 'kOnRelearn'
            case 0:
            default:
                return 'kOnReview'
        }
    }
    const imDone = () => {
        if(!curReviewItem) return;
        setReviewStart(false)
        setFirstTime(false)

        
        const lastKesult = curReviewItem.pesults.length>0 
            ? curReviewItem.pesults[curReviewItem.pesults.length - 1] as Kesult 
            : {interval: 1, easeFactor: 2.5, repetitions: 0} as Kesult // init value
        const { interval, easeFactor, repetitions } = calculateNextReview(lastKesult, getReviewGrade(curReviewItem));
       
        const newKesult:Kesult = {
            id: (curReviewItem.pesults.length?? 0).toString(),
            prId: curReviewItem.id,
            time: dateToCDate(new Date()),
            nextReview: curReviewItem.pesults.length>0 ? addTime(dateToCDate(new Date()),0,0,interval,0,0) : addTime(dateToCDate(new Date()),0,0,1,0,0),
            grade: getReviewGrade(curReviewItem),
            interval,
            easeFactor,
            repetitions
        }

        const newPr:Pr2 = {...curReviewItem, knowC: getKnowC(getReviewGrade(curReviewItem)), pesults: JSON.stringify([...curReviewItem.pesults, newKesult])} as Pr2;
        const newReviewList = reviewList.map(r => {
                if(r.id === newPr.id) {
                    const newItem = {...newPr, pesults: JSON.parse(newPr.pesults), done: true} as ReviewItem;
                    return newItem;
                }
                return r;
            })
        setReviewList(newReviewList);
        setCurReviewIndex(prev =>  prev + 1);

        iuPr(newPr)
        .then((data: PrsResult) => {
            if (data.options.success) {
                // setAllPrs(allPrs.map(pr => pr.id === newPr.id ? {...data.prs[0], pesults: JSON.parse(data.prs[0].pesults)} : pr))
                loadPrs();
                enqueueSnackbar(data.options.message, { variant: "success" });
            } 
            else {
                enqueueSnackbar(data.options.message, { variant: "error" });
            }
        });
    }

    return {
        getSelectedOption,
        handleChange,
        openRialog,
        getAnswerTime,
        getReviewGrade,
        imDone,
    }
}

