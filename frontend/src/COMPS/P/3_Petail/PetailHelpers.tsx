import { IAutoCompleteOptions } from "../../CommonHelpers/4_GenericAutoComplete";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {SelectField} from "../../S/TLTypes";
import {usePetailFormStore} from "./PetailFormsStore";

export const usePetailHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const { levelOptions } = useSRsStore();


    const getSelectedOption = (option: SelectField, id: number): IAutoCompleteOptions | null => {
        let result: IAutoCompleteOptions | null = null;
        switch (option) {
            case 'level':
                result = levelOptions.filter((item) => item.id === id)[0];
                break;
            default:
                result = { id: 0, desc: '' } as IAutoCompleteOptions;
                break;
        }
        return result;
    };

    const handleChange = (id: number, fieldName: string, value: any) => {
        // console.log('fieldName', fieldName, 'value', value);
        dispatch({type: 'UPDA', payload: {id, [fieldName]: value }});
    }



    return {
        getSelectedOption,
        handleChange
    }
}

