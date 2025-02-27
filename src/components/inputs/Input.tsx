import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
  error?: boolean;
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', placeholder, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={`flex text-sm h-10 w-full rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-1 text-slate-300 md:text-md focus:outline-none focus:ring-2 focus:ring-primary  ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-primary">This field has an error.</p>
        )}
      </div>
    );
  }
);

export default Input;
