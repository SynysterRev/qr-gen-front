"use client";

import QrCustomizer from "@/components/ui/QrCustomizer";
import useQrGenerator from "@/hooks/useQrGenerator";
import QrPreview from "@/components/ui/QrPreview";
import QrDownloadControls from "../ui/QrDownloadControls";

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
            <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1/2">
                <h3 className="font-semibold text-2xl">Preview</h3>
                <QrPreview
                    isLoading={isLoading}
                    qrConfig={qrData.config}
                    qrModulesSize={qrModulesSize}
                    qrPreviewUrl={qrPreviewUrl}
                />
                <QrDownloadControls
                    format={qrData.config.format!}
                    onDownload={handleDownload}
                    onFormatChange={handleDropdownChange} />
            </div>
        </div>
    );
}