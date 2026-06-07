interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`
        ${sizeMap[size]} ${className}
        border-2 border-gray-200 dark:border-gray-700
        border-t-blue-500 dark:border-t-blue-400
        rounded-full animate-spin
      `}
    />
  );
}
