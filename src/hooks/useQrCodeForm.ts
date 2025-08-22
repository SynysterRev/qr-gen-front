import { DEFAULT_QR_DATA } from "@/lib/constants/qr";
import { QrCodeType, QrData } from "@/lib/types/qr";
import { useState } from "react";
import useQrGenerator from "./useQrGenerator";

export function useQrCodeForm() {

    const [formData, setFormData] = useState<QrData>(DEFAULT_QR_DATA);
    const [isOpen, setIsOpen] = useState(false);

    const {
        qrData,
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        handleDropdownChange,
        handleDataChange,
        handleDownload
    } = useQrGenerator();

    const setType = (type: QrCodeType) => {
        setFormData((prev) => ({ ...prev, type }));
    };

    const updateField = <K extends keyof QrData>(key: K, value: QrData[K]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const reset = () => {
        setFormData(DEFAULT_QR_DATA);
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleDownload();
        closeModal();
    };

    return {
        formData,
        setType,
        updateField,
        reset,
        isOpen,
        qrData,
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        openModal,
        closeModal,
        handleSubmit,
        handleDropdownChange,
        handleDataChange,
    };
}