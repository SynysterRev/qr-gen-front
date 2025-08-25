import { useState } from "react";
import toast from "react-hot-toast";
import { QrData } from "@/lib/types/qr";
import { createQr } from "@/lib/services/qrService";
import useLocalStorage from "./useLocalStorage";
import { UserResponse } from "@/lib/types/user";

export default function useCreateQr() {
    const [isCreating, setIsCreating] = useState(false);
    const [user] = useLocalStorage<UserResponse | null>("current_user", null);

    const createQrCode = async (data: QrData) => {
        if (isCreating) return;
        if (!user) {
            console.error("No user is logged in.");
            return;
        }

        setIsCreating(true);
        try {
            const result = await createQr(data, user?.id);
            toast.success('QR Code created successfully!');
            return result;
        } catch (error) {
            console.error('Error creating QR:', error);
            toast.error('Failed to create QR code');
            throw error;
        } finally {
            setIsCreating(false);
        }
    };

    return { createQrCode, isCreating };
}