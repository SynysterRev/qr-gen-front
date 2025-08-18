import { FORMATS } from "../constants/qr";
import { QrConfig } from "../types/qr";

export async function fetchQrPreview(config: QrConfig) {
    const requestData = {
        url: config.text,
        customization: {
            dark: config.fillColor,
            light: config.backgroundColor,
            scale: config.scale,
            border: config.borderSize,
        },
        format: FORMATS[1].name
    };
    const response = await fetch("http://127.0.0.1:8000/api/qr/preview", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error('Preview failed');
    }

    return response.json();
}

export async function downloadQr(config: QrConfig) {
    const requestData = {
        url: config.text,
        customization: {
            dark: config.fillColor,
            light: config.backgroundColor,
            scale: config.scale,
            border: config.borderSize,
        },
        format: config.format.toLocaleLowerCase()
    };
    const response = await fetch("http://127.0.0.1:8000/api/qr/download", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error('Download failed');
    }

    return response.blob();
}