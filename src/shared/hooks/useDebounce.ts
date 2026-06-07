import { useEffect, useState } from "react";

/*
  Delays updating the returned value until `delay` ms have passed
  since the last change. Used to avoid firing a search request on
  every keystroke.
*/
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
