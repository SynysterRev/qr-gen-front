import { DEFAULT_QR_DATA } from "@/lib/constants/qr";
import { useMemo, useState } from "react";
import useQrGenerator from "./useQrGenerator";

export function useQrCodeForm() {

    // const [formData, setFormData] = useState<QrData>(DEFAULT_QR_DATA);

    const {
        qrData,
        qrPreviewUrl,
        isLoading,
        handleDropdownChange,
        handleDataChange,
    } = useQrGenerator();

    const reset = () => {
        // setFormData(DEFAULT_QR_DATA);
    };

    const isValid = useMemo(() => {
        return qrData.title && qrPreviewUrl !== null;
    }, [qrData.title, qrPreviewUrl]);

    return {
        reset,
        qrData,
        qrPreviewUrl,
        isLoading,
        isValid,
        handleDropdownChange,
        handleDataChange,
    };
}