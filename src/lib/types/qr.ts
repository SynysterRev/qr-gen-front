import { ChangeEventHandler, MouseEventHandler } from "react";

export type QrCodeType = "website" | "text" | "wifi" | "contact" | "email" | "sms";

// Base QR configuration interface
export interface QrConfigProps {
    fillColor: string;
    backgroundColor: string;
    scale: number;
    borderSize: number;
    format?: string; // Optional format for download
}

export interface ContactData {
    firstName?: string;
    lastName?: string;
    organization?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
}

// Main QR Data type that includes all possible data types and config
export type QrData = {
    type: QrCodeType;
    website?: string;
    text?: string;
    wifi?: {
        ssid: string;
        password: string;
    };
    contact?: ContactData;
    email?: {
        email: string;
        subject: string;
        message: string;
    };
    sms?: {
        number: string;
        message: string;
    };
    config: QrConfigProps;
}

// Props interfaces for components
export interface QrCustomizerProps {
    qrData: QrData;
    onDataChange: <K extends keyof QrData>(key: K, value: QrData[K]) => void;
}

export interface QrPreviewProps {
    qrConfig: QrConfigProps;
    isLoading: boolean;
    qrModulesSize: number[] | null;
    qrPreviewUrl: string | null;
    onDownload?: MouseEventHandler<HTMLButtonElement>;
    onFormatChange: (format: string) => void;
}

// Form field props interfaces
export interface QrCodeTypeSelectorProps {
    type: QrCodeType;
    onChange: (value: QrCodeType) => void;
}

export interface WebsiteFormFieldsProps {
    value: string;
    onChange: (value: string) => void;
}

export interface PlainTextFormFieldsProps {
    value: string;
    onChange: (value: string) => void;
}

export interface WifiFormFieldsProps {
    ssid: string;
    password: string;
    onChange: (data: { ssid: string; password: string }) => void;
}

export interface ContactFormFieldsProps {
    contact: QrData['contact'];
    onChange: (value: QrData['contact']) => void;
}

export interface EmailFormFieldsProps {
    email: string;
    subject: string;
    message: string;
    onChange: (data: QrData['email']) => void;
}

export interface SmsFormFieldsProps {
    number: string;
    message: string;
    onChange: (data: QrData['sms']) => void;
}

// Response type from API
export interface QrResponse {
    id: string;
    title: string;
    userId: string;
    url: string;
    scanCount: number;
    isDynamic: boolean;
    createdAt: Date;
}