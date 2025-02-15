import {Button} from "@mui/material";
import AdiDesc from "./ADiDesc";
import AdiFink from "./ADiFink";
import AdiIds from "./ADiIds";
import AdiPesult from "./ADiPesult";
import ADiFeasons from "./ADiFeasons";
import {iuPr} from "../GAPIs";
import {usePridContainerStore} from "../2_GridContainer/PridContainerStore";
import {useADiStore} from "./ADiStore";
import {Pesult} from "../3_Petail/3ty";
import {useSnackbar} from "notistack";
import {Pr2, PrsResult} from "../GTypes";
import ADiTime from "./ADiTime";

export function ADiContent() {
    const { allPrs, setAllPrs } = usePridContainerStore();
    const { aDia, setADia } = useADiStore();
    const { enqueueSnackbar } = useSnackbar();


    return (
        <div style={{width: '100%', height: '100%', padding: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <AdiPesult/>
                <ADiTime/>
                <ADiFeasons/>
                <AdiDesc/>
                <AdiFink/>
                <AdiIds/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '40px'}}>

            <Button variant="contained" color="primary" sx={{width: '160px'}}
            onClick={() => {
                const pr = allPrs.find(pr => pr.id === aDia?.pesult.prId)
                if(!pr) return
                
                pr.pesults.push(aDia?.pesult as Pesult)
                const newPr: Pr2 = {...pr, pesults: JSON.stringify(pr?.pesults)}
                
                iuPr(newPr)
                .then((data: PrsResult) => {
                    if (data.options.success) {
                        setADia(null)
                        const newPr = {...data.prs[0], pesults: JSON.parse(data.prs[0].pesults)}
                        const newAllPrs = allPrs.map(pr => {
                            if(pr.id === data.prs[0].id) return newPr
                            return pr
                        })
                        setAllPrs(newAllPrs)
                        enqueueSnackbar(data.options.message, { variant: "success" });
                    } 
                    else {
                        enqueueSnackbar(data.options.message, { variant: "error" });
                    }
                });
            }}
            >Save</Button>
            </div>
        </div>
    )
}