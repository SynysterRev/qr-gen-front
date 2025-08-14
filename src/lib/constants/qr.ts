import { QrConfig } from "../types/qr";

export const FORMATS = [
    { id: 1, name: "PNG" },
    { id: 2, name: "SVG" },
    { id: 3, name: "PDF" },
];

export const DEFAULT_QR_CONFIG: QrConfig = {
    text: "https://qrcraft.app",
    fillColor: "#8B5CF6",
    backgroundColor: "#ffffff",
    scale: 10,
    borderSize: 2,
    format: "SVG"
};

export const QR_LIMITS = {
    scale: { min: 1, max: 20 },
    borderSize: { min: 0, max: 10 }
};