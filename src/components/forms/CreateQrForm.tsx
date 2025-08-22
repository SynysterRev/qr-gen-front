
"use client";

import Input from '@/components/ui/Input';
import QrCodeTypeSelector from '@/components/ui/QrCodeFieldsType/QrCodeTypeSelector';
import { useQrCodeForm } from '@/hooks/useQrCodeForm';
import WebsiteFormFields from '@/components/ui/QrCodeFieldsType/WebsiteFormFields';
import PlainTextFormFields from '@/components/ui/QrCodeFieldsType/PlainTextFormFields';
import ContactFormFields from '@/components/ui/QrCodeFieldsType/ContactFormFields';
import WifiFormFields from '@/components/ui/QrCodeFieldsType/WifiFormFields';
import EmailFormFields from '@/components/ui/QrCodeFieldsType/EmailFormFields';
import SmsFormFields from '@/components/ui/QrCodeFieldsType/SmsFormFields';
import Slider from '../ui/Slider';

export default function CreateQrForm({ onSubmit }: { onSubmit: (data: any) => void }) {

    const { formData, setType, updateField, reset } = useQrCodeForm();

    return (
        <>
            <form className="space-y-4" onSubmit={onSubmit}>
                <Input
                    label="QR Code Name"
                    name="qr-name"
                    type={"text"}
                    value={""}
                    placeholder="My QR Code"
                    className="border border-gray-200"
                    required={true}
                    onChange={() => { }}
                ></Input>
                <div className="space-y-2 flex flex-col">
                    <label>QR Code Type</label>
                    <QrCodeTypeSelector type={formData.type} onChange={setType} />
                    {formData.type === "website" && (
                        <WebsiteFormFields
                            value={formData.website ?? ""}
                            onChange={(val) => updateField("website", val)}
                        />
                    )}

                    {formData.type === "text" && (
                        <PlainTextFormFields
                            value={formData.text ?? ""}
                            onChange={(val) => updateField("text", val)}
                        />
                    )}

                    {formData.type === "wifi" && (
                        <WifiFormFields
                            ssid={formData.wifi?.ssid ?? ""}
                            password={formData.wifi?.password ?? ""}
                            onChange={(val) => updateField("wifi", val)}
                        />
                    )}

                    {formData.type === "contact" && (
                        <ContactFormFields
                            contact={formData.contact || {}}
                            onChange={(val) => updateField("contact", val)}
                        />
                    )}

                    {formData.type === "email" && (
                        <EmailFormFields
                            email={formData.email?.email ?? ""}
                            subject={formData.email?.subject ?? ""}
                            message={formData.email?.message ?? ""}
                            onChange={(val) => updateField("email", val)}
                        />
                    )}

                    {formData.type === "sms" && (
                        <SmsFormFields
                            number={formData.sms?.number ?? ""}
                            message={formData.sms?.message ?? ""}
                            onChange={(val) => updateField("sms", val)}
                        />
                    )}
                </div>
                <div className="flex gap-4">
                    <div className="flex-1/2">
                        <Slider
                            label="Border Size"
                            value={formData.qrConfig.borderSize}
                            min={0}
                            max={10}
                            onChange={(value) => updateField("qrConfig", { ...formData.qrConfig, borderSize: value })}
                            color="#8B5CF6"
                            name="borderSize"
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-1/2">
                        <label htmlFor="url">QR Color</label>
                        <div className="flex gap-2">
                            {/* change input color to something a bit more friendly */}
                            <input
                                type="color"
                                className="border border-gray-300 rounded-xl p-1 w-12 h-10"
                                value={formData.qrConfig.fillColor}
                                onChange={e => updateField("qrConfig", { ...formData.qrConfig, fillColor: e.target.value })}
                                name="fillColor"
                            />
                            <input
                                className="border border-gray-300 rounded-xl p-2 w-full"
                                value={formData.qrConfig.fillColor}
                                onChange={e => updateField("qrConfig", { ...formData.qrConfig, fillColor: e.target.value })}
                                name="fillColor"></input>
                        </div>
                    </div>
                </div>
                <div>
                    <Slider
                        label="Scale"
                        value={formData.qrConfig.scale}
                        min={1}
                        max={20}
                        onChange={(value) => updateField("qrConfig", { ...formData.qrConfig, scale: value })}
                        color="#8B5CF6"
                        name="scale"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="background-color">Background Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            className="border border-gray-300 rounded-xl p-1 w-12 h-10"
                            value={formData.qrConfig.backgroundColor}
                            onChange={e => updateField("qrConfig", { ...formData.qrConfig, backgroundColor: e.target.value })}
                            name="backgroundColor"></input>
                        <input
                            className="border border-gray-300 rounded-xl p-2 w-full"
                            value={formData.qrConfig.backgroundColor}
                            onChange={e => updateField("qrConfig", { ...formData.qrConfig, backgroundColor: e.target.value })}
                            name="backgroundColor"></input>
                    </div>
                </div>
                <h3 className="text-2xl font-bold">Preview</h3>
                {/* <div className="flex justify-center items-center animate-float h-[400px]">
                    {qrPreviewUrl && (
                        <div className="relative rounded-2xl overflow-hidden shadow-lg w-80 h-80">
                            <img
                                src={qrPreviewUrl}
                                alt="qr preview"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div> */}
            </form>
        </>
    )
}
