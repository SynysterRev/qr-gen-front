import { MouseEventHandler } from "react";
import { Format } from "../constants/qr";

export type QrCodeType = "website" | "text" | "wifi" | "contact" | "email" | "sms";
export type QrModalSection = "overview" | "analytics" | "settings" | "download";
export const modalSections: QrModalSection[] = ["overview", "analytics", "download", "settings"];

export interface QrConfigBaseProps {
    fillColor: string;
    backgroundColor: string;
    scale: number;
    borderSize: number;
}

// Base QR configuration interface
export interface QrConfigProps extends QrConfigBaseProps {
    format?: Format; // Optional format for download
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
    id: string;
    title?: string;
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
    data: string;
    createdAt: Date;
    scanCount: number;
}

// Props interfaces for components
export interface QrCustomizerProps {
    qrData: QrData;
    onDataChange: <K extends keyof QrData>(key: K, value: QrData[K]) => void;
}

export interface QrPreviewProps {
    qrConfig: QrConfigProps;
    isLoading: boolean;
    qrModulesSize?: number[] | null;
    qrPreviewUrl: string | null;
}

export interface QrDownloadProps {  
    format: Format;
    onDownload?: MouseEventHandler<HTMLButtonElement>;
    onFormatChange: (format: Format) => void;
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
    data: string;
    scanCount: number;
    isDynamic: boolean;
    createdAt: Date;
    type: QrCodeType;
    customization: {
        dark: string;
        light: string;
        scale: number;
        border: number;
    };
}

export interface QrPreviewRequest {
    data: string;
    customization: {
        dark: string;
        light: string;
        scale: number;
        border: number;
    };
    format: string;
}

export interface QrCreateRequest {
    title: string;
    user_id: string;
    data: string;
    customization: {
        dark: string;
        light: string;
        scale: number;
        border: number;
    };
    scan_count: number;
    is_dynamic: boolean;
    type: QrCodeType;
}

export interface QrUpdateRequest {
    title: string;
    data: string;
    customization: {
        dark: string;
        light: string;
        scale: number;
        border: number;
    };
    type: QrCodeType;
}

export interface BasicStats {
    name: string;
    count: number;
}

export interface RecentScan {
    deviceType: string;
    country: string;
    scannedAt: Date;
}

export interface QrStatsResponse {
    topCountries: BasicStats[];
    topDevices: BasicStats[];
    mostRecent: RecentScan[];
}