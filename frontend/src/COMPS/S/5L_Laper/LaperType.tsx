import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {FCType, WRow} from "./5Lui";
import {LaperTypeProps} from "./5Lty";
import {FormControlLabel} from "@mui/material";
import {evType, sr} from "../TLConstants";
import {Checkbox} from "@mui/material";
import {toggleX} from "./5Lhe";



export default function LaperType(props: LaperTypeProps) {
    const { handleChange } = useEtailHelpers();
    const {id} = props;
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === id) ?? {} as EtailForm;

    return (
        <WRow>
            <FCType sx={{display: 'flex', flexDirection: 'row'}}>
                {Object.values(evType).map((value, index) => (
                    <FormControlLabel 
                        control={<Checkbox 
                            checked={etail.type && etail.type.includes(value) ? true : false} 
                            onChange={()=>handleChange(id, 'type', toggleX(etail.type??'', value))}
                            sx={{display:'none'}} 
                            />} 
                        label={value} 
                        key={index}
                        sx={{
                            color: etail.type && etail.type.includes(value) ? 'black' : '#00000040',
                            margin: '0px 10px 0px 0px',
                            '& span': {fontWeight: 800},
                        }}
                    />
            ))}
            </FCType>
    </WRow>
    )
}