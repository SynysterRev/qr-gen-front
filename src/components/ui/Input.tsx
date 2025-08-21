import { ChangeEventHandler, FocusEventHandler, SVGProps } from "react";

interface InputData {
    label: string;
    name: string;
    value: string;
    type: string;
    placeholder?: string;
    icon?: React.FC<SVGProps<SVGSVGElement>>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    error?: string;
    className?: string;
    required: boolean;
}

export default function Input({
    label,
    name,
    value,
    type,
    placeholder,
    icon: Icon,
    onChange,
    onBlur,
    error,
    className,
    required = false
}: InputData) {
    return (
        <div className="space-y-2 flex flex-col text-md">
            <label htmlFor={name}>{label}</label>
            <div className="relative">
                {Icon && (
                    <Icon
                        className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground"
                    />
                )}
                <input
                    id={name}
                    name={name}
                    type={type}
                    className={`${className} rounded-xl w-full h-10 px-3 ${Icon ? "pl-10" : ""}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                />
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}