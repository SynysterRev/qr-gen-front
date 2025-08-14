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

export const USE_CASES = [{
    id: 1,
    title: "Business Cards",
    borderColor: "#bedbff",
    backgroundColor: "#eff6ff",
    titleColor: "text-blue-700",
    description: "Add QR codes to business cards for instant contact sharing"
},
{
    id: 2,
    title: "Restaurant Menus",
    borderColor: "#b9f8cf",
    backgroundColor: "#f0fdf4",
    titleColor: "text-green-700",
    description: "Contactless dining with digital menu QR codes"
},
{
    id: 3,
    title: "Event Tickets",
    borderColor: "#e9d4ff",
    backgroundColor: "#faf5ff",
    titleColor: "text-purple-700",
    description: "Streamline event check-ins with secure QR tickets"
},
{
    id: 4,
    title: "Marketing Campaigns",
    borderColor: "#ffd6a8",
    backgroundColor: "#fff7ed",
    titleColor: "text-orange-700",
    description: "Track engagement and drive traffic with branded QR codes"
},
]

export const FEATURES = [
    {
        id: 1,
        title: "Custom Design",
        borderColor: "#8200db",
        description: "Customize colors, add logos, and create branded QR codes that match your style.",
        iconType: "dots",
        iconColor: "text-purple-600"
    },
    {
        id: 2,
        title: "Advanced Analytics",
        borderColor: "#2b7fff",
        description: "Track scans, locations, devices, and get detailed insights into your QR code performance.",
        iconType: "chart",
        iconColor: "text-blue-600"
    },
    {
        id: 3,
        title: "Multiple Formats",
        borderColor: "#f6339a",
        description: "Download in PNG, SVG, PDF, or EPS formats for any use case.",
        iconType: "download",
        iconColor: "text-pink-600"
    },
]