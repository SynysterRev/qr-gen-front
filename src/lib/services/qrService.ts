import { QrData } from "../types/qr";
import { apiConfig, buildUrl } from "../api";
import { mapQrDataToCreateRequest, mapQrDataToPreviewRequest, mapQrDataToUpdateRequest } from "../utils/mappers/qrMappers";

const apiUrl = apiConfig.endpoints.qr;

export async function fetchQrPreview(qrData: QrData) {
    const requestData = mapQrDataToPreviewRequest(qrData);
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

export async function downloadPreviewQr(qrData: QrData) {
    const requestData = mapQrDataToPreviewRequest(qrData);
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

export async function downloadQr(qrId: string, format: string) {
    const url = buildUrl(apiUrl, `/${qrId}/download?format=${format}`);
    const response = await fetch(url, {
        method: "POST"
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

export async function createQr(qrData: QrData, userId: string) {
    const requestData = mapQrDataToCreateRequest(qrData, userId);
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error('Fail to create new QR');
    }

    return response.json();
}

export async function updateQr(qrData: QrData, userId: string) {
    const requestData = mapQrDataToUpdateRequest(qrData, userId);
    const response = await fetch(`${apiConfig.endpoints.users}/${userId}/qrs/${qrData.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error('Fail to update new QR');
    }

    return response.json();
}