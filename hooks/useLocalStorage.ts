"use client";

import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type UseLocalStorageResult<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  removeValue: () => void;
  isHydrated: boolean;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageResult<T> {
  const [value, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    queueMicrotask(() => {
      if (!isCurrent) return;

      try {
        const serializedValue = window.localStorage.getItem(key);
        if (serializedValue !== null) {
          setStoredValue(JSON.parse(serializedValue) as T);
        }
      } catch {
        window.localStorage.removeItem(key);
      } finally {
        setIsHydrated(true);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [key]);

  useEffect(() => {
    function syncAcrossTabs(event: StorageEvent) {
      if (event.key !== key) return;

      if (event.newValue === null) {
        setStoredValue(initialValue);
        return;
      }

      try {
        setStoredValue(JSON.parse(event.newValue) as T);
      } catch {
        setStoredValue(initialValue);
      }
    }

    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, [initialValue, key]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (nextValue) => {
      setStoredValue((currentValue) => {
        const resolvedValue =
          typeof nextValue === "function"
            ? (nextValue as (current: T) => T)(currentValue)
            : nextValue;

        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue));
        } catch {
          // Keep the in-memory session usable if device storage is unavailable.
        }
        return resolvedValue;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [initialValue, key]);

  return { value, setValue, removeValue, isHydrated };
}
