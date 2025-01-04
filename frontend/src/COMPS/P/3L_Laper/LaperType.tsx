import { FCType, FLType, RGType, WRow } from "./3Lui";
import { LaperTypeProps } from "./3Lty";
import {usePetailHelpers} from "../3_Petail/PetailHelpers";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {PetailForm} from "../3_Petail/3ty";

export default function LaperType(props: LaperTypeProps) {
    const { handleChange } = usePetailHelpers();
    const { id } = props;
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find((petail) => petail.id === id) ?? ({} as PetailForm);

    return (
        <WRow>
            <FCType>
                <FLType>Type</FLType>
                <RGType
                    name="type"
                    value={petail.types}
                    onChange={(e) => {
                        handleChange(petail.id, e.target.name, e.target.value);
                    }}
                >
                    {/* {Object.values(evType).map((value, index) => (
                        <FormControlLabel
                            value={value}
                            control={<Radio size="small" />}
                            label={value}
                            key={index}
                        />
                    ))} */}
                </RGType>
            </FCType>
        </WRow>
    );
}