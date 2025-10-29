import {ChangeEvent, useState} from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const FormInput = ({label, value, onChange, type, placeholder, disabled}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative">
      <label className="block text-white font-medium">{label}</label>
      <input
        className={`bg-black/30 p-2 w-full rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400
        transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50
        ${isPassword ? 'pr-20' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={inputType}
        disabled={disabled}
        required
      />
      {isPassword &&
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="absolute flex justify-center items-center rounded text-gray-100 px-6 py-3 w-4 h-4 bottom-2 right-4 cursor-pointer bg-white/20
        hover:bg-white/10 transition-all duration-300 ease disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      }
    </div>
  )
}