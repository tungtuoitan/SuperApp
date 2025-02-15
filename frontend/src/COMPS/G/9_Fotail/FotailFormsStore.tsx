import { useContext, createContext, useReducer, ReactNode } from 'react';
import {FotailForm} from './9ty';

// Hàm reducer xử lý các hành động
const petailFormReducer = (state: FotailForm[], action: { type: string; payload?: any }) => {
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
const PetailFormsStore = createContext<[FotailForm[], React.Dispatch<{ type: string; payload?: any }>]>([[], () => {}]);
export const usePetailFormStore = () => useContext(PetailFormsStore);

// Provider component
export const PetailFormsStoreProvider = ({ children }: { children: ReactNode }) => {
    const [petails, dispatch] = useReducer(petailFormReducer, []); // Khởi tạo state là mảng rỗng

    return (
        <PetailFormsStore.Provider value={[petails, dispatch]}>
            {children}
        </PetailFormsStore.Provider>
    );
};
