import {WRow} from "./5ui";
import {AdiNameProps} from "./5ty";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {his} from "../4_PeridContainer/4ty";
import {useADiStore} from "./ADiStore";
import {useADiaHelpers} from "./ADiaHelpers";

export default function AdiPesult(props: AdiNameProps) {
    const { handleChange } = useADiaHelpers();
    const { aDia, setADia } = useADiStore();
    
    return (
        <WRow>
        <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // border: '1px solid rgb(199, 199, 199)',
                borderRadius: '5px',
                height: '30px',
                width: '100%',
            }}>
            {/* <FormLabel
                sx={{
                    textAlign: 'left', 
                    fontSize: 10, 
                    position: 'relative', 
                    width: 42, 
                    background: 'white',
                    // top: '-18px',
                    left: '10px',
                    padding: '0 5px 0 5px',
                }}
            >Priority</FormLabel> */}
            <RadioGroup
            name="pesultC" 
            value={aDia?.pesult.pesultC} 
            onChange={(e)=>{
                handleChange(e.target.name, e.target.value)
            }}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '12px',
                position: 'relative',
                // top: '-19px',
                padding: '0 10px 0 10px',
            }}
            >
                <FormControlLabel value={his.pass.c} label={his.pass.d} control={<Radio size="small" 
                    sx={{
                        color: 'green',
                        '&.Mui-checked': {
                          color: 'green',
                        },
                      }}
                />} />
                <FormControlLabel value={his.fail.c} label={his.fail.d} control={<Radio size="small" 
                    sx={{
                        color: 'red',
                        '&.Mui-checked': {
                        color: 'red',
                        },
                    }}
                />}/>
                {/* <FormControlLabel value={his.empty.c} control={<Radio size="small" />} label={his.empty.d} /> */}
            </RadioGroup>
        </FormControl>
    </WRow>
    )
}