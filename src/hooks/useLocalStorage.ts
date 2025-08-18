import { useState, useEffect, useCallback } from 'react';

const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    const [state, setState] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            if (state !== undefined) {
                localStorage.setItem(key, JSON.stringify(state));
            } else {
                localStorage.removeItem(key);
            }
        } catch {
            // Silently fail (private mode, etc.)
        }
    }, [key, state]);

    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        setState(value);
    }, []);

    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setState(undefined as T);
        } catch {
            // Fail silently
        }
    }, [key]);

    return [state, setValue, remove];
};

export default useLocalStorage;