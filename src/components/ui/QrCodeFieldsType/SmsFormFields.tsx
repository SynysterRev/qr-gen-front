import { SmsFormFieldsProps } from "@/lib/types/qr";
import Input from "../Input";

export default function SmsFormFields({ number, message, onChange }: SmsFormFieldsProps) {
    return (
        <div className="mt-3 space-y-2">
            <Input
                type="tel"
                name="number"
                label="Phone Number"
                value={number}
                onChange={(e) => onChange({ number: e.target.value, message })}
                required={true}
            />
            <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => onChange({ number, message: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                />
            </div>
        </div>
    );
}