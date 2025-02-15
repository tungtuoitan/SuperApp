import {FCSubType, FCType, WRow} from "./3Lui";
import {LaperTypeProps} from "./3Lty";
import {FormControlLabel} from "@mui/material";
import {Checkbox} from "@mui/material";
import {toggleX} from "./3Lhe";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";
import {useSRsStore} from "../../S/8_SRs/SRsStore";



export default function LaperTypes(props: LaperTypeProps) {
    const { handleChange } = usePetailHelpers();
    const {id} = props;
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === id) ?? {} as PetailForm;
    const { sRs } = useSRsStore();
    const allPrTypes = sRs.filter((sr) => sr.type === "PrType")

    return (
        <WRow>
            <FCSubType sx={{flexDirection: 'row'}}>
                {(allPrTypes??[]).map((value, index) => {
                    const {code, desc} = value;
                    return <FormControlLabel 
                        control={<Checkbox 
                            checked={petail.types?.includes(code) ? true : false} 
                            onChange={()=>handleChange(id, 'types', toggleX(petail.types??'', code))}
                            sx={{display:'none'}} 
                            />} 
                        label={desc} 
                        key={index}
                        sx={{
                            color: petail.types?.includes(code) ? '#00000080' : '#00000040',
                            margin: '0px 10px 0px 0px',
                            height: 24,
                            fontSize: 12,
                            border: petail.types?.includes(code) ? '1px solid #00000020' : '1px solid transparent',
                            background: petail.types?.includes(code) ? '#00000010' : '#00000000',
                            borderRadius: 50,
                            padding: '0px 10px',
                        }}
                    />
        })}
            </FCSubType>
    </WRow>
    )
}