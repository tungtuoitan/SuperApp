import {Button} from "@mui/material";
import {iuPr} from "../GAPIs";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {Pesult} from "../3_Petail/3ty";
import {useSnackbar} from "notistack";
import {Pr, Pr2, PrsResult} from "../GTypes";
import {toSid} from "../GHelpers";
import {useRialogStore} from "./RialogStore";
import CountdownTimer from "./Timer";
import {useEffect, useState} from "react";
import {countWords} from "./10he";
import {Kesult} from "./10ty";
import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {useRialogHelpers} from "./RialogHelpers";

export function RialogContent() {
    const { allPrs, setAllPrs } = useGridContainerStore();
    const { rialog, setRialog,reviewList, setReviewList, setFeymanList, setReviewStart, reviewStart, firstTime, setFirstTime, usedTime, setUsedTime } = useRialogStore();
    const {getAnswerTime, imDone} = useRialogHelpers();
    const curPr = reviewList[0]

    useEffect(() => {
        setUsedTime(0)
    }, [])

    return (
        <div style={{width: '100%', height: '100%', padding: '20px'}}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    {/* <div style={{display: 'flex', flexDirection: 'column'}}>Remain question: {reviewList.length}</div> */}
                    <div >
                        Question: {reviewList.length}
                        <div style={{fontSize:'32px',filter: reviewStart ? undefined : "blur(10px)"}}>{curPr.name}</div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {reviewStart && <CountdownTimer answerTime={getAnswerTime(curPr)}/>}
                        </div>
                    </div>
                </div>

                <div style={{paddingBottom: '60px', display: 'flex', justifyContent: 'center'}}>
                    {reviewStart ?
                    <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                        <Button variant="contained" color="primary" sx={{width: '180px'}} onClick={()=> imDone(curPr)} disabled={usedTime>=getAnswerTime(curPr)}>I'm done</Button>
                        <Button variant="contained" color='error' sx={{width: '180px'   }} onClick={()=> imDone(curPr)}>Fail & go next</Button>
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
    )
}