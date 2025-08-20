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
