import useLocalStorage from "@/hooks/useLocalStorage";
import { FORMATS } from "../constants/qr";
import { QrConfig } from "../types/qr";
import { apiConfig } from "../api";
import { UserResponse } from "../types/user";

const apiUrl = apiConfig.endpoints.qr;

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
    const response = await fetch(`${apiUrl}/preview`, {
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
    const response = await fetch(`${apiUrl}/download`, {
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

export async function getAllQrs(userId: string) {

    const response = await fetch(`${apiConfig.endpoints.users}/${userId}/qrs`);

    if (!response.ok) {
        throw new Error('Fetch Qr failed');
    }

    return response.json();
}