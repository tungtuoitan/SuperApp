import {WRow} from "./3Lui";
import {LaperNameProps} from "./3Lty";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {sr} from "../../S/TLConstants";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";

export default function LaperPriority(props: LaperNameProps) {
    const { handleChange } = useFotailHelpers();
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find(fotail => fotail.id === props.id) ?? {} as FotailForm;

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
            value={fotail.prioriC} 
            onChange={(e)=>{
                handleChange(fotail.id, e.target.name, e.target.value)
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
                <FormControlLabel value={sr.priority.high.c} control={<Radio size="small"/>} label={sr.priority.high.d} />
                <FormControlLabel value={sr.priority.medium.c} control={<Radio size="small" />} label={sr.priority.medium.d} />
                <FormControlLabel value={sr.priority.normal.c} control={<Radio size="small" />} label={sr.priority.normal.d} />
                <FormControlLabel value={sr.priority.low.c} control={<Radio size="small" />} label={sr.priority.low.d} />
            </RadioGroup>
        </FormControl>
    </WRow>
    )
}