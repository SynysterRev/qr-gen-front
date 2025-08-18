import { ChangeEventHandler, FocusEventHandler } from "react";

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
            <label htmlFor={name}>{label}</label>
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3 top-3.5 h-4 w-4 text-muted-foreground">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <input
                    id={name}
                    name={name}
                    type="email"
                    className="border border-gray-50 rounded-xl w-full h-10 pl-10 shadow-sm"
                    placeholder="Enter your email"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                />
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}