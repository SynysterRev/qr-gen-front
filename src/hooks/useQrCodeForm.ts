import { DEFAULT_QR_DATA } from "@/lib/constants/qr";
import { useMemo } from "react";
import useQrGenerator from "./useQrGenerator";
import { QrData } from "@/lib/types/qr";

export function useQrCodeForm({ initialData }: { initialData?: Partial<QrData> } = {}) {

    const {
        qrData,
        setQrData,
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        handleDropdownChange,
        handleDataChange,
    } = useQrGenerator({ initialData });

    const reset = () => {
        setQrData({
            ...DEFAULT_QR_DATA,
            ...initialData,
        });
    };

    const isValid = useMemo(() => {
        return qrData.title && qrPreviewUrl !== null;
    }, [qrData.title, qrPreviewUrl]);

    return {
        reset,
        qrData,
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        isValid,
        handleDropdownChange,
        handleDataChange,
    };
}