




import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { useTLBaseFgStore } from "../2_TLBaseFg/TLBaseFgStore";
import { IAutoCompleteOptions } from "../../Helpers/GenericAutoComplete";
import { CevelC, SelectField } from "../TLTypes";
import {  sr } from "../TLConstants";
import { useEtailFormStore } from "./EtailFormStore";
import { dateToCDate } from "../3_TimeConfig/TimeHelpers";
import { useSRsStore } from "../8_SRs/SRsStore";

export const useEtailHelpers = () => {
    const { TIList, dateReal } = useTLBaseBgStore();
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const [etailForm, setEtailForm] = useEtailFormStore();
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

    const handleChange = (fieldName: string, value: any) => {
        switch (fieldName) {
            case 'name':
                setEtailForm({ name: value });
                break;
            case 'level':
                const newLevel = levelOptions.find(option => option.code === value)?.desc as CevelC ?? sr.hour.c;
                setEtailForm({ levelC: newLevel });
                break;
            case 'dateStart':
            case 'timeStart':
                setEtailForm({ timeStart: dateToCDate(value) });
                break;
            case 'dateEnd':
            case 'timeEnd':
                setEtailForm({ timeEnd: dateToCDate(value) });
                break;
        }
    }



    return {
        getSelectedOption,
        handleChange
    }
}

