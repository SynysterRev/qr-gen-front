import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface PasswordInputData {
    label: string;
    name: string;
    value: string;
    placeholder: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>,
    error?: string
}

export default function PasswordInput({
    label,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    error
}: PasswordInputData) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(prev => !prev);

    return (
        <div className="space-y-2 flex flex-col">
            <label htmlFor={name}>
                {label}
            </label>
            <div className="relative">
                <Lock className="lucide lucide-lock absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                    type={showPassword ? "text" : "password"}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`border rounded-xl w-full h-10 pl-10 shadow-sm focus:outline-none ${error ? "border-red-500" : "border-gray-50"
                        }`}
                    placeholder={placeholder}
                    required
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all absolute right-0 top-0 mx-1 my-1 p-2 rounded-full cursor-pointer hover:bg-gray-100"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                </button>
            </div>
            {error && <div className="text-red-500 text-sm" style={{ whiteSpace: "pre-line" }}>{error}</div>}
        </div>
    );
}
