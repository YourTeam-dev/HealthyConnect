import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full px-4 py-2 text-sm text-[#333] placeholder-[#aaa] bg-white border border-gray-300 rounded-2xl transition focus:outline-none focus:ring-2 focus:ring-[#008CBA] hover:border-[#007BAA]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
