import { EmailFormFieldsProps } from "@/lib/types/qr";
import Input from "../Input";

export default function EmailFormFields({ email, subject, message, onChange }: EmailFormFieldsProps) {
    return (
        <div className="mt-3 space-y-2">
            <Input
                type="email"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => onChange({ email: e.target.value, subject, message })}
                required={true}
            />
            <Input
                type="text"
                name="subject"
                label="Subject"
                value={subject}
                onChange={(e) => onChange({ email, subject: e.target.value, message })}
                required={true}
            />
            <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => onChange({ email, subject, message: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                    required={true}
                />
            </div>
        </div>
    );
}