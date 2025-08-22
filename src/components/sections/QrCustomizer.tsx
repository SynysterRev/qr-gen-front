import Slider from "@/components/ui/Slider";
import QrCodeTypeSelector from "@/components/ui/QrCodeFieldsType/QrCodeTypeSelector";
import WebsiteFormFields from "@/components/ui/QrCodeFieldsType/WebsiteFormFields";
import PlainTextFormFields from "@/components/ui/QrCodeFieldsType/PlainTextFormFields";
import WifiFormFields from "@/components/ui/QrCodeFieldsType/WifiFormFields";
import ContactFormFields from "@/components/ui/QrCodeFieldsType/ContactFormFields";
import EmailFormFields from "@/components/ui/QrCodeFieldsType/EmailFormFields";
import SmsFormFields from "@/components/ui/QrCodeFieldsType/SmsFormFields";
import { QrCustomizerProps } from "@/lib/types/qr";

export default function QrCustomizer({
    qrData,
    onDataChange
}: QrCustomizerProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onDataChange("config", {
            ...qrData.config,
            [name]: value
        });
    };

    const handleSliderChange = (name: string, value: number) => {
        onDataChange("config", {
            ...qrData.config,
            [name]: value
        });
    };
    return (
        <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1">
            <h3 className="font-semibold text-2xl mb-6">Customize Your QR Code</h3>

            {/* Section: Content Type */}
            <div className="mb-6">
                <div className="space-y-2 flex flex-col">
                    <label className="font-medium">QR Code Type</label>
                    <QrCodeTypeSelector 
                    type={qrData.type} 
                     onChange={(val) => onDataChange("type", val)} />
                </div>

                {/* Dynamic form fields based on type */}
                <div className="mt-4">
                    {qrData.type === "website" && (
                        <WebsiteFormFields
                            value={qrData.website ?? ""}
                            onChange={(val) => onDataChange("website", val)}
                        />
                    )}
                    {qrData.type === "text" && (
                        <PlainTextFormFields
                            value={qrData.text ?? ""}
                            onChange={(val) => onDataChange("text", val)}
                        />
                    )}
                    {qrData.type === "wifi" && (
                        <WifiFormFields
                            ssid={qrData.wifi?.ssid ?? ""}
                            password={qrData.wifi?.password ?? ""}
                            onChange={(val) => onDataChange("wifi", val)}
                        />
                    )}
                    {qrData.type === "contact" && (
                        <ContactFormFields
                            contact={qrData.contact || {}}
                            onChange={(val) => onDataChange("contact", val)}
                        />
                    )}
                    {qrData.type === "email" && (
                        <EmailFormFields
                            email={qrData.email?.email ?? ""}
                            subject={qrData.email?.subject ?? ""}
                            message={qrData.email?.message ?? ""}
                            onChange={(val) => onDataChange("email", val)}
                        />
                    )}
                    {qrData.type === "sms" && (
                        <SmsFormFields
                            number={qrData.sms?.number ?? ""}
                            message={qrData.sms?.message ?? ""}
                            onChange={(val) => onDataChange("sms", val)}
                        />
                    )}
                </div>
            </div>

            {/* Section: Appearance */}
            <div className="border-t pt-6">
                <h4 className="font-medium text-lg mb-4">Appearance</h4>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <Slider
                            label="Border Size"
                            value={qrData.config.borderSize}
                            min={0}
                            max={10}
                            onChange={(value) => handleSliderChange("borderSize", value)}
                            color="#8B5CF6"
                            name="borderSize"
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="fillColor">QR Color</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                className="border border-gray-300 rounded-xl p-1 w-12 h-10"
                                value={qrData.config.fillColor}
                                onChange={handleInputChange}
                                name="fillColor"
                            />
                            <input
                                className="border border-gray-300 rounded-xl p-2 flex-1"
                                value={qrData.config.fillColor}
                                onChange={handleInputChange}
                                name="fillColor"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <Slider
                        label="Scale"
                        value={qrData.config.scale}
                        min={1}
                        max={20}
                        onChange={(value) => handleSliderChange("scale", value)}
                        color="#8B5CF6"
                        name="scale"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="backgroundColor">Background Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            className="border border-gray-300 rounded-xl p-1 w-12 h-10"
                            value={qrData.config.backgroundColor}
                            onChange={handleInputChange}
                            name="backgroundColor"
                        />
                        <input
                            className="border border-gray-300 rounded-xl p-2 flex-1"
                            value={qrData.config.backgroundColor}
                            onChange={handleInputChange}
                            name="backgroundColor"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}