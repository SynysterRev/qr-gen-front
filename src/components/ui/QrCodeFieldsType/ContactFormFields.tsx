import { ContactFormFieldsProps } from "@/lib/types/qr";
import Input from "../Input";

export default function ContactFormFields({ contact, onChange }: ContactFormFieldsProps) {
    const handleFieldChange = (field: string, value: string) => {
        onChange({
            ...contact,
            [field]: value
        });
    };
    return (
        <div className="mt-3 space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="First Name *"
                    name="firstName"
                    type="text"
                    value={contact?.firstName || ''}
                    placeholder="John"
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    required={true}
                />
                <Input
                    label="Last Name *"
                    name="lastName"
                    type="text"
                    value={contact?.lastName || ''}
                    placeholder="Doe"
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    required={true}
                />
            </div>

            {/* Organization */}
            <Input
                label="Organization"
                name="organization"
                type="text"
                value={contact?.organization || ''}
                placeholder="Acme Corp"
                onChange={(e) => handleFieldChange('organization', e.target.value)}
                required={false}
            />

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={contact?.phone || ''}
                    placeholder="+1 (555) 123-4567"
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    required={false}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={contact?.email || ''}
                    placeholder="john@example.com"
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    required={false}
                />
            </div>

            {/* Website */}
            <Input
                label="Website"
                name="website"
                type="url"
                value={contact?.website || ''}
                placeholder="https://johndoe.com"
                onChange={(e) => handleFieldChange('website', e.target.value)}
                required={false}
            />

            {/* Address - On garde textarea car Input ne gère que les input */}
            <div className="space-y-2 flex flex-col text-md">
                <label htmlFor="address">Address</label>
                <textarea
                    id="address"
                    name="address"
                    value={contact?.address || ''}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                    rows={2}
                    className="border border-gray-300 rounded-xl w-full px-3 py-2 resize-none"
                />
            </div>
        </div>
    );
}