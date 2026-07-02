import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const textAreaId = id ?? label.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col space-y-1">
        <label
          htmlFor={textAreaId}
          className={`text-sm font-medium text-heading capitalize ${className}`}
        >
          {label}
        </label>

        <textarea
          ref={ref}
          id={textAreaId}
          className={`input-field max-w-[60%] min-h-30 resize-none ${className}`}
          {...rest}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
