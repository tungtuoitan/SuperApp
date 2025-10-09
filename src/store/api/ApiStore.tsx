import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface ApiContextData<T = any> {
    // API call data
    data: T | null;
    setData: Dispatch<SetStateAction<T | null>>;
    
    // API call loading states
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    
    // API call error states
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    
    // Multiple API call support
    apiCalls: Record<string, {
        data: any;
        loading: boolean;
        error: string | null;
    }>;
    setApiCalls: Dispatch<SetStateAction<Record<string, {
        data: any;
        loading: boolean;
        error: string | null;
    }>>>;
    
    // Last executed API call info
    lastExecutedCall: string | null;
    setLastExecutedCall: Dispatch<SetStateAction<string | null>>;
    
    // API call history
    callHistory: Array<{
        callId: string;
        timestamp: Date;
        success: boolean;
        duration?: number;
    }>;
    setCallHistory: Dispatch<SetStateAction<Array<{
        callId: string;
        timestamp: Date;
        success: boolean;
        duration?: number;
    }>>>;
}

const apiContextDefaultValue: ApiContextData = {
    // API call data
    data: null,
    setData: () => { },
    
    // API call loading states
    loading: false,
    setLoading: () => { },
    
    // API call error states
    error: null,
    setError: () => { },
    
    // Multiple API call support
    apiCalls: {},
    setApiCalls: () => { },
    
    // Last executed API call info
    lastExecutedCall: null,
    setLastExecutedCall: () => { },
    
    // API call history
    callHistory: [],
    setCallHistory: () => { },
};

export const ApiStore = createContext<ApiContextData>(apiContextDefaultValue);

export const useApiStore = () => useContext(ApiStore);

export const ApiProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    // API call data
    const [data, setData] = useState<any>(null);
    
    // API call loading states
    const [loading, setLoading] = useState<boolean>(false);
    
    // API call error states
    const [error, setError] = useState<string | null>(null);
    
    // Multiple API call support
    const [apiCalls, setApiCalls] = useState<Record<string, {
        data: any;
        loading: boolean;
        error: string | null;
    }>>({});
    
    // Last executed API call info
    const [lastExecutedCall, setLastExecutedCall] = useState<string | null>(null);
    
    // API call history
    const [callHistory, setCallHistory] = useState<Array<{
        callId: string;
        timestamp: Date;
        success: boolean;
        duration?: number;
    }>>([]);
    
    return (
        <ApiStore.Provider
            value={{
                // API call data
                data,
                setData,
                
                // API call loading states
                loading,
                setLoading,
                
                // API call error states
                error,
                setError,
                
                // Multiple API call support
                apiCalls,
                setApiCalls,
                
                // Last executed API call info
                lastExecutedCall,
                setLastExecutedCall,
                
                // API call history
                callHistory,
                setCallHistory,
            }}>
            {children}
        </ApiStore.Provider>
    );
};