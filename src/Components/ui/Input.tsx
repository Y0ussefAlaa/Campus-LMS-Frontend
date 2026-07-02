import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  divClass?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, id, className = "", type = "text", divClass, ...rest },
    ref,
  ) => {
    const inputId = id ?? label.toLowerCase().replace(/\s/g, "-");

    return (
      <div className={`flex flex-col space-y-1 ${divClass} `}>
        <label
          htmlFor={inputId}
          className={`text-sm font-medium text-heading capitalize ${className}`}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`input-field max-w-[60%]  ${className}`}
          {...rest}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
