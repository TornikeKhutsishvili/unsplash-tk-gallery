import type { HTMLAttributes, ReactNode } from "react";

type Padding  = "none" | "sm" | "md" | "lg";
type Variant  = "default" | "bordered" | "elevated";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  padding?: Padding;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
  bordered: "bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700",
  elevated: "bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-950 border border-transparent",
};

const paddingStyles: Record<Padding, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({
  variant = "default",
  padding = "md",
  header,
  footer,
  className = "",
  children,
  ...props
}: CardProps) {
  const hasSections = header || footer;

  return (
    <div
      className={`
        rounded-2xl overflow-hidden transition-colors duration-200
        ${variantStyles[variant]}
        ${!hasSections ? paddingStyles[padding] : ""}
        ${className}
      `}
      {...props}
    >
      {header && (
        <div className={`border-b border-gray-100 dark:border-gray-800 ${paddingStyles[padding]}`}>
          {header}
        </div>
      )}

      <div className={hasSections ? paddingStyles[padding] : ""}>
        {children}
      </div>

      {footer && (
        <div className={`border-t border-gray-100 dark:border-gray-800 ${paddingStyles[padding]}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
