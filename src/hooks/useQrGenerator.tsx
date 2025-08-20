"use client";

import { downloadQr, fetchQrPreview } from "@/lib/services/qrService";
import { DEFAULT_QR_CONFIG } from "@/lib/constants/qr";
import { QrConfig } from "@/lib/types/qr";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import useLocalStorage from "./useLocalStorage";
import Link from "next/link";

export default function useQrGenerator() {

    const [qrConfig, setQrConfig] = useState<QrConfig>(DEFAULT_QR_CONFIG);
    const [qrPreviewUrl, setQrPreviewUrl] = useState<string | null>(null);
    const [qrModulesSize, setQrModulesSize] = useState<number[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedUpdate = useDebouncedCallback(
        (config) => generateQrCode(config),
        300
    );

    async function generateQrCode(config: QrConfig) {
        setIsLoading(true);
        try {
            const data = await fetchQrPreview(config);
            const { qr_base64, qr_modules_size } = data;
            const previewUrl = `data:image/svg+xml;base64,${qr_base64}`;
            setQrPreviewUrl(previewUrl);
            setQrModulesSize(qr_modules_size);
            setIsLoading(false);
        }
        catch (error) {
            console.error('Error preview:', error);
            toast.error('Preview failed, please try again.');
        }
    }

    useEffect(() => {
        if (qrConfig.text.length > 0) {
            debouncedUpdate(qrConfig);
        } else {
            setQrPreviewUrl(null);
            setQrModulesSize(null);
        }
    }, [qrConfig, debouncedUpdate]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.currentTarget;
        setQrConfig(prevQrConfig => ({
            ...prevQrConfig,
            [name]: value
        }));
    }

    function handleSliderChange(name: string, value: number) {
        setQrConfig(prevQrConfig => ({
            ...prevQrConfig,
            [name]: value
        }));
    }

    function handleDropdownChange(value: string) {
        setQrConfig(prev => ({
            ...prev,
            format: value,
        }));
    }


    const [
        usageCount,
        setUsageCount
    ] = useLocalStorage("qr_usage", 0);

    async function handleDownload() {
        try {
            if (usageCount < 20) {
                const blob = await downloadQr(qrConfig);

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `qrcode.${qrConfig.format}`;
                a.click();
                URL.revokeObjectURL(url);

            }

            const newCount = usageCount + 1;
            setUsageCount(newCount);

            setTimeout(() => {
                if (newCount >= 20) {
                    toast.custom(
                        <div className="bg-white rounded-xl p-4">
                            <p>
                                You've downloaded 20 QR codes!
                                <br />
                                Create a{" "}
                                <Link
                                    href="/signup"
                                    className="text-blue-500 underline text-sm mt-1"
                                >
                                    free account
                                </Link>{" "}
                                to continue.
                            </p>
                        </div>
                    );
                } else if (newCount >= 15) {
                    toast.error(`${20 - newCount} downloads left before creating an account`);
                } else if (newCount >= 10) {
                    setTimeout(() => {
                        toast.custom(
                            <div className="bg-white rounded-xl p-4">
                                <p className="text-center font-bold text-lg">Loving QRForge? </p>
                                <Link
                                    href="/signup" className="text-blue-500 underline text-sm mt-1">
                                    Create free account for analytics!
                                </Link>
                            </div>,
                            { duration: 6000 }
                        );
                    }, 2000);
                } else if (newCount === 5) {
                    setTimeout(() => {
                        toast.success("💡 Tip: Create an account to save your QR code history", {
                            duration: 4000
                        });
                    }, 1500);
                }
            }, 800);

        } catch (error) {
            console.error('Error download:', error);
            toast.error('Download failed, please try again.');
        }
    }

    return {
        qrConfig,
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        handleInputChange,
        handleSliderChange,
        handleDropdownChange,
        handleDownload
    }
};