import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

/*
  Controlled input that fires `onSearch` with the debounced value.
  The parent never sees every keystroke — only the settled value after 450ms.
*/
export function SearchBar({ onSearch, placeholder = 'ფოტოს მოძებნა...' }: SearchBarProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 450);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-10 py-3 rounded-2xl text-base
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          shadow-sm focus:outline-none focus:ring-2
          focus:ring-blue-500 dark:focus:ring-blue-400
          transition-all duration-200
        "
        aria-label="Search photos"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
