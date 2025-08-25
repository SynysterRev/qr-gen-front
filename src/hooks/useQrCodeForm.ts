import { DEFAULT_QR_DATA } from "@/lib/constants/qr";
import { useMemo, useState } from "react";
import useQrGenerator from "./useQrGenerator";

export function useQrCodeForm() {

    // const [formData, setFormData] = useState<QrData>(DEFAULT_QR_DATA);
    const [title, setTitle] = useState("");

    const {
        qrData,
        qrPreviewUrl,
        isLoading,
        handleDropdownChange,
        handleDataChange,
    } = useQrGenerator();

    function handleTitleChange(value: string): void {
        setTitle(value);
    }

    const reset = () => {
        // setFormData(DEFAULT_QR_DATA);
    };

    const isValid = useMemo(() => {
        return title.length > 0 && qrPreviewUrl !== null;
    }, [title, qrPreviewUrl]);

    return {
        reset,
        title,
        qrData,
        qrPreviewUrl,
        isLoading,
        isValid,
        handleDropdownChange,
        handleDataChange,
        handleTitleChange,
    };
}