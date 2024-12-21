




import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { IAutoCompleteOptions } from "../../CommonHelpers/4_GenericAutoComplete";
import { SelectField } from "../TLTypes";
import { useSRsStore } from "../8_SRs/SRsStore";
import {useEtailsStore} from "./EtailFormsStore";

export const useEtailHelpers = () => {
    const [etails, dispatch] = useEtailsStore();
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
        console.log('fieldName', fieldName, 'value', value);
        dispatch({type: 'UPDA', payload: {id, [fieldName]: value }});
    }



    return {
        getSelectedOption,
        handleChange
    }
}

