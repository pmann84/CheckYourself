import { useMemo } from "react";

export interface IStorage {
    save<T>(key: string, value: T): void;
    load<T>(key: string, defaultValue: T): T;
}

class LocalStorage implements IStorage {
    save<T>(key: string, value: T) {
        const data = JSON.stringify(value);
        window.localStorage.setItem(key, data);
    }

    load<T>(key: string, defaultValue: T): T {
        const data = window.localStorage.getItem(key);
        if (!data || data === null) return defaultValue;
        try {
            return JSON.parse(data) as T;
        } catch {
            return defaultValue;
        }
    }
}

export const useLocalStorage = () => {
    return useMemo(() => new LocalStorage() as IStorage, []);
};
