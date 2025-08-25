
"use client";

import Input from '@/components/ui/Input';
import { useQrCodeForm } from '@/hooks/useQrCodeForm';
import QrCustomizer from '../ui/QrCustomizer';
import QrPreview from '../ui/QrPreview';
import { FormEvent } from 'react';

export default function CreateQrForm({ onSubmit }:
    { onSubmit: (data: any) => void }) {

    const {
        qrData,
        title,
        isLoading,
        isValid,
        handleDropdownChange,
        handleDataChange,
        handleTitleChange,
        qrPreviewUrl,
        reset
    } = useQrCodeForm();

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValid) {
            onSubmit({ qrData, title });
        }
    };

    return (
        <>
            <form className="space-y-4" onSubmit={handleFormSubmit}>

                <Input
                    label="QR Code Name"
                    name="qr-name"
                    type={"text"}
                    value={title}
                    placeholder="My QR Code"
                    className="border border-gray-200"
                    required={true}
                    onChange={(e) => handleTitleChange(e.currentTarget.value)}
                ></Input>
                <QrCustomizer
                    qrData={qrData}
                    onDataChange={handleDataChange}
                />
                <QrPreview
                    isLoading={isLoading}
                    onFormatChange={handleDropdownChange}
                    qrConfig={qrData.config}
                    qrPreviewUrl={qrPreviewUrl}
                    qrModulesSize={null}
                />
                <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-2 text-white cursor-pointer transition-all duration-300 
                    enabled:hover:shadow-[var(--shadow-elegant)]  enabled:hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow 
                    disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!isValid}>Create QR Code</button>
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


{/* <div className="space-y-2 flex flex-col">
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
                            value={formData.config.borderSize}
                            min={0}
                            max={10}
                            onChange={(value) => updateField("config", { ...formData.config, borderSize: value })}
                            color="#8B5CF6"
                            name="borderSize"
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-1/2">
                        <label htmlFor="url">QR Color</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                className="border border-gray-300 rounded-xl p-1 w-12 h-10"
                                value={formData.config.fillColor}
                                onChange={e => updateField("config", { ...formData.config, fillColor: e.target.value })}
                                name="fillColor"
                            />
                            <input
                                className="border border-gray-300 rounded-xl p-2 w-full"
                                value={formData.config.fillColor}
                                onChange={e => updateField("config", { ...formData.config, fillColor: e.target.value })}
                                name="fillColor"></input>
                        </div>
                    </div>
                </div>
                <div>
                    <Slider
                        label="Scale"
                        value={formData.config.scale}
                        min={1}
                        max={20}
                        onChange={(value) => updateField("config", { ...formData.config, scale: value })}
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
                <h3 className="text-2xl font-bold">Preview</h3> */}