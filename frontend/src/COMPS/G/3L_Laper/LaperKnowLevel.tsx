import {WRow} from "./3Lui";
import {LaperNameProps} from "./3Lty";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";
import {sr} from "../../S/TLConstants";

export default function LaperKnowLevel(props: LaperNameProps) {
    const { handleChange } = usePetailHelpers();
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === props.id) ?? {} as PetailForm;

    return (
        <WRow>
        <FormControl
            sx={{
                // display: 'flex',
                // flexDirection: 'column',
                border: '1px solid rgb(199, 199, 199)',
                borderRadius: '5px',
                height: '30px',
                width: '100%',
                // paddingTop
            }}>
            <FormLabel
                sx={{
                    textAlign: 'left', 
                    fontSize: 10, 
                    position: 'relative', 
                    width: 84, 
                    background: 'white',
                    top: '-8px',
                    left: '10px',
                    padding: '0 5px 0 5px',
                }}
            >Knowledge level</FormLabel>
            <RadioGroup
            name="knowLevelC" 
            value={petail.knowLevelC} 
            onChange={(e)=>{
                handleChange(petail.id, e.target.name, e.target.value)
            }}
            sx={{
                // display: 'flex',
                flexDirection: 'row',
                fontSize: '12px',
                position: 'relative',
                top: '-19px',
                padding: '0 10px 0 10px',
                display: 'flex',
                justifyContent: 'center',
            }}
            >
                <FormControlLabel value={sr.knowLevel.b1.c} control={<Radio size="small" style={{color: '#333'}} />} label=''/>
                <FormControlLabel value={sr.knowLevel.b2.c} control={<Radio size="small" style={{color: '#333'}} />} label=''/>
                <FormControlLabel value={sr.knowLevel.b3.c} control={<Radio size="small" style={{color: '#333'}} />} label=''/>
                <FormControlLabel value={sr.knowLevel.b4.c} control={<Radio size="small" style={{color: '#333'}} />} label=''/>
                <FormControlLabel value={sr.knowLevel.b5.c} control={<Radio size="small" style={{color: '#333'}} />} label=''/>
            </RadioGroup>
        </FormControl>
    </WRow>
    )
}