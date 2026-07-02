import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface CustomFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const CustomFileInput = forwardRef<HTMLInputElement, CustomFileInputProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-heading capitalize"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type="file"
          className={`input-field md:max-w-[60%] cursor-pointer py-2 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-sm file:font-medium file:text-brand hover:file:bg-blue-100 dark:file:bg-blue-500/15 dark:hover:file:bg-blue-500/25 ${className}`}
          {...rest}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

CustomFileInput.displayName = "CustomFileInput";

export default CustomFileInput;
