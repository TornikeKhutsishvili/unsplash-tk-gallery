import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  id,
  className = "",
  disabled,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-gray-400 dark:text-gray-500 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={`
            w-full rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed
            py-2.5 text-sm
            ${leftIcon  ? "pl-10" : "pl-3.5"}
            ${rightIcon ? "pr-10" : "pr-3.5"}
            ${
              error
                ? "border-red-400 dark:border-red-500 focus:ring-red-400"
                : "border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            }
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 text-gray-400 dark:text-gray-500">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      )}
    </div>
  );
}
