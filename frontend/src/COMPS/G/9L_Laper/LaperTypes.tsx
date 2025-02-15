import {FCSubType, FCType, WRow} from "./3Lui";
import {LaperTypeProps} from "./3Lty";
import {FormControlLabel} from "@mui/material";
import {Checkbox} from "@mui/material";
import {toggleX} from "./3Lhe";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {useFotailHelpers} from "../9_Fotail/FotailHelpers";



export default function LaperTypes(props: LaperTypeProps) {
    const { handleChange } = useFotailHelpers();
    const {id} = props;
    const [fotails, dispatchFo] = useFotailFormStore();
    const fotail = fotails.find(fotail => fotail.id === id) ?? {} as FotailForm;
    const { sRs } = useSRsStore();
    const allPrTypes = sRs.filter((sr) => sr.type === "PrType")

    return (
        <WRow>
            <FCSubType sx={{flexDirection: 'row'}}>
                {/* {(allPrTypes??[]).map((value, index) => {
                    const {code, desc} = value;
                    return <FormControlLabel 
                        control={<Checkbox 
                            checked={fotail.types?.includes(code) ? true : false} 
                            onChange={()=>handleChange(id, 'types', toggleX(fotail.types??'', code))}
                            sx={{display:'none'}} 
                            />} 
                        label={desc} 
                        key={index}
                        sx={{
                            color: fotail.types?.includes(code) ? '#00000080' : '#00000040',
                            margin: '0px 10px 0px 0px',
                            height: 24,
                            fontSize: 12,
                            border: fotail.types?.includes(code) ? '1px solid #00000020' : '1px solid transparent',
                            background: fotail.types?.includes(code) ? '#00000010' : '#00000000',
                            borderRadius: 50,
                            padding: '0px 10px',
                        }}
                    />
        })} */}
            </FCSubType>
    </WRow>
    )
}