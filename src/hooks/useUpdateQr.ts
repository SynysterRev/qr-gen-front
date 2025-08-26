import { useState } from "react";
import toast from "react-hot-toast";
import { QrData } from "@/lib/types/qr";
import { updateQr } from "@/lib/services/qrService";
import useLocalStorage from "./useLocalStorage";
import { UserResponse } from "@/lib/types/user";
import { mapQrResponseToQrData } from "@/lib/utils/mappers/qrMappers";

export default function useUpdateQr() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [user] = useLocalStorage<UserResponse | null>("current_user", null);

    const updateQrCode = async (data: QrData) => {
        if (isUpdating) return;
        if (!user) {
            console.error("No user is logged in.");
            return;
        }

        setIsUpdating(true);
        try {
            const result = await updateQr(data, user?.id);
            const qrData = mapQrResponseToQrData(result);
            toast.success('QR Code updated successfully!');
            return qrData;
        } catch (error) {
            console.error('Error updating QR:', error);
            toast.error('Failed to update QR code');
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateQrCode, isUpdating };
}