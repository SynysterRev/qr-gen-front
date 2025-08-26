
"use client";

import Input from '@/components/ui/Input';
import { useQrCodeForm } from '@/hooks/useQrCodeForm';
import QrCustomizer from '../ui/QrCustomizer';
import QrPreview from '../ui/QrPreview';
import { FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { QrData } from '@/lib/types/qr';
import { formMode } from '@/lib/types/modal';

export default function QrForm({ onSubmit, isCreating, initialData, mode }: {
    mode: formMode;
    onSubmit: (data: any) => void;
    isCreating?: boolean;
    initialData?: Partial<QrData>;
}) {

    const {
        qrData,
        isLoading,
        isValid,
        handleDropdownChange,
        handleDataChange,
        qrPreviewUrl,
        qrModulesSize,
        reset
    } = useQrCodeForm({ initialData });

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValid) {
            onSubmit(qrData);
        }
    };

    return (
        <>
            <form className="space-y-4" onSubmit={handleFormSubmit}>

                <Input
                    label="QR Code Name"
                    name="qr-name"
                    type={"text"}
                    value={qrData.title ?? ""}
                    placeholder="My QR Code"
                    className="border border-gray-200"
                    required={true}
                    onChange={(e) => handleDataChange("title", e.currentTarget.value)}
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
                    qrModulesSize={qrModulesSize}
                />
                <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-2 text-white cursor-pointer transition-all duration-300 
                    enabled:hover:shadow-[var(--shadow-elegant)]  enabled:hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow 
                    disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!isValid}>
                    {isCreating ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            `${mode == "create" ? "Creating..." : "Updating..."}`
                        </div>
                    ) : (
                        `${mode == "create" ? "Create QR Code" : "Update QR Code"}`
                    )}
                </button>
            </form>
        </>
    )
}