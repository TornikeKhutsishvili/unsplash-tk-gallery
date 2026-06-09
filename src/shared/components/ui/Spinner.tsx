import { sizeMap } from "./SizeMap";

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div role="status" aria-label="Loading"
      className={`
        ${sizeMap[size]} ${className}
        border-2 border-gray-200 dark:border-gray-700
        border-t-blue-500 dark:border-t-blue-400
        rounded-full animate-spin
      `}
    />
  );
}
