"use client";

import QrCustomizer from "@/components/sections/QrCustomizer";
import useQrGenerator from "@/hooks/useQrGenerator";
import QrPreview from "@/components/sections/QrPreview";

export default function QrGenerator() {
    const {
        qrConfig,
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        handleInputChange,
        handleSliderChange,
        handleDropdownChange,
        handleDownload
    } = useQrGenerator();

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center gap-8 text-start">
            <QrCustomizer
                onChangeInput={handleInputChange}
                onChangeSlider={handleSliderChange}
                qrConfig={qrConfig}
            />
            <QrPreview
                handleDownload={handleDownload}
                isLoading={isLoading}
                onFormatChange={handleDropdownChange}
                qrConfig={qrConfig}
                qrModulesSize={qrModulesSize}
                qrPreviewUrl={qrPreviewUrl}
            />
        </div>
    );
}