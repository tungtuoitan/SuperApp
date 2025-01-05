import { IAutoCompleteOptions } from "../../CommonHelpers/4_GenericAutoComplete";
import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {sr} from "../../S/TLConstants";
import {SelectField} from "../../S/TLTypes";
import {Pesult} from "../3_Petail/3ty";
import {his} from "../4_PeridContainer/4ty";
import {Pr} from "../PrTypes";
import {useADiStore} from "./ADiStore";

export const useADiaHelpers = () => {
    const { levelOptions } = useSRsStore();
    const { aDia, setADia } = useADiStore();


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
        if(aDia) {
            setADia({open: aDia.open, pesult: {...aDia.pesult, [fieldName]: value }});
        }
    }

    const openDia = (pr: Pr) => {
        const newPesult:Pesult = {
            id: pr?.pesults?.length??0,
            prId: pr.id, 

            pesultC: his.fail.c,
            feasonCs: '',
            
            activeC: sr.active.active.c,
            time: dateToCDate(new Date()),

            fink: '',
            note: '',
        }
        setADia({open:true, pesult: newPesult});
    }



    return {
        getSelectedOption,
        handleChange,
        openDia,
    }
}

