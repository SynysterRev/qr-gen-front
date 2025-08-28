import { apiConfig, buildUrl } from "../api";

export async function getAnalyticsForQr(userID: string, qrId: string) {
    const url = buildUrl(apiConfig.endpoints.users, `/${userID}/qrs/${qrId}/analytics`);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Fail to fetch anaytics for qr ${qrId}`);
    }

    return response.json();
}