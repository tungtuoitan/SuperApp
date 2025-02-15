import {FormControlLabel} from "@mui/material";
import {Checkbox} from "@mui/material";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {FCSubType, WRow} from "./5ui";
import {toggleX} from "./5he";
import {useADiStore} from "./ADiStore";
import {useADiaHelpers} from "./ADiaHelpers";



export default function ADiFeasons() {
    const { handleChange } = useADiaHelpers();
    const { aDia, setADia } = useADiStore();
    const { sRs } = useSRsStore();
    const allFeasons = sRs.filter((sr) => sr.type === "FeasonType")

    return (
        <WRow>
            <FCSubType sx={{display: 'flex', flexDirection: 'row'}}>
                {(allFeasons??[]).map((value, index) => {
                    const {code, desc} = value;
                    return <FormControlLabel 
                        control={<Checkbox 
                            checked={aDia?.pesult.feasonCs?.includes(code) ? true : false} 
                            onChange={()=>handleChange('feasonCs', toggleX(aDia?.pesult.feasonCs??'', code))}
                            sx={{display:'none'}} 
                            />} 
                        label={desc} 
                        key={index}
                        sx={{
                            color: aDia?.pesult.feasonCs?.includes(code) ? '#00000080' : '#00000040',
                            margin: '0px 10px 0px 0px',
                            height: 24,
                            fontSize: 12,
                            border: aDia?.pesult.feasonCs?.includes(code) ? '1px solid #00000020' : '1px solid transparent',
                            background: aDia?.pesult.feasonCs?.includes(code) ? '#00000010' : '#00000000',
                            borderRadius: 50,
                            padding: '0px 10px',
                        }}
                    />
        })}
            </FCSubType>
    </WRow>
    )
}