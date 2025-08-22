"use client";

import QrCustomizer from "@/components/sections/QrCustomizer";
import useQrGenerator from "@/hooks/useQrGenerator";
import QrPreview from "@/components/sections/QrPreview";

export default function QrGenerator() {
    const {
        // Config QR (couleurs, taille, etc.)
        handleDropdownChange,

        // Données du formulaire (type, contenu)
        qrData,
        handleDataChange,

        // Preview
        qrPreviewUrl,
        qrModulesSize,
        isLoading,

        // Download
        handleDownload
    } = useQrGenerator();

    return (
        <div className="max-w-7xl mx-auto flex flex-col justify-center gap-8 text-start">
            <QrCustomizer
                qrData={qrData}
                onDataChange={handleDataChange}
            />
            <QrPreview
                onDownload={handleDownload}
                isLoading={isLoading}
                onFormatChange={handleDropdownChange}
                qrConfig={qrData.config}
                qrModulesSize={qrModulesSize}
                qrPreviewUrl={qrPreviewUrl}
            />
        </div>
    );
}