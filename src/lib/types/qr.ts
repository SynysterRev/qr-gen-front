import { ChangeEventHandler, MouseEventHandler } from "react";

export interface QrConfig {
    text: string;
    fillColor: string;
    backgroundColor: string;
    scale: number;
    borderSize: number;
    format: string;
}

export interface QrCustomizerProps {
    qrConfig: QrConfig;
    onChangeInput: ChangeEventHandler<HTMLInputElement>;
    onChangeSlider: (name: string, value: number) => void;
}

export interface QrPreviewProps {
    qrConfig: QrConfig,
    isLoading: boolean,
    qrModulesSize: number[] | null,
    qrPreviewUrl: string | null,
    handleDownload: MouseEventHandler<HTMLButtonElement>,
    onFormatChange: (value: string) => void
}

export interface QrResponse {
    id: string;
    title: string;
    userId: string;
    url: string;
    scanCount: number;
    isDynamic: boolean;
    createdAt: Date;
}

export type QrCodeType = "website" | "text" | "wifi" | "contact" | "email" | "sms";

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

export interface ContactData {
    firstName?: string;
    lastName?: string;
    organization?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
}

export interface ContactFormFieldsProps {
    contact: ContactData;
    onChange: (value: ContactData) => void;
}

export interface EmailFormFieldsProps {
    email: string;
    subject: string;
    message: string;
    onChange: (data: { email: string; subject: string; message: string; }) => void;
}

export interface SmsFormFieldsProps {
    number: string;
    message: string;
    onChange: (data: { number: string; message: string }) => void;
}

export interface QrConfigFormProps {
    fillColor: string;
    backgroundColor: string;
    scale: number;
    borderSize: number;
}