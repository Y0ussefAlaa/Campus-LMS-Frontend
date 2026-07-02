import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "btn-gradient shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 text-white",
  secondary:
    "bg-card border border-[var(--color-border)] text-heading hover:border-brand/30 hover:bg-blue-50 dark:hover:bg-blue-500/10",
  ghost:
    "bg-transparent text-muted hover:bg-blue-50 hover:text-brand dark:hover:bg-blue-500/10 dark:hover:text-brand-light",
  danger:
    "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
};

const Button = ({
  icon,
  text,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
