import { UserResponse } from "@/lib/types/user";
import useLocalStorage from "./useLocalStorage";
import { getAllQrs } from "@/lib/services/qrService";
import { useEffect, useState } from "react";
import { QrData } from "@/lib/types/qr";
import { mapQrResponseToQrData } from "@/lib/utils/mappers/qrMappers";

export default function useUserQrs() {
    const [user] = useLocalStorage<UserResponse | null>("current_user", null);
    const [qrs, setQrs] = useState<QrData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQrs = async () => {
        if (!user) {
            setError("No user is logged in.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getAllQrs(user.id);
            const mappedQrs: QrData[] = data.map(mapQrResponseToQrData);
            setQrs(mappedQrs);
        } catch (err) {
            setError("Failed to fetch QR codes.");
            setQrs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchQrs();
        }
    }, [user]);

    const addQr = (newQr: QrData) => {
        setQrs(prev => [newQr, ...prev]);
    };

    const updateQr = (updatedQr: QrData) => {
        setQrs(prev =>
            prev.map(qr =>
                qr.id === updatedQr.id ? { ...qr, ...updatedQr } : qr
            )
        );
    };

    return {
        qrs,
        loading,
        error,
        refetch: fetchQrs,
        addQr,
        updateQr
    };
}