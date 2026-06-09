import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "./ui-general/Input";
import { Button } from "./ui-general/Button";
import { SearchIcon } from "./SearchIcon";
import { ClearIcon } from "./ClearIcon";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

/*
  Controlled input that fires `onSearch` with the debounced value.
  The parent never sees every keystroke — only the settled value after 450ms.
*/
export function SearchBar({ onSearch, placeholder = 'ფოტოს მოძებნა...' }: SearchBarProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 450);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search photos"
        leftIcon={SearchIcon}
        rightIcon={value ? <span /> : undefined}
        className="py-3 text-base rounded-2xl"
      />
      {value && (
        <Button
          variant="ghost"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute inset-y-0 right-1 my-auto h-8 w-8 p-0 rounded-xl
                    text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {ClearIcon}
        </Button>
      )}
    </div>
  );
}
