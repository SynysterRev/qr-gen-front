"use client";

import { fetchQrPreview } from "@/lib/services/qrService";
import { QrConfig } from "@/lib/types/qr";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

export default function useQrPreview() {
    const [qrPreviewUrl, setQrPreviewUrl] = useState<string | null>(null);
    const [qrModulesSize, setQrModulesSize] = useState<number[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const generateQrCode = useCallback(async (config: QrConfig) => {
        setIsLoading(true);
        try {
            const data = await fetchQrPreview(config);
            const { qr_base64, qr_modules_size } = data;
            const previewUrl = `data:image/svg+xml;base64,${qr_base64}`;
            setQrPreviewUrl(previewUrl);
            setQrModulesSize(qr_modules_size);
        } catch (error) {
            console.error('Error preview:', error);
            toast.error('Preview failed, please try again.');
            setQrPreviewUrl(null);
            setQrModulesSize(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const debouncedUpdate = useDebouncedCallback(
        (config: QrConfig) => generateQrCode(config),
        300
    );

    const generatePreview = useCallback((config: QrConfig) => {
        if (config.text && config.text.length > 0) {
            debouncedUpdate(config);
        } else {
            setQrPreviewUrl(null);
            setQrModulesSize(null);
        }
    }, [debouncedUpdate]);

    const clearPreview = useCallback(() => {
        setQrPreviewUrl(null);
        setQrModulesSize(null);
    }, []);

    return {
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        generatePreview,
        clearPreview
    };
}