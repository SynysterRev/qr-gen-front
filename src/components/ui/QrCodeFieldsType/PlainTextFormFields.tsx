import { PlainTextFormFieldsProps } from "@/lib/types/qr";

export default function PlainTextFormFields({ value, onChange }: PlainTextFormFieldsProps) {
    return (
        <div className="mt-3 space-y-2">
            <label className="block font-medium">Text</label>
            <textarea
                placeholder="Enter your text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl"
            />
        </div>
    );
}