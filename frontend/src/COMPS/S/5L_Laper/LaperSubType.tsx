import {useEtailHelpers} from "../5_Etail/EtailHelpers";
import {useEtailFormStore} from "../5_Etail/EtailFormsStore";
import {EtailForm} from "../5_Etail/5ty";
import {FCSubType, FCType, WRow} from "./5Lui";
import {LaperTypeProps} from "./5Lty";
import {FormControlLabel} from "@mui/material";
import {evSubType, EvType} from "../TLConstants";
import {Checkbox} from "@mui/material";
import {toggleX} from "./5Lhe";



export default function LaperSubType(props: LaperTypeProps) {
    const { handleChange } = useEtailHelpers();
    const {id} = props;
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === id) ?? {} as EtailForm;

    return (
        <WRow>
            <FCSubType sx={{display: 'flex', flexDirection: 'row'}}>
                {Object.values(evSubType[etail.type as EvType]).map((value, index) => (
                    <FormControlLabel 
                        control={<Checkbox 
                            checked={etail.subType.includes(value) ? true : false} 
                            onChange={()=>handleChange(id, 'subType', toggleX(etail.subType??'', value))}
                            sx={{display:'none'}} 
                            />} 
                        label={value} 
                        key={index}
                        sx={{
                            color: etail.subType.includes(value) ? '#00000080' : '#00000040',
                            margin: '0px 10px 0px 0px',
                            height: 24,
                            fontSize: 12,
                            border: etail.subType.includes(value) ? '1px solid #00000020' : '1px solid transparent',
                            background: etail.subType.includes(value) ? '#00000010' : '#00000000',
                            borderRadius: 50,
                            padding: '0px 10px',
                            
                            
                        }}
                    />
            ))}
            </FCSubType>
    </WRow>
    )
}