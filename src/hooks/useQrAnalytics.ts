import { UserResponse } from "@/lib/types/user";
import useLocalStorage from "./useLocalStorage";
import { useEffect, useState } from "react";
import { getAnalyticsForQr } from "@/lib/services/scanService";
import { QrStatsResponse } from "@/lib/types/qr";

export default function useQrAnalytics(qrId: string) {
    const [user] = useLocalStorage<UserResponse | null>("current_user", null);
    const [qrAnalytics, setqrAnalytics] = useState<QrStatsResponse | null>(null);

    useEffect(() => {
        if (!qrId) return;
        if (!user) {
            console.error("No user is logged in.");
            return;
        }

        const fetchAnalytics = async () => {

            try {
                const result = await getAnalyticsForQr(user.id, qrId);
                setqrAnalytics(result);
            } catch (err) {
                console.error(`Failed to fetch analytics for qr ${qrId}.`);
            }
        }
        fetchAnalytics();
    }, [qrId]);

    return {
        qrAnalytics,
    }
}