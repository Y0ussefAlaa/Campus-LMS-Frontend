import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, id, className = "", ...rest }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col space-y-1">
        <label
          htmlFor={selectId}
          className={`text-sm font-medium text-heading capitalize ${className}`}
        >
          {label}
        </label>

        <select
          ref={ref}
          id={selectId}
          className={`input-field max-w-[60%] ${className}`}
          {...rest}
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;