import { QrPreviewRequest, QrData, QrCreateRequest, QrResponse, QrUpdateRequest } from "@/lib/types/qr";
import { convertFormDataToText, convertTextToFormData } from "../utils";

export const mapQrDataToPreviewRequest = (qrData: QrData): QrPreviewRequest => {
    const textData = convertFormDataToText(qrData);
    return {
        data: textData,
        customization: {
            dark: qrData.config.fillColor,
            light: qrData.config.backgroundColor,
            scale: qrData.config.scale,
            border: qrData.config.borderSize,
        },
        format: qrData.config?.format?.toLowerCase() ?? "svg"
    };
};

export const mapQrDataToCreateRequest = (qrData: QrData, userId: string): QrCreateRequest => {
    const textData = convertFormDataToText(qrData);
    return {
        title: qrData.title!,
        user_id: userId,
        data: textData,
        scan_count: 0,
        is_dynamic: false,
        customization: {
            dark: qrData.config.fillColor,
            light: qrData.config.backgroundColor,
            scale: qrData.config.scale,
            border: qrData.config.borderSize,
        },
        type: qrData.type
    };
};

export const mapQrDataToUpdateRequest = (qrData: QrData, userId: string): QrUpdateRequest => {
    const textData = convertFormDataToText(qrData);
    return {
        title: qrData.title!,
        data: textData,
        customization: {
            dark: qrData.config.fillColor,
            light: qrData.config.backgroundColor,
            scale: qrData.config.scale,
            border: qrData.config.borderSize,
        },
        type: qrData.type
    };
};

export const mapQrResponseToQrData = (qrResponse: QrResponse): QrData => {
    const typeAndData = convertTextToFormData(qrResponse.type, qrResponse.data);
    return {
        ...qrResponse,
        config: {
            fillColor: qrResponse.customization.dark,
            backgroundColor: qrResponse.customization.light,
            borderSize: qrResponse.customization.border,
            scale: qrResponse.customization.scale,
        },
        ...typeAndData
    }
};