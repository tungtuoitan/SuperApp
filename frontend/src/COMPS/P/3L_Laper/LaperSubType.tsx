import {FCSubType, FCType, WRow} from "./3Lui";
import {LaperTypeProps} from "./3Lty";
import {FormControlLabel} from "@mui/material";
import {Checkbox} from "@mui/material";
import {toggleX} from "./3Lhe";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";



export default function LaperSubType(props: LaperTypeProps) {
    const { handleChange } = usePetailHelpers();
    const {id} = props;
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === id) ?? {} as PetailForm;

    return (
        <WRow>
            <FCSubType sx={{display: 'flex', flexDirection: 'row'}}>
                {/* {Object.values(evSubType[petail.type as EvType]).map((value, index) => (
                    <FormControlLabel 
                        control={<Checkbox 
                            checked={petail.subType.includes(value) ? true : false} 
                            onChange={()=>handleChange(id, 'subType', toggleX(petail.subType??'', value))}
                            sx={{display:'none'}} 
                            />} 
                        label={value} 
                        key={index}
                        sx={{
                            color: petail.subType.includes(value) ? '#00000080' : '#00000040',
                            margin: '0px 10px 0px 0px',
                            height: 24,
                            fontSize: 12,
                            border: petail.subType.includes(value) ? '1px solid #00000020' : '1px solid transparent',
                            background: petail.subType.includes(value) ? '#00000010' : '#00000000',
                            borderRadius: 50,
                            padding: '0px 10px',
                            
                            
                        }}
                    />
            ))} */}
            </FCSubType>
    </WRow>
    )
}