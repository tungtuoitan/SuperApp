import { useContext, createContext, useReducer } from 'react';
import { EtailForm } from './EtailType';
import { addTime, dateToCDate } from '../3_TimeConfig/TimeHelpers';
import { ReactNode } from 'react';
import { sr } from '../TLConstants';

export const initEtailForm: EtailForm = {
    id: 0,
    parentId: 0,
    name: 'New Etail',
    levelC: sr.day.c,
    timeStart: dateToCDate(new Date()),
    timeEnd: addTime(dateToCDate(new Date()), 0, 0, 0, 10, 0),
    type: null
};
const EtailFormStore = createContext<[EtailForm, React.Dispatch<Partial<EtailForm>>]>([initEtailForm, () => {}]);
export const useEtailFormStore = () => useContext(EtailFormStore);


export const EtailFormStoreProvider = ({ children }: { children: ReactNode }) => {
    const [etailForm, setEtailForm] = useReducer(
        (state: EtailForm, newState: Partial<EtailForm>) => ({ ...state, ...newState }),
        initEtailForm
    );

    return (
        <EtailFormStore.Provider
            value={[etailForm, setEtailForm]}>
            {children}
        </EtailFormStore.Provider>
    )
}