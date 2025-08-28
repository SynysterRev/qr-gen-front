import { downloadPreviewQr } from "@/lib/services/qrService";
import { DEFAULT_QR_DATA, Format } from "@/lib/constants/qr";
import { QrCodeType, QrData } from "@/lib/types/qr";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLocalStorage from "./useLocalStorage";
import useQrPreview from "./useQrPreview";
import Link from "next/link";
import { convertFormDataToText } from "@/lib/utils/utils";

export default function useQrGenerator({ initialData }: { initialData?: Partial<QrData> } = {}) {
    const [qrData, setQrData] = useState<QrData>({
        ...DEFAULT_QR_DATA,
        ...initialData
    });

    const {
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        generatePreview,
        clearPreview
    } = useQrPreview();

    const [usageCount, setUsageCount] = useLocalStorage("qr_usage", 0);

    useEffect(() => {
        const data = convertFormDataToText(qrData);
        const config = {
            ...qrData,
            data
        };

        if (data) {
            generatePreview(config);
        } else {
            clearPreview();
        }
    }, [qrData, generatePreview, clearPreview]);

    function handleDropdownChange(value: Format) {
        setQrData(prevQrData => ({
            ...prevQrData,
            config: {
                ...prevQrData.config,
                format: value,
            },
        }));
    }

    function handleDataChange<K extends keyof QrData>(key: K, value: QrData[K]) {
        setQrData(prev => ({
            ...prev,
            [key]: value
        }));
    }

    async function handleDownload() {
        try {
            if (usageCount < 20) {
                const text = convertFormDataToText(qrData);
                const configForDownload = {
                    ...qrData,
                    text
                };

                const blob = await downloadPreviewQr(configForDownload);

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `qrcode.${qrData?.config.format}`;
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
        qrData,
        setQrData,
        handleDropdownChange,

        handleDataChange,

        // Preview
        qrPreviewUrl,
        qrModulesSize,
        isLoading,

        // Download
        handleDownload
    };
}