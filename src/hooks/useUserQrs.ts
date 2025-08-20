import { UserResponse } from "@/lib/types/user";
import useLocalStorage from "./useLocalStorage";
import { getAllQrs } from "@/lib/services/qrService";
import { useEffect, useState } from "react";
import { QrResponse } from "@/lib/types/qr";

export default function useUserQrs() {
    const [user] = useLocalStorage<UserResponse | null>("current_user", null);
    const [qrs, setQrs] = useState<QrResponse[]>([]);
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
            setQrs(data);
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

    return {
        qrs,
        loading,
        error,
        refetch: fetchQrs
    };
}