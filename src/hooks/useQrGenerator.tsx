"use client";

import { downloadQr } from "@/lib/services/qrService";
import { DEFAULT_QR_DATA } from "@/lib/constants/qr";
import { QrCodeType, QrData } from "@/lib/types/qr";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLocalStorage from "./useLocalStorage";
import useQrPreview from "./useQrPreview";
import Link from "next/link";

export default function useQrGenerator() {
    const [qrData, setQrData] = useState<QrData>(DEFAULT_QR_DATA);

    const {
        qrPreviewUrl,
        qrModulesSize,
        isLoading,
        generatePreview,
        clearPreview
    } = useQrPreview();

    const [usageCount, setUsageCount] = useLocalStorage("qr_usage", 0);

    // Fonction pour convertir les données du formulaire en texte pour le QR
    const convertFormDataToText = (data: Partial<QrData>): string => {
        switch (data.type) {
            case "website":
                return data.website || "";
            case "text":
                return data.text || "";
            case "wifi":
                if (data.wifi?.ssid) {
                    return `WIFI:T:WPA;S:${data.wifi.ssid};P:${data.wifi.password || ""};H:false;`;
                }
                return "";
            case "contact":
                if (data.contact) {
                    const { firstName, lastName, phone, email, organization, website, address } = data.contact;
                    const name = [firstName, lastName].filter(Boolean).join(' ');
                    return [
                        'BEGIN:VCARD',
                        'VERSION:3.0',
                        name ? `FN:${name}` : '',
                        organization ? `ORG:${organization}` : '',
                        phone ? `TEL;TYPE=WORK,VOICE:${phone}` : '',
                        email ? `EMAIL;TYPE=PREF,INTERNET:${email}` : '',
                        website ? `URL:${website}` : '',
                        address ? `ADR;TYPE=WORK:;;${address};;;` : '',
                        'END:VCARD'
                    ].filter(Boolean).join('\n');
                }
                return "";
            case "email":
                if (data.email?.email) {
                    const subject = data.email.subject ? `?subject=${encodeURIComponent(data.email.subject)}` : '';
                    const body = data.email.message ? `${subject ? '&' : '?'}body=${encodeURIComponent(data.email.message)}` : '';
                    return `mailto:${data.email.email}${subject}${body}`;
                }
                return "";
            case "sms":
                if (data.sms?.number) {
                    return `sms:${data.sms.number}?body=${data.sms.message || ''}`;
                }
                return "";
            default:
                return "";
        }
    };

    // Générer la preview quand les données changent
    useEffect(() => {
        const text = convertFormDataToText(qrData);
        const config = {
            ...qrData,
            text
        };

        if (text) {
            generatePreview(config);
        } else {
            clearPreview();
        }
    }, [qrData, generatePreview, clearPreview]);

    function handleDropdownChange(value: string) {
        setQrData(prevQrData => ({
            ...prevQrData,
            format: value,
        }));
    }

    function handleDataChange<K extends keyof QrData>(key: K, value: QrData[K]) {
        setQrData(prev => ({
            ...prev,
            [key]: value
        }));
    }

    async function handleDownload() {
        try {
            if (usageCount < 20) {
                const text = convertFormDataToText(qrData);
                const configForDownload = {
                    ...qrData,
                    text
                };

                const blob = await downloadQr(configForDownload);

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `qrcode.${qrData?.config.format}`;
                a.click();
                URL.revokeObjectURL(url);
            }

            const newCount = usageCount + 1;
            setUsageCount(newCount);

            setTimeout(() => {
                if (newCount >= 20) {
                    toast.custom(
                        <div className="bg-white rounded-xl p-4">
                            <p>
                                You've downloaded 20 QR codes!
                                <br />
                                Create a{" "}
                                <Link
                                    href="/signup"
                                    className="text-blue-500 underline text-sm mt-1"
                                >
                                    free account
                                </Link>{" "}
                                to continue.
                            </p>
                        </div>
                    );
                } else if (newCount >= 15) {
                    toast.error(`${20 - newCount} downloads left before creating an account`);
                } else if (newCount >= 10) {
                    setTimeout(() => {
                        toast.custom(
                            <div className="bg-white rounded-xl p-4">
                                <p className="text-center font-bold text-lg">Loving QRForge? </p>
                                <Link
                                    href="/signup" className="text-blue-500 underline text-sm mt-1">
                                    Create free account for analytics!
                                </Link>
                            </div>,
                            { duration: 6000 }
                        );
                    }, 2000);
                } else if (newCount === 5) {
                    setTimeout(() => {
                        toast.success("💡 Tip: Create an account to save your QR code history", {
                            duration: 4000
                        });
                    }, 1500);
                }
            }, 800);

        } catch (error) {
            console.error('Error download:', error);
            toast.error('Download failed, please try again.');
        }
    }

    return {
        // Config QR (couleurs, taille, etc.)
        qrData,
        handleDropdownChange,

        // Données du formulaire (type, contenu)
        handleDataChange,

        // Preview
        qrPreviewUrl,
        qrModulesSize,
        isLoading,

        // Download
        handleDownload
    };
}