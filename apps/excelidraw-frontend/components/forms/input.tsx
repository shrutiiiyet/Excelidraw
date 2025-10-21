import { EyeOff, Eye } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
  title: string;
  placeholder: string;
  type: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: "name" | "email";
}

export const Input = ({
  type,
  title,
  placeholder,
  required = false,
  value,
  onChange,
  error,
  autoComplete,
}: InputProps) => {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:outline-none"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      {error && (
        <div className="mt-2 text-right text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

interface InputPasswordProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete: "new-password" | "current-password";
}

export const InputPassword = ({
  title,
  value,
  onChange,
  placeholder = "Enter password",
  required = false,
  error,
  autoComplete,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-black focus:border-transparent focus:ring-2 focus:outline-none"
          placeholder={placeholder}
          required={required}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && (
        <div className="mt-2 text-right text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};
