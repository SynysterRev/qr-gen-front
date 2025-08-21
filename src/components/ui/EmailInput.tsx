import { ChangeEventHandler, FocusEventHandler } from "react";
import Input from "./Input";
import { Mail } from "lucide-react";

interface EmailInputData {
    label: string;
    name: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur: FocusEventHandler<HTMLInputElement>,
    error: string
}

export default function EmailInput({
    label,
    name,
    value,
    onChange,
    onBlur,
    error
}: EmailInputData) {
    return (
        <div className="space-y-2 flex flex-col">
            <Input
                label={label}
                name={name}
                type="email"
                className={`shadow-sm ${error ? "border border-red-500 focus:outline-none" : ""
                    }`}
                placeholder="Enter your email"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={true}
                icon={Mail}
                error={error}
            />
        </div>
    )
}