import { WebsiteFormFieldsProps } from "@/lib/types/qr";
import Input from "../Input";

export default function WebsiteFormFields({ value, onChange }: WebsiteFormFieldsProps) {
    return (
        <div className="mt-3">
            <Input
                type="url"
                name="website"
                label="Website URL"
                value={value}
                placeholder="https://example.com"
                onChange={(e) => onChange(e.target.value)}
                required={true}
            />
        </div>
    );
}