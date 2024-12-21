import { useContext, createContext, useReducer, ReactNode } from 'react';
import {EtailForm} from './EtailType';

// Hàm reducer xử lý các hành động
const etailFormReducer = (state: EtailForm[], action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'INSE':
            return [...state, action.payload]; // Thêm một `Etails` mới
        case 'UPDA':
            return state.map(item =>
                item.id === action.payload.id ? { ...item, ...action.payload } : item
            ); // Cập nhật `Etails` theo `id`
        case 'REMO':
            return state.filter(item => item.id !== action.payload.id); // Xóa `Etails` theo `id`
        case 'CLEA':
            return []; // Xóa toàn bộ danh sách
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

// Context và custom hook để truy cập store
const EtailFormsStore = createContext<[EtailForm[], React.Dispatch<{ type: string; payload?: any }>]>([[], () => {}]);
export const useEtailsStore = () => useContext(EtailFormsStore);

// Provider component
export const EtailFormsStoreProvider = ({ children }: { children: ReactNode }) => {
    const [etails, dispatch] = useReducer(etailFormReducer, []); // Khởi tạo state là mảng rỗng

    return (
        <EtailFormsStore.Provider value={[etails, dispatch]}>
            {children}
        </EtailFormsStore.Provider>
    );
};
