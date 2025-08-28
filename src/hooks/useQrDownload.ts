import { downloadQr } from "@/lib/services/qrService";
import { QrData } from "@/lib/types/qr";
import { useState } from "react";
import toast from "react-hot-toast";
import { Format } from '@/lib/constants/qr';

export default function useQrDownload() {
    const [format, setFormat] = useState<Format>("SVG");

    function handleFormatChange(value: Format) {
        setFormat(value);
    }

    async function handleDownload(qr: QrData) {
        try {
            const blob = await downloadQr(qr.id, format);

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${qr.title ?? "qrcode"}.${format}`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error download:', error);
            toast.error('Download failed, please try again.');
        }
    }

    return {
        format,
        handleFormatChange,
        handleDownload
    }
}