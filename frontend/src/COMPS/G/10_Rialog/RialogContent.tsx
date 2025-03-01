import {Button} from "@mui/material";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {useRialogStore} from "./RialogStore";
import CountdownTimer from "./Timer";
import {useEffect, useState} from "react";
import {Kesult, ReviewItem} from "./10ty";
import {useRialogHelpers} from "./RialogHelpers";

export function RialogContent() {
    const { allPrs, setAllPrs } = useGridContainerStore();
    const { rialog, setRialog,reviewList, setReviewList, setFeymanList, setReviewStart, reviewStart, firstTime, setFirstTime, usedTime, setUsedTime, curReviewIndex, setCurReviewIndex } = useRialogStore();
    const {getAnswerTime, imDone, getReviewGrade} = useRialogHelpers();
    const curReviewItem = reviewList[curReviewIndex] as ReviewItem

    useEffect(() => {
        setUsedTime(0)
    }, [])

    return (
        (curReviewItem || curReviewIndex <= reviewList.length-1) ? 
        <div style={{width: '100%', height: '100%', padding: '20px'}}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    {/* <div style={{display: 'flex', flexDirection: 'column'}}>Remain question: {reviewList.length}</div> */}
                    <div >
                        Question: {reviewList.filter(r => r.done).length+1}/{reviewList.length}
                        <div style={{fontSize:'32px',filter: reviewStart ? undefined : "blur(10px)"}}>{curReviewItem.name}</div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {reviewStart && <CountdownTimer answerTime={getAnswerTime(curReviewItem)}/>}
                            {
                                reviewStart &&
                                <div style={{textAlign: 'center', fontSize:'bold', fontStyle:'italic'}}>{getReviewGrade(curReviewItem)}, {usedTime}/{getAnswerTime(curReviewItem)}</div>
                            }
                        </div>
                    </div>
                </div>

                <div style={{paddingBottom: '60px', display: 'flex', justifyContent: 'center'}}>
                    {reviewStart ?
                    <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                        <Button variant="contained" color="primary" sx={{width: '180px'}} onClick={()=> imDone()} >Done, next quesion</Button>
                        {/* <Button variant="contained" color='error' sx={{width: '180px'   }} onClick={()=> imDone(curReviewItem)}>Fail & go next</Button> */}
                    </div>
                        : 
                        <Button variant="contained" color="primary" sx={{width: '160px'}} 
                            onClick={()=> {
                                setReviewStart(true)
                                setFirstTime(false)
                                setUsedTime(0)
                            }}>
                            {firstTime ? 'Start' : 'Start new'}
                        </Button>
                    }
                </div>
            </div>
        </div>
        : <div style={{width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            marginTop: '-20px'
        }}>Congratulations, you reviewed {reviewList.length} Knowledges today!</div>
    )
}