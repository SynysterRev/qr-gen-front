import { DEFAULT_QR_CONFIG_FORM } from "@/lib/constants/qr";
import { ContactData, QrCodeType, QrConfigFormProps } from "@/lib/types/qr";
import { useState } from "react";

export type QRFormData = {
    type: QrCodeType;
    website?: string;
    text?: string;
    wifi?: { ssid: string; password: string };
    contact?: ContactData;
    email?: { email: string; subject: string; message: string };
    sms?: { number: string; message: string };
    qrConfig: QrConfigFormProps;
};

export function useQrCodeForm(initialType: QrCodeType = "website") {
    const [formData, setFormData] = useState<QRFormData>({
        type: initialType,
        website: "",
        qrConfig: DEFAULT_QR_CONFIG_FORM
    });

    const setType = (type: QrCodeType) => {
        setFormData((prev) => ({ ...prev, type }));
    };

    const updateField = <K extends keyof QRFormData>(key: K, value: QRFormData[K]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const reset = () => {
        setFormData({ type: initialType, qrConfig: DEFAULT_QR_CONFIG_FORM });
    };

    return {
        formData,
        setType,
        updateField,
        reset,
    };
}