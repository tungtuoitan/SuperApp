import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {WRow} from "./5Lui";
import {LaperNameProps} from "./5Lty";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {sr} from "../TLConstants";

export default function LaperPriority(props: LaperNameProps) {
    const { handleChange } = useEtailHelpers();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

    return (
        <WRow>
        <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgb(199, 199, 199)',
                borderRadius: '5px',
                height: '30px',
                width: '100%',
            }}>
            <FormLabel
                sx={{
                    textAlign: 'left', 
                    fontSize: 10, 
                    position: 'relative', 
                    width: 42, 
                    background: 'white',
                    top: '-8px',
                    left: '10px',
                    padding: '0 5px 0 5px',
                }}
            >Priority</FormLabel>
            <RadioGroup
            name="prioriC" 
            value={etail.prioriC} 
            onChange={(e)=>{
                handleChange(etail.id, e.target.name, e.target.value)
            }}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '12px',
                position: 'relative',
                top: '-19px',
                padding: '0 10px 0 10px',
            }}
            >
                <FormControlLabel value={sr.priority.top1.c} control={<Radio size="small"/>} label={sr.priority.top1.d} />
                <FormControlLabel value={sr.priority.top2.c} control={<Radio size="small"/>} label={sr.priority.top2.d} />
                <FormControlLabel value={sr.priority.top3.c} control={<Radio size="small"/>} label={sr.priority.top3.d} />
               
                <FormControlLabel value={sr.priority.high.c} control={<Radio size="small"/>} label={sr.priority.high.d} />
                <FormControlLabel value={sr.priority.medium.c} control={<Radio size="small" />} label={sr.priority.medium.d} />
                <FormControlLabel value={sr.priority.normal.c} control={<Radio size="small" />} label={sr.priority.normal.d} />
                <FormControlLabel value={sr.priority.low.c} control={<Radio size="small" />} label={sr.priority.low.d} />
            </RadioGroup>
        </FormControl>
    </WRow>
    )
}